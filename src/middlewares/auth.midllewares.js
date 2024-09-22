import User from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", ""); // get the token from the cookies or the Authorization header
    if (!token) {
      return res.status(401).json(new ApiError(401, "Unauthorized request"));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json(new ApiError(401, "Invalid access token"));
    }

    //   now we have a valid user
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(
        new ApiError(
          401,
          "Invalid access token. Please login to get a new token ",
          error?.message
        )
      );
  }
});

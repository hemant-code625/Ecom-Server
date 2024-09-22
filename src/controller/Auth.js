import User from "../models/User.js";
import bcrypt from "bcrypt";
// const { sanitizeUser, sendMail } = require('../services/common');
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// export const handleGoogleAuth = async (req, res) => {
//   const { userData } = req.body;
//   const googleId = userData.googleId;
//   const user = await User.findOne({ googleId });

//   if (user) {
//     return res.status(200).json(user);
//   } else {
//     const name = userData.name;
//     const email = userData.email;
//     const picture = userData.picture;
//     const googleId = userData.googleId;
//     const user = new User({
//       name,
//       email,
//       addresses: [],
//       picture,
//       googleId,
//       role: "user", // default role is user
//     });

//     await user.save();
//     return res.status(200).json(user);
//   }
// };

const generateTokens = async (user) => {
  try {
    const accessToken = user.generateAccessToken(); // NOTE: here the user is the instance of the User model not the schema.
    const refreshToken = user.generateRefreshToken();

    // storing the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // so that the required field from schema does not invoke here

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

export const createUser = async (req, res) => {
  // check if user already exists in database
  // if yes, return error
  // else take user data and save it in database
  // return response
  const { name, email, password } = req.body;

  if (![name, email, password].every(Boolean)) {
    return res
      .status(400)
      .json(new ApiError(400, "Please fill all the fields"));
  }

  if (!email.includes("@")) {
    return res
      .status(401)
      .json(new ApiError(401, "Please enter a valid email address"));
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(402).json(new ApiError(402, "User already exists"));
  }

  const user = new User({
    name,
    email,
    addresses: [],
    password, // this will be hashed in the pre save hook
  });
  await user.save();
  res.json(new ApiResponse(200, "User created successfully"));
};

export const loginUser = async (req, res) => {
  // req.body -> data
  // check if user exists
  // check if password is correct
  // generate access and refresh token & save refresh token in the database
  // send cookies

  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json(new ApiError(400, "Username or email required."));
  }

  // TODO: user is only being searched by username, we need to search by email as well
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json(new ApiError(401, "User does not exist! Please register."));
  }
  if (!(await user.isCorrectPassword(password))) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }

  const { accessToken, refreshToken } = await generateTokens(user);
  const loggedInUser = await User.findById(user._id) // we are making a request to the database to get the user details which will include refreshToken
    .select("-password -refreshToken") // this will exclude password and refreshToken from the response
    .lean();

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
      })
    );
};

export const logOutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: { refreshToken: "" },
    },
    { new: true } // to return the updated vlaue of refreshToken not the old one
  );
  user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "User logged out successfully", {}));
});

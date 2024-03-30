import User from "../models/Users.js";
import bcrypt from "bcrypt";
// const { sanitizeUser, sendMail } = require('../services/common');
import jwt from "jsonwebtoken";


export const handleGoogleAuth = async (req, res) => {

  const { userData } = req.body;
  const googleId = userData.googleId;
  const user = await User.findOne({ googleId });

  if(user){

    return res.status(200).json(user);

  }else{

    const name = userData.name;
    const email = userData.email;
    const picture = userData.picture;
    const googleId = userData.googleId;
    const user = new User({
      name,
      email,
      addresses: [],
      picture,
      googleId,
      role: "user",  // default role is user
    });

    await user.save();
    return res.status(200).json(user);
  }
}
export const createUser = async (req, res) => {
  const { userData } = req.body;
  const name = userData.name;
  const email = userData.email;
  const password = userData.password || googleId;
  const picture = userData.picture;
  const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      addresses: [],
      picture,
      password: hashedPassword,
      role: "user", // default role is user
    });
    await user.save();
    res.json(user);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Email or password is incorrect" });
  }
  const token = jwt.sign(                      // we need to send order history by api else token size will be too large
    {user:{
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture || "",
      addresses: user.addresses,
      role: user.role,
    }},
    `${process.env._SecretToken}`
  );
  res.json({
    token
    // user: {
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   picture: user.picture || "",
    //   addresses: user.addresses,
    //   role: user.role,
    // },
  });
};

export const logout = async (req, res) => {};
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, `${process.env._SecretToken}`, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// export const checkAuth = async (req, res) => {
//   if (req.user) {
//     res.json(req.user);
//   } else {
//     res.sendStatus(401);
//   }
// };

// export const resetPasswordRequest = async (req, res) => {
//   const email = req.body.email;
//   const user = await User.findOne({ email: email });
//   if (user) {
//     const token = crypto.randomBytes(48).toString('hex');
//     user.resetPasswordToken = token;
//     await user.save();

//     // Also set token in email
//     const resetPageLink =
//       'http://localhost:8080/reset-password?token=' + token + '&email=' + email;
//     const subject = 'reset password for e-commerce';
//     const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;

//     // lets send email and a token in the mail body so we can verify that user has clicked right link

//     if (email) {
//       const response = await sendMail({ to: email, subject, html });
//       res.json(response);
//     } else {
//       res.sendStatus(400);
//     }
//   } else {
//     res.sendStatus(400);
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { email, password, token } = req.body;

//   const user = await User.findOne({ email: email, resetPasswordToken: token });
//   if (user) {
//     const salt = crypto.randomBytes(16);
//     crypto.pbkdf2(
//       req.body.password,
//       salt,
//       310000,
//       32,
//       'sha256',
//       async function (err, hashedPassword) {
//         user.password = hashedPassword;
//         user.salt = salt;
//         await user.save();
//         const subject = 'password successfully reset for e-commerce';
//         const html = `<p>Successfully able to Reset Password</p>`;
//         if (email) {
//           const response = await sendMail({ to: email, subject, html });
//           res.json(response);
//         } else {
//           res.sendStatus(400);
//         }
//       }
//     );
//   } else {
//     res.sendStatus(400);
//   }
// };

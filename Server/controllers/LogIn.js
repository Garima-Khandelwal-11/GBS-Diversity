import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import jwt from "../utils/jwt.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    if (!(email || password)) {
        return res.status(400).json({ message: "email and password is required" });
    }
  
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Password or User_id Incorrect" });
    }

    const u_role = user.role === 1 ? "Mentor" : "Mentee";

  const accessToken = jwt.generateAccessToken({
    id: user.user_id,
    role: u_role,
  });

  const refreshToken = jwt.generateRefreshToken({
    id: user.user_id,
    role: u_role,
  });
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //ms
    httpOnly: true,
    secure: true,
  };

  user.refresh_token.push(refreshToken);
  await user.save();
  user.password = undefined;
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          success: true,
          accessToken,
          refreshToken,
          u_role,
          user,
        },
        "User logged In Successfully"
      )
    );
};
export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(403).json({ message: "Refresh Token not provided" });
  }

  try {
    const payload = jwt.verifyRefreshToken(refreshToken);

    const user = await User.findOne({ user_id: payload.id });

    if (!user || !user.refresh_token.includes(refreshToken)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const u_role = user.type === 1 ? "Mentor" : "Mentee";
    const newAccessToken = jwt.generateAccessToken({
      id: user.user_id,
      role: u_role,
    });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res
      .status(403)
      .json({ message: "Invalid Refresh Token", error: err.message });
  }
};

export const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const user = await User.findOneAndUpdate(
      { refresh_token: refreshToken },
      { $pull: { refresh_token: refreshToken } }
    );

    if (!user) return res.status(400).json({ message: "User not found" });

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: `Server error: + ${err}` });
  }
};
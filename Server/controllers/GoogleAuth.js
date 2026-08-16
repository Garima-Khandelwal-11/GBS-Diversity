import { OAuth2Client } from "google-auth-library";
import User from "../models/users.model.js";
import jwt from "../utils/jwt.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Google credential is required" });
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ message: "Google login is not configured on the server" });
  }

  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Google credential" });
  }

  const { email } = payload;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "No account found for this Google email. Please sign up first.",
    });
  }

  const u_role = user.role === 1 ? "Mentor" : "Mentee";

  const accessToken = jwt.generateAccessToken({ id: user.user_id, role: u_role });
  const refreshToken = jwt.generateRefreshToken({ id: user.user_id, role: u_role });

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
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
        "User logged in with Google successfully"
      )
    );
};

import { OAuth2Client } from "google-auth-library";
import User from "../models/users.model.js";
import { issueAuthTokens } from "../utils/issueAuthTokens.js";
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

  if (user.twoFA_enabled) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { success: true, requires2FA: true, user_id: user.user_id },
          "Enter your 2FA code to finish logging in"
        )
      );
  }

  return issueAuthTokens(res, user, "User logged in with Google successfully");
};

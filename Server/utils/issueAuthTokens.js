import jwt from "./jwt.js";
import { ApiResponse } from "./ApiResponse.js";

export const issueAuthTokens = async (res, user, message = "Login successful") => {
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
        { success: true, accessToken, refreshToken, u_role, user },
        message
      )
    );
};

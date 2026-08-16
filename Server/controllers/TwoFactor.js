import { generateSecret, generate, verify, generateURI } from "otplib";
import qrcode from "qrcode";
import User from "../models/users.model.js";
import { issueAuthTokens } from "../utils/issueAuthTokens.js";

const ISSUER = "MentHer";

export const getTwoFactorStatus = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  const user = await User.findOne({ user_id });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  return res.status(200).json({ success: true, enabled: !!user.twoFA_enabled });
};

export const setupTwoFactor = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  const user = await User.findOne({ user_id });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const secret = generateSecret();
  user.twoFA_temp_secret = secret;
  await user.save();

  const otpauthUrl = generateURI({ issuer: ISSUER, label: user.email, secret });
  const qrCode = await qrcode.toDataURL(otpauthUrl);

  return res.status(200).json({
    success: true,
    secret,
    qrCode,
    message: "Scan the QR code in your authenticator app, then confirm with a code",
  });
};

export const confirmTwoFactorSetup = async (req, res) => {
  const { user_id, token } = req.body;
  if (!user_id || !token) {
    return res.status(400).json({ message: "user_id and token are required" });
  }

  const user = await User.findOne({ user_id });
  if (!user || !user.twoFA_temp_secret) {
    return res.status(400).json({ message: "Start 2FA setup first" });
  }

  const result = await verify({ secret: user.twoFA_temp_secret, token });
  if (!result.valid) {
    return res.status(401).json({ message: "Invalid 2FA code" });
  }

  user.twoFA_secret = user.twoFA_temp_secret;
  user.twoFA_temp_secret = undefined;
  user.twoFA_enabled = true;
  await user.save();

  return res.status(200).json({ success: true, message: "2FA enabled successfully" });
};

export const verifyTwoFactorLogin = async (req, res) => {
  const { user_id, token } = req.body;
  if (!user_id || !token) {
    return res.status(400).json({ message: "user_id and token are required" });
  }

  const user = await User.findOne({ user_id });
  if (!user || !user.twoFA_enabled || !user.twoFA_secret) {
    return res.status(400).json({ message: "2FA is not enabled for this account" });
  }

  const result = await verify({ secret: user.twoFA_secret, token });
  if (!result.valid) {
    return res.status(401).json({ message: "Invalid 2FA code" });
  }

  return issueAuthTokens(res, user, "User logged In Successfully");
};

export const disableTwoFactor = async (req, res) => {
  const { user_id, token } = req.body;
  if (!user_id || !token) {
    return res.status(400).json({ message: "user_id and token are required" });
  }

  const user = await User.findOne({ user_id });
  if (!user || !user.twoFA_enabled || !user.twoFA_secret) {
    return res.status(400).json({ message: "2FA is not enabled for this account" });
  }

  const result = await verify({ secret: user.twoFA_secret, token });
  if (!result.valid) {
    return res.status(401).json({ message: "Invalid 2FA code" });
  }

  user.twoFA_enabled = false;
  user.twoFA_secret = undefined;
  await user.save();

  return res.status(200).json({ success: true, message: "2FA disabled successfully" });
};

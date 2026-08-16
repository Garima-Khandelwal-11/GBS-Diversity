import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
  USER_PROFILE,
  TWO_FA_STATUS_API,
  TWO_FA_SETUP_API,
  TWO_FA_VERIFY_SETUP_API,
  TWO_FA_VERIFY_LOGIN_API,
  TWO_FA_DISABLE_API,
} = endpoints;

export async function getTwoFactorStatus(user_id) {
  const response = await apiConnector("POST", TWO_FA_STATUS_API, { user_id });
  return response.data.enabled;
}

export async function setupTwoFactor(user_id) {
  const response = await apiConnector("POST", TWO_FA_SETUP_API, { user_id });
  return { secret: response.data.secret, qrCode: response.data.qrCode };
}

export async function confirmTwoFactorSetup(user_id, token) {
  await apiConnector("POST", TWO_FA_VERIFY_SETUP_API, { user_id, token });
}

export async function disableTwoFactor(user_id, token) {
  await apiConnector("POST", TWO_FA_DISABLE_API, { user_id, token });
}

export function verifyTwoFactorLogin(user_id, token, email, navigate) {
  return async () => {
    const toast_id = toast.loading("Verifying code...");
    try {
      const response = await apiConnector("POST", TWO_FA_VERIFY_LOGIN_API, { user_id, token });

      if (!response.data.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      toast.success("Login Successful!");

      const userDetails = await apiConnector("POST", USER_PROFILE, { email });
      localStorage.setItem("user", JSON.stringify(userDetails.data));
      localStorage.setItem("role", userDetails.data.role);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid 2FA code");
      console.error(error);
    } finally {
      toast.dismiss(toast_id);
    }
  };
}

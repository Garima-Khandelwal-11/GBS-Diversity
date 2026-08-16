const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
console.log(BASE_URL);
export const endpoints = {
    LOGIN_API: BASE_URL + "/logIn",
    GOOGLE_LOGIN_API: BASE_URL + "/google-login",
    TWO_FA_STATUS_API: BASE_URL + "/2fa/status",
    TWO_FA_SETUP_API: BASE_URL + "/2fa/setup",
    TWO_FA_VERIFY_SETUP_API: BASE_URL + "/2fa/verify-setup",
    TWO_FA_VERIFY_LOGIN_API: BASE_URL + "/2fa/verify-login",
    TWO_FA_DISABLE_API: BASE_URL + "/2fa/disable",
    SIGNUP_API: BASE_URL +"/signIn",
    USER_PROFILE: BASE_URL+ "/getProfileDataWithEmail",
    ALL_MENTOR: BASE_URL+ "/getAllMentors",
    CHATBOT_API: BASE_URL + "/chatbot",

};
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
console.log(BASE_URL);
export const endpoints = {
    LOGIN_API: BASE_URL + "/logIn",
    SIGNUP_API: BASE_URL +"/signIn",
    USER_PROFILE: BASE_URL+ "/getProfileDataWithEmail",
    ALL_MENTOR: BASE_URL+ "/getAllMentors",

};
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { LOGIN_API, SIGNUP_API, USER_PROFILE } = endpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toast_id = toast.loading("Loading...");
    console.log("hello");
    console.log(email, password);
    console.log(LOGIN_API);
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("hello2");

       console.log("response from the login api server ", response);
      if (!response.data.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      // Notify user of successful login
      toast.success("Login Successful!");

      // Fetch user details from the session (server maintains session state)
      const userDetails = await apiConnector("POST", USER_PROFILE,{email});
      console.log(userDetails);
      // Optionally, store user data in localStorage for session persistence
      localStorage.setItem("user", JSON.stringify(userDetails.data));
      localStorage.setItem("role", userDetails.data.role);

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.error(error);
    } finally {
      toast.dismiss(toast_id);
    }
  };
}

export function logout()
{
  localStorage.removeItem('user');
  window.location.reload();
}

export function signup(signupData, navigate)
{
  return async (dispatch) => {
    const{ email,password,role,skills,careerGoals,interests,description,username}= signupData;
    const toast_id = toast.loading("Loading...");
    console.log("hello");
    console.log(signupData);
    const userrole= role=="Mentor"?1:0;
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        description,
        name: username,
        role: userrole,
        skills,
        career_goal: careerGoals,
        interests,
        email,
        password
       ,
      });
      console.log("hello2");

       console.log("response from the signup api server ", response);

      // Notify user of successful login
      toast.success("Login Successful!");
      const userDetails = await apiConnector("POST", USER_PROFILE,{email});
      console.log(userDetails);
      // Optionally, store user data in localStorage for session persistence
      localStorage.setItem("user", JSON.stringify(userDetails.data));
      localStorage.setItem("role", userDetails.data.role);

      // Redirect to the home page
      navigate("/");} catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        console.error(error);
      } finally {
        toast.dismiss(toast_id);
      }
    };
  }
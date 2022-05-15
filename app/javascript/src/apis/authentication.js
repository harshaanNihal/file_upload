import axios from "axios";
// import { getCSFToken } from "../common";

let axiosConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN":document
    .querySelector('[name="csrf-token"]')
    .getAttribute("content")
  }
};

console.log(axiosConfig)

const login = payload => axios.post("api/v1/login", { user: payload }, axiosConfig);

const logout = () => axios.delete("api/v1/logout");



const signup = ({
  email,
  firstName: first_name,
  lastName: last_name,
  password,
  passwordConfirmation: password_confirmation,
}) =>
  axios.post("api/v1/users", {
    user: {
      email,
      first_name,
      last_name,
      password,
      password_confirmation,
    },
  }, axiosConfig);

const authenticationApi = {
  login,
  logout,
  signup,
};

export default authenticationApi;

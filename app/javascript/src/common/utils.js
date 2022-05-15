import axios from "axios";
import * as R from "ramda";
import { toast } from "react-toastify";


// ========General========
export const getCSFToken = () => document.querySelector('[name="csrf-token"]').getAttribute('content')

export const isPresent = R.pipe(R.either(R.isNil, R.isEmpty), R.not);

// ===================AXIOS====================

axios.defaults.baseURL = "/";

export const setAxiosAuthHeaders = (callback = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = getFromLocalStorage("authToken");
  const email = getFromLocalStorage("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
  callback(true);
};

export const resetAxiosAuthTokens = () => {
  delete axios.defaults.headers["X-Auth-Email"];
  delete axios.defaults.headers["X-Auth-Token"];
};

export const registerAxiosIntercepts = (userAuthDispatch) => {
  axios.interceptors.response.use(handleSuccessResponse, (error) => handleErrorResponse(error, userAuthDispatch))
}

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      toast.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = (error, userAuthDispatch) => {
  if (error.response?.status === 401) {
    userAuthDispatch({ type: "LOGOUT" });
    toast.error(error.response?.data?.error);
  } else {
    toast.error(error.response?.data?.error || error.message);
  }
}

// ==================LocalStorage=================
export const setToLocalStorage = (key, value = null) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.removeItem(key);
};

export const getFromLocalStorage = key => {
  const value = localStorage.getItem(key);
  const response = value ? JSON.parse(value) : "";

  return response;
};

export const clearAuthLocalStorage= () => {
  setToLocalStorage("authEmail");
  setToLocalStorage("authToken");
};



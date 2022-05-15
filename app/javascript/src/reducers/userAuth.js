import { resetAxiosAuthTokens, setAxiosAuthHeaders, setToLocalStorage } from "../common/utils";

const userAuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN": {
      setToLocalStorage ("authToken", payload.auth_token);
      setToLocalStorage("authEmail", payload.email);
      setAxiosAuthHeaders
      return {
        isLoggedIn: true,
        user: payload.user,
        authToken: payload.auth_token,
        authEmail: payload.email,
      };
    }
    case "LOGOUT": {
      setToLocalStorage("authToken", null);
      setToLocalStorage("authEmail", null);
      resetAxiosAuthTokens();
      return { isLoggedIn: false, authToken: null, authEmail: null, user: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default userAuthReducer;

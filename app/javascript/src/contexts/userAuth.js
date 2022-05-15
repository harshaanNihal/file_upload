import React from "react";

import userAuthReducer from "../reducers/userAuth";
import { getFromLocalStorage } from "../common/utils";

const UserAuthStateContext = React.createContext();
const UserAuthDispatchContext = React.createContext();

const token = getFromLocalStorage("authToken");
const email = getFromLocalStorage("authEmail");
const initialState = {
  isLoggedIn: !!token,
  authToken: token || null,
  authEmail: email || null,
  user: null,
};

export const UserAuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userAuthReducer, initialState);
  return (
    <UserAuthStateContext.Provider value={state}>
      <UserAuthDispatchContext.Provider value={dispatch}>
        {children}
      </UserAuthDispatchContext.Provider>
    </UserAuthStateContext.Provider>
  );
};

export const useUserAuthState = () => {
  const context = React.useContext(UserAuthStateContext);
  if (context === undefined) {
    throw new Error("useUserAuthState must be used within a UserAuthProvider");
  }

  return context;
};

export const useUserAuthDispatch = () => {
  const context = React.useContext(UserAuthDispatchContext);
  if (context === undefined) {
    throw new Error("useUserAuthDispatch must be used within a UserAuthProvider");
  }

  return context;
};

export const useUserAuth = () => [useUserAuthState(), useUserAuthDispatch()];


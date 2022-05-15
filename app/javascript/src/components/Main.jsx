import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { PageLoader } from "@bigbinary/neetoui";
import Dashboard from "./Dashboard";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import PrivateRoute from "./common/PrivateRoute";

import { useUserAuth } from "../contexts/userAuth";
import { isPresent, getFromLocalStorage, registerAxiosIntercepts, clearAuthLocalStorage, setAxiosAuthHeaders } from "../common/utils";

const Main = props => {
  const [loading, setLoading] = useState(true);
  const [{ user: userFromContext, authToken }, userAuthDispatch] = useUserAuth();
  const [state] = useUserAuth();
  const currentUser = userFromContext || props?.user;
  const isLoggedIn = isPresent(authToken) && isPresent(currentUser);

  useEffect(() => {
    userAuthDispatch({ type: "SET_USER", payload: { user: props?.user } });
    registerAxiosIntercepts(userAuthDispatch);
    setAxiosAuthHeaders(() =>setLoading(false));
  }, [userAuthDispatch, props?.user]);

  useEffect(() => {
    const previousLoginAuthEmail = getFromLocalStorage("authEmail");
    const hasDeviseUserSessionExpired = !props?.user;
    const sessionExpiredButLocalStorageCredsExist =
      hasDeviseUserSessionExpired && previousLoginAuthEmail;

    if (sessionExpiredButLocalStorageCredsExist) clearAuthLocalStorage();
  }, [props?.user?.email]);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader text="EkAnek"/>
      </div>
    );
  }

  console.log("Main", userFromContext, authToken, isLoggedIn, state);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        {["/", "/dashboard"].map(path =>(
          <PrivateRoute key={path} path={path} redirectRoute='/login' condition={isLoggedIn} component={Dashboard}/>
        ))}
      </Switch>
      <ToastContainer theme="dark"/>
    </BrowserRouter>
  );
};

export default Main;

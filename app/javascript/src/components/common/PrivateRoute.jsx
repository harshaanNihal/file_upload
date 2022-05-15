import React from "react";

import { Route, Navigate } from "react-router-dom";
import { isPresent } from "../../common/utils";
import { useUserAuth } from "../../contexts/userAuth";

const PrivateRoute = ({
  children,
  redirectRoute,
  ...props
}) => {
  const [{user, authToken}, userAuthDispatch] = useUserAuth();
  const isLoggedIn = isPresent(user) && isPresent(authToken)


  return isLoggedIn ? children : <Navigate to='/login' />
};

export default PrivateRoute;

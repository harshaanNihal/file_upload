import React from "react";

import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  children,
  condition,
  redirectRoute,
}) => {
  if (!condition) {
    return (
      <Navigate
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return children
};

PrivateRoute.propTypes = {
  children: PropTypes.func,
  condition: PropTypes.bool,
  location: PropTypes.object,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
};

export default PrivateRoute;

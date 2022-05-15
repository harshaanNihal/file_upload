import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import PrivateRoute from "./common/PrivateRoute";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import { useUserAuth } from "../contexts/userAuth";
import { isPresent } from "../common/utils";

const Main = props => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        {["/", "/dashboard"].map(path =><Route key={path} path={path} element={
        <PrivateRoute >
        <div>dashboard</div>
        </PrivateRoute>
        } />)}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Main;

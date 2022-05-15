import React, { useEffect, useState } from "react";


import { Route, Routes, BrowserRouter } from "react-router-dom";

import PrivateRoute from "./common/PrivateRoute";
import Signup from "./Authentication/Signup";

const Main = props => {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Signup />} /> */}
        <div>xyz</div>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;

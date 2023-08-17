import React, { Component } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuth } from "./helper";




const PrivateWrapper = ({ auth: { isAuth } }) => {
    return isAuth ? <Outlet /> : <Navigate to="/signin" />;
  };
export default PrivateWrapper;
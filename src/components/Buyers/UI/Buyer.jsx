import React, { useState, useContext } from "react";
import Layout from "./Layout";
import Login from "../Login/Login";
import UserSignup from "../SignUp/UserSignup";
import CompanySignup from "../SignUp/CompanySignup";
import { useRouteMatch } from "react-router-dom";
import { AuthContext } from "../../../components/store/auth";
import { Redirect } from "react-router-dom";
const Buyer = () => {
  // const token = localStorage.getItem("token");
  const { token } = useContext(AuthContext);

  const { path } = useRouteMatch();
  console.log(path);
  console.log(token);
  const [status, setStatus] = useState(true);
  const handleStatus = (label) => {
    label === "Login" ? setStatus(true) : setStatus(false);
  };
  return (
    <>
      <Layout status={status} handleStatus={handleStatus} />
      {status ? (
        token.length <= 0 ? (
          <Login />
        ) : (
          <Redirect to="/seller/Home" />
        )
      ) : path === "/Seller" ? (
        <CompanySignup />
      ) : (
        <UserSignup />
      )}
    </>
  );
};

export default Buyer;

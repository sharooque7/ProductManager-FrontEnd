import React from "react";

import Login from "./Login";

import { useSelector } from "react-redux";

const Main = () => {
  const showPage = useSelector((state) => state.auth.showStatus);

  return <>{!showPage ? <Login /> : <div>Signup</div>}</>;
};
export default Main;

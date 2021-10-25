import React from "react";
import style from "./Navbar.module.css";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/Redux/AuthConsumer";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleShowStatus = (status) => {
    dispatch(authActions.handleShowStatus(status));
  };
  return (
    <div className={style.nav__container}>
      <h1 className={style.nav__header}>Zaberi</h1>
      <div className={style.nav__link}>
        <a
          onClick={() => {
            handleShowStatus("Login");
          }}
          className={style.link__style}
          to="/login"
        >
          Login
        </a>
        <a className={style.link__style} to="/login">
          Signout
        </a>
      </div>
    </div>
  );
};

export default Navbar;

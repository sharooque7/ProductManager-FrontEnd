import React from "react";
import style from "./Login.module.css";
import { authActions } from "../../store/Redux/AuthConsumer";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(authActions.handleShowStatus());
  };
  return (
    <div className={style.Login__conatiner}>
      <form className={style.Login__conatiner}>
        {" "}
        <input
          className={style.Login__email}
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
        />
        <input
          className={style.Login__email}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button onClick={handleChange} className={style.button}>
          Login
        </button>
        <button onClick={handleChange} className={style.button}>
          Signup
        </button>
        <span>or</span>
        <button className={style.button}>Sign in with Google</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { styled } from "@mui/material/";
import { Container, Grid, Typography } from "@mui/material/";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../../TextField/TextField";
import Button from "../../Button/Button__Form";
import axios from "axios";
import { AuthContext } from "../../store/auth";
import { Redirect } from "react-router-dom";

const useStyles = styled((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));
const INTITIAL_FOMR_STATE = {
  email: "",
  password: "",
};
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});
const Login = () => {
  // const token = localStorage.getItem("token");
  const { setToken, setuserId } = useContext(AuthContext);
  const [sellerRedirect, setsellerRedirect] = useState(false);

  const classes = useStyles();

  const handleSubmit = (fiedls) => {
    const result = axios.post("http://localhost:4000/seller/Login", {
      ...fiedls,
    });
    result
      .then((res) => {
        console.log(res);

        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error");
          throw new Error("Could not authenticate you");
        }
        return res;
      })
      .then((resData) => {
        ////Auth Not fully completed
        console.log(resData["data"].token);
        setToken(resData["data"].token);
        setuserId(resData["data"].userId);
        localStorage.setItem("token", resData["data"].token);
        localStorage.setItem("userId", resData["data"].userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setsellerRedirect(true);
        ///Auto Logout
      })
      .catch((err) => console.log("err", err));
    console.log(fiedls);
  };
  if (sellerRedirect) {
    return <Redirect to="/seller/Home" />;
  }
  return (
    <Grid container>
      <Grid xs={4}></Grid>
      <Grid item xs={4}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{ ...INTITIAL_FOMR_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form>
                <Grid item xs={12} p={2}>
                  <Typography>Please Login.....</Typography>
                </Grid>
                <Grid item xs={12} p={2}>
                  <Textfield name="email" type="email" label="Email" />
                </Grid>
                <Grid item xs={12} p={2}>
                  <Textfield name="password" type="password" label="Password" />
                </Grid>
                <Grid xs={12} p={2}>
                  <Button label="sign in">Login</Button>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
      <Grid xs={4}></Grid>
    </Grid>
  );
};

export default Login;

import React, { useState } from "react";
import { styled } from "@mui/material/";
import { Container, Grid, Typography } from "@mui/material/";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../../TextField/TextField";
import Button from "../../Button/Button__Form";
import axios from "axios";
import style from "styled-components";

const Title = style.div`
margin:auto;
margin-top: 25px;
padding:5px;
font-size: 1.2em;
text-align: center;
color: black;
font-weight:bold;
width: 220px;
height: 30px;
background: green;

`;

const useStyles = styled((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));
const INTITIAL_FOMR_STATE = {
  companyName: "",
  companyLocation: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const FORM_VALIDATION = Yup.object().shape({
  companyName: Yup.string().required("FirstName Please"),
  companyLocation: Yup.string().required("LastName Please"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});
const Signup = () => {
  const [Loading, setLoading] = useState(false);

  const classes = useStyles();

  const handleSubmit = (fields) => {
    const result = axios.put("http://localhost:4000/seller/signup", {
      ...fields,
    });
    result
      .then((res) => {
        if (res.status === 201) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 800);
        }
      })
      .catch((err) => console.log(err));

    console.log(fields);
  };

  return (
    <>
      {Loading && <Title>Creation succeded</Title>}

      <Grid container>
        <Grid xs={4}></Grid>
        <Grid item xs={4}>
          <Container maxWidth="md">
            <div className={classes.formWrapper}>
              <Formik
                initialValues={{ ...INTITIAL_FOMR_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(values);
                  resetForm();
                }}
              >
                <Form>
                  <Grid item xs={12} p={2}>
                    {Loading && <Typography>Please Login.....</Typography>}
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <Textfield
                      name="companyName"
                      type="text"
                      label="Company Name"
                    />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <Textfield
                      name="companyLocation"
                      type="text"
                      label="Company Location"
                    />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <Textfield name="email" type="email" label="Email" />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <Textfield
                      name="password"
                      type="password"
                      label="Password"
                    />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <Textfield
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                    />
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
    </>
  );
};

export default Signup;

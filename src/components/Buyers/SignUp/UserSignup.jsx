import * as React from "react";
import { styled } from "@mui/material/";
import { Container, Grid, Typography } from "@mui/material/";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../../TextField/TextField";
import Button from "../../Button/Button__Form";

const useStyles = styled((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));
const INTITIAL_FOMR_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
};
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("FirstName Please"),
  lastName: Yup.string().required("LastName Please"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});
const Signup = () => {
  const classes = useStyles();

  const handleSubmit = (fiedls) => {
    // const result = axios.post(
    //   "https://611fba57988f860017ac43d0.mockapi.io/App/success/data",
    //   {
    //     body: { ...fiels },
    //   }
    // );
    // result
    //   .then((res) => {
    //     console.log(res.data.body);
    //     alert("The submit will hit mock api.Result can be viewed on console");
    //   })
    //   .catch((err) => console.log("err"));
    console.log(fiedls);
  };

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
                  <Textfield name="firstName" type="text" label="FirstName" />
                </Grid>
                <Grid item xs={12} p={2}>
                  <Textfield name="lastName" type="text" label="LastName" />
                </Grid>
                <Grid item xs={12} p={2}>
                  <Textfield name="email" type="email" label="Email" />
                </Grid>
                <Grid item xs={12} p={2}>
                  <Textfield name="password" type="password" label="Password" />
                </Grid>
                <Grid item xs={12} p={2}>
                  <Textfield
                    name="confirmpassword"
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
  );
};

export default Signup;

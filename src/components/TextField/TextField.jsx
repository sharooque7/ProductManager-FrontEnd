import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);

  // const handleChange = async (e) => {
  //   // //console.log(e.target.files[0]);
  //   // //await console.log(e.target.files[0]);
  //   // const { setValue } = helpers;
  //   // if (e.target.files !== null) {
  //   //   await setValue(e.target.files[0]);
  //   // } else {
  //   //   setValue(e.target.value);
  //   // }
  //   // console.log(field);
  // };

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    width: "100px",
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;

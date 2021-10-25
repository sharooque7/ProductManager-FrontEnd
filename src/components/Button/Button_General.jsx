import React from "react";
import Button from "@mui/material/Button";

const Button_General = (props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      fullWidth={props.label === "cancel" ? true : false}
      onClick={() => {
        props.handleStatus(props.label);
      }}
    >
      {props.label}
    </Button>
  );
};

export default Button_General;

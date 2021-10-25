import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Layout.module.css";
import ButtonGeneral from "../../Button/Button_General";

export default function Layout(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="transparent">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div className={styles.ma}>
            <Typography variant="h6" color="inherit" component="div">
              Zaberi
            </Typography>
            <div className={styles.ma__div}>
              <Typography variant="h6" color="inherit" component="div">
                <ButtonGeneral
                  label="Login"
                  handleStatus={props.handleStatus}
                  paths="Login"
                />
              </Typography>
              <Typography variant="h6" color="inherit" component="div">
                <ButtonGeneral
                  label="Sign Up"
                  handleStatus={props.handleStatus}
                  paths="signup"
                />
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

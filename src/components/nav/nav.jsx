import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../store/auth";
import { NavLink } from "react-router-dom";

export default function ButtonAppBar(props) {
  const { logoutHandler } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {props.productStatus ? (
            <Button color="inherit">
              <NavLink
                to="/seller/Home"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Product
              </NavLink>
            </Button>
          ) : (
            ""
          )}
          <Button onClick={logoutHandler} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

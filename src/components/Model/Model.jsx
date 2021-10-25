import React, { useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import ProductForm from "../Buyers/Forms/ProductForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalItem = (props) =>
  ReactDOM.createPortal(
    <div className="modal">
      <Button onClick={props.handleOpen}>Open modal</Button>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProductForm
            loadProduct={props.loadProduct}
            state={props.state}
            Edit={props.Edit}
            setisEdit={props.setisEdit}
            setValue={props.setValue}
          />
        </Box>
      </Modal>
    </div>,
    document.getElementById("modal")
  );
export default ModalItem;

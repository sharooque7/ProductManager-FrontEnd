import React, { useContext } from "react";
import { styled } from "@mui/material";
import { Container, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../../TextField/TextField";
import Button from "../../Button/Button__Form";
import Button_Gen from "../../Button/Button_General";
import axios from "axios";
import { AuthContext } from "../../store/auth";

const FORM_VALIDATION = Yup.object().shape({
  productName: Yup.string().required("Please specify a name for your product"),
  price: Yup.string().required("Please is required"),
  productImage: Yup.mixed().required("Please upload a image for the product"),
  productDescription: Yup.string().required(
    "Please provide description for your product"
  ),
});

const ProductForm = (props) => {
  const { EditState, onhandleClose, isEdit } = useContext(AuthContext);

  console.log(isEdit);
  console.log(EditState.id);

  const INTITIAL_FORM_STATE = {
    productName: EditState.title,
    price: EditState.price,
    productImage: EditState.image,
    productDescription: EditState.content,
  };

  const token = localStorage.getItem("token");

  const handleSubmit = (fields) => {
    console.log(fields);
    console.log(fields.productImage);
    const formData = new FormData();
    formData.append("productName", fields.productName);

    formData.append("productImage", fields.productImage);
    formData.append("productDescription", fields.productDescription);
    formData.append("price", fields.price);
    console.log(fields);

    for (var value of formData.values()) {
      console.log(value);
    }
    let method = "POST";
    let url = "https://productmanger.herokuapp.com/feed/post";
    if (props.Edit) {
      url = "https://productmanger.herokuapp.com/feed/post/" + EditState.id;
      method = "PUT";
    }
    axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => console.log(err));
    props.setisEdit(false);
    onhandleClose();
    props.loadProduct();
  };
  return (
    <Grid container>
      <Grid xs={2}></Grid>
      <Grid item xs={8}>
        <Container maxWidth="lg">
          <div>
            <Formik
              initialValues={{ ...INTITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              enableReinitialize={true}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
              render={({ setFieldValue, handleChange, values }) => (
                <Form enctype="multipart/form-data">
                  <Grid item xs={12} p={2}>
                    <Typography pl={14}>Please fill the details</Typography>
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <Textfield
                      name="productName"
                      type="text"
                      label="Product Name"
                      value={values.productName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    {/* <Textfield name="productImage" type="file" /> */}
                    <input
                      id="productImage"
                      name="productImage"
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          "productImage",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <Textfield
                      name="price"
                      type="text"
                      label="Price"
                      value={values.price}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <Textfield
                      name="productDescription"
                      type="text"
                      label="Product Description"
                      value={values.productDescription}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid container>
                    <Grid item xs={6} p={2}>
                      <Button label="send">Send</Button>
                    </Grid>
                    <Grid item xs={6} p={2}>
                      <Button_Gen handleStatus={onhandleClose} label="cancel">
                        Cancel
                      </Button_Gen>
                    </Grid>
                  </Grid>
                </Form>
              )}
            />
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ProductForm;

import { createSlice, createStore } from "@reduxjs/toolkit";

const intialState = {
    token:'',
    userId:'',
    isAuth

};

const counterSlice = createSlice({
  name: "Auth",
  intialState: intialState,
  reducers :{

  }
});

export const 
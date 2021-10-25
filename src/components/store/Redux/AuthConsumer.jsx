import { createSlice } from "@reduxjs/toolkit";

const intialAuthState = {
  isAuth: false,
  showStatus: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: intialAuthState,
  reducers: {
    handleShowStatus(state) {
      state.showStatus = !state.showStatus;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

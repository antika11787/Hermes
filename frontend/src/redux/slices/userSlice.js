import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLogin: (state, action) => {
      console.log("payload", action.payload.email);
      state.email = action.payload.email;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
    },
    removeLogin: (state) => {
      state.email = "";
      state.token = "";

      localStorage.removeItem("token");
    },
  },
});

export const { saveLogin, removeLogin } = userSlice.actions;

export default userSlice.reducer;

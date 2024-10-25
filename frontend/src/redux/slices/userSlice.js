import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  userID: "",
  imageUrl: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLogin: (state, action) => {
      state.email = action.payload.email;
      state.userID = action.payload.userID;
      state.imageUrl = action.payload.imageUrl;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
    },
    removeLogin: (state) => {
      state.email = "";
      state.userID = "";
      state.imageUrl = "";
      state.token = "";

      localStorage.removeItem("token");
    },
  },
});

export const { saveLogin, removeLogin } = userSlice.actions;

export default userSlice.reducer;

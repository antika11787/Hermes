import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: true,
};

const commonDataSlice = createSlice({
  name: "commonData",
  initialState,
  reducers: {
    saveLoginPageState: (state, action) => {
      const { isLogin } = action.payload;
      return {
        ...state,
        isLogin: isLogin,
      };
    },
  },
});

export const { saveLoginPageState } = commonDataSlice.actions;

export default commonDataSlice.reducer;

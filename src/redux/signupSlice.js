import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    provider: "",
    otp: "",
    token: "",
    googletoken:"",
  },
};

export const signupSlice = createSlice({
  name: "signup",
  initialState: { ...initialState },
  reducers: {
    setsignupState: (state, payload = true) => {
        
      state.data = payload.payload;
    },
    resetsignupState: (state) => {
        state.data = {...initialState.data};
    },
},
});

// Action creators are generated for each case reducer function
export const { setsignupState, resetsignupState } = signupSlice.actions;

export default signupSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {
        token : "",
    },
};

export const loginSlice = createSlice({
    name : "login",
    initialState : {...initialState},
    reducers: {
        setloginState : (state , payload = true) => {
            state.data.token = payload.payload;
        },
        resetloginState : (state) =>{
            state.data = {...initialState.data};
        },
    },
});

export const { setloginState, resetloginState } = loginSlice.actions;
export default loginSlice.reducer;

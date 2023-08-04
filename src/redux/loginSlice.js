import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {
        token : "",
    },
};

export const loginSlice = createSlice({
    name : "loin",
    initialState : {...initialState},
    reducers: {
        setloginState : (state , payload = true) => {
            state.data = payload.payload;
        },
        resertloginState : (state) =>{
            state.data = {...initialState.data};
        },
    },
});

export const { setloginState, resetloginpState } = loginSlice.actions;
export default loginSlice.reducer;

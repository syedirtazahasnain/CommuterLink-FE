import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {
        option0 : "",
        option1 : "",
    },
};

export const generalSlice = createSlice({
    name : "general",
    initialState : {...initialState},
    reducers: {
        setOption0State : (state , payload = true) => {
            state.data.option0 = payload.payload;
        },
        setOption1State : (state , payload = true) => {
            state.data.option1 = payload.payload;
        },
    },
});

export const { setOption0State, setOption1State } = generalSlice.actions;
export default generalSlice.reducer;

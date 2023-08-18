import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {
        option0 : "",
        option1 : "",
    },
};

export const generalSlice = createSlice({
    name : "general",
    initialState : {
      ...initialState,
      sidebarOpened: false,
      currentPage: '',
    },
    reducers: {
        
        setOption0State : (state , payload = true) => {
            state.data.option0 = payload.payload;
        },
        
        setOption1State : (state , payload = true) => {
            state.data.option1 = payload.payload;
        },

        setSidebarState: (state, payload = false) => {
          state.sidebarOpened = payload.payload;
        },
      
        setCurrentPage: (state, payload) => {
          state.currentPage = payload.payload;
        },
    },
});

export const { setOption0State, setOption1State, setSidebarState, setCurrentPage  } = generalSlice.actions;
export default generalSlice.reducer;

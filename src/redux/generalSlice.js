import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    id: "",
    name: "",
    contact_id: "",
    request_as: "",
    amount: null,
    selectedOption: "",
  },
};

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    ...initialState,
    sidebarOpened: false,
    currentPage: '',
  },
  reducers: {

    setIdState: (state, payload = true) => {
      state.data.id = payload.payload;
    },

    setNameState: (state, payload = true) => {
      state.data.name = payload.payload;
    },

    setContactIdState: (state, payload = true) => {
      state.data.contact_id = payload.payload;
    },
    setAmountState: (state, payload = true) => {
      state.data.amount = payload.payload;
    },

    setSelectedOptionState: (state, payload = true) => {
      state.data.selectedOption = payload.payload;
    },

    setRequestAsState: (state, payload = true) => {
      state.data.request_as = payload.payload;
    },

    setSidebarState: (state, payload = false) => {
      state.sidebarOpened = payload.payload;
    },

    setCurrentPage: (state, payload) => {
      state.currentPage = payload.payload;
    },
  },
});

export const { setIdState, setNameState, setContactIdState, setAmountState, setSelectedOptionState, setRequestAsState, setSidebarState, setCurrentPage } = generalSlice.actions;
export default generalSlice.reducer;

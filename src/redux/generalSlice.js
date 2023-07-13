import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    sidebarOpened: false,
    siteLanguage: '3',
    currentPage: '',
    headerTheme: 'white',
  },
  reducers: {
    setSidebarState: (state, payload = false) => {
      state.sidebarOpened = payload.payload;
    },
    setSiteLanguage: (state, payload) => {
      state.siteLanguage = payload.payload;
    },
    setCurrentPage: (state, payload) => {
      state.currentPage = payload.payload;
    },
    setHeaderTheme: (state, payload) => {
      state.headerTheme = payload.payload ? payload.payload : 'white';
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSidebarState, setCurrentPage, setHeaderTheme, setSiteLanguage } = generalSlice.actions

export default generalSlice.reducer
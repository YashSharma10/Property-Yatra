import { createSlice } from "@reduxjs/toolkit";

const globalEventSlice = createSlice({
  name: "globalEvent",
  initialState: {
    isVisible: false,
    filters: {
      type: "",
      price: '',
      features: [],
      furnished: "",
      bedrooms: "",
      ownership: "",
      builtYear: "",
    },
  },
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {...state.filters, ...action.payload};
    },
  },
});
export const { setIsVisible, setFilters } = globalEventSlice.actions;
export default globalEventSlice.reducer;

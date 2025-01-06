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
    roadmapVisible:true,
  },
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    setRoadmapVisible:(state, action) => {
      state.roadmapVisible = action.payload;
    }, 
    setFilters: (state, action) => {
      state.filters = {...state.filters, ...action.payload};
    },
  },
});
export const { setIsVisible, setFilters ,setRoadmapVisible} = globalEventSlice.actions;
export default globalEventSlice.reducer;

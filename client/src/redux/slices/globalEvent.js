import { createSlice } from "@reduxjs/toolkit";

const globalEventSlice = createSlice({
  name: "globalEvent",
  initialState: {
    isVisible: false,
    filters: {
      type: "",
      price: "",
      features: [],
      furnished: "",
      bedrooms: "",
      ownership: "",
      builtYear: "",
    },
    roadmapVisible: true,
    propertyDetails: {
      listingType: "",
      propertyType: "",
    },
  },
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    setRoadmapVisible: (state, action) => {
      state.roadmapVisible = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPropertyDetails: (state, action) => {
      state.propertyDetails = { ...state.propertyDetails, ...action.payload };
    } 
  },
});
export const { setIsVisible, setFilters, setRoadmapVisible,setPropertyDetails } =
  globalEventSlice.actions;
export default globalEventSlice.reducer;

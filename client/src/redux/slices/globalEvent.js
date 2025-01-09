import { createSlice } from "@reduxjs/toolkit";

const globalEventSlice = createSlice({
  name: "globalEvent",
  initialState: {
    isVisible: false,
    filters: {
      sellPrice: "",
      rentPrice: "",
      features: {
        parking: false,
        water: false,
        electricity: false,
        swimmingPool: false,
        modularKitchen: false,
        balcony: false,
        park: false,
        furnished: false,
        meetingRoom: false,
        meal: false,
        ac: false,
        wifi: false,
        boundaryWall: false,
        gym: false,
      },
      propertyAge:"",
      area: "",
      searchLocation: "",
      listingType: "sell",
      propertyType: "residential",
    },
    roadmapVisible: true,
    propertyDetails: {
      listingType: "sell",
      propertyType: "residential",
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
    },
  },
});
export const {
  setIsVisible,
  setFilters,
  setRoadmapVisible,
  setPropertyDetails,
} = globalEventSlice.actions;
export default globalEventSlice.reducer;

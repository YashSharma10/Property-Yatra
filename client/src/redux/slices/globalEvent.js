import { createSlice } from "@reduxjs/toolkit";

const globalEventSlice = createSlice({
  name: "globalEvent",
  initialState: {
    isVisible: false,
    searchValue: "",
  },
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});
export const { setIsVisible, setSearchValue } = globalEventSlice.actions;
export default globalEventSlice.reducer;

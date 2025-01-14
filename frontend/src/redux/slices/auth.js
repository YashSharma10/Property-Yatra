import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    token: JSON.parse(sessionStorage.getItem("token")) || null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setLoading, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;

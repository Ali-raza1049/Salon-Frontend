import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/api.js";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  message: "",
};

// 🔹 Signup (unchanged)
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/auth/signup", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔹 Login (unchanged)
export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", formData, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔹 Frontend-only Logout (no backend call)
export const logout = createAsyncThunk("auth/logout", async () => {
  // No API call needed
  return true; // just return anything
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Frontend-only Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null; // ✅ clear user from Redux
      });
  },
});

export default authSlice.reducer;
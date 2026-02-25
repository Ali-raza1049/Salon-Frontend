// src/redux/slice/TeamSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/api";

export const fetchStaff = createAsyncThunk(
  "team/fetchStaff",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/staff");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching staff"
      );
    }
  }
);


export const createStaff = createAsyncThunk(
  "team/createStaff",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/staff", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding staff"
      );
    }
  }
);


export const updateStaff = createAsyncThunk(
  "team/updateStaff",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/staff/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating staff"
      );
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "team/deleteStaff",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/staff/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting staff"
      );
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    staff: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff.unshift(action.payload);
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.staff.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.staff[index] = action.payload;
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = state.staff.filter(
          (s) => s._id !== action.payload
        );
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
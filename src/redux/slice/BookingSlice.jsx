// src/redux/slice/BookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/api";


// Create a new booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await API.post("/bookings", bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error creating booking");
    }
  }
);

// Fetch all bookings
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/bookings");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching bookings");
    }
  }
);

// Update booking status
export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/bookings/${id}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating booking status");
    }
  }
);

// Delete booking
export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/bookings/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting booking");
    }
  }
);

// -------------------- SLICE --------------------
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.bookings[index] = action.payload;
      })

      // DELETE
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;
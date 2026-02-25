import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/api"; // adjust path if needed

// 🔹 GET Services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/services");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching services"
      );
    }
  }
);

// 🔹 CREATE Service
export const createService = createAsyncThunk(
  "services/createService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await API.post("/services", serviceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating service"
      );
    }
  }
);

// 🔹 UPDATE Service
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating service"
      );
    }
  }
);

// 🔹 DELETE Service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/services/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting service"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createService.fulfilled, (state, action) => {
        state.services.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(
          (service) => service._id === action.payload._id
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (service) => service._id !== action.payload
        );
      });
  },
});

export default serviceSlice.reducer;

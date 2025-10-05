import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockTours } from "../../utils/mockTour";

// ======================================
// 🔹 Async Thunk for Fetching Tours
// ======================================
export const fetchTours = createAsyncThunk(
  "tours/fetchTours",
  async (_, { rejectWithValue }) => {
    try {
      const useMock = true; // 👉 set to false when switching to real API

      if (useMock) {
        // Simulate delay for better UX/loading state
        await new Promise((resolve) => setTimeout(resolve, 700));
        return mockTours;
      } else {
        const res = await axios.get("https://api.example.com/tours");
        return res.data;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch tours");
    }
  }
);

// ======================================
// 🔹 Slice Setup
// ======================================
const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tours: [],
    loading: false,
    error: null,
    selectedTour: null, // for detail page (optional)
  },
  reducers: {
    // 👇 local reducers (no API)
    selectTour: (state, action) => {
      state.selectedTour = action.payload;
    },
    clearSelectedTour: (state) => {
      state.selectedTour = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ======================================
// 🔹 Export Actions & Reducer
// ======================================
export const { selectTour, clearSelectedTour } = tourSlice.actions;
export default tourSlice.reducer;

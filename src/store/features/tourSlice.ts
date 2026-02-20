import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTours } from "@/app/api/tours/route";

interface Tour {
  id: number;
  title: string;
  slug: string;
  location: string;
  days: number;
  nights?: number;
  price: number;
  image?: string;
  gallery?: string[];
  shortDescription?: string;
  fullDescription?: string;
  highlights?: string[];
  itinerary?: any[];
  inclusions?: string[];
  exclusions?: string[];
  solo?: number;
  couple?: number;
  deluxe?: number;
}

interface TourState {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  selectedTours: Tour | null;
}

export const fetchTours = createAsyncThunk<Tour[]>("tours/fetchTours", async (_, { rejectWithValue }) => {
  try {
    const data = await getTours();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Failed to fetch tours");
  }
});

const initialState: TourState = {
  tours: [],
  loading: false,
  error: null,
  selectedTours: null,
};

const tourSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    selectedTours: (state, action: PayloadAction<Tour>) => {
      state.selectedTours = action.payload;
    },
    clearSelectedTour: (state) => {
      state.selectedTours = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTours.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTours.fulfilled, (state, action: PayloadAction<Tour[]>) => {
      state.loading = false;
      const list = Array.isArray(action.payload) ? action.payload : (action.payload as any)?.data ?? [];
      state.tours = list;
    });
    builder.addCase(fetchTours.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { selectedTours, clearSelectedTour } = tourSlice.actions;
export default tourSlice.reducer;

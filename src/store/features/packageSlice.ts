import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getPackages} from "@/app/api/package/route";
import { Package } from "@/type/package";

interface PackageState {
  packages: Package[];
  selectedPackage: Package | null;
  loading: boolean;
  error: string | null;
}

export const fetchPackages = createAsyncThunk<Package[]>(
  "packages/fetchPackages",
  async (_, { rejectWithValue }) => {
    try {
      return await getPackages();
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch packages");
    }
  }
);

// export const fetchPackageById = createAsyncThunk<Package, number>(
//   "packages/fetchPackageById",
//   async (id, { rejectWithValue }) => {
//     try {
//       return await getPackageById(id);
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data || "Failed to fetch package");
//     }
//   }
// );

const initialState: PackageState = {
  packages: [],
  selectedPackage: null,
  loading: false,
  error: null,
};

const packageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    clearSelectedPackage: (state) => {
      state.selectedPackage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action: PayloadAction<Package[]>) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // // Fetch single package
      // .addCase(fetchPackageById.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchPackageById.fulfilled, (state, action: PayloadAction<Package>) => {
      //   state.loading = false;
      //   state.selectedPackage = action.payload;
      // })
      // .addCase(fetchPackageById.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // });
  },
});

export const { clearSelectedPackage } = packageSlice.actions;
export default packageSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDeals, Deal, DealResponse } from "@/lib/api";

interface DealState {
  deals: Deal[];
  searchDeals: Deal[];
  totalPage: number;
  searchType: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: DealState = {
  deals: [],
  searchDeals: [],
  totalPage: 0,
  searchType: false,
  loading: false,
  error: null,
};

export const getDeals = createAsyncThunk(
  "deal/fetch",
  async (searchQuery: string | undefined, { rejectWithValue }) => {
    try {
      const data = await fetchDeals(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch deals"
      );
    }
  }
);

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    clearDealError: (state) => {
      state.error = null;
    },
    clearDealSearch: (state) => {
      state.searchDeals = [];
      state.searchType = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.searchType = action.payload.searchType;

        if (action.payload.searchType) {
          state.searchDeals = action.payload.searchDeal || [];
          state.deals = [];
        } else {
          state.deals = action.payload.dealFormat || [];
          state.totalPage = action.payload.totalPage || 0;
          state.searchDeals = [];
        }

        state.error = null;
      })
      .addCase(getDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDealError, clearDealSearch } = dealSlice.actions;
export default dealSlice.reducer;






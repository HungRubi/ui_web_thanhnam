import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories, CategoryResponse, Category } from "@/lib/api";

interface CategoryState {
  categories: Category[];
  searchCategories: Category[];
  totalPage: number;
  searchType: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  searchCategories: [],
  totalPage: 0,
  searchType: false,
  loading: false,
  error: null,
};

// Async thunk để fetch categories
export const getCategories = createAsyncThunk(
  "category/fetch",
  async (searchQuery: string | undefined, { rejectWithValue }) => {
    try {
      const data = await fetchCategories(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch categories"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearch: (state) => {
      state.searchCategories = [];
      state.searchType = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.searchType = action.payload.searchType;
        
        if (action.payload.searchType) {
          // Có search query
          state.searchCategories = action.payload.searchCategory || [];
          state.categories = [];
        } else {
          // Không có search query
          state.categories = action.payload.categoryFormat || [];
          state.totalPage = action.payload.totalPage || 0;
          state.searchCategories = [];
        }
        
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSearch } = categorySlice.actions;
export default categorySlice.reducer;


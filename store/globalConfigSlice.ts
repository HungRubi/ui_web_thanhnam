import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchGlobalConfig, GlobalConfig } from "@/lib/api";

interface GlobalConfigState {
  data: GlobalConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: GlobalConfigState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk để fetch global config
export const getGlobalConfig = createAsyncThunk(
  "globalConfig/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchGlobalConfig();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch global config"
      );
    }
  }
);

const globalConfigSlice = createSlice({
  name: "globalConfig",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setGlobalConfig: (state, action: PayloadAction<GlobalConfig>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGlobalConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getGlobalConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setGlobalConfig } = globalConfigSlice.actions;
export default globalConfigSlice.reducer;


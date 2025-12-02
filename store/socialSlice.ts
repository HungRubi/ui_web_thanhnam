import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SocialConfig, fetchSocialConfig } from "@/lib/api";

interface SocialState {
  social: SocialConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: SocialState = {
  social: null,
  loading: false,
  error: null,
};

export const getSocial = createAsyncThunk<SocialConfig, void, { rejectValue: string }>(
  "social/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSocialConfig();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch social config"
      );
    }
  }
);

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSocial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSocial.fulfilled, (state, action) => {
        state.loading = false;
        state.social = action.payload;
        state.error = null;
      })
      .addCase(getSocial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch social config";
      });
  },
});

export default socialSlice.reducer;

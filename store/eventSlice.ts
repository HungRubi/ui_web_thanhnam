import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event, EventResponse, EventDetail, fetchEventById, fetchEvents } from "@/lib/api";

interface EventState {
  events: Event[];
  searchEvents: Event[];
  currentEvent: EventDetail | null;
  searchType: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  searchEvents: [],
  currentEvent: null,
  searchType: false,
  loading: false,
  error: null,
};

export const getEvents = createAsyncThunk(
  "event/fetch",
  async (searchQuery?: string, { rejectWithValue }) => {
    try {
      const data = await fetchEvents(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch events"
      );
    }
  }
);

export const getEventById = createAsyncThunk<EventDetail, string, { rejectValue: string }>(
  "event/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await fetchEventById(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch event"
      );
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearEventError: (state) => {
      state.error = null;
    },
    clearEventSearch: (state) => {
      state.searchEvents = [];
      state.searchType = false;
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.searchType = action.payload.searchType;

        if (action.payload.searchType) {
          state.searchEvents = action.payload.searchEvent || [];
          state.events = [];
        } else {
          state.events = action.payload.eventFormat || [];
          state.searchEvents = [];
        }
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEventError, clearEventSearch, clearCurrentEvent } = eventSlice.actions;
export default eventSlice.reducer;






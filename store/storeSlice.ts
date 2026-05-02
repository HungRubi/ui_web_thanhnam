import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchStores, fetchStoreBySlug, StoreResponse, Store } from '@/lib/api';

interface StoreState {
	stores: Store[];
	searchStores: Store[];
	currentStore: Store | null;
	currentOffers: any[];
	totalPage: number;
	searchType: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: StoreState = {
	stores: [],
	searchStores: [],
	currentStore: null,
	currentOffers: [],
	totalPage: 0,
	searchType: false,
	loading: false,
	error: null,
};

// Async thunk để fetch stores
export const getStores = createAsyncThunk(
	'store/fetch',
	async (searchQuery: string | undefined, { rejectWithValue }) => {
		try {
			const data = await fetchStores(searchQuery);
			return data;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch stores');
		}
	}
);

// Async thunk để fetch store by slug
export const getStoreBySlug = createAsyncThunk('store/fetchBySlug', async (slug: string, { rejectWithValue }) => {
	try {
		const data = await fetchStoreBySlug(slug);
		return data;
	} catch (error) {
		return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch store');
	}
});

const storeSlice = createSlice({
	name: 'store',
	initialState,
	reducers: {
		clearError: state => {
			state.error = null;
		},
		clearSearch: state => {
			state.searchStores = [];
			state.searchType = false;
		},
		clearCurrentStore: state => {
			state.currentStore = null;
		},
	},
	extraReducers: builder => {
		builder
			// Get stores
			.addCase(getStores.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getStores.fulfilled, (state, action) => {
				state.loading = false;
				state.searchType = action.payload.searchType;

				if (action.payload.searchType) {
					// Có search query
					state.searchStores = action.payload.searchStore || [];
					state.stores = [];
				} else {
					// Không có search query
					state.stores = action.payload.storeFormat || [];
					state.totalPage = action.payload.totalPage || 0;
					state.searchStores = [];
				}

				state.error = null;
			})
			.addCase(getStores.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// Get store by slug
			.addCase(getStoreBySlug.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getStoreBySlug.fulfilled, (state, action) => {
				state.loading = false;
				// Backend may return { offers, store } or directly the store object
				const payload: any = action.payload;
				if (payload && (payload.offers || payload.store)) {
					state.currentOffers = payload.offers || [];
					state.currentStore = payload.store || null;
				} else {
					state.currentStore = payload as Store;
					state.currentOffers = [];
				}
				state.error = null;
			})
			.addCase(getStoreBySlug.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearError, clearSearch, clearCurrentStore } = storeSlice.actions;
export default storeSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchNews, fetchNewsById, NewsResponse, News } from '@/lib/api';

interface NewsState {
	news: News[];
	searchNews: News[];
	currentNews: News | null;
	totalPage: number;
	searchType: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: NewsState = {
	news: [],
	searchNews: [],
	currentNews: null,
	totalPage: 0,
	searchType: false,
	loading: false,
	error: null,
};

// Async thunk để fetch news
export const getNews = createAsyncThunk('news/fetch', async (searchQuery: string | undefined, { rejectWithValue }) => {
	try {
		const data = await fetchNews(searchQuery);
		return data;
	} catch (error) {
		return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch news');
	}
});

// Async thunk để fetch news by id
export const getNewsById = createAsyncThunk('news/fetchById', async (id: string, { rejectWithValue }) => {
	try {
		const data = await fetchNewsById(id);
		return data;
	} catch (error) {
		return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch news');
	}
});

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		clearError: state => {
			state.error = null;
		},
		clearSearch: state => {
			state.searchNews = [];
			state.searchType = false;
		},
		clearCurrentNews: state => {
			state.currentNews = null;
		},
	},
	extraReducers: builder => {
		builder
			// Get news
			.addCase(getNews.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getNews.fulfilled, (state, action) => {
				state.loading = false;
				state.searchType = action.payload.searchType;

				if (action.payload.searchType) {
					// Có search query
					state.searchNews = action.payload.searchNew || [];
					state.news = [];
				} else {
					// Không có search query
					state.news = action.payload.newFormat || [];
					state.totalPage = action.payload.totalPage || 0;
					state.searchNews = [];
				}

				state.error = null;
			})
			.addCase(getNews.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// Get news by id
			.addCase(getNewsById.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getNewsById.fulfilled, (state, action) => {
				state.loading = false;
				state.currentNews = action.payload;
				state.error = null;
			})
			.addCase(getNewsById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearError, clearSearch, clearCurrentNews } = newsSlice.actions;
export default newsSlice.reducer;

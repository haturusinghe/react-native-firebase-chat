import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_ROUTES, PAGE_SIZE} from '../../constants';
import http from '../../services/http';

export interface News {
  _id: string;
  title: string;
  description: string;
  creator: string;
  image?: string;
  attachments?: string[];
  createdAt: string;
}

export interface NewsState {
  data: News[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  hasError?: boolean;
  searchTerm?: string;
}

const initialState: NewsState = {
  data: [],
  loading: true,
  currentPage: 0,
  totalPages: 10,
  hasError: false,
  searchTerm: '',
};

export const fetchNews = createAsyncThunk(
  'pagination/fetchPageData',
  async (_, {getState}: any) => {
    try {
      const {news} = getState();
      if (news.totalPages > news.currentPage) {
        const res = await http.get<any>(
          `${API_ROUTES.NEWS.GET_ALL}?page=${
            news.currentPage + 1
          }&pageSize=${PAGE_SIZE}&searchTerm=${news.searchTerm}`,
        );
        return {news: res.data.data, totalPages: res.data.totalPages};
      } else {
        return {news: [], totalPages: news.totalPages};
      }
    } catch (err) {
      return {news: [], totalPages: 0};
    }
  },
);

export const reloadNews = createAsyncThunk(
  'pagination/reloadNews',
  async (searchTerm: string, {getState}: any) => {
    try {
      const res = await http.get<any>(
        `${
          API_ROUTES.NEWS.GET_ALL
        }?page=${1}&pageSize=${PAGE_SIZE}&searchTerm=${searchTerm}`,
      );
      return {news: res.data.data, totalPages: res.data.totalPages, searchTerm};
    } catch (err) {
      return {news: [], totalPages: 0};
    }
  },
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state: NewsState, action: PayloadAction<News[]>): void => {
      state.data = action.payload;
    },
    setSearchTermAction: (
      state: NewsState,
      action: PayloadAction<string>,
    ): void => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<{news: News[]; totalPages: number}>) => {
          state.loading = false;
          state.data = [...state.data, ...action.payload.news];
          state.currentPage = state.currentPage + 1;
          state.totalPages = action.payload.totalPages;
        },
      )
      .addCase(fetchNews.rejected, state => {
        state.loading = false;
      })
      .addCase(reloadNews.pending, state => {
        state.loading = true;
        state.data = [];
      })
      .addCase(
        reloadNews.fulfilled,
        (
          state,
          action: PayloadAction<{
            news: News[];
            totalPages: number;
            searchTerm?: string;
          }>,
        ) => {
          state.loading = false;
          state.data = action.payload.news;
          state.currentPage = 1;
          state.totalPages = action.payload.totalPages;
          state.searchTerm = action.payload.searchTerm
            ? action.payload.searchTerm
            : '';
        },
      )
      .addCase(reloadNews.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setNews, setSearchTermAction} = newsSlice.actions;

export default newsSlice.reducer;

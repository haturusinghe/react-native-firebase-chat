import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_ROUTES, PAGE_SIZE} from '../../constants';
import http from '../../services/http';

export interface Story {
  _id: string;
  storyTitle: string;
  storyDescription: string;
  // creator: string;
  // image?: string;
  // attachments?: string[];
  createdAt: string;
  startTime: string;
  endTime: string;
}

export interface StoryState {
  data: Story[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  searchTerm?: string;
}

const initialState: StoryState = {
  data: [],
  loading: false,
  currentPage: 0,
  totalPages: 10,
};

export const fetchStory = createAsyncThunk(
  'story/fetchPageData',
  async (_, {getState}: any) => {
    try {
      const {stories} = getState();
      if (stories.totalPages > stories.currentPage) {
        const res = await http.get<any>(
          `${API_ROUTES.EVENTS.GET_ALL}?page=${
            stories.currentPage + 1
          }&pageSize=${PAGE_SIZE}&searchTerm=${
            stories.searchTerm ? stories.searchTerm : ''
          }`,
        );
        return {stories: res.data.data, totalPages: res.data.totalPages};
      } else {
        return {stories: [], totalPages: stories.totalPages};
      }
    } catch (err) {
      return {stories: [], totalPages: 0};
    }
  },
);

export const reloadStory = createAsyncThunk(
  'pagination/reloadStory',
  async (searchTerm?: string, {getState}: any) => {
    try {
      const res = await http.get<any>(
        `${
          API_ROUTES.EVENTS.GET_ALL
        }?page=${1}&pageSize=${PAGE_SIZE}&searchTerm=${
          searchTerm ? searchTerm : ''
        }`,
      );
      return {
        stories: res.data.data,
        totalPages: res.data.totalPages,
        searchTerm,
      };
    } catch (err) {
      return {stories: [], totalPages: 0};
    }
  },
);

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state: StoryState, action: PayloadAction<Story[]>): void => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStory.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchStory.fulfilled,
        (
          state,
          action: PayloadAction<{stories: Story[]; totalPages: number}>,
        ) => {
          state.loading = false;
          state.data = [...state.data, ...action.payload.stories];
          state.currentPage = state.currentPage + 1;
          state.totalPages = action.payload.totalPages;
        },
      )
      .addCase(fetchStory.rejected, state => {
        state.loading = false;
      })
      .addCase(reloadStory.pending, state => {
        state.loading = true;
        state.data = [];
      })
      .addCase(
        reloadStory.fulfilled,
        (
          state,
          action: PayloadAction<{
            stories: Story[];
            totalPages: number;
            searchTerm?: string;
          }>,
        ) => {
          state.loading = false;
          state.data = action.payload.stories;
          state.currentPage = 1;
          state.totalPages = action.payload.totalPages;
          state.searchTerm = action.payload?.searchTerm
            ? action.payload?.searchTerm
            : '';
        },
      )
      .addCase(reloadStory.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setEvents} = eventSlice.actions;

export default eventSlice.reducer;

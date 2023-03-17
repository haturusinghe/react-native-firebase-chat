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
  startTime?: Date;
  endTime?: Date;
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
          }&pageSize=${PAGE_SIZE}`,
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
  async (
    {startTime, endTime}: {startTime?: Date; endTime?: Date},
    {getState}: any,
  ) => {
    try {
      const res = await http.get<any>(
        `${
          API_ROUTES.NEWS.GET_ALL
        }?page=${1}&pageSize=${PAGE_SIZE}&startTime=${startTime}&endTime=${endTime}`,
      );
      return {
        stories: res.data.data,
        totalPages: res.data.totalPages,
        startTime,
        endTime,
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
            startTime?: Date;
            endTime?: Date;
          }>,
        ) => {
          state.loading = false;
          state.data = action.payload.stories;
          state.currentPage = 1;
          state.totalPages = action.payload.totalPages;
          state.startTime = action.payload.startTime
            ? action.payload.startTime
            : state.startTime;
          state.endTime = action.payload.endTime
            ? action.payload.endTime
            : state.endTime;
        },
      )
      .addCase(reloadStory.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setEvents} = eventSlice.actions;

export default eventSlice.reducer;

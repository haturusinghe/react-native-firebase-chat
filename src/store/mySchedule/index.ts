import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_ROUTES, PAGE_SIZE} from '../../constants';
import http from '../../services/http';
import {Session} from '../event';

export interface MyScheduleState {
  data: Session[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  startTime?: Date;
  endTime?: Date;
}

const initialState: MyScheduleState = {
  data: [],
  loading: true,
  currentPage: 0,
  totalPages: 10,
};

export const fetchSchedule = createAsyncThunk(
  'mySchedule/fetchPageData',
  async (_, {getState}: any) => {
    try {
      const {mySessions} = getState();
      if (mySessions.totalPages > mySessions.currentPage) {
        const res = await http.get<any>(
          `${API_ROUTES.EVENTS.GET_MY_SCHEDULE}?page=${
            mySessions.currentPage + 1
          }&pageSize=${PAGE_SIZE}`,
        );
        return {sessions: res.data.sessions, totalPages: res.data.totalPages};
      } else {
        return {sessions: [], totalPages: mySessions.totalPages};
      }
    } catch (err) {
      return {sessions: [], totalPages: 0};
    }
  },
);

export const reloadSchedule = createAsyncThunk(
  'mySchedule/reload',
  async (_, {getState}: any) => {
    try {
      const res = await http.get<any>(
        `${API_ROUTES.EVENTS.GET_MY_SCHEDULE}?page=${1}&pageSize=${PAGE_SIZE}`,
      );
      return {
        sessions: res.data.sessions,
        totalPages: res.data.totalPages,
      };
    } catch (err) {
      return {sessions: [], totalPages: 0};
    }
  },
);

export const myScheduleSlice = createSlice({
  name: 'mySessions',
  initialState,
  reducers: {
    setMySchedule: (
      state: MyScheduleState,
      action: PayloadAction<Session[]>,
    ): void => {
      state.data = action.payload;
    },
    updateSession: (
      state: MyScheduleState,
      action: PayloadAction<Session>,
    ): void => {
      state.data = state.data.map((session: Session) => {
        if (session._id == action.payload._id) {
          return action.payload;
        }
        return session;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSchedule.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchSchedule.fulfilled,
        (
          state,
          action: PayloadAction<{sessions: Session[]; totalPages: number}>,
        ) => {
          state.loading = false;
          state.data = [...state.data, ...action.payload.sessions];
          state.currentPage = state.currentPage + 1;
          state.totalPages = action.payload.totalPages;
        },
      )
      .addCase(fetchSchedule.rejected, state => {
        state.loading = false;
      })
      .addCase(reloadSchedule.pending, state => {
        state.loading = true;
        state.data = [];
      })
      .addCase(
        reloadSchedule.fulfilled,
        (
          state,
          action: PayloadAction<{
            sessions: Session[];
            totalPages: number;
            searchTerm?: string;
          }>,
        ) => {
          state.loading = false;
          state.data = action.payload.sessions;
          state.currentPage = 1;
          state.totalPages = action.payload.totalPages;
        },
      )
      .addCase(reloadSchedule.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setMySchedule, updateSession} = myScheduleSlice.actions;

export default myScheduleSlice.reducer;

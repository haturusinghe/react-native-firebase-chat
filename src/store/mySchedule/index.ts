import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_ROUTES, PAGE_SIZE} from '../../constants';
import http from '../../services/http';
import {Session, sessionUserStatusType, UserSession} from '../event';

export interface MyScheduleState {
  data: Session[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  startTime?: string;
  endTime?: string;
}

const mapSessions = (sessions: Session[]) => {
  return sessions.map((session: Session) => {
    return {
      ...session,
      acceptedCount: session?.usersession.filter(
        (userSession: UserSession) =>
          userSession.status === sessionUserStatusType.accept,
      ).length,
    };
  });
};

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
        let url = `${API_ROUTES.EVENTS.GET_MY_SCHEDULE}?page=${
          mySessions.currentPage + 1
        }&pageSize=${PAGE_SIZE}`;
        if (mySessions.startTime && mySessions.endTime) {
          url = `${url}&startTime=${mySessions.startTime}&endTime=${mySessions.endTime}`;
        }
        const res = await http.get<any>(url);

        return {
          sessions: mapSessions(res.data.sessions),
          totalPages: res.data.totalPages,
        };
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
  async (
    {startTime, endTime}: {startTime?: Date; endTime?: Date},
    {getState}: any,
  ) => {
    try {
      let url = `${
        API_ROUTES.EVENTS.GET_MY_SCHEDULE
      }?page=${1}&pageSize=${PAGE_SIZE}`;
      if (startTime && endTime) {
        url = `${url}&startTime=${startTime}&endTime=${endTime}`;
      }
      const res = await http.get<any>(url);
      return {
        sessions: mapSessions(res.data.sessions),
        totalPages: res.data.totalPages,
        startTime: startTime?.toString(),
        endTime: endTime?.toString(),
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
      action: PayloadAction<UserSession>,
    ): void => {
      state.data = state.data.map((session: Session) => {
        return {
          ...session,
          usersession: session.usersession.map((userSession: UserSession) => {
            if (userSession._id === action.payload._id) {
              return action.payload;
            }
            return userSession;
          }),
          acceptedCount:
            session.usersession
              .map((userSession: UserSession) => {
                if (userSession._id === action.payload._id) {
                  return action.payload;
                }
                return userSession;
              })
              .filter(
                (usersession: UserSession) =>
                  usersession.status === sessionUserStatusType.accept,
              ).length || 0,
        };
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
            startTime?: string;
            endTime?: string;
          }>,
        ) => {
          state.loading = false;
          state.data = action.payload.sessions;
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
      .addCase(reloadSchedule.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setMySchedule, updateSession} = myScheduleSlice.actions;

export default myScheduleSlice.reducer;

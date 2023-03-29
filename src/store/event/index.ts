import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_ROUTES, PAGE_SIZE} from '../../constants';
import http from '../../services/http';

export interface Sponsor {
  company: any;
  status: string;
  _id: string;
}
export enum sessionUserStatusType {
  'accept' = 'accept',
  'tentative' = 'tentative',
  'decline' = 'decline',
  'pending' = 'pending',
}
export interface UserSession {
  _id: string;
  user: string;
  status: sessionUserStatusType;
}
export interface Session {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  seats: number;
  attachments: Array<string>;
  location: string;
  address?: string;
  isMandatory: boolean;
  usersession: Array<UserSession>;
}
export interface Event {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  sponsors?: Array<Sponsor>;
  eventUsers?: Array<any>;
  sessions: Array<Session>;
}

export interface EventState {
  data: Event[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  startTime?: string;
  endTime?: string;
}

const initialState: EventState = {
  data: [],
  loading: false,
  currentPage: 0,
  totalPages: 10,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchPageData',
  async (_, {getState}: any) => {
    try {
      const {events} = getState();
      if (events.totalPages > events.currentPage) {
        let url = `${API_ROUTES.EVENTS.GET_ALL}?page=${
          events.currentPage + 1
        }&pageSize=${PAGE_SIZE}`;
        if (events.startTime && events.endTime) {
          url = `${url}&startTime=${events.startTime}&endTime=${events.endTime}`;
        }
        const res = await http.get<any>(url);
        return {events: res.data.data, totalPages: res.data.totalPages};
      } else {
        return {events: [], totalPages: events.totalPages};
      }
    } catch (err) {
      return {events: [], totalPages: 0};
    }
  },
);

export const reloadEvents = createAsyncThunk(
  'pagination/reloadEvents',
  async (
    {startTime, endTime}: {startTime?: Date; endTime?: Date},
    {getState}: any,
  ) => {
    try {
      let url = `${API_ROUTES.EVENTS.GET_ALL}?page=${1}&pageSize=${PAGE_SIZE}`;
      if (startTime && endTime) {
        url = `${url}&startTime=${startTime}&endTime=${endTime}`;
      }
      const res = await http.get<any>(url);
      return {
        events: res.data.data,
        totalPages: res.data.totalPages,
        startTime: startTime?.toString(),
        endTime: endTime?.toString(),
      };
    } catch (err) {
      return {events: [], totalPages: 0};
    }
  },
);

export const loadSponsors = createAsyncThunk(
  'event/loadSponsors',
  async ({_id}: {_id: string}, {getState}: any) => {
    try {
      const {events} = getState();
      if (
        events.data?.find((event: Event) => event._id === _id) &&
        !events.data?.find((event: Event) => event._id === _id)[0]?.sponsors
      ) {
        const res = await http.get<any>(
          `${API_ROUTES.EVENTS.GET_SPONSORS}/${_id}`,
        );
        return {
          event: res.data.data,
        };
      } else {
        return {
          event: null,
        };
      }
    } catch (err) {
      return {event: null};
    }
  },
);

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state: EventState, action: PayloadAction<Event[]>): void => {
      state.data = action.payload;
    },
    sessionUserUpdate: (
      state: EventState,
      action: PayloadAction<{
        eventId: string;
        sessionId: string;
        userSession: UserSession;
      }>,
    ): void => {
      state.data = state.data.map((event: Event) => {
        if (event._id === action.payload.eventId) {
          event.sessions = event.sessions.map((session: Session) => {
            if (session._id === action.payload.sessionId) {
              const index = session.usersession.findIndex(
                (userSession: UserSession) =>
                  userSession._id === action.payload.userSession._id,
              );
              if (index === -1) {
                session.usersession.push(action.payload.userSession);
              } else {
                session.usersession[index] = action.payload.userSession;
              }
            }
            return session;
          });
        }
        return event;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchEvents.fulfilled,
        (
          state,
          action: PayloadAction<{events: Event[]; totalPages: number}>,
        ) => {
          state.loading = false;
          state.data = [...state.data, ...action.payload.events];
          state.currentPage = state.currentPage + 1;
          state.totalPages = action.payload.totalPages;
        },
      )
      .addCase(fetchEvents.rejected, state => {
        state.loading = false;
      })
      .addCase(reloadEvents.pending, state => {
        state.loading = true;
        state.data = [];
      })
      .addCase(
        reloadEvents.fulfilled,
        (
          state,
          action: PayloadAction<{
            events: Event[];
            totalPages: number;
            startTime?: string;
            endTime?: string;
          }>,
        ) => {
          state.loading = false;
          state.data = action.payload.events;
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
      .addCase(reloadEvents.rejected, state => {
        state.loading = false;
      })
      .addCase(loadSponsors.pending, state => {
        state.loading = true;
      })
      .addCase(
        loadSponsors.fulfilled,
        (state, action: PayloadAction<{event: Event}>) => {
          state.loading = false;
          state.data = state.data.map((element: Event) => {
            if (element._id === action.payload.event?._id) {
              return {
                ...element,
                sponsors: action.payload.event?.sponsors,
                eventUsers: action.payload.event?.eventUsers,
              };
            } else {
              return element;
            }
          });
        },
      )
      .addCase(loadSponsors.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setEvents, sessionUserUpdate} = eventSlice.actions;

export default eventSlice.reducer;

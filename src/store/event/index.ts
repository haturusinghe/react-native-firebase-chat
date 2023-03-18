import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_ROUTES, PAGE_SIZE} from '../../constants';
import http from '../../services/http';
import {User} from '../user';

export interface Sponsor {
  company: any;
  status: string;
  _id: string;
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
}

export interface EventState {
  data: Event[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  startTime?: Date;
  endTime?: Date;
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
        const res = await http.get<any>(
          `${API_ROUTES.EVENTS.GET_ALL}?page=${
            events.currentPage + 1
          }&pageSize=${PAGE_SIZE}`,
        );
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
      const res = await http.get<any>(
        `${
          API_ROUTES.EVENTS.GET_ALL
        }?page=${1}&pageSize=${PAGE_SIZE}&startTime=${startTime}&endTime=${endTime}`,
      );
      return {
        events: res.data.data,
        totalPages: res.data.totalPages,
        startTime,
        endTime,
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
            startTime?: Date;
            endTime?: Date;
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
              console.log({event: action.payload.event});
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

export const {setEvents} = eventSlice.actions;

export default eventSlice.reducer;

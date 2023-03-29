import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_ROUTES, PAGE_SIZE} from '../../constants';
import http from '../../services/http';
import {Event, EventState} from '../event';

const initialState: EventState = {
  data: [],
  loading: false,
  currentPage: 0,
  totalPages: 10,
};

export const fetchPastEvents = createAsyncThunk(
  'pastEvents/fetchPageData',
  async (_, {getState}: any) => {
    try {
      const {pastEvents} = getState();
      if (pastEvents.totalPages > pastEvents.currentPage) {
        let url = `${API_ROUTES.EVENTS.GET_ALL}?page=${
          pastEvents.currentPage + 1
        }&pageSize=${PAGE_SIZE}&pastEvents=true`;
        if (pastEvents.searchTerm) {
          url = `${url}&searchTerm=${pastEvents.searchTerm}`;
        }
        const res = await http.get<any>(url);
        return {events: res.data.data, totalPages: res.data.totalPages};
      } else {
        return {events: [], totalPages: pastEvents.totalPages};
      }
    } catch (err) {
      return {events: [], totalPages: 0};
    }
  },
);

export const reloadPastEvents = createAsyncThunk(
  'pastEvents/reloadEvents',
  async ({searchTerm}: {searchTerm?: string}, {getState}: any) => {
    try {
      let url = `${
        API_ROUTES.EVENTS.GET_ALL
      }?page=${1}&pageSize=${PAGE_SIZE}&pastEvents=true`;
      if (searchTerm) {
        url = `${url}&searchTerm=${searchTerm}`;
      }
      const res = await http.get<any>(url);
      return {
        events: res.data.data,
        totalPages: res.data.totalPages,
        searchTerm,
      };
    } catch (err) {
      return {events: [], totalPages: 0};
    }
  },
);

export const loadPastSponsors = createAsyncThunk(
  'pastEvents/loadSponsors',
  async ({_id}: {_id: string}, {getState}: any) => {
    try {
      const {pastEvents} = getState();
      if (
        pastEvents.data?.find((event: Event) => event._id === _id) &&
        !pastEvents.data?.find((event: Event) => event._id === _id)[0]?.sponsors
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

export const pastEventSlice = createSlice({
  name: 'pastEvents',
  initialState,
  reducers: {
    setPastEvents: (
      state: EventState,
      action: PayloadAction<Event[]>,
    ): void => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPastEvents.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchPastEvents.fulfilled,
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
      .addCase(fetchPastEvents.rejected, state => {
        state.loading = false;
      })
      .addCase(reloadPastEvents.pending, state => {
        state.loading = true;
        state.data = [];
      })
      .addCase(
        reloadPastEvents.fulfilled,
        (
          state,
          action: PayloadAction<{
            events: Event[];
            totalPages: number;
            searchTerm?: string;
          }>,
        ) => {
          state.loading = false;
          state.data = action.payload.events;
          state.currentPage = 1;
          state.totalPages = action.payload.totalPages;
          state.searchTerm = action.payload.searchTerm;
        },
      )
      .addCase(reloadPastEvents.rejected, state => {
        state.loading = false;
      })
      .addCase(loadPastSponsors.pending, state => {
        state.loading = true;
      })
      .addCase(
        loadPastSponsors.fulfilled,
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
      .addCase(loadPastSponsors.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setPastEvents} = pastEventSlice.actions;

export default pastEventSlice.reducer;

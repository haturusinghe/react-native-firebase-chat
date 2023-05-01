import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_ROUTES} from '../../constants';
import http from '../../services/http';

interface UserRole {
  id: number;
  name: string;
}

export enum GENDERTYPES {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NOTSAY = 'NOTSAY',
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  userName: string;
  roles: UserRole[];
  managerId: string;
  active: boolean;
  imageUrl?: string;
  background?: string;
  mobile?: string;
  gender?: GENDERTYPES;
  quote?: string;
  shortDescription?: string;
  address: {
    address_line_1?: string;
    address_line_2?: string;
  };
  token?: string;
}

export interface UserState {
  user: User | null;
  authenticated: null | boolean;
  loading: boolean;
  token?: string;
}

const initialState: UserState = {
  user: null,
  authenticated: false,
  loading: true,
};

export const checkUser = createAsyncThunk(
  'user/checkUser',
  async (_, thunkApi) => {
    try {
      const res = await http.get<any>(API_ROUTES.USER.WHO_AM_I);
      return res.data?.data?.user;
    } catch (err) {
      return null;
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User | null>): void => {
      state.user = action.payload;
      state.authenticated = action.payload ? true : false;
      state.token = action.payload?.token;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkUser.pending, state => {
        state.loading = true;
      })
      .addCase(
        checkUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;
          state.user = action.payload;
          state.authenticated = action.payload ? true : false;
        },
      )
      .addCase(checkUser.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;

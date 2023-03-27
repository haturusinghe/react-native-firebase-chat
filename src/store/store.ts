import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import userReducer from './user/index';
import newsReducer from './news/index';
import eventReducer from './event/index';
import storyReducer from './story/index';
import pastEventReducer from './pastEvents/index';

export const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
    events: eventReducer,
    pastEvents: pastEventReducer,
    stories: storyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

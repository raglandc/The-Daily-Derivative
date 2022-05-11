import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import setMenuStatusReducer from "./features/menuStatusSlice";

export const store = configureStore({
  reducer: {
    //This is where we add reducers
    //currently dont have any
    menuStatus: setMenuStatusReducer,
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

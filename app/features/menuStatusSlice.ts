import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";

//declare types for state
export type MenuState = {
  status: boolean;
};

//define the starting state
const initialState: MenuState = {
  status: false,
};

//creating slice with reducers which we will call with actions
export const menuStatusSlice = createSlice({
  name: "menuStatus",
  initialState,
  reducers: {
    setMenuStatus: (state) => {
      state.status = !state.status;
    },
  },
});

//export actions to use throughout app
export const { setMenuStatus } = menuStatusSlice.actions;

//exporting selector, will allow us to read the value from state
export const selectStatus = (state: RootState) => {
  return state.menuStatus.status;
};

//export reducer here, we will add it to the store
export default menuStatusSlice.reducer;

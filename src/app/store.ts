import { configureStore } from "@reduxjs/toolkit";
import { boardListSlice } from "../features/boardList/boardListSlice";


export const store =configureStore({
  reducer: {
    boardList: boardListSlice.reducer,
    // taskList: ''
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

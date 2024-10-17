import { configureStore } from "@reduxjs/toolkit";
import { boardListSlice } from "../features/boardList/boardListSlice";
import { taskListSlice } from "../features/taskList/taskListSlice";


export const store =configureStore({
  reducer: {
    boardList: boardListSlice.reducer,
    taskList: taskListSlice.reducer
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

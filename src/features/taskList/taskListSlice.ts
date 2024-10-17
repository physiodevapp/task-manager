import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskInterface } from "../../modelnterface";
import { taskListReadAllThunk } from "./taskListReadAllThunk";
import { taskListReadOneThunk } from "./taskListReadOneThunk";
import { RootState } from "../../app/store"

interface InitialState {
  error: string | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  taskList: TaskInterface[] | null;
  taskItem: TaskInterface | null;
}

const initialState: InitialState = {
  error: null,
  status: "idle",
  taskList: [],
  taskItem: null,
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(taskListReadAllThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        taskListReadAllThunk.fulfilled,
        (state, action: PayloadAction<TaskInterface[] | null>) => {
          state.status = "fulfilled";

          state.taskList = action.payload;
        }
      )
      .addCase(
        taskListReadAllThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "rejected";

          state.error = action.payload || "An error ocurred";
        }
      )
      .addCase(taskListReadOneThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        taskListReadOneThunk.fulfilled,
        (state, action: PayloadAction<TaskInterface | null>) => {
          state.status = "fulfilled";

          state.taskItem = action.payload;
        }
      )
      .addCase(
        taskListReadOneThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "rejected";

          state.error = action.payload || "An error ocurred";
        }
      );
  },
});


export const taskListStatusSelector = (state: RootState) => state.taskList.status;
export const taskListErrorSelector = (state: RootState) => state.taskList.error;
export const taskListTaskList = (state: RootState) => state.taskList.taskList;
export const taskListTaskItem = (state: RootState) => state.taskList.taskItem;

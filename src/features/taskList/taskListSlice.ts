import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskInterface } from "../../modelnterface";
import { taskListReadAllThunk } from "./taskListReadAllThunk";
import { taskListReadOneThunk } from "./taskListReadOneThunk";
import { RootState } from "../../app/store"
import { taskListCreateThunk } from "./taskListCreateThunk";
import { taskListDeleteThunk } from "./taskListDeleteThunk";
import { taskListUpdateThunk } from "./taskListUpdateThunk";

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
      )
      .addCase(taskListCreateThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(taskListCreateThunk.fulfilled, (state, action: PayloadAction<TaskInterface | null>) => {
        state.status = "fulfilled";

        if (action.payload)
          state.taskList?.push(action.payload);

        state.taskItem = null;
      })
      .addCase(taskListCreateThunk.rejected, (state, action:PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || "An error ocurred";
      })
      .addCase(taskListDeleteThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(taskListDeleteThunk.fulfilled, (state, action: PayloadAction<TaskInterface | null>) => {
        state.status = "fulfilled";

        if (state.taskList && action.payload)
          state.taskList = state.taskList.filter((item) => item.id !== action.payload?.id)

        state.taskItem = null;
      })
      .addCase(taskListDeleteThunk.rejected, (state, action:PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || "An error ocurred";
      })
      .addCase(taskListUpdateThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(taskListUpdateThunk.fulfilled, (state, action: PayloadAction<TaskInterface | null>) => {
        state.status = "fulfilled";

        const updatedItemIndex = state.taskList?.findIndex((item) => item.id === action.payload?.id);

        if (updatedItemIndex && action.payload)
          state.taskList?.splice(updatedItemIndex, 1, action.payload);

        state.taskItem = action.payload;
      })
      .addCase(taskListUpdateThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || "An error ocurred";
      })
  },
});


export const taskListStatusSelector = (state: RootState) => state.taskList.status;
export const taskListErrorSelector = (state: RootState) => state.taskList.error;
export const taskListTaskList = (state: RootState) => state.taskList.taskList;
export const taskListTaskItem = (state: RootState) => state.taskList.taskItem;

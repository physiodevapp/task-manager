import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskInterface } from "../../modelnterface";
import { taskListReadAllThunk } from "./taskListReadAllThunk";
import { taskListReadOneThunk } from "./taskListReadOneThunk";
import { RootState } from "../../app/store";
import { taskListCreateThunk } from "./taskListCreateThunk";
import { taskListDeleteThunk } from "./taskListDeleteThunk";
import { taskListUpdateThunk } from "./taskListUpdateThunk";
import manyToManyTagList from "../../data/mock_tagTaskList.json";
import tagList from "../../data/mock_tagList.json";

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
  reducers: {
    updateTaskItem: (state, action: PayloadAction<TaskInterface>) => {
      const taskIndex = state.taskList?.findIndex(
        (task) => task.id === action.payload.id
      );

      if (taskIndex && taskIndex !== -1 && state.taskList) {
        state.taskList[taskIndex] = action.payload;

        state.taskItem = null;
      }
    },

    setActiveTaskItem: (state, action: PayloadAction<TaskInterface | null>) => {
      if (action.payload) {
        const tagIds = [
          ...new Set(
            manyToManyTagList
              .filter((tagTask) => tagTask.taskId === Number(action.payload?.id))
              .map((tagTask) => tagTask.tagId)
          ),
        ];

        const tags = tagList.filter((tag) => tagIds.includes(tag.id)).map((tag) => tag.Title);

        state.taskItem = { ...action.payload, tags };
      } else {
        state.taskItem = action.payload;
      }
    },
  },
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
      .addCase(
        taskListCreateThunk.fulfilled,
        (state, action: PayloadAction<TaskInterface | null>) => {
          state.status = "fulfilled";

          if (action.payload) state.taskList?.push(action.payload);

          state.taskItem = null;
        }
      )
      .addCase(
        taskListCreateThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "rejected";

          state.error = action.payload || "An error ocurred";
        }
      )
      .addCase(taskListDeleteThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        taskListDeleteThunk.fulfilled,
        (state, action: PayloadAction<TaskInterface | null>) => {
          state.status = "fulfilled";

          if (state.taskList && action.payload)
            state.taskList = state.taskList.filter(
              (item) => item.id !== action.payload?.id
            );

          state.taskItem = null;
        }
      )
      .addCase(
        taskListDeleteThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "rejected";

          state.error = action.payload || "An error ocurred";
        }
      )
      .addCase(taskListUpdateThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        taskListUpdateThunk.fulfilled,
        (state, action: PayloadAction<TaskInterface | null>) => {
          state.status = "fulfilled";

          if (!action.payload)
            return;          
      
          if (!state.taskList)
            state.taskList = [];
      
          const updatedItemIndex = state.taskList.findIndex(
            (item) => item.id === action.payload?.id
          );
      
          if (updatedItemIndex !== -1) {
            state.taskList = [
              ...state.taskList.slice(0, updatedItemIndex),
              action.payload, 
              ...state.taskList.slice(updatedItemIndex + 1),
            ];
          }

          state.taskItem = null;
        }
      )
      .addCase(
        taskListUpdateThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "rejected";

          state.error = action.payload || "An error ocurred";
        }
      );
  },
});

export const { updateTaskItem, setActiveTaskItem } = taskListSlice.actions;

export const taskListStatusSelect = (state: RootState) => state.taskList.status;
export const taskListErrorSelect = (state: RootState) => state.taskList.error;
export const taskListTaskListSelect = (state: RootState) =>
  state.taskList.taskList;
export const taskListTaskItemSelect = (state: RootState) =>
  state.taskList.taskItem;

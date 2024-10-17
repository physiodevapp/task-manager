import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskInterface } from "../../modelnterface";
import { getList } from "../apiCall";
import taskList from "../../data/mock_taskList.json";

export const taskListReadAllThunk = createAsyncThunk<TaskInterface[], { boardId?: number }, { rejectValue: string }>("taskList/taskListReadAll", async( { boardId }, { rejectWithValue }) => {
  try {
    const list = await getList<TaskInterface>(taskList as TaskInterface[], boardId as number);

    return list;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else
      return rejectWithValue(error as string);
  }
});
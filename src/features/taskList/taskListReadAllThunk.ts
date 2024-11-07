import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskInterface } from "../../modelnterface";
import { getList } from "../apiCall";
import taskList from "../../data/mock_taskList.json";

export const taskListReadAllThunk = createAsyncThunk<TaskInterface[], { boardId?: string }, { rejectValue: string }>("taskList/taskListReadAll", async( { boardId }, { rejectWithValue }) => {
  try {
    if (!boardId)
      return []
    
    const list = await getList<TaskInterface>(taskList as TaskInterface[], boardId as string);

    return list;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else
      return rejectWithValue(error as string);
  }
});
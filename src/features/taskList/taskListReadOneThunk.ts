import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskInterface } from "../../modelnterface";
import { getItem } from "../apiCall";
import taskList from "../../data/mock_taskList.json";

export const taskListReadOneThunk = createAsyncThunk<TaskInterface, { id: number }, { rejectValue: string }>("taskList/taskListReadOne", async({ id }, { rejectWithValue }) => {
  try {
    const item = await getItem<TaskInterface>(id, taskList as TaskInterface[]);

    return item;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else
      return rejectWithValue(error);
  }
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskInterface } from "../../modelnterface";
import { updateItem } from "../apiCall";


export const taskListUpdateThunk = createAsyncThunk<TaskInterface, { item: TaskInterface }, { rejectValue: string }>("taskList/taskListUpdate", async({ item }, { rejectWithValue }) => {
  try {
    const updatedItem = await updateItem<TaskInterface>(item);

    return updatedItem;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else
      return rejectWithValue(error);
  }
})
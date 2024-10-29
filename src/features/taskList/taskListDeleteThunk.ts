import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskInterface } from "../../modelnterface";
import { deleteItem } from "../apiCall";


export const taskListDeleteThunk = createAsyncThunk<TaskInterface, { item: TaskInterface }, { rejectValue: string }>("taskList/taskListDelete", async({ item }, { rejectWithValue }) => {
  try {
    const deletedItem = await deleteItem(item);

    return deletedItem;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else 
      return rejectWithValue(String(error));
  }
})
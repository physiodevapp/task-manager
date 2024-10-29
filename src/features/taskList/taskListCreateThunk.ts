import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskInterface } from '../../modelnterface';
import { postItem } from '../apiCall';

export const taskListCreateThunk = createAsyncThunk<TaskInterface, { item: TaskInterface }, { rejectValue: string }>("taskList/taskListCreate", async({ item }, { rejectWithValue }) => {
  try {
    const newItem = await postItem<TaskInterface>(item);

    return newItem;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else 
      return rejectWithValue(error as string);
  }
})
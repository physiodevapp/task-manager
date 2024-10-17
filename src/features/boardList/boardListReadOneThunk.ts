import { createAsyncThunk } from "@reduxjs/toolkit";
import { BoardInterface } from "../../modelnterface";
import { getItem } from "../apiCall";

export const boardListReadOneThunk = createAsyncThunk<BoardInterface, { id: string, list: BoardInterface[] }, { rejectValue: string }>("boardList/boardListReadOne", async({ id, list }, { rejectWithValue }) => {
  try {
    const item = await getItem<BoardInterface>(id, list);

    return item;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else 
      return error;
  }
})
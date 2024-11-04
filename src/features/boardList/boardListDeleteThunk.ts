import { createAsyncThunk } from "@reduxjs/toolkit";
import { BoardInterface } from "../../modelnterface";
import { deleteItem } from "../apiCall";


export const boardListDeleteThunk = createAsyncThunk<BoardInterface, { item: BoardInterface }, {rejectValue: string}>("boardList/boardListDelete", async({ item }, { rejectWithValue }) => {
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
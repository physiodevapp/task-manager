import { createAsyncThunk } from "@reduxjs/toolkit";
import { BoardInterface } from "../../modelnterface";
import { postItem } from "../apiCall";

export const boardListCreateThunk = createAsyncThunk<BoardInterface,{ item: BoardInterface }, { rejectValue: string }>("boardList/boardListCreate", async({ item }, { rejectWithValue }) => {
  try {
    const newBoard = await postItem<BoardInterface>(item);

    return newBoard;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else
      return rejectWithValue(error);
  }
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import boardList from "../../data/mock_boardList.json"
import { getList } from "../apiCall";
import { BoardInterface } from "../../modelnterface";

export const boardListReadAllThunk = createAsyncThunk<BoardInterface[], void, { rejectValue: string }>("boardList/boardListReadAll", async(_, { rejectWithValue }) => {
  try {
    const list = await getList<BoardInterface>(boardList as BoardInterface[]);

    return list;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message);
    else
      return rejectWithValue(error as string);
  }
});
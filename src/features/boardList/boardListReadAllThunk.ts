import { createAsyncThunk } from "@reduxjs/toolkit";
import boardList from "../../data/mock_boardList.json"
import { getList } from "../apiCall";

export const boardListReadAllThunk = createAsyncThunk<[], void, { rejectValue: string }>("boardList/boardListReadAll", async(_, { rejectWithValue }) => {
  try {
    const list = await getList(boardList);

    return list;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue(error.message)
    else
      return rejectWithValue(error)
  }
});
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boardListReadAllThunk } from "./boardListReadAllThunk";
import { RootState } from "../../app/store";
import { BoardInterface } from '../../modelnterface';

interface InitialState {
  error: string | null,
  status: "idle" | "pending" | "fulfilled" | "rejected",
  boardList: BoardInterface[] | null,
  boardItem: BoardInterface | null
}

const initialState: InitialState = {
  error: null,
  status: "idle",
  boardList: [],
  boardItem: null,
};

export const boardListSlice = createSlice({
  name: "boardList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(boardListReadAllThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(boardListReadAllThunk.fulfilled, (state, action: PayloadAction<[] | null>) => {
        state.status = "fulfilled";

        state.boardList = action.payload;
      })
      .addCase(boardListReadAllThunk.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const boardListErrorSelect = (state: RootState) => state.boardList.error;
export const baordListStatusSelect = (state: RootState) => state.boardList.status;
export const boardListBoardList = (state: RootState) => state.boardList.boardList;
export const bardListBoardItem = (state: RootState) => state.boardList.boardItem;



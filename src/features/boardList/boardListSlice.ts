import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boardListReadAllThunk } from "./boardListReadAllThunk";
import { RootState } from "../../app/store";
import { BoardInterface } from '../../modelnterface';
import { boardListCreateThunk } from "./boardListCreate";

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
      .addCase(boardListReadAllThunk.fulfilled, (state, action: PayloadAction<BoardInterface[] | null>) => {
        state.status = "fulfilled";

        state.boardList = action.payload;
      })
      .addCase(boardListReadAllThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || "An error ocurred";
      })
      .addCase(boardListCreateThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(boardListCreateThunk.fulfilled, (state, action: PayloadAction<BoardInterface | null>) => {
        state.status = "fulfilled";

        if (action.payload && state.boardList)
          state.boardList.push(action.payload);          

        state.boardItem = action.payload;
      })
      .addCase(boardListCreateThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || "An error ocurred";
      })
  },
});

export const boardListErrorSelect = (state: RootState) => state.boardList.error;
export const baordListStatusSelect = (state: RootState) => state.boardList.status;
export const boardListBoardList = (state: RootState) => state.boardList.boardList;
export const bardListBoardItem = (state: RootState) => state.boardList.boardItem;



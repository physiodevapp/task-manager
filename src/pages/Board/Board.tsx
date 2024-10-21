// import React from 'react';
import {
  BoardItem,
  BoardListContainer,
  BoardList,
  BoardListTitle,
  CurrentThemeMarker,
  Grid,
  MainArea,
  SideArea,
  ThemeButton,
  ThemeContainer,
  AddBoard,
} from "./Board.styled";
import { BoardColumn } from "../../components/BoardColumn/BoardColumn";
import { CiDark, CiLight } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { useTheme as useCustomTheme } from "../../context/theme";
import { useTheme as useStyledTheme } from "styled-components";
import { useEffect, useId, useState } from "react";
import {
  boardListStatusSelect,
  boardListBoardListSelect,
  boardListErrorSelect,
} from "../../features/boardList/boardListSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { boardListReadAllThunk } from "../../features/boardList/boardListReadAllThunk";
import { GridLoader, PropagateLoader } from "react-spinners";
import { BoardInterface } from "../../modelnterface";
import {
  taskListErrorSelect,
  taskListStatusSelect,
  taskListTaskListSelect,
} from "../../features/taskList/taskListSlice";
import { taskListReadAllThunk } from "../../features/taskList/taskListReadAllThunk";

export const Board = () => {
  const [isLoadingBoardList, setIsLoadingBoardList] = useState(true);
  const [isLoadingTaskList, setIsLoadingTaskList] = useState(true);

  const { isDarkMode, toggleTheme } = useCustomTheme();
  const styledTheme = useStyledTheme();

  const boardListDispatch = useAppDispatch();
  const boardListBoardList = useAppSelector(boardListBoardListSelect);
  const boardListStatus = useAppSelector(boardListStatusSelect);
  const boardListError = useAppSelector(boardListErrorSelect);

  const taskListDispatch = useAppDispatch();
  const taskListTaskList = useAppSelector(taskListTaskListSelect);
  const taskListStatus = useAppSelector(taskListStatusSelect);
  const taskListError = useAppSelector(taskListErrorSelect);

  const [activeBoard, setActiveBoard] = useState<BoardInterface | undefined>(
    undefined
  );

  const baseBoardId = useId();

  const selectBoard = (board: BoardInterface) => {
    setActiveBoard(board);

    taskListDispatch(taskListReadAllThunk({ boardId: board.id }));
  };

  useEffect(() => {
    boardListDispatch(boardListReadAllThunk());
  }, []);

  useEffect(() => {
    switch (boardListStatus) {
      case "idle":
        setIsLoadingBoardList(false);
        break;

      case "pending":
        setIsLoadingBoardList(true);
        break;

      case "fulfilled":
        const board = boardListBoardList?.find(
          (board) => board.default === "true"
        );
        setActiveBoard(board);

        if (board)
          taskListDispatch(taskListReadAllThunk({ boardId: board.id }));

        setIsLoadingBoardList(false);
        break;

      case "rejected":
        console.error("boardListError ", boardListError);
        setIsLoadingBoardList(false);
        break;

      default:
        break;
    }
  }, [boardListStatus]);

  useEffect(() => {
    switch (taskListStatus) {
      case "idle":
        setIsLoadingTaskList(false);
        break;

      case "pending":
        setIsLoadingTaskList(true);
        break;

      case "fulfilled":
        setIsLoadingTaskList(false);
        break;

      case "rejected":
        console.error("taskListError ", taskListError);
        setIsLoadingTaskList(false);
        break;

      default:
        break;
    }
  }, [taskListStatus]);

  return (
    <Grid>
      <SideArea>
        <BoardListContainer>
          <BoardListTitle>My boards</BoardListTitle>
          {isLoadingBoardList ? (
            <GridLoader
              color={styledTheme.tertiary}
              loading={isLoadingBoardList}
              cssOverride={{
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "block",
                margin: "0 auto",
              }}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <BoardList>
              {boardListBoardList?.map((boardItem, index) => (
                <BoardItem
                  key={`${index}-${baseBoardId}`}
                  onClick={() => selectBoard(boardItem)}
                  disabled={isLoadingTaskList}
                  $active={boardItem.id === activeBoard?.id}
                >
                  {boardItem.title}
                </BoardItem>
              ))}
              <AddBoard disabled={isLoadingTaskList}>
                <IoIosAddCircle /> New board
              </AddBoard>
            </BoardList>
          )}
        </BoardListContainer>
        <ThemeContainer $isDarkMode={isDarkMode}>
          <CurrentThemeMarker $isDarkMode={isDarkMode} />
          <ThemeButton onClick={toggleTheme}>
            <CiDark />
            Dark
          </ThemeButton>
          <ThemeButton onClick={toggleTheme}>
            <CiLight />
            Light
          </ThemeButton>
        </ThemeContainer>
      </SideArea>
      <MainArea>
        {isLoadingTaskList ? (
          <PropagateLoader
            color={styledTheme.tertiary}
            loading={isLoadingTaskList}
            cssOverride={{
              position: "relative",
              display: "block",
              margin: "0 auto",
              alignSelf: "center",
              top: "-5%",
              gridColumn: "1 / -1",
            }}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <BoardColumn
              title="Backlog"
              color="red"
              showAddButton={true}
              tasks={taskListTaskList!.filter(
                (task) => task.status === "backlog"
              )}
            />
            <BoardColumn
              title="In progress"
              color="yellow"
              tasks={taskListTaskList!.filter(
                (task) => task.status === "in_progress"
              )}
            />
            <BoardColumn
              title="In review"
              color="#fb3afb"
              tasks={taskListTaskList!.filter(
                (task) => task.status === "in_review"
              )}
            />
            <BoardColumn
              title="Completed"
              color="#1bef1b"
              tasks={taskListTaskList!.filter(
                (task) => task.status === "completed"
              )}
            />
          </>
        )}
      </MainArea>
    </Grid>
  );
};

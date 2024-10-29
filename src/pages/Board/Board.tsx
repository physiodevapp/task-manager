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
  ColumnTitlesContainer,
  Title,
  BoardArea,
} from "./Board.styled";
import { BoardColumn } from "../../components/BoardColumn/BoardColumn";
import { CiDark, CiLight } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { useTheme as useCustomTheme } from "../../context/theme";
import { useTheme as useStyledTheme } from "styled-components";
import { createRef, RefObject, useEffect, useId, useRef, useState } from "react";
import {
  boardListStatusSelect,
  boardListBoardListSelect,
  boardListErrorSelect,
} from "../../features/boardList/boardListSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { boardListReadAllThunk } from "../../features/boardList/boardListReadAllThunk";
import { GridLoader, PropagateLoader } from "react-spinners";
import { BoardInterface, TaskInterface } from '../../modelnterface';
import {
  taskItemUpdate,
  taskListErrorSelect,
  taskListStatusSelect,
  taskListTaskListSelect,
} from "../../features/taskList/taskListSlice";
import { taskListReadAllThunk } from "../../features/taskList/taskListReadAllThunk";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { taskListUpdateThunk } from "../../features/taskList/taskListUpdateThunk";
import { Scrollbars } from "react-custom-scrollbars-2";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import { useForm } from "../../context/form";

interface ColumnInterface {
  id: string,
  title: string,
  tasks: TaskInterface[],
}

interface ColumnListInterface {
  [key: string]: ColumnInterface
}

export const Board = () => {
  const { type: formType } = useForm()
  const [isLoadingBoardList, setIsLoadingBoardList] = useState(true);
  const [isLoadingTaskList, setIsLoadingTaskList] = useState(true);
  const [columnList, setColumnList] = useState<ColumnListInterface | null>(null);
  const [itemDragged, setItemDragged] = useState<TaskInterface | null>(null);
  const [activeBoard, setActiveBoard] = useState<BoardInterface | undefined>(
    undefined
  );

  const scrollbarRefs = useRef<{ [key: string]: RefObject<Scrollbars> }>({});
  const boardRef = useRef<HTMLDivElement | null>(null);

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

  const baseBoardId = useId();

  const selectBoard = (board: BoardInterface) => {
    setActiveBoard(board);

    taskListDispatch(taskListReadAllThunk({ boardId: board.id }));
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    
    if (!destination)
      return

    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return

    const sourceColumn = columnList![source.droppableId];
    const destinationColumn = columnList![destination.droppableId];
    const sourceTaskList = [...sourceColumn.tasks];
    const destinationTaskList = [...destinationColumn.tasks];

    const [movedTask] = sourceTaskList.splice(source.index, 1);
    const updatedMovedTask = {
      ...movedTask,
      status: ["backlog", "in_progress", "in_review", "completed"][
        Number((destination.droppableId as string).split("-").pop()) - 1
      ],
    };

    if (sourceColumn === destinationColumn) {
      sourceTaskList.splice(destination.index, 0, updatedMovedTask);

      setColumnList({
        ...columnList,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTaskList,
        }
      });
    } else {
      destinationTaskList.splice(destination.index, 0, updatedMovedTask);

      setColumnList({
        ...columnList,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTaskList,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          tasks: destinationTaskList,
        }
      })
    }

    setItemDragged(updatedMovedTask);    
  }

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
        setIsLoadingTaskList(true);
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
        setColumnList({
          ['column-1']: {
            id: 'column-1',
            title: 'Backlog',
            tasks: taskListTaskList!.filter(
              (task) => task.status === "backlog"
            ),
          },
          ['column-2']: {
            id: 'column-2',
            title: 'In progress',
            tasks: taskListTaskList!.filter(
              (task) => task.status === "in_progress"
            ),
          },
          ['column-3']: {
            id: 'column-3',
            title: 'In review',
            tasks: taskListTaskList!.filter(
              (task) => task.status === "in_review"
            ),
          },
          ['column-4']: {
            id: 'column-4',
            title: 'Completed',
            tasks: taskListTaskList!.filter(
              (task) => task.status === "completed"
            ),
          },
        });
        
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

  useEffect(() => {
    if (itemDragged)
      taskListDispatch(taskItemUpdate(itemDragged));

  }, [itemDragged]);

  useEffect(() => {
    if (columnList)
      Object.keys(columnList).forEach((key) => {
        if (!scrollbarRefs.current[key])
          scrollbarRefs.current[key] = createRef();
      });
  }, [columnList]);

  useEffect(() => {
    if (boardRef.current) {
      if (formType)
        boardRef.current.setAttribute('inert', '');
      else 
        boardRef.current.removeAttribute('inert');
    }

  }, [formType])

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
        {(isLoadingBoardList || isLoadingTaskList || !columnList) ? (
          <PropagateLoader
            color={styledTheme.tertiary}
            loading={isLoadingTaskList}
            cssOverride={{
              position: "relative",
              display: "block",
              margin: "0 auto",
              alignSelf: "center",
              top: "-5%",
            }}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>   
            <ColumnTitlesContainer>
              {
                Object.entries(columnList).map(([columnId, columnItem]) => (
                  <Title key={columnId} $columnId={columnId}><span/>{ `${columnItem.title} ${columnItem.tasks.length ? `(${columnItem.tasks.length})` : ''}` }</Title>
                ))
              }            
            </ColumnTitlesContainer>         
            <DragDropContext onDragEnd={handleDragEnd}>
              {
                <BoardArea ref={boardRef}>
                  {
                    Object.entries(columnList).map(([columnId, columnItem]) => (
                      <Droppable key={columnId} droppableId={columnId}>
                        {
                          (provided) => (
                            <BoardColumn
                              {...provided.droppableProps}
                              provided={provided}
                              showAddButton={columnId === "column-1"}
                              tasks={columnItem.tasks}
                              scrollbarRef={scrollbarRefs.current[columnId]}/>
                          )
                        }
                      </Droppable>                      
                    ))
                  }
                </BoardArea>
              }
            </DragDropContext>

            {/* <TaskForm /> */}
          </>
        )}
      </MainArea>
    </Grid>
  );
};

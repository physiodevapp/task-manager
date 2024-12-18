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
  BoardTitle,
  BoardDeleteIcon,
  BoardIcon,
} from "./Board.styled";
import { BoardColumn } from "../../components/BoardColumn/BoardColumn";
import { CiDark, CiLight } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { useTheme as useCustomTheme } from "../../context/theme";
import { useTheme as useStyledTheme } from "styled-components";
import {
  createRef,
  RefObject,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  boardListStatusSelect,
  boardListBoardListSelect,
  boardListErrorSelect,
  setActiveBoardItem,
  boardListBoardItemSelect,
} from "../../features/boardList/boardListSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { boardListReadAllThunk } from "../../features/boardList/boardListReadAllThunk";
import { GridLoader, PropagateLoader } from "react-spinners";
import { BoardInterface, TaskInterface } from "../../modelnterface";
import {
  updateTaskItem,
  taskListErrorSelect,
  taskListStatusSelect,
  taskListTaskListSelect,
} from "../../features/taskList/taskListSlice";
import { taskListReadAllThunk } from "../../features/taskList/taskListReadAllThunk";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { taskListUpdateThunk } from "../../features/taskList/taskListUpdateThunk";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useForm } from "../../context/form";
import { boardListDeleteThunk } from "../../features/boardList/boardListDeleteThunk";
import {
  LocalAirportOutlined,
  TrainOutlined,
  DirectionsCarOutlined,
  TwoWheelerOutlined,
  DirectionsBusOutlined,
  FlightOutlined,
  SubwayOutlined,
  DirectionsBoatOutlined,
} from "@mui/icons-material";

interface ColumnInterface {
  id: string;
  title: string;
  tasks: TaskInterface[];
}

interface ColumnListInterface {
  [key: string]: ColumnInterface;
}

export const Board = () => {
  const { type: formType, openForm } = useForm();

  const [isLoadingBoardList, setIsLoadingBoardList] = useState(true);
  const [isLoadingTaskList, setIsLoadingTaskList] = useState(true);
  const [columnList, setColumnList] = useState<ColumnListInterface | null>(
    null
  );
  const [itemDragged, setItemDragged] = useState<TaskInterface | null>(null);

  const scrollbarRefs = useRef<{ [key: string]: RefObject<Scrollbars> }>({});
  const boardRef = useRef<HTMLDivElement | null>(null);
  const boardListRef = useRef<HTMLUListElement | null>(null);

  const { isDarkMode, toggleTheme } = useCustomTheme();
  const styledTheme = useStyledTheme();

  const boardListDispatch = useAppDispatch();
  const boardListBoardList = useAppSelector(boardListBoardListSelect);
  const boardListBoardItem = useAppSelector(boardListBoardItemSelect);
  const boardListStatus = useAppSelector(boardListStatusSelect);
  const boardListError = useAppSelector(boardListErrorSelect);

  const taskListDispatch = useAppDispatch();
  const taskListTaskList = useAppSelector(taskListTaskListSelect);
  const taskListStatus = useAppSelector(taskListStatusSelect);
  const taskListError = useAppSelector(taskListErrorSelect);

  const baseBoardId = useId();

  const radioItems = [
    { value: "plane", icon: <LocalAirportOutlined /> },
    { value: "train", icon: <TrainOutlined /> },
    { value: "car", icon: <DirectionsCarOutlined /> },
    { value: "boat", icon: <DirectionsBoatOutlined /> },
    { value: "motorbike", icon: <TwoWheelerOutlined /> },
    { value: "bus", icon: <DirectionsBusOutlined /> },
    { value: "flight", icon: <FlightOutlined /> },
    { value: "subway", icon: <SubwayOutlined /> },
  ];

  const selectBoard = (board: BoardInterface) => {
    boardListDispatch(setActiveBoardItem(board));

    taskListDispatch(taskListReadAllThunk({ boardId: board.id }));
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

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
        },
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
        },
      });
    }

    setItemDragged(updatedMovedTask);
  };

  const handleDeleteBoard = (event: any, board: BoardInterface) => {
    event.stopPropagation();

    if (board) boardListDispatch(boardListDeleteThunk({ item: board }));
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
        setIsLoadingTaskList(true);
        break;

      case "fulfilled":
        const board =
          boardListBoardItem ||
          boardListBoardList?.find((board) => board.default === "true");

        if (!boardListBoardItem && board)
          taskListDispatch(setActiveBoardItem(board));

        if (true)
          taskListDispatch(taskListReadAllThunk({ boardId: board?.id }));

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
        if (boardListBoardItem)
          setColumnList({
            ["column-1"]: {
              id: "column-1",
              title: "Backlog",
              tasks: taskListTaskList!.filter(
                (task) => task.status === "backlog"
              ),
            },
            ["column-2"]: {
              id: "column-2",
              title: "In progress",
              tasks: taskListTaskList!.filter(
                (task) => task.status === "in_progress"
              ),
            },
            ["column-3"]: {
              id: "column-3",
              title: "In review",
              tasks: taskListTaskList!.filter(
                (task) => task.status === "in_review"
              ),
            },
            ["column-4"]: {
              id: "column-4",
              title: "Completed",
              tasks: taskListTaskList!.filter(
                (task) => task.status === "completed"
              ),
            },
          });
        else setColumnList(null);

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
    if (itemDragged) taskListDispatch(updateTaskItem(itemDragged));
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
      if (formType === "task") boardRef.current.setAttribute("inert", "");
      else boardRef.current.removeAttribute("inert");
    }

    if (boardListRef.current) {
      if (formType !== null && ["new-board", "edit-board"].includes(formType))
        boardListRef.current.setAttribute("inert", "");
      else boardListRef.current.removeAttribute("inert");
    }
  }, [formType]);

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
            <BoardList ref={boardListRef}>
              {boardListBoardList?.map((boardItem, index) => (
                <BoardItem
                  key={`${index}-${baseBoardId}`}
                  onClick={() => selectBoard(boardItem)}
                  disabled={isLoadingTaskList}
                  $active={boardItem.id === boardListBoardItem?.id}
                >
                  {boardItem.icon ? (                    
                    <BoardIcon>
                      {radioItems.find((icon) => icon.value === boardItem.icon)?.icon}
                    </BoardIcon>
                  ) : (
                    <></>
                  )}
                  <BoardTitle>{boardItem.title}</BoardTitle>
                  <BoardDeleteIcon
                    className="board__delete"
                    onClick={(event) => handleDeleteBoard(event, boardItem)}
                  />
                </BoardItem>
              ))}
              <AddBoard
                disabled={isLoadingTaskList}
                onClick={() => openForm("new-board")}
              >
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
        {isLoadingBoardList || isLoadingTaskList || !columnList ? (
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
              {Object.entries(columnList).map(([columnId, columnItem]) => (
                <Title key={columnId} $columnId={columnId}>
                  <span />
                  {`${columnItem.title} ${
                    columnItem.tasks.length
                      ? `(${columnItem.tasks.length})`
                      : ""
                  }`}
                </Title>
              ))}
            </ColumnTitlesContainer>
            <DragDropContext onDragEnd={handleDragEnd}>
              {
                <BoardArea ref={boardRef}>
                  {Object.entries(columnList).map(([columnId, columnItem]) => (
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided) => (
                        <BoardColumn
                          {...provided.droppableProps}
                          provided={provided}
                          showAddButton={columnId === "column-1"}
                          tasks={columnItem.tasks}
                          scrollbarRef={scrollbarRefs.current[columnId]}
                        />
                      )}
                    </Droppable>
                  ))}
                </BoardArea>
              }
            </DragDropContext>
          </>
        )}
      </MainArea>
    </Grid>
  );
};

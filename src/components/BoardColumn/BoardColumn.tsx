import { useId, RefObject, useState } from "react";
import { Task } from "../Task/Task";
import { AddTask, Column } from "./BoardColumn.styled";
import { IoAddOutline } from "react-icons/io5";
import { TaskInterface } from "../../modelnterface";
import { Draggable } from "@hello-pangea/dnd";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useForm } from "../../context/form";

interface BoardColumnInterface {
  showAddButton?: boolean;
  tasks: TaskInterface[];
  provided: any;
  scrollbarRef: RefObject<Scrollbars>;
}

export const BoardColumn = ({
  tasks,
  showAddButton = false,
  provided,
  scrollbarRef
}: BoardColumnInterface) => {
  const baseTaskId = useId();

  const { openForm } = useForm();

  return (
    <Scrollbars
      ref={scrollbarRef}
      style={{
        flex: "1",
        width: "100%",
        height: "100%",
      }}
      renderTrackVertical={({style, ...props}) => (
        <div
          {...props}
          style={{
            ...style,
            width: "6px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            right: "2px",
            bottom: "2px",
            top: "2px",
            borderRadius: "1em",
          }}/>
        )
      }
    >
      <Column ref={provided.innerRef}>
        {tasks.map((task, index) => (
          <Draggable
            key={task.id}
            draggableId={task.id.toString()}
            index={index}
          >
            {(provided, snapshot) => (
              <Task
                ref={provided.innerRef}
                key={`${index}-${baseTaskId}`}
                draggableProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps}
                snapshot={snapshot}
                task={task}
              />
            )}
          </Draggable>
        ))}

        {provided.placeholder}

        {showAddButton && (
            <AddTask onClick={() => openForm("task")}>
              Add task <IoAddOutline />
            </AddTask>
        )}
      </Column>
    </Scrollbars>
  );
};

import { forwardRef, useId } from "react";
import { Task } from "../Task/Task";
import { AddTask, Column } from "./BoardColumn.styled";
import { IoAddOutline } from "react-icons/io5";
import { TaskInterface } from "../../modelnterface";
import { Draggable } from "@hello-pangea/dnd";
import { Scrollbars } from "react-custom-scrollbars-2";


interface BoardColumnInterface {
  showAddButton?: boolean;
  tasks: TaskInterface[];
  provided: any;
  snapshot: any;
}

export const BoardColumn = forwardRef(
  ({ tasks, showAddButton = false, provided, snapshot }: BoardColumnInterface, ref) => {
    const baseTaskId = useId();

    return (
      <Scrollbars style={{ 
          width: "100%", 
          height: "100%",
          flex: "1",
        }}>
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
                  description={task.description}
                />
              )}
            </Draggable>
          ))}

          {provided.placeholder}

          {showAddButton && (
            <AddTask>
              Add task <IoAddOutline />
            </AddTask>
          )}
        </Column>
      </Scrollbars>
    );
  }
);

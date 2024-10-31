import { forwardRef } from "react";
import { TagButton } from "../TagButton.styled";
import { Container, Image } from "./Task.styled";
import { useForm } from "../../context/form";
import { useAppDispatch } from "../../app/hooks";
import { setActiveTaskItem } from "../../features/taskList/taskListSlice";
import { TaskInterface } from "../../modelnterface";

interface TaskComponentInterface {
  task: TaskInterface;
  draggableProps: any;
  dragHandleProps: any;
  snapshot: any;
}

export const Task = forwardRef<HTMLDivElement, TaskComponentInterface>(
  ({ task, draggableProps, dragHandleProps, snapshot }, ref) => {
    const { openForm } = useForm();

    const taskListDispatch = useAppDispatch();    

    const handleClick = () => {
      taskListDispatch(setActiveTaskItem(task));
      
      openForm("task");
    }
    
    return (
      <Container
        ref={ref}
        {...draggableProps}
        {...dragHandleProps}
        style={{
          ...draggableProps.style,
          userSelect: 'none',
          opacity: snapshot.isDragging ? 0.4 : 1,
        }}
        onClick={handleClick}
      >
        <Image
          src="https://i.blogs.es/6f44dd/google-2015-1/1366_2000.jpg"
          alt=""
        />
        <p>{task.title}</p>
        <TagButton>Frontend</TagButton>
      </Container>
    );
  }
);

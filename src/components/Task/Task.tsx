import { forwardRef } from "react";
import { TagButton } from "../TagButton.styled";
import { Container, Image } from "./Task.styled";

interface TaskInterface {
  description: string;
  draggableProps: any;
  dragHandleProps: any;
  snapshot: any;
}

export const Task = forwardRef<HTMLDivElement, TaskInterface>(
  ({ description, draggableProps, dragHandleProps, snapshot }, ref) => {
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
      >
        <Image
          src="https://i.blogs.es/6f44dd/google-2015-1/1366_2000.jpg"
          alt=""
        />
        <p>{description}</p>
        <TagButton>Frontend</TagButton>
      </Container>
    );
  }
);

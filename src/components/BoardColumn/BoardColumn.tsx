import { useEffect, useId, useState } from "react";
import { Task } from "../Task/Task";
import { AddTask, Column, Title } from "./BoardColumn.styled";
import { IoAddOutline } from "react-icons/io5";
import { TaskInterface } from "../../modelnterface";

interface BoardColumnInterface {
  title: string,
  color: string,
  showAddButton?: boolean,
  tasks: TaskInterface[],
}

export const BoardColumn = ({title, color, tasks, showAddButton = false}: BoardColumnInterface)  => {
  const baseTaskId = useId();

  return (
    <Column>
      <Title $color={color}><span/>{ title }</Title>
      { 
        tasks.map(({description}, index) => (
          <Task key={`${index}-${baseTaskId}`} description={description}/>
        ))
      }
      {
        showAddButton 
        ? <AddTask>Add task <IoAddOutline/></AddTask>
        : <></>
      }
    </Column>
  )
}
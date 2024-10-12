import { Task } from "../Task/Task";
import { Column, Title } from "./BoardColumnStyled";


export const BoardColumn = () => {

  return (
    <Column>
      <Title><span/>Backlog (2)</Title>
      <Task/>
      <Task/>
    </Column>
  )
}
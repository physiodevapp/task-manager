import { TagButton } from "../TagButton.styled";
import { Container, Image } from "./Task.styled";

interface TaskInterface {
  description: string,
}

export const Task = ({description}: TaskInterface) => {

  return (
    <Container>
      <Image src="https://i.blogs.es/6f44dd/google-2015-1/1366_2000.jpg" alt="" />
      <p>{description}</p>
      <TagButton>Frontend</TagButton>
    </Container>
  )
}
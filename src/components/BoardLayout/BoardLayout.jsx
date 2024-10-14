import { Grid, MainArea, SideArea } from "./BoardLayoutStyled";
import { BoardColumn } from "../BoardColumn/BoardColumn"

export const BoardLayout =  () => {

  return (
    <>
      <Grid>
        <SideArea/>
        <MainArea>
          <BoardColumn/>
          <BoardColumn/>
          <BoardColumn/>
          <BoardColumn/>
        </MainArea>
      </Grid>
    </>
  )
}

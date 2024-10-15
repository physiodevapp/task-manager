import { BoardItem, BoardListContainer, BoardList, BoardListTitle, CurrentThemeMarker, Grid, MainArea, SideArea, ThemeButton, ThemeContainer } from "./BoardLayoutStyled";
import { BoardColumn } from "../BoardColumn/BoardColumn"
import { CiDark, CiLight } from "react-icons/ci";
import { useTheme } from "../../context/theme";

export const BoardLayout =  () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <Grid>
        <SideArea>
          <BoardListContainer>
            <BoardListTitle>My boards</BoardListTitle>
            <BoardList>
              <BoardItem>Board 1</BoardItem>
              <BoardItem>Board 2</BoardItem>
              <BoardItem>Board 3</BoardItem>
            </BoardList>
          </BoardListContainer>
          <ThemeContainer>
            <CurrentThemeMarker $isDarkMode={isDarkMode}/>
            <ThemeButton onClick={toggleTheme}><CiDark />Dark</ThemeButton>
            <ThemeButton onClick={toggleTheme}><CiLight />Light</ThemeButton>
          </ThemeContainer>
        </SideArea>
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

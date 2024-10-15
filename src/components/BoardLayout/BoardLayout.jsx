import { CurrentThemeMarker, Grid, MainArea, SideArea, ThemeButton, ThemeContainer } from "./BoardLayoutStyled";
import { BoardColumn } from "../BoardColumn/BoardColumn"
import { CiDark, CiLight } from "react-icons/ci";
import { useTheme } from "../../context/theme";

export const BoardLayout =  () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <Grid>
        <SideArea>
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

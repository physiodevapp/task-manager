import { useState, useContext, createContext, ReactNode, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from '../styles/GloblalStyles';
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

interface ThemeContextInterface {
  isDarkMode: boolean,
  toggleTheme: () => void,
}

const ThemeContext = createContext<ThemeContextInterface | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error ("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}

interface ThemeContextProviderProps {
  children: ReactNode
}

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') !== 'light');

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';

    setIsDarkMode((prevMode) => !prevMode);

    localStorage.setItem('theme', newTheme);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      background: {
        default: theme.primary,
        paper: theme.secondary
      },
      text: {
        primary: theme.tertiary
      }
    }
  })
  
  useEffect(() => {
    if (!isDarkMode)
      document.documentElement.classList.remove('dark-mode');
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      <StyledThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
            <GlobalStyles/>
            { children }
        </MuiThemeProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
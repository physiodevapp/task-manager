import { useState, useContext, createContext } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from '../styles/GloblalStyles';


const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error ("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}

export const ThemeContextProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
        { children }
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
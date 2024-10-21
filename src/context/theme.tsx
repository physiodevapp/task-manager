import { useState, useContext, createContext, ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from '../styles/GloblalStyles';

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
  
  useEffect(() => {
    if (!isDarkMode)
      document.documentElement.classList.remove('dark-mode');
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
        { children }
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.tertiary};
    font-family: 'Poppins', sans-serif;
    transition: all 0s ease-in-out;
  }
`

export const lightTheme = {
  primary: '#ededed',
  secondary: '#ffffff',
  tertiary: '#444452'
}

export const darkTheme = {
  primary: '#030616',
  secondary: '#2a2d32',
  tertiary: '#dde4ee'
}
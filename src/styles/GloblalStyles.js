import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    font-family: 'Poppins', sans-serif;
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`

export const lightTheme = {
  body: '#ffffff',
  text: '#444452'
}

export const darkTheme = {
  body: '#0f172a',
  text: '#dde4ee'
}
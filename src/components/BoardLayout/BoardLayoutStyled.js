import styled from "styled-components";
import { ActionButton } from "../ActionButtonStyled";


export const Grid = styled.div`
  height: 100vh;
  width: 100%;
  padding: 1rem 1rem;
  display: grid;
  grid-template-columns: 300px auto;
  transform: translateX(0);
  overflow: hidden;
  gap: 1em;
  transition: grid-template-columns 0.4s ease-in-out;

  &:hover {
    ${'' /* grid-template-columns: 0px auto; */}
  }
`

export const SideArea = styled.aside`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: space-around;
  flex-wrap: wrap;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.primary};
`

export const MainArea = styled.main`
  background-color: ${({theme}) => theme.secondary};
  border-radius: 1rem;
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1em 1em;
  overflow-y: auto;
`

export const ThemeContainer = styled.div`
  width: 100%;
  background-color: ${({theme}) => theme.secondary};
  padding: 0.8em;
  border-radius: 1em;
  position: relative;
  gap: 0.6em;
  display: flex;
`

export const ThemeButton = styled(ActionButton)`  
  width: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  background-color: transparent;
  color: ${({theme}) => theme.tertiary};

  svg {
    font-size: 1.4em;
    margin-right: 0.2em;
  }
`

export const CurrentThemeMarker = styled.span`
  position: absolute;
  top: 50%;
  left: 0.6em;
  transform: ${({$isDarkMode}) => `translate(${$isDarkMode ? 0 : 100}%, -50%)`};
  padding: 1.8em;
  border-radius: 1em;
  border: ${({theme}) => `2px solid ${theme.tertiary}`};
  background-color: transparent;
  width: calc(50% - 0.6em);
  transition: all 0.3s ease-out;
  opacity: ${({$isDarkMode}) => $isDarkMode ? 1 : 0.2}
`
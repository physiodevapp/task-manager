import styled, { DefaultTheme } from "styled-components";
import { ActionButton } from "../../components/ActionButton.styled";


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
`

export const SideArea = styled.aside`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  flex-wrap: wrap;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.primary};
  position: relative;
`

export const MainArea = styled.main`
  background-color: ${({theme}) => theme.secondary};
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const BoardArea = styled.section`
  display: flex;
  gap: 0.2em;
  padding: 3em 1em 1em;
  overflow: hidden;
  height: 100%;
  flex: 1;
`
interface ThemeContainerInterface {
  $isDarkMode: boolean
}

export const ThemeContainer = styled.div<ThemeContainerInterface>`
  width: 100%;
  background-color: ${({theme}) => theme.secondary};
  padding: 0.8em;
  border-radius: 1em;
  position: relative;
  gap: 0.6em;
  display: flex;

  > button:first-of-type {
    &:hover {
      background-color: ${({theme, $isDarkMode}) => $isDarkMode ? 'transparent' : theme.primary};
    } 
  }

  > button:last-of-type {
    &:hover {
      background-color: ${({theme, $isDarkMode}) => !$isDarkMode ? 'transparent' : theme.primary};
    } 
  }
`

export const ThemeButton = styled(ActionButton)`  
  width: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  background-color: transparent;
  color: ${({theme}) => theme.tertiary};
  border-radius: 0.6em;

  &:hover {
    cursor: pointer;
  }

  svg {
    font-size: 1.4em;
    margin-right: 0.2em;
  }
`

interface CurrentThemeMarkerInterface {
  $isDarkMode: boolean;
}

export const CurrentThemeMarker = styled.span<CurrentThemeMarkerInterface>`
  position: absolute;
  top: 50%;
  left: 0.7em;
  transform: ${({$isDarkMode}) => `translate(${$isDarkMode ? 0 : 105}%, -50%)`};
  padding: 1.6em;
  border-radius: 0.8em;
  border: ${({theme}) => `2px solid ${theme.tertiary}`};
  background-color: transparent;
  width: calc(50% - 0.9em);
  transition: all 0.4s ease-out;
  opacity: ${({$isDarkMode}) => $isDarkMode ? 1 : 0.2}
`

export const BoardListContainer = styled.div`
  width: 100%;
`

export const BoardListTitle = styled.h4`
  margin: 0.4em 0em 1.4em;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`

export const BoardList = styled.ul`
  width: 100%;
  list-style: none;

  button:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

interface BoardItemInterface {
  $active: boolean
}

export const BoardItem = styled(ActionButton)<BoardItemInterface>`
  width: 100%;
  margin: 0em 0em 1em;
  background-color: ${({theme, $active}) => `${$active ? theme.secondary: 'transparent'}`};
  color: ${({theme}) => theme.tertiary};
  font-size: 1.2em;
  border: ${({theme, $active}) => `2px ${$active ? 'solid' : 'dotted'} ${theme.tertiary}`};
  border-radius: 2em;


  &:not(:disabled):hover {
    border-style: solid;
    cursor: pointer;
    font-weight: bold;
  }
`

export const AddBoard = styled(ActionButton)`
  width: 100%;
  background-color: transparent;
  color: ${({theme}) => theme.tertiary};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  border-radius: 2em;

  svg {
    margin-right: 0.6em;
  }

  &:not(:disabled):hover {
    cursor: pointer;
    background-color: ${({theme}) => theme.secondary}
  }
`

export const ColumnTitlesContainer = styled.ul`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0em 1em;
  list-style: none;
  gap: 1em;
`

interface TitleInterface {
  $columnId: string,
}

const setTitleColor = (columnId: string, theme: DefaultTheme): string => {
  switch (columnId) {
    case 'column-1':
      return 'red';
    case 'column-2':
      return 'yellow'
    case 'column-3':
      return '#fb3afb';
    case 'column-4':
      return '#1bef1b';  
    default:
      return theme.tertiary;
  }
}

export const Title = styled.li<TitleInterface>`
  flex: 1;
  padding: 1em 0em;

  span {
    display: inline-block;
    width: 0.6em;
    height: 0.6em;
    background: ${({theme, $columnId}) => setTitleColor($columnId, theme)};
    border-radius: 1em;
    margin: 0em 0.6em 0em 0em;
  }
`

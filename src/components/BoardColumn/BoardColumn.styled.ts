import styled from "styled-components";
import { ActionButton } from "../ActionButton.styled";


export const Column = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 1em;
`

interface TitleInterface {
  $color: string,
}

export const Title = styled.h4<TitleInterface>`
  position: sticky;

  span {
    display: inline-block;
    width: 0.6em;
    height: 0.6em;
    background: ${({$color}) => $color};
    border-radius: 1em;
    margin: 0em 0.6em 0em 0em;
  }
`

export const AddTask = styled(ActionButton)`
width: 100%;
  background-color: #c3dafa;
  color: #5b7bdd;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8em 1.2em;
  font-weight: bold;
  font-size: 1em;

  svg {
    font-size: 1.4em;
    
  }

  &:hover {
    cursor: pointer;
    background-color: #5b7bdd;
    color: #c3dafa;
  }
`
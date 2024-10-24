import styled from "styled-components";
import { ActionButton } from "../ActionButton.styled";

export const Column = styled.section`
  // flex: 1;
  // overflow-y: auto;
  // position: relative;
  min-height: calc(100% - 20px);
  padding-right: 0.8em;

  article {
    margin: 0em 0em 1em;
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
  transform: none !important;

  svg {
    font-size: 1.4em;
    
  }

  &:hover {
    cursor: pointer;
    background-color: #5b7bdd;
    color: #c3dafa;
  }
`
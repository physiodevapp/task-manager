import styled from "styled-components";


export const Column = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 1em;
`

export const Title = styled.h4`
  color: white;
  position: sticky;

  span {
    display: inline-block;
    width: 0.6em;
    height: 0.6em;
    background: red;
    border-radius: 1em;
    margin: 0em 0.6em 0em 0em;
  }
`
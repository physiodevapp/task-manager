import styled from "styled-components";


export const Grid = styled.div`
  height: 100vh;
  width: 100%;
  padding: 1rem 1rem;
  background-color: black;
  display: grid;
  grid-template-columns: 300px auto;
  transform: translateX(0);

  transition: grid-template-columns 0.4s ease-in-out;

  &:hover {
    grid-template-columns: 0px auto;
  }

  & main {
    border-radius: 1rem;
  }
`

export const SideArea = styled.aside`
  ${'' /* background-color: red; */}
`

export const MainArea = styled.main`
  background-color: yellow;
`
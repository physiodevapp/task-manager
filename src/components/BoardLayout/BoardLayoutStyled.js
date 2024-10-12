import styled from "styled-components";


export const Grid = styled.div`
  height: 100vh;
  width: 100%;
  padding: 1rem 1rem;
  background-color: #030616;
  display: grid;
  grid-template-columns: 300px auto;
  transform: translateX(0);
  overflow: hidden;

  transition: grid-template-columns 0.4s ease-in-out;

  &:hover {
    ${'' /* grid-template-columns: 0px auto; */}
  }
`

export const SideArea = styled.aside`
  height: 100%;
`

export const MainArea = styled.main`
  background-color: #2a2d32;
  border-radius: 1rem;
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1em 1em;
  overflow-y: auto;
`
import styled from "styled-components";


export const Container = styled.article`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;

  border-radius: 1rem;
  background-color: #030616;
  color: white;
  padding: 1em;
`

export const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 1em;
`
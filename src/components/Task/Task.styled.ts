import styled from "styled-components";


export const Container = styled.article`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  background-color: ${({theme}) => theme.primary};
  border-radius: 1rem;
  padding: 1em;
`

export const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 1em;
`
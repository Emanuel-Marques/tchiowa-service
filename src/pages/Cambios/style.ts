import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  background-color: #35383F;
  span {
     color: #96EB95;
  }
`;

export const Cotacoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  background-color: #35383F;
  border-radius: 20px;
  width: 1000px;
  h1 {
    font-size: 40px;
  }
  margin: auto;
  text-align: center;
`;

export const InfoCotacoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #2A2D32;
  border-radius: 5px;
  width:150px;
  height: 44px;
  padding: 5px;
  margin: 10px;
  p {
    color: #FFE713;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content:space-around;
  padding: 40px;
  input, select {
    padding: 15px;
    background-color: #3A3E44;
    border: none;
    border-radius: 7px;
    color: white;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
  }
  section{
    display: flex;
    align-item: start;
    flex-flow: column;
    gap: 10px;
  }
  h1 {
    color: #96EB95; 
  }
`;
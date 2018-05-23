import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background-color: #0eb5d1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px;
  color: white;
`;

export const HeaderItem = styled.div`
  display: inline-block;
  padding: 0 15px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  cursor: pointer;
`;

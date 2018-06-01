import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background-color: ${props => props.theme.colours.unoBlue};
  display: flex;
  justify-content: center;
  padding: 25px;
  color: ${props => props.theme.colours.white};
`;

export const HeaderContent = styled.div`
  flex: 0 1 960px;
  display: flex;
  justify-content: space-between;
`;

export const HeaderItem = styled.div`
  display: inline-block;
  padding: 0 15px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  cursor: pointer;
`;

export const LayoutContainer = styled.div`
  max-width: 960px;
  margin: 50px auto;
  height: 75vh;
  display: flex;
  flex-direction: row;
`;

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
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  cursor: pointer;
`;

// The calc in min-height below just subtracts the padding to avoid
// unrequired scroll bars.
export const LayoutContainer = styled.div`
  min-height: calc(100vh - 40px);
  background-color: white;
  padding: 20px;
`;

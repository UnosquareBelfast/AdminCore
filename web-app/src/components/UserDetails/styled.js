import styled from 'styled-components';

export const StyleContainer = styled.div`
  strong {
    display: block;
    margin-bottom: 0px;
  }

  p {
    border-top: 1px solid ${({theme}) => theme.colours.grey}
    margin: 10px 0 0 0;
    padding: 10px 0 0 0;
  }
  
  svg { 
    margin-right: 10px;
  }
`;

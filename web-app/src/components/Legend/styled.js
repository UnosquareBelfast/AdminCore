import styled from 'styled-components';

export const StyleContainer = styled.div`
  strong {
    display: block;
    margin-bottom: 10px;
  }
`;

export const Key = styled.div`
  background-color: ${props => props.theme.holidayStatus[props.status]};
  color: white;
  margin: 4px 0;
  padding-left: 5px;
  border-radius: 3px;
  padding: 3px 5px;
`;

import styled from 'styled-components';

export const StyleContainer = styled.div`
  display: flex;
  margin-top: 10px;

  svg {
    margin-right: 10px;
  }

  div {
    margin-right: 10px;

    :last-of-type {
      margin-right: 0;
    }
  }
`;

export const Key = styled.div`
  flex: 1;
  background-color: ${props => props.theme.holidayStatus[props.status]};
  color: white;
  font-size: 14px;
  margin: 4px 0;
  padding-left: 5px;
  border-radius: 3px;
  padding: 3px 5px;
`;

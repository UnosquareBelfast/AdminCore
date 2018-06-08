import styled from 'styled-components';

export const Key = styled.div`
  border-left: 8px solid ${props => props.theme.holidayStatus[props.status]};
  margin: 2px 0;
  padding-left: 5px;
  font-size: 12px;
`;

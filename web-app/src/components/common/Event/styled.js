import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.theme.holidayStatus[props.status]};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  padding: 3px;
  color: white;
  font-size: 12px;
  border-radius: 2px;
`;

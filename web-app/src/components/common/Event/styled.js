import styled from 'styled-components';

export const Container = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  padding: 3px;
  color: white;
  font-size: 12px;
  border-radius: 2px;
  background: ${props => props.theme.holidayStatus[props.status]};
  opacity: ${({ fade }) => (fade ? 0.4 : 1)};

  span {
    padding: 0 10px 0 2px;
  }

  &.ishalfday {
    background: linear-gradient(
      to top,
      ${props => props.theme.holidayStatus[props.status]} 0%,
      ${props => props.theme.holidayStatus[props.status]} 50%,
      ${props => props.theme.holidayStatus[props.status]}CC 51%,
      ${props => props.theme.holidayStatus[props.status]}CC 100%
    );
  }
`;

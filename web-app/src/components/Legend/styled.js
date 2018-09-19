import styled from 'styled-components';

export const StyleContainer = styled.div`
  min-width: 200px;
  box-sizing: border-box;
  border-top: none;
  margin-top: 66px;

  h3 {
    margin: 0;
  }
  h4 {
    margin: 20px 0 10px 0;
    :first-of-type {
      margin: 10px 0 10px 0;
    }
  }
`;

export const Key = styled.div`
  user-select: none;
  box-sizing: border-box;
  background-color: white;
  background-color: ${props => props.theme.holidayStatus[props.status]};
  border: 2px solid ${props => props.theme.holidayStatus[props.status]};
  color: white;
  font-weight: ${props => props.theme.fonts.weight.regular};
  margin: 0px 4px 4px 0;
  border-radius: 3px;
  padding: 8px;
  cursor: pointer;
  transition: all 150ms;

  svg {
    margin-right: 10px;
  }

  &:hover {
    opacity: 0.9;
  }

  &.selected {
    box-shadow: inset 0 0 0 2px white;
  }

  &.holidayStatus {
    background-color: ${props => props.theme.holidayStatus[props.status]};
    border: 2px solid ${props => props.theme.holidayStatus[props.status]};
  }

  &.eventType {
    background-color: ${props => props.theme.eventType[props.status]};
    border: 2px solid ${props => props.theme.eventType[props.status]};
  }
`;

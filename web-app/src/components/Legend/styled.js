import styled from 'styled-components';

export const StyleContainer = styled.div`
  box-sizing: border-box;
  background-color: ${props => props.theme.colours.lightgrey};
  border: 2px solid ${props => props.theme.colours.grey};
  border-radius: 6px;
  width: 100%;
  padding: 20px 10px;
  margin: 10px 0 100px 0;
  display: block;
  @media (min-width: 1300px) {
    display: flex;
    max-width: 720px;
    margin-left: calc(100% - 720px);
  }

  svg {
    margin-right: 10px;
  }
`;

export const Column = styled.div`
  width: 100%;
  padding: 25px 10px 0 10px;
  box-sizing: border-box;
  display: block;
  position: relative;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    display: flex;
  }
  @media (min-width: 1300px) {
    width: 50%;
    margin-bottom: 0;
  }

  h4 {
    display: block;
    width: 100%;
    margin: 0 0 10px 0;
    position: absolute;
    left: 10px;
    top: 0;
  }
`;

export const Key = styled.div`
  background-color: white;
  background-color: ${props => props.theme.holidayStatus[props.status]};
  border: 1px solid ${props => props.theme.holidayStatus[props.status]};
  color: white;
  font-size: 14px;
  font-weight: 400;
  margin: 4px 4px 4px 0;
  padding-left: 5px;
  border-radius: 3px;
  padding: 3px 5px;
  align-self: auto;
  cursor: pointer;
  transition: all 300ms;
  box-shadow: 1px 1px 6px 0px rgba(50, 50, 50, 1);
  @media (min-width: 768px) {
    flex: 1 0 25%;
  }

  &:hover {
    opacity: 0.9;
  }

  &.selected {
    box-shadow: inset 1px 1px 6px 0px rgba(50, 50, 50, 0.6);
  }
`;

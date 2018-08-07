import styled from 'styled-components';

export const StyleContainer = styled.div`
  box-sizing: border-box;
  background-color: ${props => props.theme.colours.lightgrey};
  border: 1px solid ${props => props.theme.colours.grey};
  border-top: none;
  width: 100%;
  padding: 20px 10px 0 10px;
  display: block;
  @media (min-width: 1220px) {
    display: flex;
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
  @media (min-width: 1520px) {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0;
  }

  :nth-child(1) {
    padding-top: 0;
  }

  > div {
    flex: 1 1 40%;

    span {
      display: inline-block;
      vertical-align: sub;
    }
  }

  h4 {
    display: block;
    width: 100%;
    margin: 0 0 10px 0;
    position: absolute;
    left: 10px;
    top: 0;
  }

  form {
    display: block;
    width: 100%;
  }

  label {
    margin-bottom: 10px;
    font-size: 16px;
    font-family: Oswald, sans-serif;
  }
`;

export const Key = styled.div`
  box-sizing: border-box;
  background-color: white;
  background-color: ${props => props.theme.holidayStatus[props.status]};
  border: 2px solid ${props => props.theme.holidayStatus[props.status]};
  color: white;
  font-size: 12px;
  font-weight: 400;
  margin: 4px 4px 4px 0;
  border-radius: 3px;
  padding: 8px;
  align-self: auto;
  cursor: pointer;
  transition: all 150ms;
  &:hover {
    opacity: 0.9;
  }

  &.selected {
    box-shadow: inset 0 0 0 2px white;
  }
`;

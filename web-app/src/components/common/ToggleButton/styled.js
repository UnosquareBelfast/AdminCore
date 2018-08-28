import styled from 'styled-components';

export const ButtonToggle = styled.div`
  display: flex;

  button {
    box-sizing: border-box;
    color: ${props => props.theme.colours.darkGrey};
    font-size: 12px;
    font-weight: 400;
    padding: 8px;
    cursor: pointer;
    -webkit-transition: all 150ms;
    transition: all 150ms;
    background-color: ${props => props.theme.colours.lightgrey};
    border: 1px solid ${props => props.theme.colours.grey};

    &:first-of-type {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-of-type {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }

    span {
      margin-right: 6px;
    }

    &:focus {
      outline: 0;
    }

    &:hover {
      background-color: ${props => props.theme.colours.grey};
    }

    &.active {
      background-color: ${props => props.theme.colours.unoBlue};
      border: 1px solid ${props => props.theme.colours.unoBlue};
      color: ${props => props.theme.colours.white};

      &:hover {
        background-color: ${props => props.theme.colours.unoBlue};
      }
    }
  }
`;

import styled from 'styled-components';

export const ButtonToggle = styled.div`
  position: absolute;
  left: calc(50% - 111px);
  top: 40px;
  display: flex;
`;

export const InnerLayout = styled.div`
  width: 100%;
  height: 100%;

  .rbc-calendar {
    height: 800px;
  }

  .rbc-show-more {
    background-color: ${props => props.theme.colours.grey};
    color: ${props => props.theme.colours.darkGrey};
    transition: 0.1s all ease-in-out;
    border-radius: 2px;
    padding: 4px 5px;
    margin: 1px 2px;
    text-decoration: none;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.6);
    }
  }

  .rbc-header {
    padding: 10px 3px;
    background: ${props => props.theme.colours.unoBlue};
    color: white;
    border: none !important;
  }

  .rbc-off-range-bg {
    background: ${props => props.theme.colours.lightgrey};
    cursor: not-allowed;
  }

  .rbc-off-range a {
    color: ${props => props.theme.colours.grey} !important;
  }

  .rbc-date-cell {
    padding: 4px 5px;
    a {
      color: ${props => props.theme.colours.unoBlue};
      font-weight: bold;
    }
  }

  .rbc-today {
    background-color: ${props => props.theme.colours.lightBlue};
  }
`;

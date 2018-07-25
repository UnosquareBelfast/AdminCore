import styled from 'styled-components';

export const InnerLayout = styled.div`
  width: 100%;
  height: 100%;

  .rbc-calendar {
    height: 700px;
  }

  .rbc-header {
    padding: 10px 3px;
    background: ${props => props.theme.colours.unoBlue};
    color: white;
  }

  .rbc-off-range-bg {
    background: ${props => props.theme.colours.grey};
    border-left: 1px solid transparent !important;
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

import styled from 'styled-components';

export const HolidayTable = styled.table`
  width: 100%;

  tr:nth-child(even) {
    background-color: ${props => props.theme.colours.lightgrey};
  }

  tr td:last-of-type {
    text-align: right;
  }

  th {
    text-align: left;
  }

  button {
    border: none;
    background: ${props => props.theme.colours.unoBlue};
    color: white;
    padding: 3px 10px;
    margin: 2px 5px 2px 0;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background: ${props => props.theme.colours.darkBlue};
  }
`;

export const StatusDot = styled.div`
  display: inline-block;
  position: relative;
  top: -2.5px;
  margin-right: 7px;
  height: 7px;
  width: 7px;
  border-radius: 7px;
  background: ${({ theme, status }) => theme.holidayStatus[status]};
`;

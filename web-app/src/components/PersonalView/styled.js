import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
  div {
    flex: 1;
  }
`;

export const YourHolidays = styled.div`
  h3 {
    margin-top: 0px;
    margin-bottom: 5px;
  }
`;

export const EmployeeStyleContainer = styled.div`
  h3 {
    margin-bottom: 5px;
  }
`;

export const EventTable = styled.table`
  width: 100%;
  margin-bottom: 15px;

  :last-of-type {
    margin-bottom: 0px;
  }

  tr:nth-child(even) {
    background-color: ${props => props.theme.colours.lightgrey};
  }

  th {
    text-align: left;
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

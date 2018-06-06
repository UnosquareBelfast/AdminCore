import styled from 'styled-components';

export const UserTable = styled.table`
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

  button:last-of-type {
    background: ${props => props.theme.colours.red};
  }

  button:hover {
    background: ${props => props.theme.colours.darkBlue};;
  }

  button:last-of-type:hover {
    background: ${props => props.theme.colours.darkRed};;
  }

  }}
  }
`;

export const ActiveDot = styled.div`
  display: inline-block;
  position: relative;
  top: -2.5px;
  margin-right: 7px;
  height: 7px;
  width: 7px;
  border-radius: 7px;
  background: ${({ theme, active }) =>
    active ? theme.colours.green : theme.colours.red};
`;

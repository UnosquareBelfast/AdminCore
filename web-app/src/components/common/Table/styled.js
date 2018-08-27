import styled from 'styled-components';

export const TableCSS = styled.table`
  display: table;
  border-collapse: separate;
  border-spacing: 2px;
  border-color: grey;
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  table-layout: fixed;

  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }

  th,
  td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  tr:nth-child(even) {
    background-color: ${props => props.theme.colours.lightgrey};
    &:hover {
      background-color: ${props => props.theme.colours.lightBlue};
    }
  }

  tr td:last-of-type {
    text-align: right;
  }

  th {
    text-align: left;
  }

  tbody tr {
    &:hover {
      background-color: ${props => props.theme.colours.lightBlue};
      cursor: default;
    }
  }

  button {
    border: none;
    background: ${props => props.theme.colours.unoBlue};
    color: white;
    padding: 0px 10px;
    margin: 2px 5px 2px 0;
    border-radius: 3px;
    cursor: pointer;
    min-width: 100px;
    height: 30px;
    line-height: 30px;
  }

  button.error {
    background: ${props => props.theme.colours.red};
    &:hover {
      background: ${props => props.theme.colours.darkRed};
    }
  }

  button.success {
    background: ${props => props.theme.colours.green};
    &:hover {
      background: ${props => props.theme.colours.green};
    }
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

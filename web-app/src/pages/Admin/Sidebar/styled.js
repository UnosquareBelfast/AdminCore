import styled from 'styled-components';

export const SidebarHeader = styled.h3`
  padding: 0;
  margin: 0;
`;

export const SidebarList = styled.ul`
  margin: 0;
  padding: 10px 0 30px 0;

  li {
    list-style: none;
    border: 0.5px solid lightgrey;
    border-top: 0;
    cursor: pointer;
    overflow: hidden;
    a {
      display: block;
      padding: 10px 20px;
      width: 100%;
      height: 100%;
      color: black;
      text-decoration: none;
    }
  }

  li:hover {
    background-color: ${props => props.theme.colours.lightgrey};
  }

  li:first-of-type {
    border-top: 0.5px solid lightgrey;
    border-radius: 5px 5px 0 0;
  }

  li:last-of-type {
    border-radius: 0 0 5px 5px;
  }
`;

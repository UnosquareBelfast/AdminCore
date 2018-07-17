import styled from 'styled-components';

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

export const ActionWrap = styled.div`
  text-align: right;
`;

export const ButtonStyle = styled.div`
  display: inline-block;

  button {
    border: none;
    padding: 5px 10px;
    margin: 2px 5px 2px 0;
    background: ${props => props.color || props.theme.colours.unoBlue};
    color: white;
    border-radius: 3px;
    cursor: pointer;
    text-transform: capitalize;
  }

  button:hover {
    background: ${props => props.hoverColor || props.theme.colours.darkBlue};
  }
`;

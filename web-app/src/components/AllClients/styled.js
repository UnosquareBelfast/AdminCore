import styled from 'styled-components';

export const CTA = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 20px 0;

  button {
    width: auto;
    margin-left: 10px;
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

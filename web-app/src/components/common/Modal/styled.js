import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: white;
  padding: 15px;
  border-radius: 4px;
  margin-top: -10%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  min-width: 300px;
  max-width: 600px;
  width: 50%;

  span {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
  }
`;

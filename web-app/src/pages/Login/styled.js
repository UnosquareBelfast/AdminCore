import styled from 'styled-components';

export const LoginBG = styled.div`
  background-color: ${props => props.theme.colours.unoBlue};
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginPanel = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 40px;

  h1 {
    margin: 0 0 20px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 20px 15px;
    box-sizing: border-box;
    width: 420px;
  }
`;

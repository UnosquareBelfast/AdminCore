import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const MainContentContainer = styled.div`
  margin-left: 10px;
  flex: 3.5;
  h3 {
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 20px;
  }
`;

export const Refresh = styled.p`
  display: inline;
  text-decoration: underline;
  cursor: pointer;
  color: grey;
`;

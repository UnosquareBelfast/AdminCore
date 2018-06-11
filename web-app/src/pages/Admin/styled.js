import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const MainContentContainer = styled.div`
  margin-left: 1rem;
  flex: 3;
  h3 {
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 20px;
  }
`;

export const Refresh = styled.p`
  display: inline;
  text-decoration: underline;
  font-size: 0.8em;
  cursor: pointer;
  color: grey;
`;

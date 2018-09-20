import styled from 'styled-components';

export const NoticeAlert = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  span {
    font-weight: bold;
  }
  svg {
    position: relative;
    top: 10px;
    margin-right: 8px;
  }
  p {
    margin: 0 0 5px 0;
    :last-of-type {
      margin-left: 26px;
    }
  }
`;

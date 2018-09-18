import styled from 'styled-components';

export const StyleContainer = styled.div`
  p {
    margin: 0;
  }

  h2 {
    margin-bottom: 5px;
  }

  > div {
    margin-bottom: 20px;
    :last-of-type {
      margin-bottom: 0;
    }
  }
  button: {
    align-self: flex-end;
  }
`;

export const Stat = styled.div`
  flex: 1;
  h2 {
    color: ${props => props.theme.colours.unoBlue};
  }
  h4 {
    margin: 0;
  }
`;

export const FlexWrap = styled.div`
  display: flex;

  > div {
    margin-right: 10px;
    :last-of-type {
      margin-right: 0;
    }
  }
`;

export const ButtonWrap = styled.div`
  display: flex;

  button {
    flex: 1;
    margin-right: 5px;
    margin-left: 5px;
    :first-of-type {
      margin-left: 0;
      flex: 2;
    }
    :last-of-type {
      margin-right: 0;
      background-color: ${({ theme }) => theme.colours.red};
    }
  }
`;

export const StatusH2 = styled.h2`
  color: ${({ theme, status }) => theme.holidayStatus[status]} !important;
`;

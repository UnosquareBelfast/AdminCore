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

export const HolidayAlert = styled.div`
  margin: 15px 0;
  padding: 10px;
  background: ${props => props.theme.colours.unoBlue};
  width: 100%;
  box-sizing: border-box;
  color: ${props => props.theme.colours.white};
  opacity: 1;
  p {
    padding: 10px 0px;
    margin: 0;
    :first-of-type {
      margin-bottom: 3px;
    }
  }
  tag {
    font-weight: bold;
  }
`
;


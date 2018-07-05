import styled from 'styled-components';

export const StyleContainer = styled.div`
  margin: 20px;
  @media (min-width: 920px) {
    margin: 40px;
  }
  #closeBookingModal {
    position: absolute;
    cursor: pointer;
    top: 5px;
    font-weight: bold;
  }
  h1 {
    margin: 0;
  }
`;

export const BookingStatus = styled.div`
  background: ${props => props.theme.colours.lightgrey};
  padding: 10px 35px;
  margin: 10px -35px;
  @media (min-width: 920px) {
    padding: 10px 54px;
    margin: 10px -54px;
  }

  h4,
  span {
    position: relative;
    margin: 0;
  }

  span {
    left: -13px;
  }
`;

export const BookingInputs = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  margin-bottom: 15px;

  label {
    margin: 0;
    padding-bottom: 10px;
    font-weight: bold;
  }

  input {
    height: 40px;
    margin: 5px 50px 0 0;
    padding: 2.5px 5px;
    width: 80%;
    font-size: 1.05rem;
    border-radius: 4px;
    border: 2px solid ${props => props.theme.colours.grey};
    color: ${props => props.theme.colours.darkGrey};
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  button {
    flex: 1;
    margin: 0;
  }
  button:first-of-type {
    margin-right: 2.5px;
  }
  button:last-of-type {
    margin-left: 2.5px;
  }
`;

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

export const Form = styled.form`
  margin: 15px 0;

  > div:nth-child(2) {
    transition: all 300ms;
    visibility: visible;
  }

  &.bookingHalfDay {
    > div:nth-child(2) {
      visibility: hidden;
    }
  }

  &.workingFromHome {
    > div:nth-child(2) {
      visibility: hidden;
    }
    h4#totalDaysToBook {
      opacity: 0.4;
    }
  }
`;

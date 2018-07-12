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
    margin: 0 0 4px 0;
  }

  span {
    left: -13px;
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

export const FormContainer = styled.div`
  position: relative;
  padding-top: 15px;

  h4 {
    position: absolute;
    right: 0;
    top: 0;
  }

  form {
    margin: 15px 0;
    @media (min-width: 992px) {
      margin-right: -10px;
      margin-left: -10px;
    }

    .date {
      transition: all 300ms;
      visibility: visible;
      @media (min-width: 992px) {
        margin: 0 0 20px 0;
        display: inline-block;
        width: 50%;
        padding: 0 10px;
        box-sizing: border-box;
        vertical-align: bottom;
      }
    }

    .checkbox {
      @media (min-width: 992px) {
        margin: 20px 10px;
      }
    }

    > div:last-child {
      @media (min-width: 992px) {
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin-left: calc(50% + 10px);
      }
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
  }
`;

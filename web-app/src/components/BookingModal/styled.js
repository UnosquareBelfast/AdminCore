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
    margin: 0 0 10px 0;
  }

  h4 {
    margin: 0;
  }
`;

export const BookingStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  background: ${({ theme, status }) => theme.holidayStatus[status]};
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 3px;
  p {
    margin: 4px 0 0 0;
  }
  svg {
    margin-right: 5px;
  }

  .cancelEvent {
    cursor: pointer;
    border: 1.5px solid white;
    padding: 10px; 15px;
    border-radius: 3px;
  }
`;

export const FormContainer = styled.div`
  position: relative;

  form {
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

    .select {
      @media (min-width: 992px) {
        margin: 20px 10px;
        width: calc(100% - 20px);
      }
    }

    .checkbox {
      @media (min-width: 992px) {
        margin: 0 10px 20px 10px;
      }
    }

    > div:last-child {
      @media (min-width: 992px) {
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin-left: calc(50% + 10px);
      }
    }
  }
`;

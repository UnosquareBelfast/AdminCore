import styled from 'styled-components';

export const StyleContainer = styled.div`
  margin: 20px;
  @media (min-width: ${props => props.theme.mediaQueries.lg}) {
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

export const FormContainer = styled.div`
  position: relative;

  form {
    @media (min-width: ${props => props.theme.mediaQueries.lg}) {
      margin-right: -10px;
      margin-left: -10px;
    }

    .date {
      transition: all 300ms;
      visibility: visible;
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        margin: 0 0 20px 0;
        display: inline-block;
        width: 50%;
        padding: 0 10px;
        box-sizing: border-box;
        vertical-align: bottom;
      }
    }

    .select {
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        margin: 20px 10px;
        width: calc(100% - 20px);
      }
    }

    .checkbox {
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        margin: 0 10px 20px 10px;
      }
    }

    > div:last-child {
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin-left: calc(50% + 10px);
      }
    }
  }
`;

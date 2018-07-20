import styled from 'styled-components';

export const FormContainer = styled.div`
  form {
    @media (min-width: 992px) {
      margin-right: -10px;
      margin-left: -10px;
    }

    .textarea {
      @media (min-width: 992px) {
        padding: 0 10px;
        box-sizing: border-box;
      }
    }

    .select,
    .input {
      @media (min-width: 992px) {
        margin: 0 0 20px 0;
        display: inline-block;
        width: 50%;
        padding: 0 10px;
        box-sizing: border-box;
        vertical-align: bottom;
      }
    }

    > div:last-child {
      @media (min-width: 992px) {
        padding-left: calc(50% + 10px);
        padding-right: 10px;
      }
    }
  }
`;

import styled from 'styled-components';

export const FormContainer = styled.div`
  form {
    max-width: 1000px;
    @media (min-width: ${props => props.theme.mediaQueries.lg}) {
      margin-right: -10px;
      margin-left: -10px;
    }

    .select,
    .input {
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        margin: 0 0 20px 0;
        display: inline-block;
        width: 50%;
        padding: 0 10px;
        box-sizing: border-box;
        vertical-align: bottom;
      }
    }

    > div:last-child {
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        width: calc(50% - 10px);
        padding-left: 10px;
      }
    }
  }
`;

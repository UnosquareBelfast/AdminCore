import styled from 'styled-components';

export const FormContainer = styled.div`
  form {
    width: 100%;
    @media (min-width: ${props => props.theme.mediaQueries.lg}) {
      width: 50%;
    }
  }
`;

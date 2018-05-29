import styled from 'styled-components';

export const RequestHolidayContainer = styled.div`
  padding: 0 1rem 1rem 1rem;
  min-width: 300px;
`;

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  cursor: pointer;
  button {
    margin-top: 1rem;
    width: 120px;
    height: 40px;
  }
`;

import styled from 'styled-components';

export const Banner = styled.div`
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

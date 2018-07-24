import styled from 'styled-components';

export const InnerLayout = styled.div`
  width: 100%;
  height: 100%;

  .rbc-calendar {
    height: 700px;
  }

  .rbc-header {
    padding: 10px 3px;
    background: #0eb5d1;
    color: white;
  }

  .rbc-off-range-bg {
    background: #e5e5e5;
    cursor: not-allowed;
  }

  .rbc-today {
    background-color: rgba(14, 181, 209, 0.5);
  }
`;

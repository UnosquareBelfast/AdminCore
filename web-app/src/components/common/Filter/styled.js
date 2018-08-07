import styled from 'styled-components';

export const FilterContainer = styled.div`
  border: 1px solid lightgrey;
  border-bottom: none;
  height: 20px;
  padding: 10px;
  padding-bottom: 15px;
  label {
    font-weight: 600px;
    margin-right: 10px;
  }
  select {
    height: 26px;
    border: 1px solid lightgrey;
    border-radius: 3px 0 0 3px;
    outline: none;
  }
  input {
    height: 22px;
    border: 1px solid lightgrey;
    border-left: none;
    border-radius: 0 3px 3px 0;
    outline: none;
    padding-left: 10px;
  }
`;

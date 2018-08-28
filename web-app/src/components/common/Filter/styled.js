import styled from 'styled-components';

export const FilterContainer = styled.div`
  border: 1px solid lightgrey;
  border-bottom: none;
  height: 20px;
  padding: 10px;
  padding-bottom: 15px;
  > div {
    display: flex;
    align-items: center;
    width: 100%;
  }
  label {
    font-weight: ${props => props.theme.fonts.weight.bold}
    margin-right: 10px;
  }
  select {
    display: inline-block;
    height: 26px;
    border: 1px solid lightgrey;
    border-radius: 3px 0 0 3px;
    outline: none;
  }
  input {
    display: inline-block;
    height: 22px;
    border: 1px solid lightgrey;
    border-left: none;
    border-radius: 0 3px 3px 0;
    outline: none;
    padding-left: 10px;
    flex: 1;
    min-width: 20px;
  }
`;

import styled from 'styled-components';

export default styled.div`
  display: ${props => (props.hide ? 'none' : 'inherit')};
`;

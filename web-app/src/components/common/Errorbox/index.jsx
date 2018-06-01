import React from 'react';
import { Container } from './styled';

const Errorbox = error => {
  return (
    <Container>
      <h4>Error</h4>
      <p>{error.message}</p>
    </Container>
  );
};

export default Errorbox;

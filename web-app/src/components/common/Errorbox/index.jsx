import React from 'react';
<<<<<<< HEAD
import { Container } from './styled';

const Errorbox = error => {
  return (
    <Container>
      <h4>Error</h4>
      <p>{error.message}</p>
    </Container>
  );
=======
import { PropTypes as PT } from 'prop-types';
import { ErrorContainer } from './styled';

const Errorbox = props =>
  props.error && (
    <ErrorContainer>
      <p>
        <strong>{props.label ? props.label : 'Error'}</strong>
      </p>
      <p>{props.error.message}</p>
    </ErrorContainer>
  );

Errorbox.propTypes = {
  error: PT.object,
  label: PT.string,
>>>>>>> c2ee99cd1a1db4e4574d79d63ad4ca47bff4f2dc
};

export default Errorbox;

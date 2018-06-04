import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container, Content } from './styled';

const Modal = ({children}) => (
  <Container>
    <Content>  
      {children}
    </Content>
  </Container>
);

Modal.propTypes = {
  children: PT.node,
};

export default Modal;

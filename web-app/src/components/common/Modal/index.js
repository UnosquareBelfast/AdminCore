import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Rodal from 'rodal';

const Modal = ({ children, visible, closeModal }) => (
  <Rodal
    visible={visible}
    onClose={closeModal}
    customStyles={{
      width: '50%',
      minWidth: '250px',
      height: 'auto',
      bottom: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
    }}
  >
    {children}
  </Rodal>
);

Modal.propTypes = {
  children: PT.node.isRequired,
  closeModal: PT.func,
  visible: PT.bool,
};

Modal.defaultProps = {
  closeModal: () => {},
  visible: true,
};

export default Modal;

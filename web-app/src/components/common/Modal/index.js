import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Rodal from 'rodal';

const Modal = props => {
  const { children, visible, closeModal } = props;
  return (
    <Rodal
      visible={visible}
      onClose={closeModal}
      customStyles={{
        width: '50%',
        minWidth: '400px',
        height: 'auto',
        bottom: 'auto',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      {...props}
    >
      {children}
    </Rodal>
  );
};

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

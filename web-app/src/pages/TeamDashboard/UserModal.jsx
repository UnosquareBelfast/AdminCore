import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Modal } from '../../components/common';

const UserModal = ({ user }) => {
  if (!user) return null;

  return (
    <Modal>
      {user.forename} {user.surname}
    </Modal>
  );
};

UserModal.propTypes = {
  user: PT.object,
};

export default UserModal;

import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Modal, Button } from '../../components/common';
import { StyleContainer } from './styled';

class UserModal extends Component {
  static propTypes = {
    client: PT.object,
    closeModal: PT.func.isRequired,
    history: PT.object.isRequired,
  };

  render() {
    const { client, closeModal, history } = this.props;

    if (!client) return null;

    return (
      <Modal closeModal={closeModal}>
        <StyleContainer>
          <div>
            <h2>{client.clientName}</h2>
          </div>
          <Button
            label="Edit Client"
            onClick={() => history.push(`clients/${client.clientId}`)}
          />
        </StyleContainer>
      </Modal>
    );
  }
}

export default UserModal;

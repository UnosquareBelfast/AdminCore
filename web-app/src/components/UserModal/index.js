import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Modal } from '../../components/common';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { StyleContainer } from './styled';

class UserModal extends Component {
  static propTypes = {
    user: PT.object,
    closeModal: PT.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userHolidays: [],
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (!user) return null;
  }

  render() {
    const { user, closeModal } = this.props;
    if (!user) return null;

    return (
      <Modal>
        <StyleContainer>
          <span id="closeModal" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} /> Close
          </span>
          <h2>
            {user.forename} {user.surname}
          </h2>
          <p>{user.email}</p>
        </StyleContainer>
      </Modal>
    );
  }
}

export default UserModal;

import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Banner } from './styled';
import eventCategory from '../../../utilities/eventCategory';
import holidayStatus, { statusText } from '../../../utilities/holidayStatus';
import eventTypes, { typeText } from '../../../utilities/eventTypes';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';

class ModalStatusBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelConfirm: false,
    };
  }

  handleCancel = event => {
    if (!this.state.cancelConfirm) {
      this.setState({ cancelConfirm: true });
    } else {
      this.props.cancelEvent(event);
    }
  };

  render() {
    const {
      userName,
      eventStatus: { eventStatusId },
      eventType: { eventTypeId },
    } = this.props;
    const { cancelConfirm } = this.state;

    let isCancelled = eventStatusId === holidayStatus.CANCELLED;
    let bannerId;
    let bannerDescription;
    let category;
    if (eventTypeId === eventTypes.ANNUAL_LEAVE) {
      bannerId = eventStatusId;
      bannerDescription = statusText[eventStatusId];
      category = eventCategory.HOLIDAY_STATUS;
    } else {
      bannerId = eventTypeId;
      bannerDescription = typeText[eventTypeId];
      category = eventCategory.EVENT_TYPE;
    }

    return (
      <Banner status={bannerId} className={category}>
        <div>
          <h4>{userName}</h4>
          <p>{bannerDescription}</p>
        </div>
        <div>
          {!isCancelled && (
            <div className="cancelEvent" onClick={this.handleCancel}>
              <FontAwesomeIcon icon={faTrash} />
              <span>
                {cancelConfirm ? 'Confirm? (Click Again)' : 'Cancel Event'}
              </span>
            </div>
          )}
        </div>
      </Banner>
    );
  }
}

ModalStatusBanner.propTypes = {
  userName: PT.string,
  eventStatus: PT.object.isRequired,
  eventType: PT.object.isRequired,
  cancelEvent: PT.func.isRequired,
  toggleRejectionMessageInputView: PT.func.isRequired,
  rejectionReason: PT.string,
  toggleRejectionResponseView: PT.bool.isRequired,
};

export default ModalStatusBanner;

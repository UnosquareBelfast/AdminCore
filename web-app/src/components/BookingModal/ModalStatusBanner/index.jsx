import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Banner } from './styled';
import eventCategory from '../../../utilities/eventCategory';
import { statusText } from '../../../utilities/holidayStatus';
import eventTypes, { typeText } from '../../../utilities/eventTypes';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';

const ModalStatusBanner = props => {
  const { userName, eventStatus, eventType, cancelEvent, rejectionReason, toggleRejectionMessageInputView, toggleRejectionResponseView } = props;
  const { eventStatusId } = eventStatus;
  const { eventTypeId } = eventType;

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
      {rejectionReason ? <div>
        <h4>{'Rejection Reason'}</h4>
        <p>{rejectionReason}</p>
      </div> : null }
      {rejectionReason ? <div>
        <div className="cancelEvent" onClick={()=>toggleRejectionMessageInputView(!toggleRejectionResponseView)}>
          <span>{toggleRejectionResponseView === false ? 'Respond to Rejection' : 'Return to Update' }</span>
        </div>
      </div> : null }
      <div>
        <div className="cancelEvent" onClick={cancelEvent}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Cancel Event</span>
        </div>
      </div>
    </Banner>
  );
};

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

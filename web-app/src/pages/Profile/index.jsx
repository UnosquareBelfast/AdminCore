import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { MainContentContainer } from './styled';
import { HolidayList, HolidayModal } from '../../components/';

const Profile = props => {
  const {
    userHolidays,
    userDetails,
    daysBooked,
    daysPending,
    selectedHoliday,
    selectHoliday,
    closeModal,
  } = props;
  const { forename, surname, totalHolidays } = userDetails;

  return (
    <Fragment>
      <HolidayModal holiday={selectedHoliday} closeModal={closeModal} />
      <MainContentContainer>
        <div>
          <h2>
            Profile - {forename} {surname}
          </h2>
        </div>
        <div className="holidayinfo">
          <div className="columns">
            <div>
              <h1>{totalHolidays - daysBooked}</h1>
              <h4>Days Remaining</h4>
            </div>
            <div>
              <h1>{daysBooked}</h1>
              <h4>Days Booked</h4>
            </div>
            <div>
              <h1>{daysPending}</h1>
              <h4>Days Pending</h4>
            </div>
          </div>
          <HolidayList
            holidays={userHolidays}
            columns={['status', 'startDate', 'endDate', 'requestedDate']}
            onRowClick={holiday => selectHoliday(holiday)}
          />
        </div>
      </MainContentContainer>
    </Fragment>
  );
};

Profile.propTypes = {
  userDetails: PT.object.isRequired,
  userHolidays: PT.array.isRequired,
  daysBooked: PT.number,
  daysPending: PT.number,
  selectedHoliday: PT.object.isRequired,
  selectHoliday: PT.func.isRequired,
};

Profile.defaultProps = {
  daysBooked: 0,
  daysPending: 0,
};

export default container(Profile);

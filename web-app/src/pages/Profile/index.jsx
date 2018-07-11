import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { MainContentContainer } from './styled';
import { HolidayList } from '../../components/';

const Profile = props => {
  const { userHolidays, userDetails, daysBooked, daysPending } = props;
  const { forename, surname, totalHolidays } = userDetails;

  return (
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
        />
      </div>
    </MainContentContainer>
  );
};

Profile.propTypes = {
  userDetails: PT.object.isRequired,
  userHolidays: PT.array.isRequired,
  daysBooked: PT.number,
  daysPending: PT.number,
};

Profile.defaultProps = {
  daysBooked: 0,
  daysPending: 0,
};

export default container(Profile);

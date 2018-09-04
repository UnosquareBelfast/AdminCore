import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { MainContentContainer } from './styled';
import { DataTable, HolidayModal } from '../../components/';
import HolidayCells from '../../components/DataTable/Cells/holidays';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendar, faCheck, faSpinner } from '@fortawesome/fontawesome-free-solid';

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
              <h1>{totalHolidays - daysBooked} Days</h1>
              <h4><FontAwesomeIcon icon={faCalendar} /> Remaining</h4>
            </div>
            <div>
              <h1>{daysBooked} Days</h1>
              <h4><FontAwesomeIcon icon={faCheck} /> Booked</h4>
            </div>
            <div>
              <h1>{daysPending} Days</h1>
              <h4><FontAwesomeIcon icon={faSpinner} /> Pending</h4>
            </div>
          </div>
          <DataTable
            data={userHolidays}
            cells={HolidayCells}
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
  closeModal: PT.func.isRequired,
};

Profile.defaultProps = {
  daysBooked: 0,
  daysPending: 0,
};

export default container(Profile);

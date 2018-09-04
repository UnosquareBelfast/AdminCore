import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { MainContentContainer, Columns } from './styled';
import { DataTable, HolidayModal } from '../../components/';
import ContractCells from '../../components/DataTable/Cells/contracts';
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
    contracts,
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
              <h4><FontAwesomeIcon icon={faCalendar} /> Days Remaining</h4>
            </div>
            <div>
              <h1>{daysBooked}</h1>
              <h4><FontAwesomeIcon icon={faCheck} /> Days Booked</h4>
            </div>
            <div>
              <h1>{daysPending}</h1>
              <h4><FontAwesomeIcon icon={faSpinner} /> Days Pending</h4>
            </div>
          </div>
      <Columns>
        <div>
          <h3>My holidays</h3>
          <DataTable
            data={userHolidays}
            cells={HolidayCells}
            columns={['status', 'startDate', 'endDate', 'requestedDate']}
            onRowClick={holiday => selectHoliday(holiday)}
          />
        </div>
        <div>
          <h3>View Contracts </h3>
          <DataTable
            data={contracts}
            cells={ContractCells}
            columns={['startDate', 'endDate']}
            pageSize={10}
          />
        </div> 
        </Columns>      
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
  contracts: PT.array.isRequired,
};

Profile.defaultProps = {
  daysBooked: 0,
  daysPending: 0,
};

export default container(Profile);

import React, { Component } from 'react';
import 'react-bootstrap';
import HolidayTrackerListItem from './HolidayTrackerListItem';

class MyLeaveTrackerList extends Component {

  constructor(props){
    super(props);

    this.onDeleteHoliday = this.onDeleteHoliday.bind(this);
    this.onUpdateHoliday = this.onUpdateHoliday.bind(this);
  }

  onDeleteHoliday(holiday){

  }

  onUpdateHoliday(holiday){

  }

  render() {

    let holidays = this.props.holidays;

    return (
        <div>
            {
                holidays.map(holiday => {                    
                    return <HolidayTrackerListItem
                        key={holiday.id}
                        {...holiday}
                        onDeleteHoliday={this.onDeleteHoliday}
                        onUpdateHoliday={this.onUpdateHoliday}
                    />                
                })
            }
        </div>
    );
  }
}

export default MyLeaveTrackerList;

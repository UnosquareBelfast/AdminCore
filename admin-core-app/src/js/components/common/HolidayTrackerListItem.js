import React, { Component } from 'react';
import { format } from 'util';

class HolidayTrackerListItem extends Component {
  
  constructor(props){
    super(props);

    this.state = {
    }

    this.onDeleteHoliday = this.onDeleteHoliday.bind(this);
    this.onUpdateHoliday = this.onUpdateHoliday.bind(this);
  }

  onDeleteHoliday(){
    const { onDeleteHoliday, holiday } = this.props;

    onDeleteHoliday(holiday);
  }

  onUpdateHoliday(){
    const{ onUpdateHoliday, holiday } = this.props;

    onUpdateHoliday(holiday);
  }

  render() {

    const { id, date, onDeleteHoliday, onUpdateHoliday } = this.props;
    const definedDate = new Date(date);
    const year = definedDate.getFullYear();
    const month = definedDate.toLocaleString("en-us", { month: "long"});
    const day = definedDate.getDate();
        
    let formatted = year + '-' + month + '-' + day;

    console.log('formatted date: ', formatted);

    return (
      <div>
          <button className='BookedLeaveListItemStyling'>{formatted}</button>
      </div>
    );
  }
}

export default HolidayTrackerListItem;

import React, { Component } from 'react';
import 'react-bootstrap';
import TakenLeaveListItem from './TakenLeaveListItem';

class TakenLeaveList extends Component {

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
                    return <TakenLeaveListItem
                        key={holiday.id}
                        {...holiday}                        
                    />                
                })
            }
        </div>
    );
  }
}

export default TakenLeaveList;
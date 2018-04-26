import React, { Component } from 'react';
import { format } from 'util';

class TakenLeaveListItem extends Component {
  
  constructor(props){
    super(props);

    this.state = {
    }
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
          <span className='TakenLeaveListItemStyling'>{formatted}</span>
      </div>
    );
  }
}

export default TakenLeaveListItem;

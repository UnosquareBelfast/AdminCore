import React, { Component } from 'react';
import { format } from 'util';
import CancelHolidayModal from '../cancelHoliday/CancelHolidayModal';

class HolidayTrackerListItem extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      cancellationModalOpen: false
    }

    this.onDeleteHoliday = this.onDeleteHoliday.bind(this);
    this.onUpdateHoliday = this.onUpdateHoliday.bind(this);
  }

  onDeleteHoliday(){
    this.toggleCancellationModal();

    const { id, date } = this.props;
    const holiday = { id: id, date: date };
    this.props.onDeleteHoliday(holiday);
  }

  onUpdateHoliday(){
    const{ onUpdateHoliday, holiday } = this.props;

    onUpdateHoliday(holiday);
  }
  
  toggleCancellationModal = () => {
    this.setState({
        cancellationModalOpen: !this.state.cancellationModalOpen
    });
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
          <button className='BookedLeaveListItemStyling' onClick={ this.onDeleteHoliday }>{formatted}</button>
          <CancelHolidayModal
                    show={this.state.cancellationModalOpen}
                    onCancelHoliday={this.onDeleteHoliday}
                    onClose={this.toggleCancellationModal}>
            </CancelHolidayModal>
      </div>
    );
  }
}

export default HolidayTrackerListItem;

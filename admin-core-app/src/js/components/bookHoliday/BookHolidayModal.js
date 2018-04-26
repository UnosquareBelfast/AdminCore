import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';
import BackdropStyle from './BackdropStyle.css.js';
import ModalStyle from './ModalStyle.css.js';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class BookHolidayModal extends React.Component {

  constructor(props){
      super(props);

      this.state = {
        startDate: Moment(),
        endDate: Moment()
      }

      this.handleKeyUp = this.handleKeyUp.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
      this.handleStartChange = this.handleStartChange.bind(this);
      this.handleEndChange = this.handleEndChange.bind(this);
      this.confirmHolidayBooking = this.confirmHolidayBooking.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const keys = {
      27: () => {
        e.preventDefault();
        this.props.onClose();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }
  
  handleOutsideClick(e) {
    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        this.props.onClose();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }

  handleStartChange(value){
    const startDate = value;
    this.setState({startDate:startDate});
  }

  handleEndChange(value){
    const endDate = value;    
    this.setState({endDate:endDate});
  }

  confirmHolidayBooking(){
    const startDate = this.state.startDate._d;
    const endDate = this.state.endDate._d;

    if(endDate > startDate){
      alert('can book');
    } else if (startDate > endDate){
      alert('cannot book a holiday that ends before it begins');
    }
  }

  render() {
    console.log(this.props);

    if(!this.props.show) {
      return null;
    }

    return (
      <div style={BackdropStyle}>        
        <div style={ModalStyle}>
        <h3>Book Holiday?</h3>
        <br/>
        <h5>From:</h5>
        <div>
          <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"
          />
        </div>
        <br/>
        <h5>To:</h5>
        <div>
          <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"              
          />
        </div>
        <br/>
        <button className="btn btn-danger" onClick={this.confirmHolidayBooking}>
            Confirm
        </button>
        <button className="btn btn-info" onClick={this.props.onClose}>
            Cancel
        </button>
        </div>
      </div>
    );
  }
}

BookHolidayModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool
};

export default BookHolidayModal;
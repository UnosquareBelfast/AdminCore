import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';
import BackdropStyle from './BackdropStyle.css.js';
import ModalStyle from './ModalStyle.css';

class CancelHolidayModal extends React.Component {

  constructor(props){
      super(props);

      this.handleKeyUp = this.handleKeyUp.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
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

  render() {
    console.log(this.props);
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" style={BackdropStyle}>        
        <div style={ModalStyle}>
        <h3>Are you sure you want to cancel this holiday?</h3>
        <button className="btn btn-danger" onClick={this.props.onCancelHoliday}>
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

CancelHolidayModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCancelHoliday: PropTypes.func.isRequired,
  show: PropTypes.bool
};

export default CancelHolidayModal;
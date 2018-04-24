import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';

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
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle}>        
        <div style={modalStyle}>
        <h3>Are you sure you want to cancel this holiday?</h3>
        <button className="btn btn-danger" onClick={this.props.onClose}>
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
  show: PropTypes.bool
};

export default CancelHolidayModal;
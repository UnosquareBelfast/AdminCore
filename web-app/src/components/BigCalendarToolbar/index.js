import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyleContainer } from './styled';

const BigCalendarToolbar = props => {
  const goToBack = () => {
    props.onNavigate('PREV');
  };

  const goToNext = () => {
    props.onNavigate('NEXT');
  };

  const goToToday = () => {
    props.onNavigate('TODAY');
  };

  return (
    <StyleContainer>
      <div>
        <h2>Booking Dashboard</h2>
        <p className="date">{props.label}</p>
      </div>
      <div>
        <button onClick={goToBack}>Prev Month</button>
        <button onClick={goToToday}>This Month</button>
        <button onClick={goToNext}>Next Month</button>
      </div>
    </StyleContainer>
  );
};

BigCalendarToolbar.propTypes = {
  label: PT.string.isRequired,
  date: PT.object.isRequired,
  onNavigate: PT.func.isRequired,
};

export default BigCalendarToolbar;

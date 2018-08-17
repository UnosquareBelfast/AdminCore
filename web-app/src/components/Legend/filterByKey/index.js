import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { statusText, statusIcons } from '../../../utilities/holidayStatus';
import { Key } from '../styled';

const FilterByKey = ({ eventList, onToggleEvent, listType }) => {
  const keyList = eventList.map(event => {
    return (
      <Key
        className={event.active ? 'selected' : ''}
        key={event.eventId}
        status={event.key}
        onClick={() => onToggleEvent(event.eventId, listType)}
      >
        <span>{statusIcons[event.key]}</span>
        <span>{statusText[event.key]}</span>
      </Key>
    );
  });

  return <div>{keyList}</div>;
};

FilterByKey.propTypes = {
  onToggleEvent: PT.func.isRequired,
  eventList: PT.array.isRequired,
  listType: PT.string.isRequired,
};

export default FilterByKey;

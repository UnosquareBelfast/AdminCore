import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyleContainer, Column, Key } from './styled';
import container from './container';
import { statusText, statusIcons } from '../../utilities/holidayStatus';

const Legend = ({ eventsKeyList, onToggleKey }) => {
  const holidayEvents = eventsKeyList.map(event => {
    if (event.type === 'holiday') {
      return (
        <Key
          className={event.active ? 'selected' : ''}
          key={event.eventStatusId}
          status={event.key}
          onClick={() => onToggleKey(event.eventStatusId)}
        >
          <span>{statusIcons[event.key]}</span>
          <span>{statusText[event.key]}</span>
        </Key>
      );
    }
  });

  const statusEvents = eventsKeyList.map(event => {
    if (event.type === 'status') {
      return (
        <Key
          className={event.active ? 'selected' : ''}
          key={event.eventStatusId}
          status={event.key}
          onClick={() => onToggleKey(event.eventStatusId)}
        >
          <span>{statusIcons[event.key]}</span>
          <span>{statusText[event.key]}</span>
        </Key>
      );
    }
  });

  return (
    <StyleContainer>
      <Column>
        <h4>Filter by Holiday Events</h4>
        {holidayEvents},
      </Column>
      <Column>
        <h4>Filter by Status Events</h4>
        {statusEvents},
      </Column>
    </StyleContainer>
  );
};

Legend.propTypes = {
  eventsKeyList: PT.array.isRequired,
  onToggleKey: PT.func.isRequired,
};

export default container(Legend);

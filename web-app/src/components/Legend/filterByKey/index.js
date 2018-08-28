import React from 'react';
import { PropTypes as PT } from 'prop-types';
import holidayStatus, {
  statusText,
  statusIcons,
} from '../../../utilities/holidayStatus';
import { Key } from '../styled';

const FilterByKey = ({ keyList, onToggleEvent }) => {
  if (!keyList) return;

  const keys = keyList.map(key => {
    return (
      <Key
        className={key.active ? 'small selected' : 'small'}
        key={key.id}
        status={holidayStatus[key.keyName]}
        onClick={() => onToggleEvent(key.id)}
      >
        <span>{statusIcons[key.id]}</span>
        <span>{statusText[key.id]}</span>
      </Key>
    );
  });

  return <div>{keys}</div>;
};

FilterByKey.propTypes = {
  onToggleEvent: PT.func.isRequired,
  keyList: PT.array.isRequired,
};

export default FilterByKey;

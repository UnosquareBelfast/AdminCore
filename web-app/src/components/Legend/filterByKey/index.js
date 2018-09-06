import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Key } from '../styled';

const FilterByKey = ({ category, keyList, onToggleEvent }) => {
  if (!keyList) return;

  const keys = keyList.map(key => {
    return (
      <Key
        className={
          key.active ? category + ' small selected' : category + ' small'
        }
        key={key.id}
        status={key.status}
        onClick={() => onToggleEvent(key.id)}
      >
        <span>{key.icon}</span>
        <span>{key.text}</span>
      </Key>
    );
  });

  return <div>{keys}</div>;
};

FilterByKey.propTypes = {
  category: PT.string.isRequired,
  onToggleEvent: PT.func.isRequired,
  keyList: PT.array.isRequired,
};

export default FilterByKey;

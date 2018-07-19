import React from 'react';
import { PropTypes as PT } from 'prop-types';

const Steps = ({ steps, current }) => {
  if (!steps[current]) return null;
  return <div>{steps[current].component}</div>;
};

Steps.propTypes = {
  steps: PT.array.isRequired,
  current: PT.number,
};

Steps.defaultProps = {
  current: 0,
};

export default Steps;

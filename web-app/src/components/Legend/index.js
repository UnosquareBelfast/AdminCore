import React from 'react';
import { Card } from '../common';
import { StyleContainer, Key } from './styled';
import holidayStatus from '../../utilities/holidayStatus';

export default () => (
  <Card>
    <StyleContainer>
      <strong>Legend</strong>
      <Key status={holidayStatus.PENDING}>Pending</Key>
      <Key status={holidayStatus.APPROVED}>Approved</Key>
      <Key status={holidayStatus.REJECTED}>Rejected</Key>
    </StyleContainer>
  </Card>
);

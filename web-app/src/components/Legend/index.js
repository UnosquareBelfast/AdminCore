import React from 'react';
import { Card } from '../common';
import { Key } from './styled';
import holidayStatus from '../../utilities/holidayStatus';

export default () => (
  <Card>
    <strong>Legend</strong>
    <Key status={holidayStatus.REJECTED}>Rejected</Key>
    <Key status={holidayStatus.PENDING}>Pending</Key>
    <Key status={holidayStatus.APPROVED}>Approved</Key>
    <Key status={holidayStatus.WFH}>Working from home</Key>
  </Card>
);

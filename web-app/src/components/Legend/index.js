import React from 'react';
import { Card } from '../common';
import { StyleContainer, Key } from './styled';
import holidayStatus, {
  statusText,
  statusIcons,
} from '../../utilities/holidayStatus';

export default () => {
  const { PENDING, APPROVED, REJECTED, WFH } = holidayStatus;
  return (
    <Card>
      <StyleContainer>
        <strong>Legend</strong>
        <Key status={PENDING}>
          <span>{statusIcons[PENDING]}</span>
          <span>{statusText[PENDING]}</span>
        </Key>
        <Key status={APPROVED}>
          <span>{statusIcons[APPROVED]}</span>
          <span>{statusText[APPROVED]}</span>
        </Key>
        <Key status={REJECTED}>
          <span>{statusIcons[REJECTED]}</span>
          <span>{statusText[REJECTED]}</span>
        </Key>
        <Key status={WFH}>
          <span>{statusIcons[WFH]}</span>
          <span>{statusText[WFH]}</span>
        </Key>
      </StyleContainer>
    </Card>
  );
};

import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { P } from '../../Common';
import styles from './styles';
import holidayStatusColor from '../../../utilities/holidayStatus';

const ListItem = (props) => {
  const { status, statusId, startDate, endDate } = props;

  return (

    <View style={[styles.holidayStatus, { borderLeftColor: holidayStatusColor[statusId] }]}>
      <P type="base">
        {status}
      </P>
      <P type="base">
        {startDate} to {endDate}
      </P>
    </View>
  );
};

ListItem.propTypes = {
  status: PT.string.isRequired,
  startDate: PT.string.isRequired,
  statusId: PT.number.isRequired,
  endDate: PT.string.isRequired,
};

export default ListItem;

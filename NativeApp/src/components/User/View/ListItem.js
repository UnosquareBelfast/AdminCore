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
      <P type="bold">{status}</P>
      <View style={styles.holidayDate}>
        <View>
          <P type="base">Start date</P>
          <P type="base">{startDate}</P>
        </View>
        <View style={styles.endDate}>
          <P type="base">End date</P>
          <P type="base">{endDate}</P>
        </View>
      </View>
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

import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { P } from '../../Common';
import styles from './styles';
import holidayStatusColor from '../../../utilities/holidayStatus';

const ListItem = (props) => {
  const { status, statusId, startDate, endDate, duration } = props;

  return (

    <View style={[styles.holidayStatus, { borderLeftColor: holidayStatusColor[statusId] }]}>
      <P type="bold">
        {status}
      </P>
      <View style={styles.holidaySection}>
        <View>
          <P type="base">
            Start date
          </P>
          <P type="base">
            {startDate}
          </P>
        </View>
        <View>
          <P type="base">
            End date
          </P>
          <P type="base">
            {endDate}
          </P>
        </View>
        <View>
          <P type="base">
            Duration
          </P>
          <P type="base">
            {duration}
          </P>
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
  duration: PT.number.isRequired,
};

export default ListItem;

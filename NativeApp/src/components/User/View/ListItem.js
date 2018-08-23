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
          <P>
            Start date
          </P>
          <P>
            {startDate}
          </P>
        </View>
        <View>
          <P>
            End date
          </P>
          <P>
            {endDate}
          </P>
        </View>
        <View>
          <P>
            Duration
          </P>
          <P>
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

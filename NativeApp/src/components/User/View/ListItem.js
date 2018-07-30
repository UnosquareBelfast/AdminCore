import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PropTypes as PT } from 'prop-types';

const ListItem = (props) => {
  const { status, startDate, endDate } = props;
  return (
    <View style={styles.tableContainer}>
      <View style={styles.width1}>
        <Text>
          {status}
        </Text>
      </View>
      <View style={styles.width2}>
        <Text>
          {startDate}
        </Text>
      </View>
      <View style={styles.width2}>
        <Text>
          {endDate}
        </Text>
      </View>
    </View>
  );
};

ListItem.propTypes = {
  status: PT.string.isRequired,
  startDate: PT.string.isRequired,
  endDate: PT.string.isRequired,
};

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  width1: {
    width: '40%',
  },
  width2: {
    width: '30%',
  },
});

export default ListItem;

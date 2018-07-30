import React from 'react';
import { View, StyleSheet } from 'react-native';
import { P } from '../../Common';

const ListHeader = () => (
  <View style={styles.tableContainer}>
    <View style={styles.width1}>
      <P type="base">
        Status
      </P>
    </View>
    <View style={styles.width2}>
      <P type="base">
        Start Date
      </P>
    </View>
    <View style={styles.width2}>
      <P type="base">
        End Date
      </P>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  width1: {
    width: '40%',
  },
  width2: {
    width: '30%',
  },

});

export default ListHeader;
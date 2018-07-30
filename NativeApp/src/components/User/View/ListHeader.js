import React from 'react';
import { View, StyleSheet } from 'react-native';
import { P } from '../../Common';
import colours from '../../../utilities/globalStyles/theme';

const ListHeader = () => (
  <View style={styles.tableContainer}>
    <View style={styles.width1}>
      <P type="base" customStyle={styles.pWhite}>
        Status
      </P>
    </View>
    <View style={styles.width2}>
      <P type="base" customStyle={styles.pWhite}>
        Start Date
      </P>
    </View>
    <View style={styles.width2}>
      <P type="base" customStyle={styles.pWhite}>
        End Date
      </P>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colours.unoBlue,
  },
  width1: {
    width: '40%',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  width2: {
    width: '25%',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  pWhite: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListHeader;
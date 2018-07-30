import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import colours from '../../../utilities/globalStyles/theme';
import { P } from '../../Common';

const ListItem = (props) => {
  const { status, startDate, endDate, listId } = props;

  return (
    <View style={[styles.tableContainer, listId % 2 === 0 ? styles.rowWhite : styles.rowGrey]}>
      <View style={styles.width1}>
        <P type="base">
          {status}
        </P>
      </View>
      <View style={styles.width2}>
        <P type="base">
          {startDate}
        </P>
      </View>
      <View style={styles.width2}>
        <P type="base">
          {endDate}
        </P>
      </View>
    </View>
  );
};

ListItem.propTypes = {
  status: PT.string.isRequired,
  startDate: PT.string.isRequired,
  endDate: PT.string.isRequired,
  listId: PT.number.isRequired,
};

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  width1: {
    width: '40%',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  width2: {
    width: '25%',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  rowWhite: {
    backgroundColor: 'white',
  },
  rowGrey: {
    backgroundColor: colours.lightGrey,
  },
});

export default ListItem;

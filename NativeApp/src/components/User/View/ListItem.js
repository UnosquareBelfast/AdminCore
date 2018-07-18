import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes as PT } from 'prop-types';

const ListItem = (props) => {
  const { status, startDate, endDate } = props;
  return (
    <View>
      <Text>
        {status}
      </Text>
      <Text>
        {startDate}
      </Text>
      <Text>
        {endDate}
      </Text>
    </View>
  );
};

ListItem.propTypes = {
  status: PT.string.isRequired,
  startDate: PT.string.isRequired,
  endDate: PT.string.isRequired,
};

export default ListItem;

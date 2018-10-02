import { StyleSheet } from 'react-native';
import { WHITE, INACTIVECOLOR, LIGHTGREY, UNOBLUE } from '../styles/colors';

import { H2_SIZE } from '../styles/text';

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: WHITE,
    fontSize: H2_SIZE,
    fontFamily: 'oswaldRegular',
  },
  headerStyle: {
    paddingHorizontal: 5,
    backgroundColor: UNOBLUE,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(192,192,192,0.3)',
  },
  tabBarOptionsStyle: {
    borderTopColor: LIGHTGREY,
    padding: 5,
    backgroundColor: WHITE,
    shadowColor: INACTIVECOLOR,
    shadowOffset: {
      width: 1,
      height: -2,
    },
    shadowOpacity: 0.2,
    elevation: 10,
  },
});

export default styles;

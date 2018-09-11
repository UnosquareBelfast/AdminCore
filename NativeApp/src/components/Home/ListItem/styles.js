import { StyleSheet } from 'react-native';
import { WHITE, UNOBLUE, SHADOW } from '../../../styles/colors';

const styles = StyleSheet.create({
  holidayStatus: {
    backgroundColor: WHITE,
    borderLeftWidth: 10,
    borderLeftColor: UNOBLUE,
    padding: 10,
    marginVertical: 10,
    shadowRadius: 3,
    shadowColor: SHADOW,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  holidaySection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;

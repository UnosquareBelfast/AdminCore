import { StyleSheet } from 'react-native';
import { WHITE, SHADOW } from '../../../styles/colors';
import { container } from '../../../styles/layout';

const styles = StyleSheet.create({
  container: { ...container },
  sectionListHeader: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  listTeam: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    backgroundColor: WHITE,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowRadius: 3,
    shadowColor: SHADOW,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  employee: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    paddingLeft: 10,
  },
});

export default styles;

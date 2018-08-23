import { StyleSheet } from 'react-native';
import { P_SIZE } from '../../../styles/text';
import { LIGHTERBLACK } from '../../../styles/colors';

const styles = StyleSheet.create({
  base: {
    fontSize: P_SIZE,
    fontFamily: 'openSansRegular',
    color: LIGHTERBLACK,
  },
  bold: {
    fontSize: P_SIZE,
    fontFamily: 'openSansBold',
    color: LIGHTERBLACK,
  },
});

export default styles;

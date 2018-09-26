import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { P } from '../../Common';
import { ACTIVECOLOR, INACTIVECOLOR, WFHCOLOR } from '../../../styles/colors';
import styles from './styles';

const ListItem = (props) => {
  const { name, state } = props;

  const iconColor = (status) => {
    const color = (status === 'In Office') ? ACTIVECOLOR : INACTIVECOLOR;
    return color;
  };

  const statusIcon = (status) => {
    const icon = (status === 'Working From Home')
      ? (
        <Icon
          type="font-awesome"
          name="home"
          size={18}
          color={WFHCOLOR}
        />)
      : (
        <Icon
          type="font-awesome"
          name="user"
          size={18}
          color={iconColor(state)}
        />);
    return icon;
  };

  return (
    <View style={[styles.listContainer]}>
      <View style={styles.listTeam}>
        <View style={styles.employee}>
          {statusIcon(state)}
          <P style={styles.name}>
            {name}
          </P>
        </View>
        <View>
          <P>
            {state}
          </P>
        </View>
      </View>
    </View>
  );
};

ListItem.propTypes = {
  state: PT.string.isRequired,
  name: PT.string.isRequired,
};

export default ListItem;

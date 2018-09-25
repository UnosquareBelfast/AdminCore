import { Alert } from 'react-native';
import getTeamSnapshot from '../services/teamService'; 

const getTeamEvent = () => getTeamSnapshot()
  .then(res => res.data)
  .catch((e) => {
    Alert.alert(
      'Could not get team snapshot',
      e.message,
    );
  });

export default getTeamEvent;

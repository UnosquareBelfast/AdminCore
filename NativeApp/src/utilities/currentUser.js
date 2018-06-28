import { AsyncStorage, Alert } from 'react-native';
import { getUserProfile } from '../services/userService';

export const userLogout = async () => {
  await AsyncStorage.removeItem('id_token');
};

export const userProfile = () => getUserProfile()
  .then(res => res.data)
  .catch((e) => {
    Alert.alert(
      'Could not get User details',
      e.message
    );
  });

import { AsyncStorage } from 'react-native';
import decode from 'jwt-decode';

export const userLogout = async () => {
  await AsyncStorage.removeItem('id_token');
}

import { AsyncStorage } from 'react-native';

export const userLogout = async () => {
  await AsyncStorage.removeItem('id_token');
};

import { AsyncStorage, Alert } from 'react-native';

const deviceStorage = {

  async savekey(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert(
        'AsyncStorage Error',
        e.message,
      );
    }
  },

  async getItem(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      return Alert.alert(
        'AsyncStorage Error',
        e.message,
      );
    }
  },
};

export default deviceStorage;

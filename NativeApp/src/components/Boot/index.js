import React from 'react';
import { 
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const BootView = () =>
  <View style={styles.container}>
    <ActivityIndicator size="small" />
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
    

export default BootView;
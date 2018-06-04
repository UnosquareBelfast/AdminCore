import { createBottomTabNavigator } from 'react-navigation';

import { Home, Booking } from '../screens';

const RootNavigator = createBottomTabNavigator(
  {
    home: { screen: Home },
    book: { screen: Booking },
  },
  {
    initialRouteName: 'home',
  }
);

export default RootNavigator;
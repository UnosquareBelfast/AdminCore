import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Home,
  Login,
  Boot,
  Team,
  User,
  Booking,
} from '../screens';

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
    Booking: { screen: Booking },
  },
  {
    initialRouteName: 'Home',
  }
);

HomeStack.navigationOptions = () => {
  const tabBarIcon = (<Icon name="home" size={25} color="#fff" />);
  const tabBarColor = '#14967C';

  return {
    tabBarIcon,
    tabBarColor,
  };
};

const AppStack = createMaterialBottomTabNavigator(
  {
    HomeStack: { screen: HomeStack },
    User: { screen: User },
    Team: { screen: Team },
  }, {
    initialRouteName: 'HomeStack',
    activeTintColor: '#f0edf6',
    inactiveTintColor: '#3e2465',
    shifting: true,
  }
);

const AuthStack = createStackNavigator({ Login });

const RootNavigator = createSwitchNavigator(
  {
    Boot,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Boot',
  }
);

export default RootNavigator;

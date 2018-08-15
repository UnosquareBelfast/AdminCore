import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Home,
  Login,
  Boot,
  Team,
  User,
  Booking,
  Logout,
} from '../screens';

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
    Booking: { screen: Booking },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(192,192,192,0.3)',
      },
    },
  }
);

HomeStack.navigationOptions = () => {
  const tabBarIcon = ({ tintColor }) => (<Icon name="calendar" size={25} color={tintColor} />);

  return {
    tabBarIcon,
    title: 'Calendar',
  };
};


const AppTab = createBottomTabNavigator(
  {
    HomeStack: { screen: HomeStack },
    User: { screen: User },
    Team: { screen: Team },
    Logout: { screen: Logout },
  }, {
    initialRouteName: 'HomeStack',
    order: ['HomeStack', 'User', 'Team', 'Logout'],
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: 'rgba(2,157,178,0.7)',
      inactiveBackgroundColor: '#00DCFA',
      activeBackgroundColor: '#00DCFA',
      style: {
        paddingTop: 5,
        backgroundColor: '#00DCFA',
      },
    },
  }
);

const AppStack = createStackNavigator({ AppTab });

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

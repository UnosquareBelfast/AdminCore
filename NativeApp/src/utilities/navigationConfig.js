import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
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
  }
);

HomeStack.navigationOptions = () => {
  const tabBarIcon = ({ tintColor }) => (<Icon name="home" size={25} color={tintColor} />);

  return {
    tabBarIcon,
  };
};


const AppStack = createBottomTabNavigator(
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
      showLabel: false,
      inactiveBackgroundColor: '#00DCFA',
      activeBackgroundColor: '#00DCFA',
      style: {
        backgroundColor: '#00DCFA',
      },
    },
    // tabBarComponent: props => <Logout {...props} />,
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

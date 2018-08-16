import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
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
import { UNOBLUE, WHITE } from '../styles/colors';

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
    Booking: { screen: Booking },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        paddingHorizontal: 10,
        backgroundColor: WHITE,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(192,192,192,0.3)',
      },
      headerBackTitle: null,
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
    Profile: { screen: User },
    Team: { screen: Team },
    Logout: { screen: Logout },
  }, {
    initialRouteName: 'HomeStack',
    order: ['HomeStack', 'Profile', 'Team', 'Logout'],
    tabBarOptions: {
      activeTintColor: WHITE,
      inactiveTintColor: 'rgba(2,157,178,0.7)',
      inactiveBackgroundColor: UNOBLUE,
      activeBackgroundColor: UNOBLUE,
      style: {
        paddingTop: 5,
        backgroundColor: UNOBLUE,
      },
    },
  },
);

AppTab.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let header;

  const headerTitle = routeName;

  if (routeName === 'HomeStack') {
    header = null;
  }

  return {
    headerTitle,
    header,
  };
};


const AppStack = createStackNavigator(
  { AppTab },
  {
    navigationOptions: {
      headerStyle: {
        paddingHorizontal: 10,
      },
    },
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

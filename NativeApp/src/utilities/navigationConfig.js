import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import {
  Home,
  Login,
  Boot,
  Team,
  User,
  Booking,
  Logout,
} from '../screens';
import { WHITE, ACTIVECOLOR, INACTIVECOLOR } from '../styles/colors';
import styles from './styles';

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
    Booking: { screen: Booking },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: styles.headerStyle,
      headerBackTitle: null,
      headerTitleStyle: styles.headerTitleStyle,
    },
  }
);

HomeStack.navigationOptions = () => {
  const tabBarIcon = ({ tintColor }) => (
    <Icon
      name="calendar"
      type="font-awesome"
      size={20}
      color={tintColor}
    />
  );

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
      activeTintColor: ACTIVECOLOR,
      inactiveTintColor: INACTIVECOLOR,
      inactiveBackgroundColor: WHITE,
      activeBackgroundColor: WHITE,
      allowFontScaling: false,
      style: styles.tabBarOptionsStyle,
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
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
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

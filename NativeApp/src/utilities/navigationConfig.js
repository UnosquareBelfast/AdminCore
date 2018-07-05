import {
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {
  createMaterialBottomTabNavigator,
} from 'react-navigation-material-bottom-tabs';

import {
  Home,
  Login,
  Boot,
  Team,
  User,
} from '../screens';

const AppStack = createMaterialBottomTabNavigator(
  {
    Home: { screen: Home },
    User: { screen: User },
    Team: { screen: Team },
  }, {
    initialRouteName: 'Home',
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

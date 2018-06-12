import { 
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import { Home, Login, Boot } from '../screens';

const AppStack = createStackNavigator(
  {
    Home: { screen: Home },
  },
);
const AuthStack = createStackNavigator({ Login: Login });

const RootNavigator = createSwitchNavigator(
  {
    Boot: Boot,
    App: AppStack, 
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Boot',
  }
);

export default RootNavigator;
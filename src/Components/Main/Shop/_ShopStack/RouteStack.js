import { createStackNavigator } from 'react-navigation';
import BottomTabStack from './BottomTabStack';
import Authentication from '../../../Drawer/Authentication/Authentication';
import Menu from '../../../Drawer/Menu/Menu';
import ChangeInfo from '../../../Drawer/ChangeInfo/ChangeInfo';
import OrderHistory from '../../../Drawer/OrderHistory/OrderHistory';
import transitionConfig from './transitionConfig';

function getCurrentRouteName(navigationState) {
  if (!navigationState) {return null;}
  const route = navigationState.routes[navigationState.index];
  if (route.routes)  {return getCurrentRouteName(route);}
  return route.routeName;
}
  
const RouterStack = createStackNavigator({  
  BottomTabStack,  
  Menu,
  Authentication,
  ChangeInfo,
  OrderHistory
},
{
  initialRouteName: 'BottomTabStack',
  headerMode: 'none',
  transitionConfig
}
);
  
RouterStack.navigationOptions = ({ navigation }) => {
  const navigationOptions = {};
  const currentRouteName = getCurrentRouteName(navigation.state);
  if (currentRouteName !== 'Home' && currentRouteName !== 'Cart'
  && currentRouteName !=='Search') {
    navigationOptions.drawerLockMode = 'locked-closed';
  }
  return navigationOptions;
};

export default RouterStack;
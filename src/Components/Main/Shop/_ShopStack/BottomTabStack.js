import { createBottomTabNavigator } from 'react-navigation';
import bottomTabConfig from './bottomTabConfig';
import HomeStack from '../Home/HomeStack';
import CartStack from '../Cart/CartStack';
import SearchStack from '../Search/SearchStack';
import ContactStack from '../Contact/ContactStack';

const BottomStack = createBottomTabNavigator({
  Home: HomeStack,
  Cart: CartStack,
  Search: SearchStack,
  Contact: ContactStack
},
bottomTabConfig
);

export default BottomStack;
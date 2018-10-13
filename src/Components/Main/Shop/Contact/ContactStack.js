import { createStackNavigator } from 'react-navigation';
import transitionConfig from './transitionConfig';
import Contact from './Contact';

const ContactStack = createStackNavigator(
  {
    Contact
  },
  {
    initialRouteName: 'Contact',
    transitionConfig,    
    headerMode: 'none',    
  },
  
);

export default ContactStack;
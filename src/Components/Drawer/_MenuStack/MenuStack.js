import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Authentication from '../Authentication/Authentication';
import ChangeInfo from '../ChangeInfo/ChangeInfo';
import OrderHistory from '../OrderHistory/OrderHistory';
import Menu from '../Menu/Menu';

class MainMenu extends Component {  
  render() {
    return (     
      <MenuStack />      
    );
  }
}

export default MainMenu;

const MenuStack = createStackNavigator(
  {
    Menu, Authentication, ChangeInfo, OrderHistory
  },
  {
    initialRouteName: 'Menu',
    headerMode: 'none', 
  },
);


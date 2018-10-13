import React, { Component } from 'react';
import { Platform, Dimensions, StatusBar} from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import NavigationService from '../../../../NavigationService';

import Menu from '../../../Drawer/Menu/Menu';
import RouterStack from './RouteStack';

StatusBar.setHidden(true);

const defaultDrawerConfig = {    
  contentComponent: Menu,
  drawerWidth: Dimensions.get('window').width - (Platform.OS === 'android' ? 200 : 200),  
};

const DrawerStack = createDrawerNavigator({   
  RouterStack
},
defaultDrawerConfig, 
);

class DrawerMain extends Component {  
  render() {
    return (
      <DrawerStack ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }} 
      />
    );
  }
}

export default connect()(DrawerMain);

 
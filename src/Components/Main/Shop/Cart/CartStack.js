import React from 'react';
import { createStackNavigator } from 'react-navigation';
import transitionConfig from './transitionConfig';
import Cart from './Cart';
import Header from '../Home/Home/Header';
import ProductDetails from '../Home/ProductDetails/ProductDetails';

const CartStack = createStackNavigator(
  {
    Cart,
    ProductDetails
  },
  {
    initialRouteName: 'Cart',
    transitionConfig,    
    navigationOptions: {
      header: (props) => <Header {...props} />,
    }    
  },
  
);

export default CartStack;
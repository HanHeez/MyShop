import React from 'react';
import { createStackNavigator } from 'react-navigation';
import transitionConfig from './transitionConfig';
import Home from './Home/Home';
import ProductDetails from './ProductDetails/ProductDetails';
import ListProduct from './ListProduct/ListProduct';
import Header from './Home/Header';

const HomeStack = createStackNavigator(
  {
    Home,
    ProductDetails,
    ListProduct,   
  },
  {
    initialRouteName: 'Home',
    transitionConfig,                     
    navigationOptions: {
      header: (props) => <Header {...props} />,
    }
  }, 
); 

export default HomeStack;
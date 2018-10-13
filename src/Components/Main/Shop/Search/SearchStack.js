import React from 'react';
import { createStackNavigator } from 'react-navigation';
import transitionConfig from './transitionConfig';
import Search from './Search';
import Header from '../Home/Home/Header';
import ProductDetails from '../Home/ProductDetails/ProductDetails';

const SearchStack = createStackNavigator(
  {
    Search,
    ProductDetails
  },
  {
    initialRouteName: 'Search',
    transitionConfig,    
    navigationOptions: {
      header: (props) => <Header {...props} />,
    }    
  },
  
);

export default SearchStack;
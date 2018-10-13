import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Main from './Components/Main/Shop/_ShopStack/MainStack';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

class MainApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default MainApp;
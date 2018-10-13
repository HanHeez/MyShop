import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
import * as actionCreators from '../../../../../Redux/Reducer/actionCreators';
import * as setActionCreators from '../../../../../Redux/Reducer/setActionCreators';

import initData from '../../../../../Api/initData';
import getCart from '../../../../../Api/getCart';
import checkLogIn from '../../../../../Api/checkLogIn';
import getToken from '../../../../../Api/getToken';
import refeshToken from '../../../../../Api/refreshToken';

class Home extends Component { 
  constructor(props) {
    super(props);     
  }

  componentDidMount = async () => {     
    const { actions } = this.props;
    const { startFetchData, fetchSuccess, fetchError, addProductToCart } = actions;    
    startFetchData();  
    var cartArray = [];
    try {
      const res = await initData();
      fetchSuccess(res.type, res.product);  
    } catch (error) {
      fetchError();
    }      
    try {
      cartArray = await getCart();
      addProductToCart(cartArray);       

      setInterval(async () =>{
        refeshToken();     
      },60 * 1000);
    } catch (error) {
      console.log(error);
    }  
  
    const token = await getToken();

    try {
      const checkLogin = await checkLogIn(token);
      const JsonLogin = JSON.parse(checkLogin);
      actions.saveSignInUser(JsonLogin);
    } catch (error) {
      console.log(error);
    }
    
  }  

  render() {   
    
    return (
      <View style={{flex: 1}}>        
        <ScrollView style={{flex: 1}}>                
          <View style={{ flex: 1, backgroundColor: '#D4D3DF'}}>        
            <Collection {...this.props} />
            <Category {...this.props} />
            <TopProduct {...this.props} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myTypes: state.types
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, actionCreators, setActionCreators)
      , dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
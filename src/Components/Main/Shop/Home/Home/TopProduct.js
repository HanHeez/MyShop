import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Platform, View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, FlatList } from 'react-native';

import * as actionCreators from '../../../../../Redux/Reducer/actionCreators';
import * as setActionCreators from '../../../../../Redux/Reducer/setActionCreators';

const url = 'http://192.168.0.157:8080/api/images/product/';

class TopProduct extends Component { 
  
  _renderItem = ({item}) => {    
    const { productContainer,productImage, productName, productPrice } = styles;
    const { navigation } = this.props;
    const { actions } = this.props;
    return (
      <TouchableHighlight
        underlayColor='rgba(0,0,0,0.2)'
        style={productContainer}
        onPress={()=> {
          actions.setCurrentProduct(item);
          navigation.navigate('ProductDetails');
        }}
      >
        <View>
          <Image style={productImage} source={{uri : `${url}${item.images && item.images[0]}`}} />
          <Text style={productName}>{item.name}</Text>
          <Text style={productPrice}>{item.price}$</Text>
        </View>        
      </TouchableHighlight> 
    );
  };

  render() {
    const { container, titleContainer, title, body } = styles;
    const { myTypes } = this.props;
    return (
      <View style={container}>
        <View style={titleContainer}>
          <Text style={title}>TOP PRODUCT</Text>
        </View>
        <View style={body}>
          <FlatList            
            numColumns={2}
            data={myTypes.product}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}            
          />  
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, actionCreators, setActionCreators)
      , dispatch)
  };
};

export default connect(null, mapDispatchToProps)(TopProduct);

const { width } = Dimensions.get('window');
const productWidth = (width - 60) / 2;
const productImageHeight = (productWidth / 361) * 452;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10, 
    ...Platform.select({
      ios: {
        shadowColor: '#060B11',           
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 0.5,  
      },
      android: {
        elevation: 3,
      }
    })      
  },
  titleContainer: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,  
       
  },
  title: {
    color: '#a4a4a5',
    fontSize: 20
  },
  body: {   
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    width: productWidth, 
    backgroundColor: '#fff',
    paddingBottom: 20,
    elevation: 3,
    margin: 7      
  },
  productImage: {
    width: productWidth,
    height: productImageHeight,    
  },
  productName: {
    marginVertical: 5,
    paddingLeft: 10,
    fontFamily: 'sansasion',
    color: '#a4a4a5',
    fontWeight: '500'
  },
  productPrice: {
    marginBottom: 5,
    paddingLeft: 10,
    fontFamily: 'sansasion',
    color: '#A5471E'
  }
});



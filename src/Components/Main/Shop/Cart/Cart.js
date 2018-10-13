import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, Text, TouchableOpacity, FlatList, 
  Dimensions, StyleSheet, Image 
} from 'react-native';
import * as setActionCreators from '../../../../Redux/Reducer/setActionCreators';
import sendOrder from '../../../../Api/sendOrder';
import getToken from '../../../../Api/getToken';

const url = 'http://192.168.0.157:8080/api/images/product/';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class CartView extends Component {
 
  _renderItem = ({item}) => {
    const {
      product, mainRight, productController,
      txtName, txtPrice, productImage, numberOfProduct, 
      txtShowDetail, showDetailContainer } = styles;
    const { increaseItemQuantityInCart, decreaseItemQuantityInCart, removeItemInCart } = this.props;
    return (                     
      <View key={item.id} style={product}>
        <Image source={{uri : `${url}${item.images[0]}`}} style={productImage} />
        <View style={[mainRight]}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={txtName}>{toTitleCase(item.name)}</Text>
            <TouchableOpacity onPress={() => removeItemInCart(item)}>
              <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={txtPrice}>{item.totalPrice}$</Text>
          </View>
          <View style={productController}>
            <View style={numberOfProduct}>
              <TouchableOpacity onPress={() => increaseItemQuantityInCart(item)}>
                <Text>+</Text>
              </TouchableOpacity>
              <Text>{item.quantity}</Text>
              <TouchableOpacity onPress={() => decreaseItemQuantityInCart(item)}>
                <Text>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={showDetailContainer}
              onPress={
                () => {
                  const { setCurrentProduct, navigation } = this.props;
                  setCurrentProduct(item);
                  navigation.navigate('ProductDetails');}}
            >
              <Text style={txtShowDetail}>SHOW DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> 
    );
  } 
 
  onSendOrder = async () => {
    const { cart } = this.props;
    try {
      const token = await getToken();
      const arrayDetail = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity
      }));
      const result = await sendOrder(token, arrayDetail);
      
      console.log(result);
      
    } catch (error) {
      console.log('Send Order:: ',error);
    }
  }
  render() {
    const {  checkoutButton, checkoutTitle, wrapper,
    } = styles;
    const { cart } = this.props;
    var totalPrice = 0;
    cart.map((item) => {
      totalPrice = totalPrice + parseInt(item.totalPrice);
    });
    return (
      <View style={wrapper}>
        <FlatList 
          data={cart}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity style={checkoutButton} onPress={this.onSendOrder}>
          <Text style={checkoutTitle}>TOTAL {totalPrice}$ CHECKOUT NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};
export default connect(mapStateToProps, setActionCreators)(CartView);
       
const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DFDFDF'
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2ABB9C',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    width, backgroundColor: '#DFDFDF'
  },
  checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  product: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center'
  },
  mainRight: {
    flex: 3,
    justifyContent: 'space-between'
  },
  productController: {
    flexDirection: 'row'
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  txtPrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  txtShowDetail: {
    color: '#C21C70',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  showDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});



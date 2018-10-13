import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity, 
  View,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import { connect} from 'react-redux';

import { setCurrentProduct } from '../../../../Redux/Reducer/setActionCreators';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

const urlImage = 'http://192.168.0.157:8080/api/images/product/';

class SearchView extends Component {  

    _renderItem = ({item}) => {
      const {
        product, mainRight, txtMaterial, txtColor,
        txtName, txtPrice, productImage,
        txtShowDetail, showDetailContainer
      } = styles;
      const { setCurrentProduct } = this.props;
      return( 
        <View style={product}>
          <Image source={{uri: `${urlImage}${item.images[0]}`}} style={productImage} />
          <View style={mainRight}>
            <Text style={txtName}>{toTitleCase(item.name)}</Text>
            <Text style={txtPrice}>{item.price}$</Text>
            <Text style={txtMaterial}>Material {item.material}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={txtColor}>Color {item.color}</Text>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  marginLeft: 10
                }}
              />
            </View>
            <TouchableOpacity
              style={showDetailContainer}
              onPress={() => {
                this.goToDetails();
                setCurrentProduct(item);
              }}
            >
              <Text style={txtShowDetail}>SHOW DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    goToDetails = () => {
      const { navigation } = this.props;
      navigation.navigate('ProductDetails');
    }

    render() {
      const { wrapper } = styles;
      const { searchList } = this.props;     
      return (
        <View style={wrapper}>
          <FlatList     
            data={searchList}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F6F6F6',
    flex: 1
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
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  txtColor: {
    paddingLeft: 20,
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  txtMaterial: {
    paddingLeft: 20,
    color: 'black',
    fontSize: 15,
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
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 100
  }
});

const mapStateToProps = (state) => {
  return {
    searchList: state.search
  };
};
export default connect(mapStateToProps, { setCurrentProduct })(SearchView);
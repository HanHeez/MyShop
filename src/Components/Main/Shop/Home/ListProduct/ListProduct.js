import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet, 
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import backList from '../../../../media/appIcon/backList.png';
import getListProductByType from '../../../../../Api/getListProductbyType';
import { setCurrentProduct } from '../../../../../Redux/Reducer/setActionCreators';

const urlImage = 'http://192.168.0.157:8080/api/images/product/';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class ListProduct extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      listProductByType: [],
      refreshing: false,
      page: 1
    };
    this.arrProduct = [];
  }
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  goToDetails = () => {
    const { navigation } = this.props;
    navigation.navigate('ProductDetails');
  }
  
  componentDidMount = () => {
    const { navigation } = this.props;
    const { params } = navigation.state; 
    getListProductByType(params.id,1)
      .then(res => {
        this.arrProduct = res;
        this.setState({listProductByType: this.arrProduct});
      })
      .catch(err => console.log(err));
  };
  _renderItem = ({item}) => {
    const {      
      productContainer, productImage, productInfo, lastRowInfo,
      txtName, txtPrice, txtMaterial, txtColor, txtShowDetail
    } = styles;
    const { setCurrentProduct} = this.props;
    const productTemp = (
      <View style={productContainer}>
        <Image style={productImage} source={{uri: `${urlImage}${item.images[0]}`}} />
        <View style={productInfo}>
          <Text style={txtName}>{toTitleCase(item.name)}</Text>
          <Text style={txtPrice}>117$</Text>
          <Text style={txtMaterial}>Material {item.material}</Text>
          <View style={lastRowInfo}>
            <Text style={txtColor}>Color {item.color}</Text>
            <View style={{ backgroundColor: item.color.toLowerCase(), height: 16, width: 16, borderRadius: 8 }} />
            <TouchableOpacity onPress={() => {
              this.goToDetails();
              setCurrentProduct(item);
            }}
            >
              <Text style={txtShowDetail}>SHOW DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>   
    );
    return productTemp;
  }
  render() {
    const {
      container, header, wrapper, backStyle, titleStyle      
    } = styles;
    const { listProductByType, refreshing, page } = this.state;
    
    const { navigation } = this.props;
    const { params } = navigation.state;      
    return (
      <View style={container}>        
        <View style={wrapper}>
          <View style={header}>
            <TouchableOpacity onPress={this.goBack}>
              <Image source={backList} style={backStyle} />
            </TouchableOpacity>
            <Text style={titleStyle}>{params.name}</Text>
            <View style={{ width: 30 }} />
          </View>
          <FlatList 
            refreshControl={(
              <RefreshControl 
                onRefresh={() => {
                  this.setState({ refreshing: true});
                  const newPage = page + 1;
                  const idType = params.id;
                  getListProductByType(idType, newPage)
                    .then((res) =>{
                      this.arrProduct = res.concat(this.arrProduct);
                      this.setState({ 
                        listProductByType: this.arrProduct, 
                        refreshing: false, 
                        page: newPage});
                    }).catch(err => {
                      this.setState({ refreshing: false });
                      console.log(err);
                    }); 
                }}
                refreshing={refreshing}
              />
            )}
            numColumns={1}
            data={listProductByType}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id} 
          />              
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBD8'
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 3,
    margin: 10,
    paddingHorizontal: 20
  },
  header: {    
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  backStyle: {
    width: 30,
    height: 30
  },
  titleStyle: {
    fontFamily: 'sansation',
    color: '#B10D65',
    fontSize: 20
  },
  productContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopColor: '#F0F0F0',
    borderBottomColor: '#FFF',
    borderLeftColor: '#FFF',
    borderRightColor: '#FFF',
    borderWidth: 1
  },
  productImage: {
    width: 90,
    height: (90 * 452) / 361
  },
  productInfo: {
    justifyContent: 'space-between',
    marginLeft: 15,
    flex: 1
  },
  lastRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtName: {
    fontFamily: 'Avenir',
    color: '#BCBCBC',
    fontSize: 20,
    fontWeight: '400'
  },
  txtPrice: {
    fontFamily: 'Avenir',
    color: '#B10D65',
  },
  txtMaterial: {
    fontFamily: 'Avenir'
  },
  txtColor: {
    fontFamily: 'Avenir'
  },
  txtShowDetail: {
    fontFamily: 'Avenir',
    color: '#B10D65',
    fontSize: 11
  }
});

ListProduct.propTypes = {
  navigation: PropTypes.shape({
  }).isRequired,
};


export default connect(null, { setCurrentProduct })(ListProduct);
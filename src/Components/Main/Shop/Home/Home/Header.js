import React, { Component } from 'react';
import { StyleSheet, View, Text,TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import icLogo from '../../../../media/appIcon/ic_logo.png';
import icMenu from '../../../../media/appIcon/ic_menu.png';
import searchProduct from '../../../../../Api/searchProduct';
import { searchNameProduct } from '../../../../../Redux/Reducer/setActionCreators';

const { height } = Dimensions.get('window');

class Header extends Component {  
  constructor(props) {
    super(props);  
  } 

  onSearch = (text) => {   
    const { searchNameProduct } = this.props;
    searchProduct(text)
      .then(arrProduct => {        
        searchNameProduct(arrProduct);
      })
      .catch(err => {
        searchNameProduct([]);
        console.log(err);}
      );
    
  }
  render() {    
    const { navigation } = this.props;
    const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
    return (
      <View style={wrapper}>        
        <View style={row1}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={icMenu} style={iconStyle} />          
          </TouchableOpacity>
          <Text style={titleStyle}>Wearing a Dress</Text>
          <Image source={icLogo} style={iconStyle} />
        </View>
        <TextInput 
          style={textInput}          
          underlineColorAndroid='rgba(0,0,0,0)' 
          placeholderTextColor='#aeb1b2'
          placeholder='What do you want to buy?'
          onChangeText={(text) => this.onSearch(text)}
        />
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { 
    height: height/8, 
    backgroundColor:'#34B089', 
    padding: 10, 
    justifyContent: 'space-around'
  },
  row1: { flexDirection: 'row', justifyContent: 'space-between', },
  textInput: { height: height/20, backgroundColor: 'white', paddingLeft: 10 }, 
  titleStyle: { color: '#fff', fontFamily: 'sansation', fontSize: 20 },
  iconStyle: { width: 25, height: 25 }
});


export default connect(null, { searchNameProduct })(Header);
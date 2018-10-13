import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  ImageBackground,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
   
} from 'react-native';
import PropTypes from 'prop-types';

import Swiper from 'react-native-swiper';

const { height, width } = Dimensions.get('window');

const url = 'http://192.168.0.157:8080/api/images/type/';

class Category extends Component {
  
  render() {
    const { wrapper, textStyle, imageStyle, cateTitle } = styles;
    const { myTypes, navigation } = this.props;
    const swiper = ( 
      <Swiper>  
        {myTypes.types.map(e => (
          <TouchableHighlight 
            key={e.id} 
            underlayColor='rgba(0,0,0,0.2)' 
            onPress={() => navigation.navigate('ListProduct', e)}
          >
            <ImageBackground source={{uri: `${url}${e.image}`}} style={imageStyle}>
              <Text style={cateTitle}>{e.name}</Text>
            </ImageBackground>
          </TouchableHighlight>
        ))}
      </Swiper>
    );
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: 'center', }}>
          <Text style={textStyle}>LIST OF CATEGORY</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center' }}>
          {myTypes.types.length ? swiper : null}
        </View>
      </View>       
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {    
    padding: 10,
    paddingTop: 0,    
    height: height /3,
    backgroundColor: 'white',
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
  textStyle: {
    fontSize: 20,
    color: '#a4a4a5'
  },
  imageStyle: {
    width: width, 
    height: height/3 - 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cateTitle: {
    fontSize: 15,
    fontFamily: 'sansation',
    color: '#9A9A9A'
  }
});
  
Category.propTypes = {
  navigation: PropTypes.shape({
  }).isRequired,
};

export default Category;

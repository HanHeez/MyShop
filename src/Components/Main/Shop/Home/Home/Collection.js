import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';

import bannerImage from '../../../../media/temp/banner.jpg';

const { height, width } = Dimensions.get('window');

class Collection extends Component {

  goToListProduct = () => {
    const { navigation } = this.props;
    navigation.navigate('ListProduct', {name: 'SPRING COLLECTION', id: 4});
  };

  render() {    
    const { wrapper, textStyle } = styles;
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: 'center', }}>
          <Text style={textStyle}>SPRING COLLECTIONS</Text>
        </View>
        <View style={{ flex: 4, alignItems: 'center' }}> 
          <TouchableOpacity onPress={this.goToListProduct}> 
            <Image source={bannerImage} style={{ width: width-50, height: height/3 - 80 }} />
          </TouchableOpacity>
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
  }
});

// Collection.propTypes = {
//   navigation: PropTypes.shape({
//   }).isRequired,
// };

export default Collection;
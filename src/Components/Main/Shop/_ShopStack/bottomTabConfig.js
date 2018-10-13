import React from 'react';
import { Image, Dimensions, View, Text } from 'react-native';
import IconBadge from 'react-native-icon-badge';

const imageWidth = (Dimensions.get('window').height * 4) / 100;
const imageHeight = (Dimensions.get('window').height * 4) / 100;
const tabBarHeight = (Dimensions.get('window').height * 4) / 50;
const badgeWidth = Dimensions.get('window').width / 25; // result: 20
const badgeNum = 0;

const imageList = {
  home: require('../../../media/appIcon/home0.png'),
  homeSelect: require('../../../media/appIcon/home.png'),  
  cart: require('../../../media/appIcon/cart0.png'),
  cartSelect: require('../../../media/appIcon/cart.png'),
  search: require('../../../media/appIcon/search0.png'),
  searchSelect: require('../../../media/appIcon/search.png'),
  contact: require('../../../media/appIcon/contact0.png'),
  contactSelect: require('../../../media/appIcon/contact.png'),
};

const iconImage = (icon) => {
  return (
    <View>
      <IconBadge
        MainElement={(          
          <Image style={{width: imageWidth, height: imageHeight}} source={icon} />    
        )}
        BadgeElement={
          <Text style={{color:'#FFFFFF', fontSize: 10}}>{badgeNum}</Text>
        }
        IconBadgeStyle={
          { 
            left: badgeWidth,
            top: -(badgeWidth/4),                    
            width: badgeWidth,
            height: badgeWidth,
            borderRadius: badgeWidth/2,
            backgroundColor: '#EC4847'}
        }
        Hidden={badgeNum===0}
      />      
    </View>
  );
};

const BottomTabConfig = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;      
      if (!focused) {
        switch (routeName) {
          case 'Home':
            return iconImage(imageList.home);  
          case 'Cart':
            return iconImage(imageList.cart);   
          case 'Search':
            return iconImage(imageList.search);   
          case 'Contact':   
            return iconImage(imageList.contact);         
        }
      }  else {
        switch (routeName) {
          case 'Home':
            return iconImage(imageList.homeSelect);  
          case 'Cart':
            return iconImage(imageList.cartSelect);   
          case 'Search':
            return iconImage(imageList.searchSelect);   
          case 'Contact':   
            return iconImage(imageList.contactSelect);         
        }    
      }
    },
  }),    
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'sansation',      
    },
    style: {     
      height: tabBarHeight, 
      padding: 3       
    },
    activeTintColor: '#35BEA1',
    inactiveTintColor: 'gray',
  },
  animationEnabled: false,
  swipeEnabled: false,
};

export default BottomTabConfig;
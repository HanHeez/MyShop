import { AsyncStorage } from 'react-native';

const getCart = async () => {
  const cartArray = await AsyncStorage.getItem('@cart'); 
    
  return JSON.parse(cartArray);
};

export default getCart;
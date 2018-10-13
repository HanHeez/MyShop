import { AsyncStorage } from 'react-native';

const getToken = async () => {
  const token = await AsyncStorage.getItem('@token'); 
    
  return token;
};

export default getToken;
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList
} from 'react-native';
import backSpecial from '../../media/appIcon/backs.png';
import getOrderHistory from '../../../Api/getOrderHistory';
import getToken from '../../../Api/getToken';

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { arrOrder: [] };
  }

  componentDidMount = async () => {
    getToken()
      .then(token => getOrderHistory(token))
      .then(arrOrder =>  {       
        this.setState({arrOrder: JSON.parse(arrOrder)});
      })
      .catch(err => console.log(err));
    
  };
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();  
  }
  _renderItem = ({item}) => {
    const { orderRow } = styles;
    return (
      <View style={orderRow}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Order id:</Text>
          <Text style={{ color: '#2ABB9C' }}>ORD{item.id}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>OrderTime:</Text>
          <Text style={{ color: '#C21C70' }}>{item.date_order}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Status:</Text>
          <Text style={{ color: '#2ABB9C' }}>{item.status==='0' ? 'Complete' : 'Pending'}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Total:</Text>
          <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{item.total}$</Text>
        </View>
      </View>
    );
  }
  render() {
    const { wrapper, header, headerTitle, backIconStyle, body } = styles;
    const { arrOrder } = this.state;
    return (
      <View style={wrapper}>
        <View style={header}>
          <View />
          <Text style={headerTitle}>Order History</Text>
          <TouchableOpacity onPress={this.goBack}>
            <Image source={backSpecial} style={backIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={body}>         
          <FlatList 
            data={arrOrder}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
          />          
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
  headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
  backIconStyle: { width: 30, height: 30 },
  body: { flex: 10, backgroundColor: '#F6F6F6' },
  orderRow: {
    height: width / 3,
    backgroundColor: '#FFF',
    margin: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around'
  }
});
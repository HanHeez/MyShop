import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import profileIcon from '../../media/temp/profile.png';
import saveToken from '../../../Api/saveToken';
import { signOutUser } from '../../../Redux/Reducer/setActionCreators';

class Menu extends Component {
  constructor(props) {
    super(props);  
  }

  goToAuthentication = () => {    
    const { navigation } = this.props;
    navigation.navigate('Authentication');
  };

  goToChangeInfo = () => {
    const { navigation } = this.props;
    navigation.navigate('ChangeInfo');
  }

  goToOrderHistory = () => {
    const { navigation } = this.props;
    navigation.navigate('OrderHistory');
  }  

  onSignOut = () => {
    const { signOutUser } = this.props;
    saveToken('');
    signOutUser();
  };

  render() { 
    const { container, profileImage, btnStyle, btnText, btnInfo, btnTextInfo, loginContainer, username } = styles;  
    const { user } = this.props;

    const logoutJSX = (
      <View>
        <TouchableOpacity style={btnStyle} onPress={this.goToAuthentication}>
          <Text style={btnText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    );

    const loginJSX = (
      <View style={loginContainer}>
        <Text style={username}>{user.user.name}</Text>
        <View>
          <TouchableOpacity style={btnInfo} onPress={this.goToOrderHistory}>
            <Text style={btnTextInfo}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnInfo} onPress={this.goToChangeInfo}>
            <Text style={btnTextInfo}>Change Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnInfo} onPress={this.onSignOut}>
            <Text style={btnTextInfo}>Sign out</Text>
          </TouchableOpacity>
        </View>
        <View />
      </View>
    );
    
    const mainJSX = user.isSignin ? loginJSX : logoutJSX;
    return (
      <View style={container}>
        <Image style={profileImage} source={profileIcon} />
        {mainJSX}
      </View>        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34B089',
    borderRightWidth: 1,
    borderColor: '#fff',    
    alignItems: 'center'
  },
  profileImage: {    
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 30,
  },
  btnStyle: {
    height: 60,
    borderRadius: 10,
    width: 240,    
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#34B089'
  },
  btnInfo: {
    height: 60,
    width: 240,
    borderRadius: 10,       
    backgroundColor: '#fff',
    justifyContent: 'center', 
    paddingLeft: 20,   
    marginBottom: 10
  },
  btnTextInfo: {
    color: '#34B089'
  },
  loginContainer: {
    flex: 1, 
    justifyContent:'space-between',
    alignItems: 'center'
  },
  username: {
    color: '#fff', 
    fontFamily: 'sansation', 
    fontSize: 17
  }
});

Menu.propTypes = {
  navigation: PropTypes.shape({
  }).isRequired,
};
const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { signOutUser })(Menu);
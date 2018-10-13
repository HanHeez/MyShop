import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  StyleSheet, View, Text, 
  TouchableOpacity, Image, Dimensions ,  
} from 'react-native';
import { connect } from 'react-redux';
import icLogo from '../../media/appIcon/ic_logo.png';
import icBack from '../../media/appIcon/back_white.png';
import SignIn from './SignIn';
import SignUp from './SignUp';

const { height } = Dimensions.get('window');

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state={
      isSignin: true,
    };
  }

  goToSignIn = () => {
    this.setState({isSignin: true});
  };
    
  signIn = () => {
    this.setState({isSignin: true});
  }

  signUp = () => {
    this.setState({isSignin: false});
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();   
  }

  render() {    
    const { wrapper, container, row1, 
      iconStyle, titleStyle, controlStyle,
      signinStyle,signupStyle,
      activeStyle, inactiveStyle} = styles;
    const { isSignin } = this.state;
    const signinJSX = (
      <SignIn {...this.props} />     
    );
    const signupJSX = (
      <SignUp {...this.props} goToSignIn={this.goToSignIn} /> 
    );
    const mainJSX = isSignin ? signinJSX : signupJSX;
    return (
      <View style={container}>
        <View key='headerAuthen' style={wrapper}>
          <View style={row1}>
            <TouchableOpacity onPress={this.goBack}>
              <Image source={icBack} style={iconStyle} />          
            </TouchableOpacity>
            <Text style={titleStyle}>Wearing a Dress</Text>
            <Image source={icLogo} style={iconStyle} />
          </View>          
        </View>
        {mainJSX}
        <View key='bottomAuthen' style={controlStyle}>
          <TouchableOpacity style={signinStyle} onPress={this.signIn}>
            <Text style={isSignin ? activeStyle : inactiveStyle}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={signupStyle} onPress={this.signUp}>
            <Text style={isSignin ? inactiveStyle : activeStyle}>SIGN UP</Text>
          </TouchableOpacity>          
        </View>                            
      </View>        
    );
  }
}



export default connect()(Authentication);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#34B089',
    padding: 20,
    justifyContent: 'space-between',    
  },
  wrapper: {     
    height: height/8, 
    backgroundColor:'#34B089',          
  },
  row1: { flexDirection: 'row', justifyContent: 'space-between', }, 
  titleStyle: { color: '#fff', fontFamily: 'sansation', fontSize: 20 },
  iconStyle: { width: 25, height: 25 },
  inactiveStyle: {
    color: '#888888',
    fontFamily: 'sansation',
    fontWeight: '400'
  },
  activeStyle: {
    color:'#34B089',
    fontFamily: 'sansation',
    fontWeight: '400'
  },
  controlStyle: { 
    alignSelf: 'stretch',   
    alignItems: 'center',     
    justifyContent: 'center',
    flexDirection: 'row',    
  },
  signinStyle: {   
    flex: 1, 
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 1,    
  },
  signupStyle: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'center',
    height: 50, 
    marginLeft: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,  
  } 
});


Authentication.propTypes = {
  navigation: PropTypes.shape({
  }).isRequired,
};


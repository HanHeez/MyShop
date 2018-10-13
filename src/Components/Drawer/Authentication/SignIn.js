import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import signIn from '../../../Api/signIn';
import { saveSignInUser } from '../../../Redux/Reducer/setActionCreators';
import saveToken from '../../../Api/saveToken';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  onSuccess = () => {
    const { navigation } = this.props;
    Alert.alert(
      'Notice',
      'Sign In Successfully',
      [       
        {text: 'OK', onPress: () => {navigation.navigate('Home');}},
      ],
      { cancelable: false }
    );
  };

  onSignIn = async () => {
    const { email, password } = this.state;
    const { saveSignInUser } = this.props;
    try {
      const res = await signIn(email, password);
      const resJSON = JSON.parse(res);
      saveSignInUser(resJSON);
      saveToken(resJSON.token);            
      this.onSuccess();
    } catch (error) {      
      alert('Fail to Sign In');
    }    
  }
  render() {
    const { inputStyle,
      bigButton,buttonText} = styles;
    const { email, password } = this.state;
    return (
      <View key='middleAuthen' style={{marginBottom: 100}}>
        <TextInput 
          underlineColorAndroid="rgba(0,0,0,0)" 
          style={inputStyle} 
          placeholder="Enter your mail" 
          value={email}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)" 
          style={inputStyle} 
          placeholder="Enter your password" 
          value={password}
          secureTextEntry
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity style={bigButton} onPress={this.onSignIn}>
          <Text style={buttonText}>SIGN IN NOW</Text>
        </TouchableOpacity>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 20,
    paddingLeft: 30, 
           
  },
  bigButton: {
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'sansation',
    fontWeight: '400'
  }
});



export default connect(null, { saveSignInUser })(SignIn);

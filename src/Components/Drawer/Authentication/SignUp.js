import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import register from '../../../Api/register';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: '',
    };
  }

  onSuccess = () => {
    const { goToSignIn } = this.props;
    Alert.alert(
      'Notice',
      'Sign up Successfully',
      [       
        {text: 'OK', onPress: () => {goToSignIn();}},
      ],
      { cancelable: false }
    );
  };

  registerUser = async () => {
    const { name, email, password } = this.state;
    const resultReg = await register(email, name, password);
    if (resultReg !== 'KHONG_THANH_CONG') {
      this.onSuccess();
    } else {
      alert('Đăng ký thất bại!');
      this.setState({ email: ''});
    }
  }

  render() {
    const { inputStyle,
      bigButton,buttonText} = styles;
    const { name, email, password, rePassword } = this.state;
    return (
      <View key='middleAuthen' style={{marginBottom: 100}}>
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)" 
          style={inputStyle}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => this.setState({name: text})}
        />
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)" 
          style={inputStyle}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput 
          underlineColorAndroid="rgba(0,0,0,0)" 
          style={inputStyle} 
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TextInput 
          underlineColorAndroid="rgba(0,0,0,0)" 
          style={inputStyle}
          placeholder="Re-enter your password"
          secureTextEntry
          value={rePassword}
          onChangeText={(text) => this.setState({rePassword: text})}
        />
        <TouchableOpacity style={bigButton} onPress={this.registerUser}>
          <Text style={buttonText}>SIGN UP NOW</Text>
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

export default connect()(SignUp);

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image, Alert, BackHandler, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';

import {List, Item, Input, Button, Label, Icon, Toast, Header} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const {height, width} = Dimensions.get('window');

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      secureText: true,
      icon: 'eye-off',
      email: '',
      password: '',
      loginPressed: false,
      buttonOpacity: 1,
    }
  }

  loginUser = () => {
    this.setState({loginPressed: true, buttonOpacity: 0.5});
    if(this.state.email == '' || this.state.password == ''){
          if(this.state.email == '') Toast.show({
               text: "Please Input Email",
               buttonText: "Okay",
               duration: 3000,
               type: "warning",
             })
            else       Toast.show({
                           text: "Please Input Passowrd",
                           buttonText: "Okay",
                           duration: 3000,
                           type: "warning",
                         })
                         this.setState({loginPressed: false, buttonOpacity: 1});

    } else {
      auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        Toast.show({
                 text: "Wrong Password",
                 buttonText: "Okay",
                 duration: 3000,
                 type: "error",
               })
               this.setState({loginPressed: false, buttonOpacity: 1});

      })

    }
  }

  toggle = () => {
    if(this.state.secureText){
      this.setState({icon: 'eye', secureText: false})
    } else {
      this.setState({icon: 'eye-off', secureText: true})
    }
}

  render(){
    return(
    <View style={{ flex: 1, backgroundColor: 'white'}} >
      <Header style={{height: 0, opacity: 0}} androidStatusBarColor='#B34D8C' />
      <Image source={require('../../assets/images/LoginBG.png')} style={{height: '100%', width: '101%', marginLeft: -1, position: 'absolute', }} />
      <View style={{paddingTop: 5*height/100, paddingLeft: 5*width/100}}>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 6*height/100, width: 6*height/100, backgroundColor: 'white', borderRadius: 7, justifyContent: 'center',}}>
                        <AntDesign name='left' style={{fontSize: RFPercentage(3), color: '#B34D8C', alignSelf: 'center'}} />
      </TouchableOpacity>
      </View>
      <View style={{marginLeft: 5*width/100, marginTop: 5*height/100}}>
        <Text style={{fontSize: RFValue(42), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Welcome</Text>
        <Text style={{fontSize: RFValue(42), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Back</Text>
      </View>
      <View style={{bottom: 0, position: 'absolute', width: '100%', height: '50%',}}>
      <View style={{}}>
        <View style={{paddingHorizontal: 8*width/100, marginTop: 2*height/100}}>
        <View style={{backgroundColor: 'white', position: 'absolute', width: 30*width/100}}>
        </View>

          <View>
        <TextInput keyboardType='email-address' onChangeText={(email) => this.setState({email: email})} selectionColor='#B34D8C' style={{width: '100%', height: 8*height/100, paddingLeft: 5*width/100, borderRadius: 7, alignSelf: 'center', borderWidth: 2, marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(19), }}  placeholderTextColor='black' placeholder='Enter Email' />
          <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(17)}}> EMAIL ADDRESS </Text>
          </View>
          <View style={{marginTop: 2*height/100, }}>
            <View style={{flexDirection: 'row'}}>
      <TextInput onChangeText={(password) => this.setState({password: password})} secureTextEntry={this.state.secureText} selectionColor='#B34D8C' style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(19)}} placeholderTextColor='black' placeholder='Enter Password' />
           <Icon name={this.state.icon} style={{ color: '#828282', marginTop: 2*height/100, marginLeft: -10*width/100,}} onPress={this.toggle.bind(this)}/>
           </View>
           <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(17)}}> PASSWORD </Text>
           </View>
        <TouchableOpacity style={{alignSelf: "flex-end", marginBottom: 3*height/100}} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(17)}}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
              <Button full style={{height: 7*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => this.loginUser()} >
                {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(18), color: 'white'}}>LOG IN</Text>
              </Button>
              <Text style={{alignSelf: 'center', color: '#CBCBCB', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, marginVertical: 1*height/100}}>OR</Text>
              <Button full style={{height: 7*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, marginBottom: 2*height/100, backgroundColor: 'transparent', elevation: 0, justifyContent: 'center', borderColor: 'black', borderWidth: 1.5}} onPress={() => this.props.navigation.navigate('Register')} >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(18), color: 'black'}}>SIGN UP</Text>
              </Button>
      </View>
      </View>
</View>
    );
  }
}

export default Login;

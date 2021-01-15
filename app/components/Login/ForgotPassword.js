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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const {height, width} = Dimensions.get('screen');

class ForgotPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      secureText: true,
      icon: 'eye-off',
      loginPressed: false,
      buttonOpacity: 1,
    }
  }

  passwordReset = (email) => {
    this.setState({loginPressed: true, buttonOpacity: 0.5})
    auth().sendPasswordResetEmail(this.state.email).then(res => {
        console.log(res);
        Alert.alert(
            'Successfull',
            'Password Reset Link has been sent to your Email Address', [{
                text: 'OK',
                onPress: () => this.props.navigation.navigate('Login')
            }, ], {
                cancelable: false
            }
         )
    this.setState({loginPressed: false, buttonOpacity: 1})
    }).
    catch(err => {
        console.log(err)
        Alert.alert(
            'Wrong Email',
            'No user found with this Email Address', [{
                text: 'OK',
                onPress: () => console.log("OK")
            }, ], {
                cancelable: false
            }
         )
    this.setState({loginPressed: false, buttonOpacity: 1})

    });
  }


  render(){
    return(
<KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white'}}>
      <Header style={{height: 0, opacity: 0}} androidStatusBarColor='#B34D8C' />
      <Image source={require('../../assets/images/LoginBG.png')} style={{height: '100%', width: '101%', marginLeft: -1, position: 'absolute', }} />
      <View style={{paddingTop: 5*height/100, paddingLeft: 5*width/100}}>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 6*height/100, width: 6*height/100, backgroundColor: 'white', borderRadius: 7, justifyContent: 'center',}}>
                        <AntDesign name='left' style={{fontSize: RFPercentage(3), color: '#B34D8C', alignSelf: 'center'}} />
      </TouchableOpacity>
      </View>
      <View style={{marginLeft: 5*width/100, marginTop: 5*height/100}}>
        <Text style={{fontSize: RFValue(25, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Recover</Text>
        <Text style={{fontSize: RFValue(25, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Paswword</Text>
      </View>
      <View style={{bottom: 0, position: 'absolute', width: '100%', height: '50%',}}>
      <View style={{}}>
        <View style={{paddingHorizontal: 8*width/100, marginTop: 2*height/100}}>
        <View style={{backgroundColor: 'white', position: 'absolute', width: 30*width/100}}>
        </View>

          <View>
        <TextInput keyboardType='email-address' onChangeText={(email) => this.setState({email: email})} selectionColor='#B34D8C' style={{width: '100%', height: 8*height/100, paddingLeft: 5*width/100, borderRadius: 7, alignSelf: 'center', borderWidth: 2, marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width), }}  placeholderTextColor='black' placeholder='Enter Email' />
          <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> EMAIL ADDRESS </Text>
          </View>
          
      <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, marginBottom: 2*height/100, color: '#505050'}}>Type your registered email address to get password reset link.</Text>
          
        </View>
              <Button full style={{height: 7*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => this.passwordReset()} >
                {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>RECOVER</Text>
              </Button>
              <Text style={{alignSelf: 'center', color: '#CBCBCB', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, marginVertical: 1*height/100}}>OR</Text>
              <Button full style={{height: 7*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, marginBottom: 2*height/100, backgroundColor: 'transparent', elevation: 0, justifyContent: 'center', borderColor: 'black', borderWidth: 1.5}} onPress={() => this.props.navigation.navigate('Register')} >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'black'}}>LOGIN</Text>
              </Button>
      </View>
      </View>
</KeyboardAvoidingView>
    )
  }

}

export default ForgotPassword;

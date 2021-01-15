import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions, ToastAndroid,
  Image, ActivityIndicator
} from 'react-native';

import {List, Item, Input, Button, Label, Icon, Toast, Header} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const {height, width} = Dimensions.get('window');
const Height = Dimensions.get('screen').height;

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      secureText: true,
      icon: 'eye-off',
      email: '',
      password: '',
      phoneNumber: '',
      loginPressed: false,
      buttonOpacity: 1,
    }
  }

  ValidateEmail = () => {
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) return true;
    else return false;
}

  ValidatePhone = () => {
    if(/^\d{10}$/.test(this.state.phoneNumber)) return true;
    else return false;
}

  goToNextStep = async() => {
    this.setState({loginPressed: true, buttonOpacity: .5});
      if(this.state.email == '' || this.state.password == '' || this.state.phoneNumber == ''){
          ToastAndroid.showWithGravityAndOffset("Fields Cannot Be Empty", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
      } else if(!this.ValidateEmail()){
          ToastAndroid.showWithGravityAndOffset("Invalid Email Address", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
      } else if(!this.ValidatePhone()){
          ToastAndroid.showWithGravityAndOffset("Invalid Phone Number", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
      } else {
          this.props.navigation.navigate('VerifyOTP', {data: {phoneNumber: '+91'+this.state.phoneNumber, email: this.state.email, password: this.state.password}})
      }
      this.setState({loginPressed: false, buttonOpacity: 1});
  }


  toggle = () => {
    if(this.state.secureText){
      this.setState({icon: 'eye', secureText: false})
    } else {
      this.setState({icon: 'eye-off', secureText: true})
    }
}
  render(){
    return(<View style={{ flex: 1, backgroundColor: 'white'}}>
          <Image source={require('../../assets/images/SignupBG.png')} style={{height: '90%', width: '101%', left: 0, top:0, marginLeft: -1, position: 'absolute', }} />
      <Header style={{height: 0, opacity: 0}} androidStatusBarColor='#B34D8C' />
      <View style={{paddingTop: 5*height/100, paddingLeft: 5*width/100}}>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 6*height/100, width: 6*height/100, backgroundColor: 'white', borderRadius: 7, justifyContent: 'center',}}>
        <AntDesign name='left' style={{fontSize: RFPercentage(3), color: '#B34D8C', alignSelf: 'center'}} />
      </TouchableOpacity>
      </View>
      <View style={{marginLeft: 5*width/100, marginTop: 5*height/100}}>
        <Text style={{fontSize: RFValue(25, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Create</Text>
        <Text style={{fontSize: RFValue(25, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Account</Text>
      </View>
      <View style={{bottom: 0, position: 'absolute', width: '100%', height: '55%',}}>
      <View style={{}}>
        <View style={{paddingHorizontal: 8*width/100,}}>
          <View style={{backgroundColor: 'white', position: 'absolute', width: 30*width/100}}>
        </View><View>
        <TextInput onChangeText={(email) => this.setState({email: email})} keyboardType='email-address' selectionColor='#B34D8C' style={{width: '100%', height: 8*height/100, paddingLeft: 5*width/100, borderRadius: 7, alignSelf: 'center', borderWidth: 2, marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width), }}  placeholderTextColor='black' placeholder='Enter Email' />
          <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> EMAIL ADDRESS </Text>
          </View>
           <View style={{marginTop: 2*height/100}}>
        <TextInput onChangeText={(number) => {this.setState({phoneNumber: number})}} keyboardType='number-pad' selectionColor='#B34D8C' style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}} placeholderTextColor='black' placeholder='Enter Phone No' />
           <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> PHONE NO. </Text>
           </View>
          <View style={{marginTop: 2*height/100, }}>
            <View style={{flexDirection: 'row'}}>
      <TextInput onChangeText={(password) => this.setState({password: password})} secureTextEntry={this.state.secureText} selectionColor='#B34D8C' style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}} placeholderTextColor='black' placeholder='Enter Password' />
           <Icon name={this.state.icon} style={{ color: '#828282', marginTop: 2*height/100, marginLeft: -10*width/100,}} onPress={this.toggle.bind(this)}/>
           </View>
           <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> PASSWORD </Text>
           </View>

        </View>
              <Button full style={{height: 7*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={this.goToNextStep.bind(this)} >
              {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>SIGN UP</Text>
              </Button>
              <Text style={{alignSelf: 'center', color: '#CBCBCB', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginVertical: 1*Height/100}}>OR</Text>
              <Button full style={{height: 7*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, marginBottom: 2*height/100, backgroundColor: 'transparent', elevation: 0, justifyContent: 'center', borderColor: 'black', borderWidth: 1.5}} onPress={() => this.props.navigation.navigate('Login')} >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'black'}}>LOG IN</Text>
              </Button>
      </View>
      </View>
</View>
    );
  }
}

const styles = StyleSheet.create({
  PageText: {
    paddingLeft: 5*width/100,
    marginBottom: 5*height/100
  },
  LoginForm: {
    height: 75*height/100,
    paddingHorizontal: 8*width/100,
    paddingTop: 20*height/100,
  },

  InputBox: {
      borderWidth: 3,
      borderRadius: 10,
  },

  copyright: {
    marginTop: 1*height/100,
    height: 7*height/100,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  SignupText: {},
  SignupSubText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2*height/100,
  },
});

export default Register;

import React from 'react';
import {
  StyleSheet,
  View,
  Text, ToastAndroid,
  Dimensions, TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {List, Item, Input, Button, Label, Icon, Toast} from 'native-base';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const {height, width} = Dimensions.get('window');
const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;
const vector4 = '<svg viewBox="0 0 360 267" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31859 266.999C52.3328 75.1111 294.468 249.083 358.921 44.1234L359.318 266.584L1.31859 266.999Z" fill="#EB5757" fill-opacity="0.66"/><path d="M2.08044 266.792C53.437 36.7365 295.262 245.713 360.08 0L360.08 266.792L2.08044 266.792Z" fill="#EB5757" fill-opacity="0.8"/><path d="M0.318595 267C51.5439 112.991 294.293 252.554 359 88.0513L359.318 266.584L0.318595 267Z" fill="#EB5757" fill-opacity="0.9"/></svg>';
//request.time < timestamp.date(2020, 20, 12);

class verifyOTP extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      secureText: true,
      icon: 'eye-off',
      email: 'Qq@qq.qq',
      password: 'Abc123',
      loginPressed: false,
      buttonOpacity: 1,
      box1: '',
      box2: '',
      box3: '',
      box4: '',
      box5: '',
      box6: '',
      selectedBox: 0,
      confirmResult: null,
      verificationCode: '',
      fistTime: true,
    }
    console.log(this.props.route)
    this.sendOTP();
  }
  
  
  componentDidMount(){
    this.refs.input_1.focus();
  }

  verifyOTP = () => {
      if(this.state.box1 == '' || this.state.box2 == '' || this.state.box3 == '' || this.state.box4 == '' || this.state.box5 == '' || this.state.box6 == ''){
          ToastAndroid.showWithGravityAndOffset("Invalid OTP", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
      } else {
              let enteredOTP = this.state.box1+this.state.box2+this.state.box3+this.state.box4+this.state.box5+this.state.box6;
                console.log(enteredOTP.toString());
                this.state.confirmResult.confirm(enteredOTP.toString())
                  .then(user => {
                    this.cretareUser();
                  })
                  .catch(err => console.log("Error", err))
      }
  }

  componentDidUpdate(){
    if(this.state.fistTime){
      this.setState({fistTime: false})
    this.refs.input_1.focus();
   }
  }

  cretareUser = () => {
      auth().signOut()
        .then(() => {
          auth().createUserWithEmailAndPassword(this.props.route.params.data.email, this.props.route.params.data.password)
            .then((res) => {
              ToastAndroid.showWithGravityAndOffset("Verified Succesfully", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
              this.props.navigation.navigate('SignupForm', {data: this.props.route.params})
            }).catch((err) => {
              ToastAndroid.showWithGravityAndOffset("Error Occured "+err, ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
            })
        }).catch((err) => {
          ToastAndroid.showWithGravityAndOffset("Error Occured", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
        })    
  }

  

  sendOTP = () => {
    auth()
    .signInWithPhoneNumber(this.props.route.params.data.phoneNumber)
    .then(confirmResult => {
      this.setState({ confirmResult: confirmResult });
    }).catch(err => console.log(err))
  }

  logout = () => {
    console.log("In Here")
    auth()
    .signOut()
    .then(() => {
      console.log("LoggingOut")
      this.props.navigation.navigate('SplashScreen')})
    .catch(error => console.log(error))
  }

  virtualNumpad = (buttonPreesed) => {
    if(buttonPreesed !== null){
      switch(this.state.selectedBox){
        case 1: this.setState({box1: ''+buttonPreesed}); this.refs.input_2.focus(); break;
        case 2: this.setState({box2: ''+buttonPreesed}); this.refs.input_3.focus(); break;
        case 3: this.setState({box3: ''+buttonPreesed}); this.refs.input_4.focus(); break;
        case 4: this.setState({box4: ''+buttonPreesed}); this.refs.input_5.focus(); break;
        case 5: this.setState({box5: ''+buttonPreesed}); this.refs.input_6.focus(); break;
        case 6: this.setState({box6: ''+buttonPreesed}); this.refs.input_6.blur(); break;
        default: 
      }} else {
        switch(this.state.selectedBox){
          case 1: this.setState({box1: ''}); this.refs.input_1.blur(); break;
          case 2: this.setState({box2: ''}); this.refs.input_1.focus(); break;
          case 3: this.setState({box3: ''}); this.refs.input_2.focus(); break;
          case 4: this.setState({box4: ''}); this.refs.input_3.focus(); break;
          case 5: this.setState({box5: ''}); this.refs.input_4.focus(); break;
          case 6: this.setState({box6: ''}); this.refs.input_5.focus(); break;
          default: 
        }        
      }
  }

  
  render(){
    return(<View style={{backgroundColor: '#B34D8C', flex: 1}}>
         <View style={styles.PageText}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFPercentage(8), color: 'white',}}>Verify</Text>
      </View>
      <View style={{backgroundColor: 'white', flex: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingVertical: 2*height/100}}>
          <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFPercentage(3.5), alignSelf: 'center'}}>Enter Your OTP Code</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15*width/100}}>
          <TextInput onFocus={() => this.setState({selectedBox: 1})} onBlur={() => this.setState({selectedBox: 0})} maxLength={1} value={this.state.box1} style={{  borderColor: 'gray', borderBottomWidth: 1, width: 10*width/100, fontSize: RFPercentage(4), textAlign: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR }} selectionColor='#B34D8C' showSoftInputOnFocus={false} ref={'input_1'} />
          <TextInput onFocus={() => this.setState({selectedBox: 2})} onBlur={() => this.setState({selectedBox: 0})} maxLength={1} value={this.state.box2} style={{ borderColor: 'gray', borderBottomWidth: 1, width: 10*width/100, fontSize: RFPercentage(4), fontFamily: fontStyle.FONT_FAMILY_REGULAR, textAlign: 'center' }} selectionColor='#B34D8C' showSoftInputOnFocus={false} ref={'input_2'} />
          <TextInput onFocus={() => this.setState({selectedBox: 3})} onBlur={() => this.setState({selectedBox: 0})} maxLength={1} value={this.state.box3} style={{ borderColor: 'gray', borderBottomWidth: 1, width: 10*width/100, fontSize: RFPercentage(4), fontFamily: fontStyle.FONT_FAMILY_REGULAR, textAlign: 'center' }} selectionColor='#B34D8C' showSoftInputOnFocus={false} ref={'input_3'} />
          <TextInput onFocus={() => this.setState({selectedBox: 4})} onBlur={() => this.setState({selectedBox: 0})} maxLength={1} value={this.state.box4} style={{ borderColor: 'gray', borderBottomWidth: 1, width: 10*width/100, fontSize: RFPercentage(4), fontFamily: fontStyle.FONT_FAMILY_REGULAR, textAlign: 'center' }} selectionColor='#B34D8C' showSoftInputOnFocus={false} ref={'input_4'} />
          <TextInput onFocus={() => this.setState({selectedBox: 5})} onBlur={() => this.setState({selectedBox: 0})} maxLength={1} value={this.state.box5} style={{ borderColor: 'gray', borderBottomWidth: 1, width: 10*width/100, fontSize: RFPercentage(4), fontFamily: fontStyle.FONT_FAMILY_REGULAR, textAlign: 'center' }} selectionColor='#B34D8C' showSoftInputOnFocus={false} ref={'input_5'} />
          <TextInput onFocus={() => this.setState({selectedBox: 6})} onBlur={() => this.setState({selectedBox: 0})} maxLength={1} value={this.state.box6} style={{ borderColor: 'gray', borderBottomWidth: 1, width: 10*width/100, fontSize: RFPercentage(4), fontFamily: fontStyle.FONT_FAMILY_REGULAR, textAlign: 'center' }} selectionColor='#B34D8C' showSoftInputOnFocus={false} ref={'input_6'} />
          </View>
                <View style={{paddingTop: 5*height/100, flex: 1, justifyContent: 'space-around',}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(1)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(2)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(3)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(4)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(5)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(6)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity  style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(7)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(8)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{width: 30*width/100,}}  onPress={() => this.virtualNumpad(9)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={{width: 30*width/100,}} >
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(8)}}>  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 30*width/100,}} onPress={() => this.virtualNumpad(0)}>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center' ,fontSize: RFPercentage(8)}}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{width: 30*width/100, paddingTop: 1*height/100}}  onPress={() => this.virtualNumpad(null)}>
                        <Entypo style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, alignSelf: 'center', fontSize: RFPercentage(5)}} name='erase' />
                    </TouchableOpacity>
                </View>
                </View>
                <Button androidRippleColor full style={{height: 8*height/100, borderRadius: 20, width: 60*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, marginBottom: 2*height/100, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => this.verifyOTP()} >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Verify</Text>
              </Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PageText: {
    paddingTop: 5*height/100,
    paddingLeft: 5*height/100,
    height: 20*height/100
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


const mapDispatchToProps = dispatch => {
  return {
    login: (loginData) => dispatch({type: 'LOGIN', data: loginData}),
    saveDP: (profilleURL) => dispatch({type: 'SAVE_DP', data: profilleURL})
  }
}

export default connect(null, mapDispatchToProps)(verifyOTP);

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image, Alert, BackHandler, ActivityIndicator, ScrollView, KeyboardAvoidingView
} from 'react-native';

import axios from 'axios';
import {List, Item, Input, Button, Label, Icon, Toast, Header} from 'native-base';
import Awesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import {Dropdown} from 'react-native-material-dropdown';
import {Picker} from '@react-native-picker/picker';

// import {Picker} from '@react-native-community/picker';


import {connect} from 'react-redux';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const {height, width} = Dimensions.get('window');
const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;
const vector4 = '<svg viewBox="0 0 360 267" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31859 266.999C52.3328 75.1111 294.468 249.083 358.921 44.1234L359.318 266.584L1.31859 266.999Z" fill="#EB5757" fill-opacity="0.66"/><path d="M2.08044 266.792C53.437 36.7365 295.262 245.713 360.08 0L360.08 266.792L2.08044 266.792Z" fill="#EB5757" fill-opacity="0.8"/><path d="M0.318595 267C51.5439 112.991 294.293 252.554 359 88.0513L359.318 266.584L0.318595 267Z" fill="#EB5757" fill-opacity="0.9"/></svg>';
//request.time < timestamp.date(2020, 20, 12);

const options = {
  title: 'Select Avatar',
  quality: 0.25,
  storageOptions: {
    skipBackup: true,
    path: 'images',
    },
};

const Data = [
    {value: 'Male'},
    {value: 'Female'},
  ]

class SignupForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      secureText: true,
      bio: '',
      gender: '',
      uname: '',
      fullName: '',
      loginPressed: false,
      buttonOpacity: 1,
      DOB: new Date(),
      pickerOpen: false,
      currentDOB: 'Date Of Birth',
      localPath: '',
      imageLoaded: true,
      currOpacity: 1,
      profilleURL: '',
      imageUploaded: false,
      imageUri: '',
      currWidth: 1
    }
  }

  getDOB = (date) => {
      console.log(date);
      this.setState({DOB: date})
      this.setState({currentDOB: date.toString().substring(0, 15)})
      this.hideDateTimePicker();
  }

  openDateTimePicker = () => {
    this.setState({pickerOpen: true})
  }

  hideDateTimePicker = () => {
    this.setState({pickerOpen: false})
  }

  completeProfile = async (res) => {
    this.setState({buttonOpacity: 0.5, loginPressed: true})

    if(this.state.bio == '' || this.state.gender == '' || this.state.uname == ''){
      Toast.show({
        text: "Please Input All Fields First",
        buttonText: "Okay",
        duration: 3000,
        type: "warning",
      })
      this.setState({loginPressed: false, buttonOpacity: 1})
    } else {

      firestore().collection('Users').doc(auth().currentUser.uid).update({
        uname: this.state.uname,
        DOB: this.state.DOB,
        bio: this.state.bio,
        gender: this.state.gender,
        phoneNumber: this.props.route.params.data.data.phoneNumber,
        fullName: this.state.fullName,
        user_type: 'appuser',
        profileURL: this.state.profilleURL,
      }).then((res) => {
        console.log(res);
        this.setState({loginPressed: false, buttonOpacity: 1});
        this.props.navigation.navigate('Home')
      }).catch((err) => console.log(err))

   }
 }

    uploadProfile = async() => {
      ImagePicker.showImagePicker(options, (response) => {
            console.log(response.path);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({imageLoaded: false, currOpacity: .3,}); 
          let imageName = 'profile/profile_' + auth().currentUser.uid +'.jpeg'
          storage().ref(imageName).putFile(response.path).
           then((res) => {
             console.log(res);
            storage().ref(res.metadata.fullPath).getDownloadURL().
            then((res) => this.setState({profilleURL: res}))
             const source = { uri: 'data:image/jpeg;base64,' + response.data }
             this.setState({imageLoaded: true, currOpacity: 1, imageUploaded: true, imageUri: source, currWidth: 0})
          }).
           catch((err) => {console.log(err)})
    }
  });
  }

  render(){
    return(
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white'}}>
      <Header style={{height: 0, opacity: 0}} androidStatusBarColor='#B34D8C' />
      <Image source={require('../../assets/images/test.png')} style={{height: '50%', width: '101%', marginLeft: -1, position: 'absolute', backgroundColor: 'transparent' }} />
      <View style={{paddingTop: 5*height/100, paddingLeft: 5*width/100, flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 7*height/100, width: 7*height/100, backgroundColor: 'white', borderRadius: 7, justifyContent: 'center',}}>
                        <AntDesign name='left' style={{fontSize: RFPercentage(3), color: '#B34D8C', alignSelf: 'center'}} />
      </TouchableOpacity>
      <View style={{marginLeft: 2*width/100}}>
      <Text style={{fontSize: RFValue(15, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white',}}>Complete</Text>
      <Text style={{fontSize: RFValue(15, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white', alignSelf: 'center'}}>Registration</Text>
      </View>
      </View>
      <View style={{bottom: 0, position: 'absolute', width: '100%', height: '75%', }}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{}}>
        <View style={{paddingHorizontal: 8*width/100,}}>
        <View style={{backgroundColor: 'white', position: 'absolute', width: 30*width/100}}>
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={() => this.uploadProfile()} style={{justifyContent: 'center', alignSelf: 'center', borderWidth: this.state.currWidth, height: 15*height/100, width: 15*height/100, borderRadius: 100,}} >
            {this.state.imageLoaded ? <></> : <ActivityIndicator color='black' size='large' style={{position: 'absolute', alignSelf: 'center'}} />}
              <View style={{opacity: this.state.currOpacity}}>
              {this.state.imageUploaded 
              ? 
              <Image source={this.state.imageUri} style={{height: 15*height/100, width: 15*height/100, borderRadius: 100,}} />
              :
              <> 
              <AntDesign name='camera' style={{alignSelf: 'center', fontSize: RFValue(24, width)}} />
              <Text style={{fontSize: RFValue(10, width), textAlign: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Set Profile Picture</Text>
              </>}
              </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 2*height/100}}>
        <TextInput onChangeText={(uname) => {this.setState({uname: uname})}} selectionColor='#B34D8C' style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}} placeholderTextColor='black' placeholder='Choose Username' />
           <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> USERNAME </Text>
        </View>
        <View style={{marginTop: 2*height/100}}>
        <TextInput onChangeText={(fullName) => {this.setState({fullName: fullName})}} selectionColor='#B34D8C' style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}} placeholderTextColor='black' placeholder='Enter Full Name' />
           <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> FULL NAME </Text>
        </View>
        <View style={{marginTop: 2*height/100, paddingLeft: 5*width/100, borderRadius: 7, borderWidth: 2, height: 8*height/100, marginBottom: 2*height/100, }}>
        <Picker
          style={{width: '100%',alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_LIGHT,}}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue, gender: itemValue})
          }
          enabled={true}
          itemTextStyle={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFValue(5, width)}}
          itemStyle={{fontFamily: fontStyle.FONT_FAMILY_LIGHT}}
          mode="dropdown">
          <Picker.Item label="Choose Gender" value=" " />
          <Picker.Item label="MALE" value="male"  />
          <Picker.Item label="FEMALE" value="female" />
        </Picker>
      
           <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> GENDER </Text>
        </View>
        <View style={{marginTop: 2*height/100}}>
        <TextInput caretHidden={true} showSoftInputOnFocus={false} selectionColor='#B34D8C' style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}} placeholderTextColor='black' placeholder={this.state.currentDOB} onFocus={() => this.openDateTimePicker()} />
           <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> DOB </Text>
        </View> 
        <DateTimePickerModal
        isVisible={this.state.pickerOpen}
        mode="date"
        onConfirm={(data) => this.getDOB(data)}
        onCancel={() => {console.log("cancel")}}
        onHide={() => console.log("HIDING")}
        />


        <View style={{marginTop: 2*height/100}}>
        <TextInput onChangeText={(bio) => this.setState({bio: bio})} numberOfLines={4} selectionColor='#B34D8C' style={{width: '100%', paddingLeft: 5*width/100, height: 15*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}} placeholderTextColor='black' placeholder='Tell Us Something About Yourself' />
           <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> BIO </Text>
        </View>
        </View>
              <Button full style={{height: 7*height/100, marginBottom: 3*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => this.completeProfile()} >
                {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>COMPLETE</Text>
              </Button>
      </View>
      </ScrollView>
      </View>
</KeyboardAvoidingView>
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


const mapDispatchToProps = dispatch => {
  return {
    login: (loginData) => dispatch({type: 'LOGIN', data: loginData}),
    saveDP: (profilleURL) => dispatch({type: 'SAVE_DP', data: profilleURL})
  }
}

export default connect(null, mapDispatchToProps)(SignupForm);

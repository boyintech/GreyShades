import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
import {Header, List, ListItem,
        Icon, Right, Left, Body,
        Switch, Button, Input} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {height,width} = Dimensions.get('window');
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


class ProfileSettings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      profile_url: '',
      uid: '',
      currentUserData: {},
      billing_details: {},
      imageName: '',
      uploadUri: '',
      imageLoaded: true
    };
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
          storage().ref('/profile/profile_'+auth().currentUser.uid+'.jpeg').getDownloadURL().
          then(url => {
            this.props.saveDP(url);
            this.setState({imageLoaded: true, currOpacity: 1, imageUploaded: true, })
          }).
          catch((err) => {console.log(err)})
        }).
         catch((err) => {console.log(err)})
  }
});
}


  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header androidStatusBarColor='#A52C77' style={{height:0, opacity: 0}} />
                <Image source={require('../../../assets/images/Header.png')} style={{width: width, height: '15%'}} />
                <View style={{position: 'absolute', flexDirection: 'row', top: '4%', marginLeft: '2%'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 6*height/100, width: 6*height/100, backgroundColor: 'white', borderRadius: 7, marginBottom: 1*height/100, justifyContent: 'center'}}>
                        <AntDesign name='left' style={{fontSize: RFPercentage(5), color: '#B34D8C', alignSelf: 'center'}} />
                    </TouchableOpacity>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(16, width), color: 'white', marginLeft: '3%', marginTop: '2%'}}>Account Settings</Text>
                </View>
                <View style={{alignSelf: 'center', marginTop: 2*height/100}}>
                {this.state.imageLoaded ?  
                    <Image source={{uri: this.props.profileURL}} style={{height: 12*height/100, width: 12*height/100, borderRadius: 50, alignSelf: 'center'}} /> :
                <View style={{height: 12*height/100, width: 12*height/100, borderRadius: 50, justifyContent: 'center', marginLeft: '5%' }}><ActivityIndicator size="large" color='#B34D8C' style={{}} /></View>} 

                <View style={{}}>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, textAlign: 'center'}}>{this.props.currentUserData.fullName}</Text>
                <TouchableOpacity onPress={() => this.uploadProfile()}>
                  <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#B34D8C', marginTop: 2 }}>Change Profile Picture</Text>
                </TouchableOpacity>
                </View>
                </View>
              <View style={{backgroundColor: 'white', paddingHorizontal: '5%', justifyContent: 'space-around', height: 50*height/100, marginTop: 2*height/100}}>

                <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#F3F2F2', borderRadius: 15, minHeight: 8*height/100, paddingHorizontal: 2*width/100}} onPress={() => this.props.navigation.navigate('ProfileSettings')}>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='account' size={RFValue(36)} style={{color: '#f66', alignSelf: 'center'}} />
                    <Text style={{alignSelf: 'center', fontSize: RFValue(18), fontFamily: fontStyle.FONT_FAMILY_MEDIUM,}}>Change Personal Information</Text>
                  </View>
                  <Right>
                    <AntDesign name='right' size={18} />
                  </Right>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#F3F2F2', borderRadius: 15, minHeight: 8*height/100, paddingHorizontal: 2*width/100}} onPress={() => this.props.navigation.navigate('ChangePassword')}>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='lock' size={RFValue(36)} style={{color: '#B34D8C', alignSelf: 'center'}} />
                    <Text style={{alignSelf: 'center', fontSize: RFValue(18), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Change Password</Text>
                  </View>
                  <Right>
                    <AntDesign name='right' size={18} />
                  </Right>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#F3F2F2', borderRadius: 15, minHeight: 8*height/100, paddingHorizontal: 2*width/100}} onPress={() => this.props.navigation.navigate('About')}>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='alert-circle' size={RFValue(36)} style={{color: '#9CCB19', alignSelf: 'center'}}/>
                    <Text style={{alignSelf: 'center', fontSize: RFValue(18), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>About Us</Text>
                  </View>
                  <Right>
                    <AntDesign name='right' size={18} />
                  </Right>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#F3F2F2', borderRadius: 15, minHeight: 8*height/100, paddingHorizontal: 2*width/100}} onPress={() => this.props.navigation.navigate('Policy')}>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialIcons name='privacy-tip' size={RFValue(36)} style={{color:'#FCC548', alignSelf: 'center'}} />
                    <Text style={{alignSelf: 'center', fontSize: RFValue(18), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Privacy Policy</Text>
                  </View>
                  <Right>
                    <AntDesign name='right' size={18} />
                  </Right>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#F3F2F2', borderRadius: 15, minHeight: 8*height/100, paddingHorizontal: 2*width/100}} onPress={() => this.props.navigation.navigate('Help')} >
                  <View style={{flexDirection: 'row'}}>
                    <MaterialIcons name='live-help' size={RFValue(36)} style={{color: '#068481', alignSelf: 'center'}} />
                    <Text style={{alignSelf: 'center', fontSize: RFValue(18), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Help</Text>
                  </View>
                  <Right>
                    <AntDesign name='right' size={18} />
                  </Right>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{alignSelf: 'center', color: '#8B8878', fontFamily: fontStyle.FONT_FAMILY_THIN, marginTop: 1*height/100}}>©GreyShades Application 2020-21</Text>
              </View>
        </View>
    );
  }
}

mapStateToProps = state => {
  return state;
}

mapDispatchToProps = dispatch => {
  return {
    saveDP: (profileURL) => dispatch({type: 'SAVE_DP', data: profileURL})
  }
}

export default (connect)(mapStateToProps, mapDispatchToProps)(ProfileSettings);

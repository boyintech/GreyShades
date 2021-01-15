import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, ToastAndroid} from 'react-native';
import {Header, List, ListItem,
        Icon, Right, Left, Body,
        Switch, Button, Input} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');

class ProfileSettings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            secureText: true,
            bio: this.props.currentUserData.bio,
            uname: '@'+this.props.currentUserData.uname,
            fullName: this.props.currentUserData.fullName,
            email: this.props.currentUserData.email,
            phoneNumber: this.props.currentUserData.phoneNumber,
            loginPressed: false,
            buttonOpacity: 1,
            pickerOpen: false,
            showError: false,
        }
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header androidStatusBarColor='#A52C77' style={{height:0, opacity: 0}} />
                <Image source={require('../../../assets/images/HeaderPlain.png')} style={{width: width, height: '10%', resizeMode: 'stretch'}} />
                <View style={{position: 'absolute', flexDirection: 'row', top: '1%', marginLeft: '2%'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 5*height/100, width: 5*height/100, backgroundColor: 'white', borderRadius: 7, marginBottom: 1*height/100, justifyContent: 'center'}}>
                    <AntDesign name='left' style={{fontSize: RFPercentage(5), color: '#B34D8C', alignSelf: 'center'}} />
                </TouchableOpacity>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(16, width), color: 'white', marginLeft: '3%', marginTop: '1.5%'}}>Update Info</Text>
                </View>
                


                <ScrollView style={{backgroundColor: 'white', paddingHorizontal: '5%', marginTop: 3*height/100}}>



                    <View style={{marginTop: 2*height/100, backgroundColor: 'white',}}>
                    <TextInput caretHidden={true} value={this.state.email} showSoftInputOnFocus={false} style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width), backgroundColor: '#F3F2F2'}} placeholderTextColor='black' placeholder='Choose Username' />
                    <Text style={{backgroundColor: 'white', borderRadius: 10, position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> EMAIL ADDRESS </Text>
                    </View>
                    <View style={{marginTop: 2*height/100, backgroundColor: 'white',}}>
                    <TextInput caretHidden={true} showSoftInputOnFocus={false} value={this.state.uname} style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width), backgroundColor: '#F3F2F2'}} placeholderTextColor='black' placeholder='Choose Username' />
                    <Text style={{backgroundColor: 'white', position: 'absolute', borderRadius: 10, marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> USERNAME </Text>
                    </View>
                    <View style={{marginTop: 2*height/100, backgroundColor: 'white',}}>
                    <TextInput caretHidden={true} showSoftInputOnFocus={false} value={this.state.phoneNumber} style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width), backgroundColor: '#F3F2F2'}} placeholderTextColor='black' placeholder='Choose Username' />
                    <Text style={{backgroundColor: 'white', position: 'absolute',borderRadius: 10, marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> MOBILE NO. </Text>
                    </View>

                    <TouchableOpacity style={{flexDirection: 'row', borderColor: '#787678', minHeight: 8*height/100, paddingHorizontal: 2*width/100}} onPress={() => this.props.navigation.navigate('ChangeBIO')} >
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center', fontSize: RFValue(18), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Change BIO</Text>
                  </View>
                  <Right>
                    <AntDesign name='right' size={18} />
                  </Right>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', borderTopWidth: .2, borderColor: '#787678', minHeight: 8*height/100, paddingHorizontal: 2*width/100}} onPress={() => this.props.navigation.navigate('ChangeFullName')} >
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center', fontSize: RFValue(18), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Change Full Name</Text>
                  </View>
                  <Right>
                    <AntDesign name='right' size={18} />
                  </Right>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', borderTopWidth: .2, borderBottomWidth: .9, borderColor: '#787678', minHeight: 8*height/100, paddingHorizontal: 2*width/100}} onPress={() => this.props.navigation.navigate('ChangeDOB')} >
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center', fontSize: RFValue(18), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Change DOB</Text>
                  </View>
                  <Right>
                    <AntDesign name='right' size={18} />
                  </Right>
                </TouchableOpacity>

                </ScrollView>
        </View>
        );
    }

}

mapStateToProps = state => {
    return state;
}

mapDispatchToProps = dispatch => {
    return {
        updateProfile: (updatedData) => dispatch({type: 'UPDATE_PROFILE', data: updatedData})
    }
}

export default (connect)(mapStateToProps, mapDispatchToProps)(ProfileSettings);
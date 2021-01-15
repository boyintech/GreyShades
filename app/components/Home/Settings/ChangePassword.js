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
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');


class ChangePassword extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loginPressed: false,
            buttonOpacity: 1,
            currPassword: '',
            newPassword: '',
            showError: false
        }
    }

    updatePassword = async() => {
        this.setState({loginPressed: true, buttonOpacity: 0.5});
            if(this.state.currPassword == this.state.newPassword){
                ToastAndroid.showWithGravityAndOffset("Please Input First", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
                this.setState({loginPressed: false, buttonOpacity: 1})
            } else if(this.state.currPassword == '' || this.state.newPassword == '') {
                ToastAndroid.showWithGravityAndOffset("Passwords Cannot be Same", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
                this.setState({loginPressed: false, buttonOpacity: 1})
            } else {
                    var cred = auth.EmailAuthProvider.credential(auth().currentUser.email, this.state.currPassword);
                    auth().currentUser.reauthenticateWithCredential(cred).then((user) => {
                        auth().currentUser.updatePassword(this.state.newPassword)
                        .then((res) => {
                            this.setState({loginPressed: false, buttonOpacity: 1});
                            ToastAndroid.showWithGravityAndOffset("Password Updated Successfully", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
                            this.props.navigation.goBack();
                        }).catch((err) => {console.log(err);
                            this.setState({loginPressed: false, buttonOpacity: 1, showError: true})
                        })
                    }).catch((err) => {
                        console.log(err)
                        this.setState({loginPressed: false, buttonOpacity: 1, showError: true})
                    })                
            }
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'white',}}>
            <Header androidStatusBarColor='#A52C77' style={{height:0, opacity: 0}} />
            <Image source={require('../../../assets/images/HeaderPlain.png')} style={{width: width, height: '10%', resizeMode: 'stretch'}} />
            <View style={{position: 'absolute', flexDirection: 'row', top: '1%', marginLeft: '2%'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 5*height/100, width: 5*height/100, backgroundColor: 'white', borderRadius: 7, marginBottom: 1*height/100, justifyContent: 'center'}}>
                    <AntDesign name='left' style={{fontSize: RFPercentage(5), color: '#B34D8C', alignSelf: 'center'}} />
                </TouchableOpacity>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(16, width), color: 'white', marginLeft: '3%', marginTop: '1.5%'}}>Change Password</Text>
            </View>
            


            <View style={{backgroundColor: 'white', paddingHorizontal: '5%', marginTop: 3*height/100,}}>
                


                <View style={{marginTop: 2*height/100, backgroundColor: 'white',}}>
                <TextInput onChangeText={(currPassword) => this.setState({currPassword: currPassword})} style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width),}} placeholderTextColor='black' placeholder='Enter Current Password' />
                <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> CURRENT PASSWORD </Text>
                </View>
                <View style={{marginTop: 2*height/100, backgroundColor: 'white',}}>
                <TextInput onChangeText={(newPassword) => this.setState({newPassword: newPassword})} style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}} placeholderTextColor='black' placeholder='Enter New Password' />
                <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> NEW PASSWORD </Text>
                </View>


                {this.state.showError ?                
                     <View style={{marginBottom: 2*height/100}}>
                        <Text style={{color: 'red', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(14)}}>
                            You Input Wrong Password, Please Check Again!
                        </Text>
                    </View> : <></>}
                <View>
                </View>

                <Button full style={{height: 7*height/100, marginBottom: 3*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => this.updatePassword()}>
                    {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                    <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>CHANGE PASSWORD</Text>
                </Button>

             </View>   
    </View>
        );
    }

}

mapStateToProps = state => {
    return state;
}

export default (connect)(mapStateToProps, null)(ChangePassword);
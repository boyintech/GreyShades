import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, ActivityIndicator, TextInput, ToastAndroid} from 'react-native';
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
import DateTimePickerModal from "react-native-modal-datetime-picker";

const {height, width} = Dimensions.get('window');



class ChangeDOB extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            DOB: new Date(this.props.currentUserData.DOB._nanoseconds*1000)
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

    changeDOB = () => {
        this.setState({buttonOpacity: 0.5, loginPressed: true})
        if(this.state.bio == ''){
            ToastAndroid.showWithGravityAndOffset(
                "Please Input First!", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50
            );
        } else {
            firestore().collection('Users').doc(auth().currentUser.uid).update({
                DOB: this.state.DOB
            }).then((res) => {
                firestore().collection('Users').doc(auth().currentUser.uid).get().
                    then((res) => {
                        this.props.updateProfile(res._data);
                        ToastAndroid.showWithGravityAndOffset(
                            "Changes Saved Successfully!", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50
                        );
                        this.props.navigation.goBack();
                        }).catch((err) => console.log(err))
            }).catch((err) => console.log(err))
        }
        this.setState({buttonOpacity: 1, loginPressed: false})
}



    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header androidStatusBarColor='#A52C77' style={{backgroundColor: '#A52C77', justifyContent: 'flex-start'}}>
                <View style={{flexDirection: 'row', top: '1%', alignSelf: 'center'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 5*height/100, width: 5*height/100, backgroundColor: 'white', borderRadius: 7, marginBottom: 1*height/100, justifyContent: 'center'}}>
                    <AntDesign name='left' style={{fontSize: RFPercentage(5), color: '#B34D8C', alignSelf: 'center'}} />
                </TouchableOpacity>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(16, width), color: 'white', marginLeft: '3%', marginTop: '1.5%'}}>Update BIO</Text>
                </View>
                </Header>



                <View style={{marginTop: 5*height/100, paddingHorizontal: 5*width/100}}>
                <TextInput value={this.state.DOB.toString().substring(0, 15)} caretHidden={true} showSoftInputOnFocus={false} onFocus={() => this.setState({pickerOpen: true})} onChangeText={(fullName) => {this.setState({fullName: fullName})}} selectionColor='#B34D8C' style={{width: '100%', paddingLeft: 5*width/100, height: 8*height/100, borderRadius: 7, borderWidth: 2, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}} placeholderTextColor='black' placeholder='Change Full Name' />
                <Text style={{backgroundColor: 'white', position: 'absolute', marginLeft: 5*width/100, marginTop: -15, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(10, width)}}> DOB </Text>
                </View>
                    <DateTimePickerModal
                    isVisible={this.state.pickerOpen}
                    display='calendar'
                    minimumDate={new Date(1970, 0, 1)}
                    mode="date"
                    onConfirm={(data) => this.getDOB(data)}
                    onCancel={() => {console.log("cancel")}}
                    onHide={() => console.log("HIDING")}
                    />
                    


                    {this.state.showError ? <View style={{marginBottom: 2*height/100}}>
                        <Text style={{color: 'red', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(14)}}>
                            *Invalid Changes
                        </Text>
                    </View> : <></>}

                    <Button full style={{height: 7*height/100, marginBottom: 3*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => this.changeDOB()}>
                    {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                    <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>SAVE CHANGES</Text>
                    </Button>


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

export default (connect)(mapStateToProps, mapDispatchToProps)(ChangeDOB);
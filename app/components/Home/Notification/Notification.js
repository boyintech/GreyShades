import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';

import {Header, List, ListItem, Body, Right, Left, Thumbnail} from 'native-base';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AntDesign from 'react-native-vector-icons/AntDesign';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { VideoPlayer, Trimmer } from 'react-native-video-processing';
// import RNVideoEditor from 'react-native-video-editor';


const {height, width} = Dimensions.get('window');

class Notification extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
    <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header androidStatusBarColor='#A52C77' style={{height:0, opacity: 0}} />
            <Image source={require('../../../assets/images/Header.png')} style={{width: width, height: '15%'}} />
            <View style={{position: 'absolute', flexDirection: 'row', top: '4%',}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: 6*height/100, marginLeft: 3*width/100, width: 6*height/100, backgroundColor: 'white', borderRadius: 7, marginBottom: 1*height/100, justifyContent: 'center'}}>
                    <AntDesign name='left' style={{fontSize: RFPercentage(5), color: '#B34D8C', alignSelf: 'center', }} />
                </TouchableOpacity>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(16, width), color: 'white', marginLeft: '3%', marginTop: '2%'}}>Notifications</Text>
            </View>

            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2*height/100, paddingHorizontal: 5*width/100}} onPress={() => {this.props.navigation.jumpTo('Feed')}}>
                <View style={{alignSelf: 'center'}}>
                    <Thumbnail source={require('../../../assets/images/logo.png')} />
                </View>
                <View style={{width: '80%', alignSelf: 'center', marginLeft: 3*width/100}}>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 16, }}>Admin Uploaded a New Video</Text>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, color: '#c4c4c4' }}>Video Title - Video Caption</Text>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: 16, color: '#404040' }}>{(new Date().toLocaleString().substring(0, 16))}</Text>
                </View>
                <AwesomeIcon name='ellipsis-v' size={20} style={{alignSelf: 'center'}}/>
            </TouchableOpacity>

    </View>
        );
    }
}

export default Notification;
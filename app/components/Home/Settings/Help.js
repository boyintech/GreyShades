import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, Linking} from 'react-native';
import {Header, Content, Button,
        Item, Label, Input,
        Icon, Textarea} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { ScrollView } from 'react-native-gesture-handler';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';



const {height, width} = Dimensions.get('window');


class Help extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        email: 'mistritoolss@gmail.com',
        message: '',
        url: 'mailto:mistritoolss@gmail.com?subject=SendMail&body=Description',
        callurl: 'tel:+919305382806',
    }
    console.log(this.props)
  }

  sendMessage = () => {
    var url = 'mailto:'+this.state.email+'?subject=Support Mistri&body='+this.state.message;
    this.setState({url: url});
    console.log(url);
    Linking.openURL(this.state.url);
  }

  pressCall = () => {
    Linking.openURL(this.state.callurl)
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
              <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(16, width), color: 'white', marginLeft: '3%', marginTop: '1.5%'}}>Contact Us</Text>
      </View>
      </View>
    );
  }
}

export default (connect)()(Help);

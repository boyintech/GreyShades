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



const {height, width} = Dimensions.get('window');


class Contact extends React.Component {

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
      <View style={{flex: 1, backgroundColor: 'white'}}>
         <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100,}}>Contact Us</Text>
            </TouchableOpacity>
        </Header>
        <View style={{marginTop: 10*height/100}}>
          <View style={{height: 60*height/100, width: 85*width/100, elevation: 5, backgroundColor: 'white', margin: 10, alignSelf: 'center', paddingVertical: 3*height/100, paddingHorizontal: 5*width/100}}>
                <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_BOLD, fontSize: 35, color: '#EB5757',  textDecorationLine: 'underline', marginBottom: 2*height/100}}>Contact Us</Text>
                <TouchableOpacity onPress={() => this.pressCall()}>
                <View style={{flexDirection: 'row', marginTop: 3*height/100}}> 
                    <IonIcons name='call' style={{color: '#EB5757'}} size={25} />
                    <Text style={{fontSize: 22, fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#EB5757', alignSelf: 'center', marginLeft: 2*width/100}}>+919305382806</Text>
                </View>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 3*height/100}}>
                <IonIcons name='mail' style={{color: '#EB5757'}} size={25} />
                    <Text style={{fontSize: 22, fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#EB5757', alignSelf: 'center', marginLeft: 2*width/100}}>MistriToolss@gmail.com</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 3*height/100}}>
                <IonIcons name='ios-location-sharp' style={{color: '#EB5757'}} size={25} />
                    <Text style={{fontSize: 22, fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#EB5757', alignSelf: 'center', marginLeft: 2*width/100}}>Location</Text>
                </View>

                <View style={{marginTop: 2*height/100}}>
                <Item floatingLabel style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Your Email</Label>
            <Input selectionColor='#EB5757' onChangeText={(email) => this.setState({email: email})} />
          </Item>

          <Item floatingLabel style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Message</Label>
            <Textarea selectionColor='#EB5757' onChangeText={(message) => this.setState({message: message})} />
          </Item>

                <Button androidRippleColor full style={{height: 5*height/100, borderRadius: 10, width: 40*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.sendMessage()} >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Send Message</Text>
              </Button>
              </View>

          </View>
                
        </View>
      </View>
    );
  }
}

export default (connect)()(Contact);

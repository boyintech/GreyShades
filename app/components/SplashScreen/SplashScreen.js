import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,
        Dimensions, Animated, ScrollView} from 'react-native';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import {Button} from 'native-base';
import auth from '@react-native-firebase/auth';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const slides = [
  {
    key: 1,
    title: 'Help Seniors',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image: require('../../assets/images/extract1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Video Streaming',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image: require('../../assets/images/extract2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Music Live Life',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image: require('../../assets/images/extract3.png'),
    backgroundColor: '#22bcb5',
  }
];

const {height, width} = Dimensions.get('screen');

class SplashScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      
    }
    this.checkLogin();
    
  }

  checkLogin = async() => {
    if(auth().currentUser){
      this.props.navigation.navigate('Home');
    }

  }


 render() {
    return (
      <View style={{flex: 1}}>
         <ScrollView decelerationRate='fast' horizontal snapToInterval={width}>
                    {slides.map((item, index) => (
                      <View>
                           <View style={{height: 50*height/100, width: width}}>
                           <Image source={item.image} style={{height: '70%', width: 80*width/100, marginTop: 10*height/100, resizeMode: 'stretch', alignSelf: 'center'}} />
                           </View>
                           <View style={{backgroundColor: '#B34D8C', width: width, height: '50%', borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'space-evenly'}}>
                             <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white', alignSelf: 'center', fontSize: RFPercentage(5)}}>{item.title}</Text>
                             <View style={{ alignSelf: 'center'}}>
                               <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white', textAlign: 'center', alignSelf: 'center'}}>{item.text}</Text>
                             </View>
                             <Button androidRippleColor='#B34D8C' style={{width: 60*width/100, alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('GetStarted')}>
                             <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: '#B34D8C',}}>GET STARTED</Text>
                             </Button>
                           </View>
                           </View>
                        ))}
                </ScrollView>
      </View>
  );
 }
}

// <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone} 
// showDoneButton={false} bottomButton={true}
// dotStyle={{backgroundColor: '#989898',  marginBottom: 20*height/100, marginHorizontal: 2*width/100 }} activeDotStyle={{backgroundColor: 'white', marginHorizontal: 4*width/100, marginBottom: 20*height/100}} showNextButton={false}/>

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  //[...]
});

export default SplashScreen;

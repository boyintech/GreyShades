import React from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import {Button, Header} from 'native-base';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { RFValue } from "react-native-responsive-fontsize";


const {height, width} = Dimensions.get('window');
const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

class GetStarted extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(<View style={{ flex: 1}}>
      <Header style={{height: 0, opacity: 0}} androidStatusBarColor='#B34D8C' />
      <Image source={require('../../assets/images/Bg.png')} style={{height: '100%', width: '101%', marginLeft: -1, position: 'absolute', }} />
      <View style={{bottom: 0, position: 'absolute', width: '100%', height: '40%', paddingVertical: 2*height/100}}>
      <View style={styles.PageText}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(28, Width), color: 'white',}}>GreyShades</Text>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(12, Width), color: 'white',}}>It's easier to sign up now</Text>
      </View>
      <View style={{}}>
              <Button full style={{height: 7*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', backgroundColor: 'white', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('Login')} >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: '#B34D8C'}}>LOG IN</Text>
              </Button>
              <Text style={{alignSelf: 'center', color: 'white', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginVertical: 1*Height/100}}>OR</Text>
              <Button full style={{height: 7*height/100, borderRadius: 10, width: 85*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: 'transparent', justifyContent: 'center', borderColor: 'white', borderWidth: 1.5, elevation: 0}} onPress={() => this.props.navigation.navigate('Register')} >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>SIGN UP</Text>
              </Button>
      </View>
      </View>
</View>
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


export default GetStarted;
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions, ScrollView,
  Image, Alert, BackHandler, ActivityIndicator, Platform
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Tabs, Tab} from 'native-base';
import { BlurView } from "@react-native-community/blur";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MYVIDEOS = [];

const {height, width} = Dimensions.get('screen');
{/* <AntDesign name='adduser' style={{ backgroundColor: '#A4A4A4', fontSize: RFPercentage(5), marginRight: 5*width/100, width: 12.5*width/100, justifyContent: 'center'}} />
                                <Entypo name='dots-three-horizontal' style={{ backgroundColor: '#A4A4A4', fontSize: RFPercentage(5), width: 12.5*width/100, alignSelf: 'center'}} /> */}
class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            myVideosLoaded: false,
        }
        this.fetchMyVideos();
    }

    logout = () => {
        auth()
        .signOut()
        .then(() => {
          this.props.navigation.navigate('SplashScreen')})
        .catch(error => console.log(error))
      }

      showDetails = () => {

      }

      fetchMyVideos = () => {
          firestore().collection("Videos").where("uploaded_by", "==", auth().currentUser.uid).get()
            .then((res) => {
                res.docs.map(item => {
                    let data = {
                        videoData: item._data,
                        video_id: item._ref._documentPath._parts[1]
                    }
                    MYVIDEOS.push(data);
                })
                this.setState({myVideosLoaded: true})
            }).catch((err) => console.log(err))
      }

      showMyVideos = () => {
          var indets = [];
          if(!MYVIDEOS.length){
                return (                        <TouchableOpacity style={{ marginTop: 20*height/100, marginLeft: '40%'}}>
                    <Text style={{color: '#B34D8C', fontSize: RFValue(16), fontFamily: fontStyle.FONT_FAMILY_LIGHT,alignSelf: 'center'}}>No Videos Found</Text>
                </TouchableOpacity>)
          } else {
          MYVIDEOS.map((item, index) => {
              console.log(item.videData);
              indets.push(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MiniPlayer', item)} key={index} style={{height: 32*width/100, width: 32*width/100, backgroundColor: 'blue', marginBottom: 5, marginHorizontal: .5*width/100 }}>
                    <Image source={require('../../../assets/images/logo.png')} style={{height: 32*width/100, width: 32*width/100, resizeMode: 'contain'}} />
                    <AntDesign name='caretright' color='white' style={{ opacity: .8, position: 'absolute', alignSelf: 'flex-end', fontSize: RFValue(30), marginRight: 10, marginTop: 10}} />
                </TouchableOpacity>
              );
          })
          return indets;}
      }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ScrollView style={{}}>
                    <View style={{height: 35*height/100, paddingVertical: 4*height/100, paddingHorizontal: 5*width/100}}>
                        <BlurView
                        style={{height: 35*height/100, position: 'absolute', width: '120%'}} 
                        blurType="dark"
                        blurAmount={50}
                        reducedTransparencyFallbackColor="white"
                        />
                        <Image source={require('../../../assets/images/extract1.png')} style={{height: 35*height/100, width: '100%', resizeMode: 'contain', position: 'absolute'}} blurRadius={Platform.OS == 'ios' ? 10 : 3}/>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image source={{uri: this.props.profileURL}} style={{borderRadius: 100, backgroundColor: 'white', height: 9*height/100, width: 9*height/100, borderColor: 'white', borderWidth: 1.5}} />
                            <View style={{flexDirection: 'row', alignSelf: 'center', }}>
                                <View style={{height: 5*height/100, width: 5*height/100, marginRight: 4*width/100, backgroundColor: '#A4A4A4', opacity: .8, borderRadius: 5, justifyContent: 'center'}}>
                                        <MaterialIcons name='settings' onPress={() => this.props.navigation.navigate('SettingsNav')} style={{ color: 'white', fontSize: RFPercentage(4), alignSelf: 'center'}} /> 
                                </View>
                                <View style={{height: 5*height/100, width: 5*height/100, backgroundColor: '#A4A4A4', opacity: .8, borderRadius: 5, justifyContent: 'center'}}>
                                    <AntDesign name='logout' onPress={() => this.logout()} style={{ color: 'white', fontSize: RFPercentage(3), alignSelf: 'center'}} /> 
                                </View>
                            </View>
                        </View>
                        <View style={{height: 10*height/100, borderBottomWidth: .5, borderColor: 'white', justifyContent: 'center'}}>
                                <Text style={{color: 'white', fontSize: RFValue(16, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>{this.props.currentUserData.fullName}</Text>
                                <Text style={{color: 'white', fontSize: RFValue(8, width), fontWeight: 'bold', fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>ID: {auth().currentUser.uid}</Text>

                        </View>
                        <View style={{height: 10*height/100, }}>
                                <Text style={{color: 'white', fontSize: RFPercentage(2.5), fontFamily: fontStyle.FONT_FAMILY_LIGHT, marginTop: 1.5*height/100}}>{this.props.currentUserData.bio}</Text>
                        </View>
                    </View>
                    <Tabs style={{flex: 1}} tabContainerStyle={{elevation: 0}} tabBarUnderlineStyle={{backgroundColor: 'white', height: 1 }}>
                        <Tab heading={'VIDEOS - '+MYVIDEOS.length} textStyle={styles.tabTextStyle} tabStyle={{backgroundColor: '#1A151B',}} activeTextStyle={styles.activetabTextStyle} activeTabStyle={{backgroundColor: '#404040'}}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5 }}>
                                {this.state.myVideosLoaded ?  <this.showMyVideos /> : <ActivityIndicator size='large' color='#B34D8C' style={{alignSelf:'center', marginTop: 30*height/100, marginLeft: 45*width/100}} /> }
                            </View>
                        </Tab>
                        <Tab heading="LIKED - 0" textStyle={styles.tabTextStyle} tabStyle={{backgroundColor: '#1A151B',}} activeTextStyle={styles.activetabTextStyle} activeTabStyle={{backgroundColor: '#404040', }}>
                        <View style={{ flex: 1}}>
                        <TouchableOpacity style={{ marginTop: 20*height/100}}>
                            <Text style={{color: '#B34D8C', fontSize: RFValue(16), fontFamily: fontStyle.FONT_FAMILY_LIGHT,alignSelf: 'center'}}>No Videos Found</Text>
                        </TouchableOpacity>
                            </View>
                        </Tab>
                    </Tabs>
                    </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleTextStyle: {
       fontFamily: fontStyle.FONT_FAMILY_MEDIUM,
       fontSize: 38,
       color: '#000000',
       marginTop: 55,
       marginLeft: 30
    },
    tabTextStyle: {
       fontFamily: fontStyle.FONT_FAMILY_MEDIUM,
       color: '#787678'
    },
    activetabTextStyle: {
       fontFamily: fontStyle.FONT_FAMILY_MEDIUM,
       color: 'white',
    }
 })

 mapStateToProps = state => {
     return state;
 }


export default (connect)(mapStateToProps, null)(Settings);
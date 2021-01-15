import React, {Component} from 'react';
import {View, Text, Image, Dimensions, BackHandler} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedNav from './Feed/FeedNav.js';
import DiscoverNav from './Discover/DiscoverNav.js';
import Upload from './Upload/Upload.js';
import NotificationNav from './Notification/NotificationNav.js';
import ProfileNav from './Profile/ProfileNav.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const {height, width} = Dimensions.get('screen');

const Tab = createBottomTabNavigator();

class Home extends React.Component {

  getTabBarVisibility = (route) => {
    const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';
    if (routeName === 'Feed') 
      return false;
    else
      return true;
  }

  // screenOptions={({ route }) => ({
  //   tabBarIcon: ({ focused, color, size }) => {
  //   let iconName;
  //   if (route.name === 'Repair') {
  //     if(focused) return(<View><Image source={require('../../assets/icons/car.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#EB5757'}} /></View>)
  //     else return(<View><Image source={require('../../assets/icons/car.png')} style={{height: 4*height/100, width: 4*height/100,}} /></View>)

  //   } else if (route.name === 'News') {

  //     if(focused) return(<View><Image source={require('../../assets/icons/news.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#EB5757'}} /></View>)
  //     else return(<View><Image source={require('../../assets/icons/news.png')} style={{height: 4*height/100, width: 4*height/100,}} /></View>)

  //   } else if( route.name == 'Cart'){
  //       if(focused) return(<View><Image source={require('../../assets/icons/cart.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#EB5757'}} /></View>)
  //       else return(<View><Image source={require('../../assets/icons/cart.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#6D6868' }} /></View>)

  //   } else if( route.name == 'Settings'){
  //       if(focused) return(<View><Image source={require('../../assets/icons/settings.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#EB5757'}} /></View>)
  //       else return(<View><Image source={require('../../assets/icons/settings.png')} style={{height: 4*height/100, width: 4*height/100,}} /></View>)
  //    }
  //        },
  //     })}

  UNSAFE_componentWillMount(){
    this.fetchData();
  }

  fetchData = async() => {
    await firestore().collection('Users').doc(auth().currentUser.uid).get().
      then(async(res) => {
        let currentUserData = {};
        let profileURL = '';
        currentUserData = res._data;
        storage().ref('/profile/profile_'+auth().currentUser.uid+'.jpeg').getDownloadURL().
        then(url => {
          this.props.saveDP(url);
        }).
        catch((err) => {console.log(err)})
        this.props.saveUserData(currentUserData);
      }).
      catch((err) => console.log(err))
  }

  // componentDidMount = () => {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  // }

  // handleBackButton = () => {
  //   BackHandler.exitApp();
  // }

  // // componentWillUnmount = () => {
  // //   BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
  // // }

  
  UploadButton = () => {
    return <TouchableOpacity onPress={() => this.props.navigation.navigate('Upload')} style={{borderBottomColor: 'white', height: 10*height/100, width: 20*width/100, backgroundColor: '#1A151B', justifyContent: 'center'}}><Image source={require('../../assets/icons/icon3.png')} style={{height: 6*height/100, width: 6*height/100, alignSelf: 'center', resizeMode: 'contain'}} /></TouchableOpacity>
   }

  handleBackButton =  () => {
    BackHandler.exitApp();
    return true;
  }


  render(){

    return(
            <Tab.Navigator
            backBehavior='history'
            tabBarOptions={{
            showLabel: false,
            activeTintColor: '#EB5757',
            inactiveTintColor: '#6D6868',
            allowFontScaling: true,
            tabStyle: {
                height: 10*height/100,
                backgroundColor: '#1A151B', 
                elevation: 5
            },
            labelStyle: {
              fontFamily: fontStyle.FONT_FAMILY_REGULAR,
              fontSize: 14,
              marginBottom: 1*height/100,
            },
            style: {
                height: 10*height/100,
                borderRadius: 10,
                borderTopWidth: 0,
                elevation: 5
            }
            }}
            screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === 'Feed') {
      if(focused) return(<View style={{borderBottomColor: 'white', borderBottomWidth: 2, height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon1.png')} style={{height: 5*height/100, width: 4.2*height/100, alignSelf: 'center',}} /></View>)
      else return(<View style={{borderBottomColor: 'white', height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon1.png')} style={{height: 5*height/100, width: 4.2*height/100, alignSelf: 'center',}} /></View>)

    } else if (route.name === 'Discover') {

      if(focused) return(<View style={{borderBottomColor: 'white', borderBottomWidth: 2, height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon2.png')} style={{height: 5*height/100, width: 6*height/100, alignSelf: 'center', resizeMode: 'contain'}} /></View>)
      else return(<View style={{borderBottomColor: 'white', height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon2.png')} style={{height: 5*height/100, width: 6*height/100, resizeMode: 'contain', alignSelf: 'center',}} /></View>)

    } else if( route.name == 'Upload'){
        return(<View style={{borderBottomColor: 'white', height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon3.png')} style={{height: 6*height/100, width: 6*height/100, alignSelf: 'center', resizeMode: 'contain'}} /></View>)
        // if(focused) // else return(<View style={{borderBottomColor: 'white', height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon3.png')} style={{height: 6*height/100, width: 6*height/100, alignSelf: 'center', resizeMode: 'contain'}} /></View>)

    } else if( route.name == 'SettingsNav'){
      if(focused) return(<View style={{borderBottomColor: 'white', borderBottomWidth: 2, height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon4.png')} style={{height: 5*height/100, width: 5*height/100, alignSelf: 'center', resizeMode: 'contain'}} /></View>)
      else return(<View style={{borderBottomColor: 'white', height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon4.png')} style={{height: 5*height/100, width: 5*height/100, alignSelf: 'center', resizeMode: 'contain'}} /></View>)

  } else if( route.name == 'ProfileNav'){
        if(focused) return(<View style={{borderBottomColor: 'white', borderBottomWidth: 2, height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon5.png')} style={{height: 5*height/100, width: 5*height/100, alignSelf: 'center', resizeMode: 'contain'}} /></View>)
        else return(<View style={{borderBottomColor: 'white',  height: 6*height/100, width: 20*width/100,}}><Image source={require('../../assets/icons/icon5.png')} style={{height: 5*height/100, width: 5*height/100, alignSelf: 'center', resizeMode: 'contain'}} /></View>)
     }

     else if( route.name == 'Notification'){
      if(focused) return(<View style={{borderBottomColor: 'white', borderBottomWidth: 2, height: 6*height/100, width: 20*width/100,}}><MaterialCommunityIcons name='bell' style={{alignSelf: 'center', color: 'white', fontSize: RFValue(40) }} /></View>)
      else return(<View style={{borderBottomColor: 'white',  height: 6*height/100, width: 20*width/100,}}><MaterialCommunityIcons name='bell' style={{alignSelf: 'center', color:'white', fontSize: RFValue(40) }} /></View>)
   }
         },
      })}
           >
              <Tab.Screen name="Feed" options={({ route }) => ({tabBarVisible: this.getTabBarVisibility(route)})} component={FeedNav} />
              <Tab.Screen name="Discover" component={DiscoverNav} />
              <Tab.Screen name='Upload' options={{tabBarVisible: false}} component={Upload} />
              <Tab.Screen name="Notification" component={NotificationNav} />
              <Tab.Screen name="ProfileNav" component={ProfileNav} />
            </Tab.Navigator>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserData: (currentUserData) => dispatch({type: 'SAVE_USER_DATA', data: currentUserData}),
    saveDP: (profileURL) => dispatch({type: 'SAVE_DP', data: profileURL})
  }
}

export default (connect)(mapStateToProps, mapDispatchToProps)(Home);

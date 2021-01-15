import React from 'react';
import {
  StyleSheet,
  View, ToastAndroid,
  Text, TextInput,
  Dimensions, PanResponder, Animated,
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';

import VideoPlayer from 'react-native-video-controls';
import {List, Item, Input, Button, Label, Icon, Toast, Header, Body} from 'native-base';
import RBSheet from "react-native-raw-bottom-sheet";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const {height, width} = Dimensions.get('window');

let COMMENTS = [];

class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            commentLoaded: false,
            comment: '',
        }

        this.getComments();
    }

    getComments = () => {
      COMMENTS = [];
      firestore().collection('Videos').doc(this.props.route.params.itemID).collection('comments').get()
          .then((res) => {
            console.log(res.docs.length);
            if(!res.docs.length) this.setState({commentLoaded: true});
              res._docs.map(item => {
                firestore().collection('Users').doc(item._data.user_id).get()
                  .then((res) => {
                    COMMENTS.push({
                      fullName: res._data.fullName,
                      uid: res._data.uid,
                      comment: item._data.comment,
                      profileURL: res._data.profileURL,
                    });
                    this.setState({commentLoaded: true});
                  }).catch(err => console.log(err))
                });
            }).catch((err) => console.log(err))
            
          }
          
          onComment = () => {
            this.setState({loginPressed: true,buttonOpacity: .5})
            if(this.state.comment == ''){
              ToastAndroid.showWithGravityAndOffset(
                "Please Input FIrst", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50
                );
              } else {
                var data = {
        user_id: auth().currentUser.uid,
        video_id: this.props.route.params.itemID,
        created_at: (new Date()).getTime(),
        comment: this.state.comment
      }
      console.log(data);
      functions().httpsCallable('onComment')(data)
        .then((res) => {
          console.log(res);
          ToastAndroid.showWithGravityAndOffset(
            "Comment Posted!", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50
            );
            this.setState({commentLoaded: false, comment: ''});
            this.getComments();
        }).catch((err) => {
          console.log(err);
        })    
      } 
      this.setState({loginPressed: false, buttonOpacity: 1})
    }

    Comments = () => {
        return(
              <View style={{borderColor: '#404040', paddingVertical: 2*width/100, }}>
              <Text style={{fontSize: RFValue(18),  fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white', marginLeft: 5*width/100}}>Comments :</Text>

              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 2*height/100, borderBottomWidth: .2, borderColor: '#767876',paddingHorizontal: 5*width/100 }}>
        
              <TextInput numberOfLines={2} ref={(commentInput) => {this.commentInput = commentInput}} onChangeText={(comment) => {this.setState({comment: comment})}} selectionColor='#B34D8C' style={{width: 60*width/100, paddingLeft: 5*width/100, height: 6*height/100, borderRadius: 15, borderColor: '#787678', borderWidth: 1, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(8, width), color: 'white'}} placeholderTextColor='#787678' placeholder='Comment Here' />
              
              <Button full style={{height: 5*height/100, borderRadius: 10, width: 25*width/100, marginTop: .4*height/100, opacity: this.state.buttonOpacity, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => this.onComment()} >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFValue(12), color: 'white'}}>COMMENT</Text>
              </Button>
              
              </View>

        <ScrollView style={{}}>

            {COMMENTS.length ? COMMENTS.map((item, index) => (
                                <View key={index} style={{flexDirection: 'row', paddingHorizontal: 5*width/100, paddingVertical: 1.5*height/100, borderBottomColor: '#404040', borderBottomWidth: .2,}}>
                                <Image source={{uri: item.profileURL}} style={{height: 6*height/100, width: 6*height/100, borderRadius: 100, marginRight: 2*width/100}} />
                                <View style={{   flex: 1, marginTop: .5*height/100 }}>
                                    <Text style={{color: '#787678', fontSize: RFValue(16), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, marginBottom: .5*height/100 }}>{item.fullName}</Text>
                                    <Text style={{color: 'white', fontSize: RFValue(13), fontFamily: fontStyle.FONT_FAMILY_LIGHT}}>{item.comment}</Text>
                                </View>
                              </View>
              )) : 
               <TouchableOpacity style={{ marginTop: 2*height/100}} onPress={() => this.commentInput.focus()}>
                <Text style={{color: 'white', fontSize: RFValue(16), fontFamily: fontStyle.FONT_FAMILY_LIGHT,alignSelf: 'center'}}>No Comments Found <Text style={{color: '#B14F8C'}}>Write Something</Text></Text>
              </TouchableOpacity> }


              </ScrollView>

                  
            </View>
            );
      }

    render(){
        return(
            <View style={{backgroundColor: '#1A151B', flex: 1}}>
                <Header androidStatusBarColor='#1A151B' style={{backgroundColor: '#1A151B', justifyContent: 'flex-start'}}>
    
                    <AntDesign onPress={() => this.props.navigation.goBack()} name='arrowleft' color='white' style={{fontSize: RFValue(30), alignSelf: 'center'}} />
                    <Text onPress={() => this.props.navigation.goBack()} style={{alignSelf: 'center', color: 'white', fontSize: RFValue(20), fontFamily: fontStyle.FONT_FAMILY_REGULAR, marginLeft: 3*width/100}}>Comments</Text>
            
                 </Header>

                    {this.state.commentLoaded ? <this.Comments /> : <ActivityIndicator color='#B14F8C' size='large' style={{ marginTop: 40 }} /> }

                                
        </View>
        );
    }
}

export default Comments;


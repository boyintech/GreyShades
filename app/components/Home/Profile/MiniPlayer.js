import React, {PureComponent} from 'react';
import {
  StyleSheet, FlatList,
  View, Share, 
  Text, TextInput,
  Dimensions, PanResponder, Animated, ToastAndroid,
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';

import {List, Item, Input, Button, Label, Icon, Toast, Header} from 'native-base';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import VideoControls from 'react-native-video-controls';
const {height, width} = Dimensions.get('window');
const HEIGHT  = Dimensions.get('screen').height;

class MiniPlayer extends PureComponent{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{backgroundColor: '#1A151B', height: 92*height/100}}>
                <Header androidStatusBarColor='#1A151B' style={{backgroundColor: '#1A151B', height: 0, opacity: 0}} />

                <View style={{height: 93*height/100}}>
          <VideoControls paused={true} source={{uri: this.props.route.params.videoData.media.url}} onBack={() => this.props.navigation.goBack()} videoStyle={{}} disableFullscreen={true}  disableSeekbar={true} disableVolume={true} disableTimer={true} style={{top: 0, backgroundColor: '#1A151B',  }} />                        
          <Text style={{marginBottom: '15%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'white', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(18)}}>{this.props.route.params.videoData.Title}</Text>
          <Text style={{marginBottom: '11%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'#787678', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(16)}}>{this.props.route.params.videoData.caption}</Text>
          <Text style={{marginBottom: '7.5%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'#787678', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(14)}}>{this.props.route.params.videoData.count.likes} likes, {this.props.route.params.videoData.count.comments} comments</Text>
          <View style={{position: 'absolute', bottom: 0, alignSelf: 'flex-end', marginBottom: '3%' }}>
              </View>
      </View>
                  

                
        </View>
        );
    }

}

export default MiniPlayer
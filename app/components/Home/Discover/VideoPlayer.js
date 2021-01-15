import React, {PureComponent} from 'react';
import {
  StyleSheet, FlatList,
  View, Share, 
  Text, TextInput,
  Dimensions, PanResponder, Animated,
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';

import VideoControls from 'react-native-video-controls';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const {height, width} = Dimensions.get('window');

class VideoPlayer extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props);
        alert(this.props)
    }


    render(){
        return(
            <View style={{flex: 1}}>
          <VideoControls source={{uri: this.props.item.videoData.media.url}} ref={ref => {this.myRef[this.props.item.itemID] = ref}} paused={true} onBack={() => this.props.navigation.jumpTo('Feed')} resizeMode='cover' videoStyle={{}} disableFullscreen={true}  disableSeekbar={true} tapAnywhereToPause={true} disableVolume={true} disableTimer={true} style={{height: 90*height/100, width: width, top: 0, backgroundColor: '#1A151B' }} />                        
          <View style={{height: 50*height/100, position: 'absolute'}}>
            <Text style={{marginBottom: '15%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'white', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(18)}}>{this.props.item.videoData.Title}</Text>
            <Text style={{marginBottom: '11%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'#787678', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(16)}}>{this.props.item.videoData.caption}</Text>
            <Text style={{marginBottom: '7.5%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'#787678', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(14)}}>{this.props.item.videoData.count.likes} likes, {this.props.item.videoData.count.comments} comments</Text>
            <View style={{position: 'absolute', bottom: 0, alignSelf: 'flex-end', marginBottom: '3%' }}>
                <TouchableOpacity onPress={() => this.props.navigation.jumpTo('Upload')} style={{backgroundColor: 'transparent', height: 12*height/100, justifyContent: 'center', width: 12*height/100, marginBottom: 2*height/100}}>
                    <View style={{backgroundColor: 'transparent', height: 10*height/100, justifyContent: 'center', width: 10*height/100, borderRadius: 100, borderWidth: 1.5, borderColor: '#4C565B'}}>
                            <Image source={require('../../../assets/images/extract1.png')} style={{height: 8*height/100, width: 8*height/100, borderRadius: 100, alignSelf: 'center' , justifyContent: 'center', backgroundColor: 'white'}} />
                            <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: -10}}>
                                <Ionicons name='add-circle' style={{color: '#D72D96', borderRadius: 100, alignSelf: 'center', fontSize: RFPercentage(3),}} />
                            </View>
                            </View>
                </TouchableOpacity>
                <View style={{backgroundColor: 'transparent', height: 10*height/100, justifyContent: 'center', width: 10*height/100, borderColor: '#4C565B',}}>
                        <TouchableOpacity onPress={() => this.onClickLike(item)}>
                        <AntDesign name='heart' style={{color: this.state.likeColor, alignSelf: 'center', fontSize: RFPercentage(5),}} />
                        <Text style={{color: 'white', fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(2), alignSelf: 'center'}}>LIKE</Text>
                        </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'transparent', height: 10*height/100, justifyContent: 'center', width: 11*height/100, borderColor: '#4C565B',}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', item)}>  
                        <FontAwesome5 name='comment' style={{color: 'white', alignSelf: 'center', fontSize: RFPercentage(5),}} />
                        <Text style={{color: 'white', fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(2), alignSelf: 'center'}}>COMMENT</Text>
                        </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'transparent', height: 10*height/100, justifyContent: 'center', width: 10*height/100, borderColor: '#4C565B', marginBottom: 2*height/100}}>
                        <TouchableOpacity onPress={() => this.onShare(item)}>
                        <FontAwesome5 name='share' style={{color: 'white', alignSelf: 'center', fontSize: RFPercentage(5),}} />
                        <Text style={{color: 'white', fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(2), alignSelf: 'center'}}>SHARE</Text>
                        </TouchableOpacity>
                </View>
                </View>
                  </View>
        </View>
        );
    }
}

export default VideoPlayer;
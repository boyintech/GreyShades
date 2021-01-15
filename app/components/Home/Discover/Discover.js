import React from 'react';
import {
  StyleSheet, FlatList,
  View, Share, 
  Text, TextInput,
  Dimensions, PanResponder, Animated, ToastAndroid,
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';

import {connect} from 'react-redux';
import {List, Item, Input, Button, Label, Icon, Toast, Header} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Video from 'react-native-video';
import VideoControls from 'react-native-video-controls';
const {height, width} = Dimensions.get('window');
const HEIGHT  = Dimensions.get('screen').height;

const TEMPVIDEOS = [
    {link: 'https://www.pexels.com/video/2797545/download/?search_query=nature&tracking_id=vhcmqjjkpy9', itemID: 1},
    {link: 'https://www.pexels.com/video/3205789/download/?search_query=portrait&tracking_id=vhcmqjjkpy9', itemID: 2},
    {link: 'https://www.pexels.com/video/4250244/download/?search_query=landscape&tracking_id=vhcmqjjkpy9', itemID: 3},
    {link: 'https://www.pexels.com/video/4771722/download/?search_query=nature&tracking_id=arsi6o9tz8b', itemID: 4},
    {link: 'https://www.pexels.com/video/856479/download/?search_query=nature&tracking_id=arsi6o9tz8b', itemID: 5}
]

// const IMAGES = [
//     {link: 'https://expertphotography.com/wp-content/uploads/2019/06/portrait_landscape.jpg'},
//     {link: 'https://expertphotography.com/wp-content/uploads/2019/06/reflections_landscape.jpg'},
//     {link: 'https://expertphotography.com/wp-content/uploads/2019/06/black_and_white_landscape.jpg'},
//     {link: 'https://expertphotography.com/wp-content/uploads/2019/06/perspective_landscape.jpg'}
// ]

const VIDEOS = [];
let Comments = [];

class Discover extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mtop: new Animated.Value(0),
            isPaused: true,
            playOpacity: 1,
            videosLoaded: false,
            likeColor: 'white',
            isLiked: false,
            currentIndex: 0,
            isLiked: []
        }
        this.myRef = [];
        this.isLiked = []
    }

    componentDidMount = () => {
      this.fetchUserVideos();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
      this.props.navigation.jumpTo('Feed');
    }

    fetchUserVideos = async() => {
       firestore().collection('Videos').get()
            .then((res) => {
              res.docs.map(async item => {
                if(item._data.media.url !== '' && item._data.created_by == 'app-user'){
                  let data = {
                    videoData: item._data,
                    itemID: item.ref._documentPath._parts[1]
                  }
                  VIDEOS.push(data);
                }
              })
              this.setState({videosLoaded: true});
            }).catch((err) => console.log(err))
    }

   
    onClickLike = (videoData) => {
        this.isLiked[videoData.itemID].setNativeProps({style: {color: '#D72D96'}});
         var data = {
           user_id: auth().currentUser.uid,
           video_id: videoData.itemID,
           created_at: (new Date()).getTime(),
         }
           functions().httpsCallable('onClickLike')(data)
             .then((res) => {
               console.log(res);
               ToastAndroid.showWithGravityAndOffset(
                "  Liked", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 0
                );
             }).catch((err) => {
               console.log(err);
             })
       }

 
       onShare = (item) => {
        Share.share({
          message: 'Check This Video On GreyShades Application - '+item.videoData.Title,
          url: 'http://bam.tech',
          title: ""
        }, {
          // Android only:
          dialogTitle: 'Share This Video',
        })
        var data = {
           user_id: auth().currentUser.uid,
           video_id: item.iitemID,
           created_at: (new Date()).getTime(),
         }
         functions().httpsCallable('onShare')(data)
           .then((res) => {
             console.log(res);
           }).catch((err) => {
             console.log(res);
           })   
       }
      //  source={{uri: item.videoData.media.url}} 
       
      renderItem = ({item}) => (
        <View style={{height: 93*height/100}}>
          <VideoControls paused={true} source={{uri: item.videoData.media.url}} ref={ref => {this.myRef[item.itemID] = ref}} onBack={() => this.props.navigation.jumpTo('Feed')} videoStyle={{}} disableFullscreen={true}  disableSeekbar={true} disableVolume={true} disableTimer={true} style={{top: 0, backgroundColor: '#1A151B',  }} />                        
          <Text style={{marginBottom: '16%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'white', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(18)}}>{item.videoData.Title}</Text>
          <Text style={{marginBottom: '13%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'#787678', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(16)}}>{item.videoData.caption}</Text>
          <Text style={{marginBottom: '11%', marginLeft: '5%', bottom: 0, position: 'absolute', color:'#787678', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(14)}}>{item.videoData.count.likes} likes, {item.videoData.count.comments} comments</Text>
          <View style={{position: 'absolute', bottom: 0, alignSelf: 'flex-end', marginBottom: '6%' }}>
              <TouchableOpacity onPress={() => this.props.navigation.jumpTo('Upload')} style={{backgroundColor: 'transparent', height: 12*height/100, justifyContent: 'center', width: 12*height/100, marginBottom: 2*height/100}}>
                  <View style={{backgroundColor: 'transparent', height: 10*height/100, justifyContent: 'center', width: 10*height/100, borderRadius: 100, borderWidth: 1.5, borderColor: '#4C565B'}}>
                          <Image source={require('../../../assets/images/extract1.png')} style={{height: 8*height/100, width: 8*height/100, borderRadius: 100, alignSelf: 'center' , justifyContent: 'center', backgroundColor: 'white'}} />
                          <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: -10}}>
                              <Ionicons name='add-circle' style={{color: '#D72D96', borderRadius: 100, alignSelf: 'center', fontSize: RFPercentage(3),}} />
                          </View>
                          </View>
              </TouchableOpacity>
              <View style={{backgroundColor: 'transparent', height: 10*height/100, justifyContent: 'center', width: 10*height/100, borderColor: '#4C565B',}}>
                      <AntDesign ref={ref=>{this.isLiked[item.itemID] = ref}} onPress={() => this.onClickLike(item)} name='heart' style={{color: this.state.likeColor, alignSelf: 'center', fontSize: RFPercentage(5),}} />
                      <Text style={{color: 'white', fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(2), alignSelf: 'center'}}>LIKE</Text>
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
      );
      

       _onViewableItemsChanged = (props) => {
         const changed = props.changed;
         const viewableItems = props.viewableItems;
          changed.forEach(item => {
            if(!item.isViewable){
            console.log("NOT VISIBLE", item.item.itemID);
              this.myRef[item.item.itemID].state.paused = true;
            }
          });
          changed.forEach(item => {
            if(item.isViewable){
                this.myRef[item.item.itemID].state.paused = false;
                console.log("VISIBLE", item.item.itemID)
              }
          })
       }

   
    render(){
        return(
            <View style={{backgroundColor: '#1A151B', height: 92*height/100}}>
                <Header androidStatusBarColor='#1A151B' style={{backgroundColor: '#1A151B', height: 0, opacity: 0}} />
                  
                  {this.state.videosLoaded ? <FlatList removeClippedSubviews={true} onViewableItemsChanged={this._onViewableItemsChanged} windowSize={1} decelerationRate='fast' snapToAlignment='start' snapToInterval={93.1*height/100} alwaysBounceVertical={true} data={VIDEOS.slice(0).reverse()} renderItem={this.renderItem} keyExtractor={item => item.itemID} /> : <ActivityIndicator color='white' size='large' style={{marginTop:  '80%'}} /> }

                        <Text style={{color: 'white', alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(14, width), position: 'absolute', top: 0, marginTop: 3*height/100}}>Community</Text>             
                
        </View>
        );
    }
}

mapStateToProps = state => {
  return state;
}

export default (connect)(mapStateToProps, null)(Discover);
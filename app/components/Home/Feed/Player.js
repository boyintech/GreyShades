
import React from 'react';
import {
  StyleSheet, Share,
  View, Pressable,ToastAndroid,
  Text, Animated, PanResponder,
  Dimensions, ScrollView, TextInput,
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {Header, Button} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Orientation from 'react-native-orientation-locker';
const {height, width} = Dimensions.get('screen');
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import { cos } from 'react-native-reanimated';
import Video from 'react-native-video';
import StaticPlayer from './StaticPlayer.js';


  const RandomVideos = [];
  var Comments = [];
  
class Player extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            playerHeight: 30*height/100,
            playerWidth: width,
            isLiked: false,
            buttonColor: '#CBCBCB',
            activeSections: [],
            isActive: 0,
            stringDate: this.showableDate(),
            isCollapsed: true,
            temp: 1,
            isRVLoaded: false,
            commentLoaded: false,
            comment: '',
            loginPressed: false, 
            buttonOpacity: 1,
            Comments: [],
            isPaused: true,
            totalLikes: this.props.route.params.videoData.data.count.likes,
          }
          this.player = React.createRef();
          this.getComments();
          this.fetchRandomVideos();
      }
      
      

      toggleisActive = () => {
        if(this.state.isCollapsed)
      Animated.spring(this.state.isActive, {
        toValue: 1,
        bounciness: 20,
        speed: 20,
        useNativeDriver: false,
      }).start(() => this.setState({isCollapsed: false}));
    else
    Animated.spring(this.state.isActive, {
      toValue: 0,
      bounciness: 20,
      speed: 20,
      useNativeDriver: false
    }).start(() => this.setState({isCollapsed: true}));
  }

  UNSAFE_componentWillMount() {
        
    //The getOrientation method is async. It happens sometimes that
    //you need the orientation at the moment the js starts running on device.
    //getInitialOrientation returns directly because its a constant set at the
    //beginning of the js code.
    // Orientation.lockToLandscapeLeft(); //this will lock the view to Landscape
    
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      //do stuff
    } else {
      //do other stuff
    }
  }
  
  componentDidMount() {
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: false
    })
    Orientation.getAutoRotateState((rotationLock) => this.setState({rotationLock}));
    //this allows to check if the system autolock is enabled or not.
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    // Orientation.lockToLandscapeLeft(); //this will lock the view to Landscape
    // Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations
    
    //get current UI orientation
    /*
    Orientation.getOrientation((orientation)=> {
      console.log("Current UI Orientation: ", orientation);
    });
    
    //get current device orientation
    Orientation.getDeviceOrientation((deviceOrientation)=> {
      console.log("Current Device Orientation: ", deviceOrientation);
    });
    */
 
   Orientation.addOrientationListener(this._onOrientationDidChange);
  }
  
  componentWillUnmount = () => {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: true
    })
  }
  
  _onOrientationDidChange = (orientation) => {
    console.log(orientation);
    if (orientation == 'PORTRAIT') {
          this.setState({playerHeight: 30*height/100, playerWidth: width});
        } else {
          this.setState({playerHeight: 90*width/100, playerWidth: height});
        }
      };
      
      showableDate = () => {
        var temp = new Date(this.props.route.params.videoData.data.created_at);
        var temp1 = new Date();
        var temp2 = ((temp1 - temp)/8.64e+7);
        // (new Date(this.props.route.params.videoData.data.created_at).toString()).substring(4, 16)
        temp2 = parseInt(temp2);
        if(temp2 < 1){
          return 'Uploaded today';
        } else if(parseInt(temp2) > 0 && parseInt(temp2) < 7){
          return 'Uploaded '+parseInt(temp2)+' days ago';
          } else if(parseInt(temp2) > 7 && parseInt(temp2) < 28){
            return 'Uploaded '+parseInt(temp2)%7+ ' weeks ago';
          } else{
            return 'Uploaded '+parseInt(temp2)%28+' months ago';
          }
      }
     
      onClickLike = () => {
       console.log(auth().currentUser.uid)
        var data = {
          user_id: auth().currentUser.uid,
          video_id: this.props.route.params.videoData.video_id,
          created_at: (new Date()).getTime(),
        }
          functions().httpsCallable('onClickLike')(data)
            .then((res) => {
              this.setState({totalLikes: this.state.totalLikes + 1})

            }).catch((err) => {
              console.log(err);
            })
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
          video_id: this.props.route.params.videoData.video_id,
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

      getUserInfo = (userID) => {
          var temp = {};
        firestore().collection('Users').doc(userID).get()
          .then((res) => {
            temp = res._docs;
          } ).catch((err) => console.log(err))
          return temp;
      }

      getComments = () => {
        Comments = [];
        firestore().collection('Videos').doc(this.props.route.params.videoData.video_id).collection('comments').get()
          .then((res) => {
            console.log(res.docs.length);
            if(!res.docs.length) this.setState({commentLoaded: true});
              res._docs.map(item => {
                firestore().collection('Users').doc(item._data.user_id).get()
                  .then((res) => {
                    Comments.push({
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

      onShare = () => {
        Share.share({
          message: 'Check This Video On GreyShades Application',
          url: 'http://bam.tech',
          title: this.props.route.params.videoData.Title
        }, {
          // Android only:
          dialogTitle: 'Share This Video',
        })
      
       var data = {
          user_id: auth().currentUser.uid,
          video_id: this.props.route.params.videoData.video_id,
          created_at: (new Date()).getTime(),
        }
        functions().httpsCallable('onShare')(data)
          .then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(res);
          })
      }

      
      



      fetchRandomVideos = async() => {
        let data = [];
          await firestore().collection('Videos').get()
            .then((res) => {
              res._docs.map(item => {
                if(item._data.created_by == 'admin')
                  RandomVideos.push({videoData: {data: item._data, video_id: item._ref._documentPath._parts[1] }});
              })
            })
            .catch((err) => {console.log(err)})
            this.setState({isRVLoaded: true})
      }

      // fetchComments = async() => {
      //   await firestore().collection('Videos').\\\\\
      // }

      RelatedVideos = () => {
        return(
          <View style={{borderColor: '#404040', borderBottomWidth: .2, borderTopWidth: .2, paddingVertical: 2*height/100}}>
          <Text style={{fontSize: RFValue(18), marginLeft: 7*width/100,  fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Related Videos :</Text>


        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginTop: 2*height/100,}}>
            {RandomVideos.map((item, index) => (
              <TouchableOpacity style={{flexDirection: 'row', marginBottom: 5, marginLeft: 8*width/100}} onPress={() => this.props.navigation.push('Player', item)}>
              <View>
                 <View style={styles.peopleBoxStyle}>
                   <Image style={styles.profileImageStyle} source={require('../../../assets/images/logo.png')} />
               </View>
                  <View style={{paddingHorizontal: 2*width/100, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <Text style={{color: '#787678', fontSize: RFValue(18), marginTop: 5, fontFamily: fontStyle.FONT_FAMILY_REGULAR }}>{item.videoData.data.Title}</Text>
                      <Text style={{color: 'white', fontSize: RFValue(14), fontFamily: fontStyle.FONT_FAMILY_LIGHT}}>{item.videoData.data.category}</Text>
                    </View>

                  </View>
               </View>
              </TouchableOpacity>
            ))}
      <View style={{marginRight: 8*width/100}}></View>

                </ScrollView>
        </View>
        );
      }


      Comments = () => {
        return(
              <View style={{borderColor: '#404040', borderBottomWidth: .2, borderTopWidth: .2, paddingVertical: 2*height/100}}>
              <Text style={{fontSize: RFValue(18), marginLeft: 7*width/100,  fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Comments :</Text>

              <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 2*height/100}}>
              <View style={{}}>
              </View>
              <View style={{}}>
                <TextInput ref={(commentInput) => {this.commentInput = commentInput}} onChangeText={(comment) => {this.setState({comment: comment})}} selectionColor='#B34D8C' style={{width: 60*width/100, paddingLeft: 5*width/100, height: 6*height/100, borderRadius: 15, borderColor: '#787678', borderWidth: 1, alignSelf: 'center', marginBottom: 2*height/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(8, width), color: 'white'}} placeholderTextColor='#787678' placeholder='Comment Here' />
              </View>
              <Button full style={{height: 5*height/100, borderRadius: 10, width: 25*width/100, marginTop: .4*height/100, opacity: this.state.buttonOpacity, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => this.onComment()} >
                {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFValue(6, width), color: 'white'}}>COMMENT</Text>
              </Button>
              </View>

            {Comments.length ? Comments.map(item => (
                                <View style={{flexDirection: 'row', paddingHorizontal: 5*width/100, marginBottom: 1.5*height/100}}>
                                <Image source={{uri: item.profileURL}} style={{height: 6*height/100, width: 6*height/100, borderRadius: 100, marginRight: 2*width/100}} />
                                <View style={{  borderBottomColor: '#404040', borderBottomWidth: .2, flex: 1, marginTop: .5*height/100 }}>
                                    <Text style={{color: '#787678', fontSize: RFValue(16), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, marginBottom: .5*height/100 }}>{item.fullName}</Text>
                                    <Text style={{color: 'white', fontSize: RFValue(13), fontFamily: fontStyle.FONT_FAMILY_LIGHT}}>{item.comment}</Text>
                                </View>
                              </View>
              )) : 
               <TouchableOpacity style={{}} onPress={() => this.commentInput.focus()}>
                <Text style={{color: 'white', fontSize: RFValue(16), fontFamily: fontStyle.FONT_FAMILY_LIGHT,alignSelf: 'center'}}>No Comments Found <Text style={{color: '#B14F8C'}}>Write Something</Text></Text>
              </TouchableOpacity> }



              <ScrollView style={{ marginTop: 2*height/100,}}>
                  
              </ScrollView>
            </View>
            );
      }




    render(){
        return(
            <View style={{backgroundColor: '#1A151B', flex: 1}}>
            <Header androidStatusBarColor='#1A151B' style={{backgroundColor: '#1A151B'}} style={{opacity: 0, height: 0}}>
            </Header>
                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#1A151B'}}>
                <StaticPlayer uri={this.props.route.params.videoData.data.media.url} />
                    <Collapse>
                <CollapseHeader>


                <View style={{flexDirection: 'row', marginTop: 2*height/100, paddingVertical: 2*height/100, paddingHorizontal: 5*width/100, justifyContent: 'space-between', borderBottomColor: '#404040', borderBottomWidth: .2}}> 
                    
                    <View style={{}}>
                      <Text style={{ color: 'white', fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFValue(12, width)}}>{this.props.route.params.videoData.data.Title}</Text>
                      <Text style={{color: '#787678', fontSize: RFValue(12), fontFamily: fontStyle.FONT_FAMILY_LIGHT}}>{this.state.stringDate}</Text>
                    </View>

                    
                    
                    <View style={{alignSelf: 'center', backgroundColor: '#404040', borderRadius: 10, padding: 5,}}>
                      <Text style={{color: 'white', alignSelf: 'center', fontSize: RFValue(14), fontFamily: fontStyle.FONT_FAMILY_REGULAR, elevation: 5}}>{this.props.route.params.videoData.data.category}</Text>                           
                    </View>
                    
                </View>


                </CollapseHeader>
                <CollapseBody>
                    <View style={{justifyContent: 'center', paddingVertical: 2*height/100, paddingHorizontal: 5*width/100, borderBottomColor: '#404040', borderBottomWidth: 0.2 }}> 
                          <Text style={{ color: '#787678', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(10, width)}}>Description: </Text>
                          <Text style={{color: 'white', marginLeft: 1, fontFamily: fontStyle.FONT_FAMILY_LIGHT}}>{this.props.route.params.videoData.data.caption}</Text>
                          <Text style={{ color: '#787678', marginTop: 5, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(8, width)}}>Uploaded by: <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, color: 'white'}}>{this.props.route.params.videoData.data.created_by}</Text> </Text>
                          <Text style={{ color: '#787678', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(8, width)}}>Uploaded at: <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, color: 'white'}}>{(new Date(this.props.route.params.videoData.data.created_at).toString()).substring(4, 16)}</Text></Text>
                    </View>
                </CollapseBody>
            </Collapse>

            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: .5*height/100}}>
                <TouchableOpacity onPress={() => { this.onClickLike(); this.state.isLiked ? this.setState({isLiked: false, buttonColor: '#CBCBCB'}) : this.setState({isLiked: true, buttonColor: '#f66'})}} style={{height: 9*height/100, width: 9*height/100, backgroundColor: '#1c161d', borderRadius: 100, justifyContent: 'center'}}>
                    <View android_ripple={{color: 'red',}} style={{backgroundColor: '#1A151B', borderRadius: 100, alignSelf: 'center', elevation: 5, justifyContent: 'center' }}>
                      <MaterialCommunityIcons name='cards-heart' color={this.state.buttonColor} style={{alignSelf: 'center', fontSize: RFValue(50)}} />
                      <Text style={{ color: 'white', fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFValue(15), alignSelf: 'center'}}>{this.state.totalLikes} likes</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#1c161d', borderRadius: 100, justifyContent: 'center'}}>
                    <View style={{backgroundColor: '#1A151B', borderRadius: 100, alignSelf: 'center', elevation: 5, justifyContent: 'center' }}>
                    <MaterialCommunityIcons name='star' color='#FCC548' style={{alignSelf: 'center', fontSize: RFValue(50)}} />
                    <Text style={{color: 'white', fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFValue(15), alignSelf: 'center'}}>{this.props.route.params.videoData.data.count.share} comments</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#1c161d', borderRadius: 100, justifyContent: 'center'}} onPress={() => this.onShare()}>
                    <View style={{ backgroundColor: '#1A151B', borderRadius: 100, alignSelf: 'center', elevation: 5, justifyContent: 'center' }}>
                      <MaterialCommunityIcons name='share' style={{alignSelf: 'center', color:'#068481', fontSize: RFValue(50)}} />
                      <Text style={{color: 'white', fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFValue(15), alignSelf: 'center'}}>{this.props.route.params.videoData.data.count.share} shares</Text>
                    </View>
                </TouchableOpacity>
            </View>



            
            {this.state.isRVLoaded ? <this.RelatedVideos /> : <ActivityIndicator color='#B14F8C' size='large' style={{}} />  }
            
            {this.state.commentLoaded ? <this.Comments /> : <ActivityIndicator color='#B14F8C' size='large' style={{ marginTop: 40 }} /> }

                </ScrollView>


                
            </View>
        );
    }
}

const styles = StyleSheet.create({
  peopleBoxStyle: {
      height: 17.5*height/100, 
      width: 60*width/100, 
      backgroundColor: '#1A151B',
      borderRadius: 5,
      borderWidth: .2,
      borderColor: 'white',
      flexDirection: 'row',
      elevation: 2,
      backgroundColor: 'white'
  },
  profileImageStyle: {
    alignSelf: 'center',
    height: 10*height/100,
    resizeMode: 'contain'
  },
  nameStyle: {
      fontFamily: fontStyle.FONT_FAMILY_BOLD, 
      marginLeft: 20, 
      fontSize: RFValue(17, height)
  },
  buttonStyle: {
      borderWidth: 0.8,
      backgroundColor: 'white',
      justifyContent: 'center',
      elevation: 0,
      width: 25*width/100,
      height: 8*width/100,
      marginTop: 2*height/100,
      marginLeft: 10, 
      borderRadius: 8,
  },
  followDetails: {
  }
});

mapStateToProps = state => {
  return state;
}

export default (connect)(mapStateToProps,null)(Player);


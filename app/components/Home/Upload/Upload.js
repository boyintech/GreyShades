import React from 'react';
import {
  StyleSheet,
  View, ToastAndroid,
  Text, ScrollView,
  Dimensions, TextInput,
  ActivityIndicator
} from 'react-native';

import { Button} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {Dropdown} from 'react-native-material-dropdown';
import VideoPlayer from 'react-native-video-controls';
import AlertPro from "react-native-alert-pro";


const {height, width} = Dimensions.get('window');

const options = {
    title: 'Video Picker', 
    mediaType: 'video', 
    videoQuality: 'medium',
    durationLimit: 30,
    thumbnail: true,
    allowsEditing: true,

    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions:{
      skipBackup:true,
      path:'images'
    }
};

let Data = [];

class Upload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoSelected: false,
            videoUri: '',
            category: '',
            title: '',
            caption: '',
            response: {},
            btn1clr: 'grey',
            btn2clr: 'grey',
            btn3clr: 'grey',
            uploadingStarted: false,
            viewOpacity: 1,

        }
        this.fetchCategories();
    }

    fetchCategories = async() => {
      Data = [];
        await firestore().collection('video_cat').get().
          then((res) => {
            res._docs.map(item => {
              let temp = {value: item._data.name, category_id: item._ref._documentPath._parts[1]};
              Data.push(temp);
            })
            this.setState({categoryLoaded: true})
          }).
          catch((err) => {
            console.log(err)
          })
    }

    launchGallery = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled Video picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log("SElECTED");
          
          this.setState({videoUri: response.uri, videoSelected: true, response: response});    

            }
    })
 }

 launchCamera = () => {
     ImagePicker.launchCamera(options, (response) => {
     if (response.didCancel) {
       console.log('User cancelled image picker');
     } else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
     } else {
       console.log("SElECTED");
       this.setState({videoUri: response.uri, videoSelected: true, response: response});
     }
 })
}   

makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

getCategoryID = (catName) => {
  let cat_id;
  for(let i=0 ; i < Data.length ; i++ ){
    if(Data[i].value == catName){
      cat_id = Data[i].category_id;
      break;
    }
  }
  console.log(cat_id);
  return cat_id;
}

  createPost = async(response) => {
    let temp;
    if(this.state.title == '' || this.state.caption == '' || this.state.category == ''){
      this.setState({uploadingStarted: false, viewOpacity: 1})
      ToastAndroid.showWithGravityAndOffset("Fields Cannot Be Empty", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
    } else if(Object.keys(this.state.response).length === 0 && this.state.response.constructor === Object) {
      this.setState({uploadingStarted: false, viewOpacity: 1})
      ToastAndroid.showWithGravityAndOffset("Please Select a Video", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
    } else {
    await storage().ref('/videos/users/'+auth().currentUser.uid+'_'+this.makeid(5)+'.mp4').putFile(response.path)
    .then(async (res) => {
        console.log(res);
        await storage().ref(res.metadata.fullPath).getDownloadURL()
          .then(async (res) => {
            let data = {
              Title: this.state.title,
              avatar: null,
              caption: this.state.caption,
              category: this.state.category,
              category_id: this.getCategoryID(this.state.category),
              count: {
                likes: 0,
                share:0,
                subscribe: 0,
              },
              created_at: (new Date()).getTime(),
              created_by: 'app-user',
              uploaded_by: auth().currentUser.uid,
              media: {
                type: 'video',
                url: res
              },
              updated_at: '',
            }
            temp = data.category_id;
            console.log(data);
              await firestore().collection('Videos').add(data).then((res) => {
                console.log(res);
                this.setState({            
                  videoSelected: false,
                  videoUri: '',
                  category: '',
                  title: '',
                  caption: '',
                  response: {},
                  btn1clr: 'grey',
                  btn2clr: 'grey',
                  btn3clr: 'grey',
                  uploadingStarted: false,
                  viewOpacity: 1});
                  ToastAndroid.showWithGravityAndOffset("Post Uploaded Successfully", ToastAndroid.SHORT, ToastAndroid.CENTER, 25, 50);
                  this.props.navigation.goBack();
              }).catch((err) => console.log(err))
          }).catch(err => console.log(err));
    }).catch((err) => {
      console.log(err);
    })    
    }
  }

    toggleBtnColor = (btnNo) => {
      switch(btnNo){
        case 1: if(this.state.title !== '') this.setState({btn1clr: '#B34D8C'}); else this.setState({btn1clr: 'grey'});
        case 2: if(this.state.caption !== '') this.setState({btn2clr: '#B34D8C'}); else this.setState({btn2clr: 'grey'});
        case 3: if(this.state.category !== '') this.setState({btn3clr: '#B34D8C'}); else this.setState({btn3clr: 'grey'});
        default: 
      }
  }



  getVideoDuration = (metaData) => {
    console.log(metaData);
    if(metaData.duration < 31) {

    } else {
      this.AlertPro.open();
      this.setState({videoUri: '', videoSelected: false, response: {}});
    }
  }



    render(){
        return(
            <View style={{backgroundColor: '#B34D8C', flex: 1}}>

                <View style={styles.PageText}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack(); this.setState({            
                  videoSelected: false,
                  videoUri: '',
                  category: '',
                  title: '',
                  caption: '',
                  response: {},
                  btn1clr: 'grey',
                  btn2clr: 'grey',
                  btn3clr: 'grey',
                  uploadingStarted: false,
                  viewOpacity: 1});}} style={{height: 6*height/100, width: 6*height/100, backgroundColor: 'white', borderRadius: 7, marginBottom: 1*height/100, justifyContent: 'center'}}>
                        <AntDesign name='left' style={{fontSize: RFPercentage(3), color: '#B34D8C', alignSelf: 'center'}} />
                    </TouchableOpacity>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFValue(16, width), color: 'white', marginTop: 1*height/100, marginLeft: 1*height/100}}>Upload Post</Text>
                </View>
                <View style={{backgroundColor: 'white', flex: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50, elevation:10}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 5*width/100, borderTopLeftRadius: 50, borderTopRightRadius: 50,opacity: this.state.viewOpacity}}>
                    
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFPercentage(4), marginBottom: 5*height/100,  marginTop: 3*height/100,}}>Upload Video</Text>
                    
                    <View style={{marginBottom: 4*height/100}}>
                    <View style={{marginBottom: 3*height/100}}>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFPercentage(3), marginBottom: 2*height/100 }}>Video Title</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{height: 8.7*height/100, width: '80%', backgroundColor: 'transparent', borderRadius: 10, justifyContent: 'center'}}>
                        <TextInput value={this.state.title} onChangeText={title => {this.setState({title: title,}); this.toggleBtnColor(1);}} placeholderTextColor="#B6B8BD" style={{width: '98%', elevation: 4, alignSelf: 'center', backgroundColor: 'white', height: 8*height/100, borderRadius: 10, fontSize: RFValue(12, width), fontFamily: fontStyle.FONT_FAMILY_LIGHT, paddingLeft: 5*width/100}} selectionColor='#B34D8C' placeholder='Enter Video Title' />
                        </View>
                        <View style={{height: 8*height/100, width: 8*height/100, borderRadius: 5, backgroundColor: this.state.btn1clr, justifyContent: 'center'}}>
                            <IonIcons name='checkmark-sharp' style={{fontSize: RFPercentage(5), color: 'white', alignSelf: 'center'}} />
                        </View>
                        </View>
                    </View>

                    <View style={{marginBottom: 3*height/100}}>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFPercentage(3), marginBottom: 2*height/100 }}>Caption</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                        <View style={{height: 8.7*height/100, width: '80%', backgroundColor: 'transparent', borderRadius: 10, justifyContent: 'center'}}>
                        <TextInput value={this.state.caption} onChangeText={caption => {this.setState({caption: caption,}); this.toggleBtnColor(2);}} placeholderTextColor="#B6B8BD" style={{width: '98%', elevation: 4, alignSelf: 'center', backgroundColor: 'white', height: 8*height/100, borderRadius: 10, fontSize: RFValue(12, width), fontFamily: fontStyle.FONT_FAMILY_LIGHT, paddingLeft: 5*width/100}} selectionColor='#B34D8C' placeholder='Put a caption for the video' />
                        </View>
                        <View style={{height: 8*height/100, width: 8*height/100, borderRadius: 5, backgroundColor: this.state.btn2clr, justifyContent: 'center'}}>
                            <IonIcons name='checkmark-sharp' style={{fontSize: RFPercentage(5), color: 'white', alignSelf: 'center'}} />
                        </View>
                        </View>
                    </View>

                    <View style={{}}>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFPercentage(3), marginBottom: 2*height/100 }}>Choose type of post</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{width: '78%', height: 8*height/100, borderRadius: 10, marginLeft: 5, justifyContent: 'center' }} >
                        <View style={{height: 8.5*height/100, width: '100%', backgroundColor: 'transparent', borderRadius: 10, justifyContent: 'center'}}>
                        <Dropdown
                          value={this.state.category}
                          dropdownPosition={.4}
                          inputContainerStyle={{ borderBottomColor: 'transparent' }}
                          label='Choose Type'
                          onChangeText={category => {this.setState({category: category,}); this.toggleBtnColor(3)}}
                          data={Data}
                          animationDuration={100}
                          useNativeDriver={false}
                          dropdownOffset={{top: 25, left: 0}}
                          itemTextStyle={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(5, width),}}
                          pickerStyle={{borderRadius: 10, width: '80%',}}
                          labelTextStyle={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(5, width), }}
                          containerStyle={{width: '100%', backgroundColor: 'white', elevation: 4, borderRadius: 10, paddingLeft: 10  }}
                        />
                        </View>
                        </View>
                        <View style={{height: 8*height/100, width: 8*height/100, borderRadius: 5, backgroundColor: this.state.btn3clr, justifyContent: 'center'}}>
                            <IonIcons name='checkmark-sharp' style={{fontSize: RFPercentage(5), color: 'white', alignSelf: 'center'}} />
                        </View>
                        </View>
                    </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 3*height/100}}>
                        <TouchableOpacity onPress={() => this.launchGallery()}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: .5, y: 1}} colors={['#fe3973', '#fe3973', '#ffa873' ]} style={{height: 29*width/100, width: 29*width/100,borderRadius: 25, justifyContent: 'flex-end', paddingBottom: 2*height/100, paddingLeft: 2*width/100}}>
                            <Text style={{color: 'white', fontSize: RFValue(8, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Upload from</Text>
                            <Text style={{color: 'white', fontSize: RFValue(14, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Gallery</Text>
                        </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.launchCamera()}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: .5, y: 1}} colors={['#8c65e4', '#7c55d4', '#6e48c4' ]} style={{height: 29*width/100, width: 29*width/100,borderRadius: 25, justifyContent: 'flex-end', paddingBottom: 2*height/100, paddingLeft: 2*width/100}}>
                        <Text style={{color: 'white', fontSize: RFValue(8, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Capture from</Text>
                            <Text style={{color: 'white', fontSize: RFValue(14, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM}}>Camera</Text>
                        </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    {this.state.videoSelected ? <View style={{marginBottom: 3*height/100}}>
                        <VideoPlayer
                            disableBack={true} disableFullscreen={true}  disableVolume={true} 
                            ref={ref => this._video = ref}
                            source={{ uri: this.state.videoUri }}
                            resizeMode={'cover'}
                            repeat={true}
                            onLoad={(metaData) => this.getVideoDuration(metaData)}
                            style={{width: '100%', height: 20*height/100, borderRadius: 25}}
                            paused = {true}                            
                        />
                    </View> : <View></View>}

                    <Button androidRippleColor full style={{height: 8*height/100, borderRadius: 20, width: 80*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#B34D8C', justifyContent: 'center'}} onPress={() => {this.setState({uploadingStarted: true, viewOpacity:0.2}); this.createPost(this.state.response)}} >
                        <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>POST</Text>
                    </Button>

                </ScrollView>
                {this.state.uploadingStarted ? <View style={{height: 15*height/100, width: 50*width/100, backgroundColor: 'white', justifyContent: 'center', alignSelf: 'center', position: 'absolute', elevation: 10, top: '30%'}}>
    <ActivityIndicator color='#B34D8C' size='large' />
    <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(20),color: '#B34D8C', top: 5}}>Creating Post</Text>
</View> : <></> }

                </View>
                <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          onConfirm={() => this.AlertPro.close()}
          showCancel={false}
          title="Video Too Large"
          message="You can only select video below 30 seconds"
          textConfirm="OK"
          customStyles={{
            textConfirm: {
              fontFamily: fontStyle.FONT_FAMILY_REGULAR,
            },
            title: {
              fontFamily: fontStyle.FONT_FAMILY_REGULAR,
            },
            message: {
              fontFamily: fontStyle.FONT_FAMILY_REGULAR,
            },
            mask: {
              backgroundColor: "transparent"
            },
            container: {
              borderWidth: 1,
              borderColor: "#9900cc",
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 10
            },
            buttonConfirm: {
              backgroundColor: "#B34D8C",
            }
          }}
        />
            </View>
        );
    }
}


const styles = StyleSheet.create({
  PageText: {
      paddingTop: 3*height/100,
      paddingLeft: 3*height/100,
      height: 12.5*height/100,
      flexDirection: 'row'
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
    image_shadows: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 140,
    },
    SignupText: {},
    SignupSubText: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 2*height/100,
    },
  });
  

export default Upload;
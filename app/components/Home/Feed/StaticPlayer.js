import React, {PureComponent} from 'react';
import Orientation from 'react-native-orientation-locker';
import {View, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const {height, width} = Dimensions.get('window');

class StaticPlayer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            playerHeight: 30*height/100,
            playerWidth: width,
            isLiked: false,
            buttonColor: '#CBCBCB',
            activeSections: [],
            isActive: 0,
            isCollapsed: true,
            temp: 1,
            isRVLoaded: false,
            commentLoaded: false,
            comment: '',
            loginPressed: false, 
            buttonOpacity: 1,
            Comments: [],
            isPaused: true
          }
    }

    componentDidMount() {
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
      }
      
      _onOrientationDidChange = (orientation) => {
        console.log(orientation);
        if (orientation == 'PORTRAIT') {
              this.setState({playerHeight: 30*height/100, playerWidth: width});
            } else {
              this.setState({playerHeight: 90*width/100, playerWidth: height, });
            }
          };

    render(){
        return(
            <View>
            <VideoPlayer ref={ref => this.player = ref} onBack={() => this.props.navigation.goBack()} seekColor='#D72D96' paused={true} source={{uri: this.props.uri}} style={{height: this.state.playerHeight, width: this.state.playerWidth, backgroundColor: 'grey', justifyContent: 'center', }} onEnterFullscreen={() => {Orientation.lockToLandscape(); this.setState({playerHeight: 90*width/100, playerWidth: height}) }} onExitFullscreen={() => {Orientation.lockToPortrait(); this.setState({playerHeight: 30*height/100, playerWidth: width}) }} toggleResizeModeOnFullscreen={false} />
            </View>
        );
    }
}

export default StaticPlayer;
                

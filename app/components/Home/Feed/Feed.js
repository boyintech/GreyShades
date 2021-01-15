
import React from 'react';
import {
  StyleSheet, 
  View,
  Text,
  Dimensions, ScrollView, RefreshControl,
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

import axios from 'axios';
import {Header} from 'native-base';
import Awesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const {height, width} = Dimensions.get('screen');
import AlertPro from "react-native-alert-pro";


let Data = [];
let Videos = [];
let Temp = [];

class Feed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          categoryLoaded: false,

        }
      }
      
    componentDidMount(){
        this.fetchCategories();
    }

    fetchCategories = () => {
      Data = [];
        firestore().collection('video_cat').get().
          then((res) => {
            res._docs.map(async item => {
              let data = {
                category_data: {
                  category_id: item._ref._documentPath._parts[1],
                  category_name: item._data.name,
                  totalVideos: item._data.count,
                  thumbnail_img: item._data.thumbnail_img
                },
                video_data: await this.fetchVideos(item._ref._documentPath._parts[1])  
              }
              Data.push(data);
              this.setState({categoryLoaded: true})
            })
          }).
          catch((err) => {
            console.log(err)
          })
    }

    fetchVideos = async(category_name) => {
      var temp = [];
      await firestore().collection("Videos").where("category_id", "==", category_name).get()
        .then((res) => {
            res.docs.map(item => {
              if(item._data.created_by == 'admin')
                temp.push(item);
            });
          }).catch((err) => {
            temp = err;
        })
        return temp;
    }

    renderItem = ({item}) => (
            <TouchableOpacity style={{ height: 35*height/100, width: '100%',}} onPress={() => this.props.navigation.navigate('Posts', {data: item})}>
            <Image source={{uri: item.category_data.thumbnail_img}}  style={{height: 25*height/100, width: '100%'}} />
            <View style={{height: 10*height/100, paddingHorizontal: '3%', justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                <Image source={{uri: item.category_data.thumbnail_img}} style={{height: 6*height/100, width: 6*height/100, borderRadius: 100, resizeMode:'cover'}} />
                <View style={{justifyContent: 'space-evenly', marginLeft: '5%'}}>
                    <Text style={{fontSize: RFValue(11, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>Loream alpsum</Text>
                    <Text style={{fontSize: RFValue(9, width), fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#787678'}}>{item.category_data.category_name}</Text>
                </View>
                </View>
                <View style={{justifyContent: 'center' }}>
                    <View style={{flexDirection: 'row', }} >
                        <Text style={{backgroundColor: '#B14F8C', borderRadius: 15, fontSize: RFValue(11, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white', paddingHorizontal: '3%', paddingVertical: '1%' }}>{item.category_data.totalVideos}</Text>
                        <AntDesign name='right' style={{alignSelf: 'center', color: '#5C5C5C', fontSize: RFValue(11, width), marginLeft: '1%'}} />
                    </View>
                </View>
                </View>
            </View>                        
        </TouchableOpacity>
    );



    render(){
        return(
            <View style={{backgroundColor: '#1A151B', flex: 1}}>
            <Header androidStatusBarColor='#1A151B' style={{backgroundColor: '#1A151B'}}>
                    <Text style={{color: 'white', alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(14, width)}}>Feed</Text>
            </Header>
                



                {this.state.categoryLoaded ?  <FlatList data={Data} renderItem={this.renderItem} keyExtractor={item => item.category_data.category_id} /> : <ActivityIndicator color='#B14F8C' size='large' style={{marginTop: '70%'}} /> }
                
            </View>
        );
    }
}

export default Feed;
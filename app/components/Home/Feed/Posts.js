
import React from 'react';
import {
  StyleSheet, 
  View, FlatList,
  Text,
  Dimensions, ScrollView, 
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';

import {Header} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const {height, width} = Dimensions.get('screen');

const Data = [
    {value: 'Entertainment', no: 177},
    {value: 'Fitness', no: 14560},
    {value: 'Cooking', no: 2820},
    {value: 'Art therapy', no: 1200},
  ]
  

class Posts extends React.Component {
    constructor(props){
        super(props);  
        console.log(this.props.route.params.data.video_data.length ? "true" : "false") 
    }

    showError = () => {
        return(
            <TouchableOpacity style={{marginTop: '60%'}} onPress={() => this.props.navigation.goBack()}>
                <Text style={{color: 'white', fontSize: RFValue(20), fontFamily: fontStyle.FONT_FAMILY_LIGHT,alignSelf: 'center'}}>No Videos Found <Text style={{color: '#B14F8C'}}>Go Back</Text></Text>
            </TouchableOpacity>

         )
    }

    renderItem = ({item}) => (
        <TouchableOpacity style={{ height: 15*height/100, width: '100%', borderBottomWidth: .2, borderBottomColor: 'white', justifyContent: 'center', backgroundColor: '#1A151B'}} onPress={() => this.props.navigation.navigate('Player', {videoData: {data: item._data, video_id: item._ref._documentPath._parts[1] }})}>
        <View style={{height: 10*height/100, paddingHorizontal: '3%', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
            <Image source={{uri: this.props.route.params.data.category_data.thumbnail_img}} style={{height: 8*height/100, width: 8*height/100,  resizeMode:'cover'}} />
            <View style={{justifyContent: 'space-evenly', marginLeft: '5%'}}>
                <Text style={{fontSize: RFValue(11, width), fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white'}}>{item._data.Title}</Text>
                <Text style={{fontSize: RFValue(9, width), fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#787678'}}>{item._data.caption.substring(0, 30)}</Text>
            </View>
            </View>
            <View style={{justifyContent: 'center' }}>
                <View style={{flexDirection: 'row', }} >
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
                    <Text style={{color: 'white', alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: RFValue(14, width)}}>{this.props.route.params.data.category_data.category_name}</Text>
            </Header>
            <View style={{backgroundColor: 'white', borderRadius: 20, height: 4*height/100, width: 50*width/100, alignSelf: 'center', justifyContent: 'center', marginTop: '2%' }}>
                    <Text style={{fontSize: RFValue(10, width), fontFamily: fontStyle.FONT_FAMILY_REGULAR, alignSelf: 'center',}}>  Total Videos : {this.props.route.params.data.category_data.totalVideos}  </Text>
            </View>
                
                {this.props.route.params.data.video_data.length ? <FlatList data={this.props.route.params.data.video_data.slice(0).reverse()} renderItem={this.renderItem} /> : <this.showError /> }
                

            </View>
        );
    }
}

export default Posts;

// this.props.route.params.data.video_data.slice(0).reverse()
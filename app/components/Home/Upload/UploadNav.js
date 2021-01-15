import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Upload from './Upload.js';

class UploadNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Upload'>
          <Stack.Screen name='Upload' component={Upload} />
        </Stack.Navigator>
    );

 }
}
export default UploadNav;

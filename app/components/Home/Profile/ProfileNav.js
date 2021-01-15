import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Profile from './Profile.js';
import SettingsNav from '../Settings/SettingsNav.js';
import MiniPlayer from './MiniPlayer.js';

class ProfileNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Profile'>
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='MiniPlayer' component={MiniPlayer} />
          <Stack.Screen name='SettingsNav' component={SettingsNav} />
        </Stack.Navigator>
    );

 }
}
export default ProfileNav;

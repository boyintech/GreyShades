import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Settings from './Settings.js';
import ProfileSettings from './ProfileSettings.js';
import Policy from './Policy.js';
import About from './About.js';
import Help from './Help.js';
import ChangePassword from "./ChangePassword.js";
import ChangeBIO from './ChangeBIO.js';
import ChangeDOB from './ChangeDOB.js';
import ChangeFullName from './ChangeFullName.js';

class SettingsNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Settings'>
          <Stack.Screen name='Settings' component={Settings} />
          <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} />
          <Stack.Screen name='Policy' component={Policy} />
          <Stack.Screen name='About' component={About} />
          <Stack.Screen name='Help' component={Help} />
          <Stack.Screen name='ChangeBIO' component={ChangeBIO} />
          <Stack.Screen name='ChangeDOB' component={ChangeDOB} />
          <Stack.Screen name='ChangeFullName' component={ChangeFullName} />
        </Stack.Navigator>
    );

 }
}
export default SettingsNav;

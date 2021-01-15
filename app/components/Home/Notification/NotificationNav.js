import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Notification from './Notification.js';

class NotificationNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Notification'>
          <Stack.Screen name='Notification' component={Notification} />
        </Stack.Navigator>
    );

 }
}
export default NotificationNav;

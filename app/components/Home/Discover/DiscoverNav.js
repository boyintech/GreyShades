import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import Discover from './Discover.js';
import Comments from './Comments.js';

class DiscoverNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Discover'>
          <Stack.Screen name='Discover' component={Discover} />
          <Stack.Screen name='Comments' component={Comments} />
        </Stack.Navigator>
      </NavigationContainer>
    );

 }
}
export default DiscoverNav;

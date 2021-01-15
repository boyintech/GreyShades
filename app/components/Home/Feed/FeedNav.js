import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Feed from './Feed.js';
import Posts from './Posts.js';
import Player from './Player.js';

class FeedNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Feed'>
          <Stack.Screen name='Feed' component={Feed} />
          <Stack.Screen name='Posts' component={Posts} />
          <Stack.Screen name='Player' component={Player} />
        </Stack.Navigator>
      </NavigationContainer>
    );

 }
}
export default FeedNav;

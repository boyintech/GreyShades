import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import SplashScreen from './components/SplashScreen/SplashScreen.js';
import store from './store/index.js';
import Login from './components/Login/Login.js';
import VerifyOTP from './components/Register/VerifyOTP.js';
import Home from './components/Home/Home.js';
import GetStrted from './components/Login/GetStarted.js';
import Register from './components/Register/Register.js'
import SignupForm from './components/Register/SignupForm.js';
import ForgotPassword from './components/Login/ForgotPassword.js';
import Player from './components/Home/Feed/Player.js';

class App extends React.Component {



 render() {

        const Stack = createStackNavigator();

    return (
      <Provider store={store}>
      <Root>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SplashScreen'>
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='GetStarted' component={GetStrted} />
          <Stack.Screen name='VerifyOTP' component={VerifyOTP} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='SignupForm' component={SignupForm} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen name='Player' component={Player} />
        </Stack.Navigator>
      </NavigationContainer>
      </Root>
      </Provider>
    );

 }
}
export default App;

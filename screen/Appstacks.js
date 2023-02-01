import React, {useEffect, Component} from 'react';
import {Image, View, Text, Easing, StyleSheet, Dimensions} from 'react-native';
import Login from './Login';
import Register from './Register';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderTitle,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {createAppContainer} from 'react-navigation';
import Tabs from './tabs';
import DisplayAnImage from './Home';
import {renderNode} from 'react-native-elements/dist/helpers';
import io from 'socket.io-client';
import {configureFonts} from 'react-native-paper';
import CoinScreen from './CoinScreen';
import Settings from './Settings';
import Call from './Call';
import User from './User';
import Launcher from './launcher';
import PhotoLibrary from './Photolibrary';
import Caller from './caller';

import InputPasscode from './inputpasscode';
import Dashboard from './Dashboard';
import Callee from './callee';
// import Launcher from '../screen/Launcher';

const Stack = createStackNavigator();
const navigationRef = React.createRef();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Appstacks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outputRange: [windowWidth, 0, 0],
    };
  }

  render() {
    return (
      
      <NavigationContainer
        independent={true}
        ref={navigationRef}
        onReady={() => {
          this.launcher.init();
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}>
          <Stack.Screen name="Launcher">
            {props => (
              <Launcher
                ref={instance => {
                  this.launcher = instance;
                }}
                navigationRef={navigationRef}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {props => <Login navigationRef={navigationRef} />}
          </Stack.Screen>
          <Stack.Screen name="Tabs">
            {props => <Tabs navigationRef={navigationRef} />}
          </Stack.Screen>

          <Stack.Screen name="Register">
            {props => <Register navigationRef={navigationRef} />}
          </Stack.Screen>
          <Stack.Screen name="home">
            {props => <DisplayAnImage navigationRef={navigationRef} />}
          </Stack.Screen>

          <Stack.Screen name="Settings">
            {props => <Settings navigationRef={navigationRef} />}
          </Stack.Screen>

          <Stack.Screen name="Dashboard">
            {props => <Dashboard navigationRef={navigationRef} />}
          </Stack.Screen>
          <Stack.Screen name="Callee">
            {props => <Callee navigationRef={navigationRef} />}
          </Stack.Screen>
          {/* <Stack.Screen name="Caller">
            {props => <Caller navigationRef={navigationRef} />}
          </Stack.Screen> */}
          <Stack.Screen name="photoLibrary">
            {props => <PhotoLibrary navigationRef={navigationRef} />}
          </Stack.Screen>
        </Stack.Navigator>
        
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 50,
    bottom: 0,
    left: 0,
    right: 0,
  },
  launcher: {
    flex: 1,
    width: '100%',
    top: 0,
  },
  gl: {
    flex: 1,
    width: '100%',
    top: 0,
  },
});

export default Appstacks;

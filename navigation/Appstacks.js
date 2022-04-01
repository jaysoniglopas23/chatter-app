import React, {useEffect, Component} from 'react';
import {Image, View, Text, Easing} from 'react-native';
import Login from '../screen/Login';
import Register from '../screen/Register';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderTitle,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import Tabs from '../navigation/tabs';
import DisplayAnImage from '../screen/Home';
import {renderNode} from 'react-native-elements/dist/helpers';
import io from 'socket.io-client';
import {configureFonts} from 'react-native-paper';
import CoinScreen from '../homes/CoinScreen';
import Settings from '../homes/Picture';
import Call from '../screen/Call';
import User from '../screen/User';
// import Launcher from '../screen/Launcher';

const Stack = createStackNavigator();

class AppStacks extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnable: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tab"
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Coin"
            component={CoinScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Call"
            component={Call}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppStacks;

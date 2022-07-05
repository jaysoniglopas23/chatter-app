import React, {useEffect, Component} from 'react';
import {Image, View, Text, Easing, StyleSheet, Dimensions} from 'react-native';
import Login from '../screen/Login';
import Register from '../screen/Register';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderTitle,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {createAppContainer} from 'react-navigation';
import Tabs from '../navigation/tabs';
import DisplayAnImage from '../screen/Home';
import {renderNode} from 'react-native-elements/dist/helpers';
import io from 'socket.io-client';
import {configureFonts} from 'react-native-paper';
import CoinScreen from '../homes/CoinScreen';
import Settings from '../homes/Picture';
import Call from '../screen/Call';
import User from '../homes/User';
import Launcher from '../screen/launcher';
import PhotoLibrary from '../screen/Photolibrary';

import InputPasscode from '../screen/inputpasscode';
import Dashboard from '../screen/Dashboard';
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
          this.launcher.componentDidMount();
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

          <Stack.Screen name="Dashboard">
            {props => <Dashboard navigationRef={navigationRef} />}
          </Stack.Screen>

          <Stack.Screen name="home">
            {props => <DisplayAnImage navigationRef={navigationRef} />}
          </Stack.Screen>

          {/* 

        <Stack.Screen name="ForgotPassword">
          {props => <ForgotPassword  navigationRef={navigationRef} />}
        </Stack.Screen>

        <Stack.Screen name="EnterResetPasswordCode">
          {props => <EnterResetPasswordCode  navigationRef={navigationRef} />}
        </Stack.Screen>

        <Stack.Screen name="ResetPassword">
          {props => <ResetPassword  navigationRef={navigationRef} />}
        </Stack.Screen>

        <Stack.Screen name="CaptureImage">
          {props => <CaptureImage  navigationRef={navigationRef} />}
        </Stack.Screen>

        <Stack.Screen name="PrePost">
          {props => <PrePost  navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="UserProfile">
          {props => <UserProfile  navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="UserAllProfile">
          {props => <UserAllProfile  navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="Chats">
          {props => <Chats  navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="UserPostView">
          {props => <UserPostView  navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="Caller">
          {props => <Caller  navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="Callee">
          {props => <Callee  navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="PostLikes">
          {props => <PostLikes  navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="PhotoLibrary">
          {props => <PhotoLibrary  navigationRef={navigationRef} gl={this.gl} editProfile={this.editProfile}/>}
        </Stack.Screen>

        <Stack.Screen name="EditProfile">
          {props => <EditProfile  ref={instance => { this.editProfile = instance; }} navigationRef={navigationRef} gl={this.gl}/>}
        </Stack.Screen>

        <Stack.Screen name="CaptureProfileImage">
          {props => <CaptureProfileImage  navigationRef={navigationRef} gl={this.gl} editProfile={this.editProfile}/>}
        </Stack.Screen>

        <Stack.Screen name="RankingsList">
          {props => <RankingsList  navigationRef={navigationRef} gl={this.gl} editProfile={this.editProfile}/>}
        </Stack.Screen>

        <Stack.Screen name="Messages">
          {props => <Messages  navigationRef={navigationRef} gl={this.gl} editProfile={this.editProfile}/>}
        </Stack.Screen>

        <Stack.Screen name="BuyCoins">
          {props => <BuyCoins  navigationRef={navigationRef} gl={this.gl} editProfile={this.editProfile}/>}
        </Stack.Screen>

        <Stack.Screen name="Rankings">
          {props => <Rankings  navigationRef={navigationRef} gl={this.gl} editProfile={this.editProfile}/>}
        </Stack.Screen>

        <Stack.Screen name="TimelineSearch">
          {props => <TimelineSearch  navigationRef={navigationRef} gl={this.gl} editProfile={this.editProfile}/>}
        </Stack.Screen>

        <Stack.Screen name="Web">
          {props => <Web  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="UserManual">
          {props => <UserManual  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>


        <Stack.Screen name="SystemNotifications">
          {props => <SystemNotifications  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="SystemNotificationDetails">
          {props => <SystemNotificationDetails  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>


        <Stack.Screen name="BlockedUsers">
          {props => <BlockedUsers  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="MutedUsers">
          {props => <MutedUsers  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>


        <Stack.Screen name="Settings">
          {props => <Settings  navigationRef={navigationRef} gl={this.gl} launcher={this.launcher}/>}
        </Stack.Screen>


        <Stack.Screen name="PushNotifications">
          {props => <PushNotifications  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="AccountSettings">
          {props => <AccountSettings  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="RegisteredEmail">
          {props => <RegisteredEmail  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="PasswordSettings">
          {props => <PasswordSettings  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="PasscodeSettings">
          {props => <PasscodeSettings  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>


        <Stack.Screen name="CardDisplaySettings">
          {props => <CardDisplaySettings  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>


        <Stack.Screen name="ContactUs">
          {props => <ContactUs  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="SetPasscode">
          {props => <SetPasscode  navigationRef={navigationRef} gl={this.gl} />}
        </Stack.Screen>

        <Stack.Screen name="InputPasscode">
          {props => <InputPasscode  navigationRef={navigationRef} gl={this.gl} launcher={this.launcher}/>}
        </Stack.Screen> */}
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

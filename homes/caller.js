import React, {useRef, Component} from 'react';

import {
  Easing,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  NativeModules,
  Platform,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  findNodeHandle,
} from 'react-native';

import {
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc';

import Svg, {G, Path} from 'react-native-svg';

import firestore from '@react-native-firebase/firestore';

import InCallManager from 'react-native-incall-manager';

import StringUtils from '../utils/stringutils';

import Utils from './utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const twilioVideo = React.createRef();

class Caller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: null,
      trackSid: null,
      trackIdentifier: null,
      messageText: global.locale == 'en' ? ' Connecting...' : '接続する...',
      usernameText: global.userProfile[0].nickname,
      callStatus: 0,
      videoOn: false,
      calleeVideoOn: false,
      mute: false,
      speakerOn: false,
    };

    this.onRoomDidConnect = this.onRoomDidConnect.bind(this);

    this.onRoomDidDisconnect = this.onRoomDidDisconnect.bind(this);

    this.onRoomDidFailToConnect = this.onRoomDidFailToConnect.bind(this);

    this.onParticipantAddedVideoTrack =
      this.onParticipantAddedVideoTrack.bind(this);

    this.onParticipantRemovedVideoTrack =
      this.onParticipantRemovedVideoTrack.bind(this);

    this.videoOn = this.videoOn.bind(this);

    this.mute = this.mute.bind(this);

    this.speakerOn = this.speakerOn.bind(this);

    this.back = this.back.bind(this);
  }

  componentDidMount() {
    let self = this;

    global.socket.on('twilio_callee_drop', function (ret) {
      /*InCallManager.stopRingback();

      twilioVideo.current.disconnect();


      InCallManager.stop();

      self.props.navigationRef.current?.navigate('UserProfile');*/

      twilioVideo.current?.disconnect();

      self.props.navigationRef.current?.navigate('UserProfile');
    });

    global.socket.on('twilio_callee_answer', function (ret) {
      self.setState({
        messageText: global.locale == 'en' ? ' Connected' : '接続済み',
      });
    });

    global.socket.on('twiliocreateroom', function (ret) {
      self.setState(
        {
          accessToken: ret.accesstoken,
        },
        () => {
          twilioVideo.current?.connect({accessToken: ret.accesstoken});
        },
      );
    });

    let params = {
      uuid: global.deviceid,
      userid: global.userProfile[0].user_id,
      requestor: global.user_id,
    };

    global.socket.emit('twiliocreateroom', params);

    global.socket.on('twilio_callee_video_on', function (ret) {
      self.setState({
        calleeVideoOn: true,
      });
    });

    global.socket.on('twilio_callee_video_off', function (ret) {
      self.setState({
        calleeVideoOn: false,
      });
    });
  }

  videoOn() {
    if (this.state.videoOn) {
      this.setState(
        {
          videoOn: false,
        },
        () => {
          let params = {
            uuid: global.deviceid,
            callee: global.userProfile[0].user_id,
            caller: global.user_id,
          };

          global.socket.emit('twilio_caller_video_off', params);
        },
      );
    } else {
      this.setState(
        {
          videoOn: true,
        },
        () => {
          let params = {
            uuid: global.deviceid,
            callee: global.userProfile[0].user_id,
            caller: global.user_id,
          };

          global.socket.emit('twilio_caller_video_on', params);
        },
      );
    }
  }

  mute() {
    if (this.state.mute) {
      this.setState(
        {
          mute: false,
        },
        () => {
          twilioVideo.current.setLocalAudioEnabled(false);
        },
      );
    } else {
      this.setState(
        {
          mute: true,
        },
        () => {
          twilioVideo.current.setLocalAudioEnabled(true);
        },
      );
    }
  }

  speakerOn() {
    if (this.state.speakerOn) {
      this.setState(
        {
          speakerOn: false,
        },
        () => {},
      );
    } else {
      this.setState(
        {
          speakerOn: true,
        },
        () => {},
      );
    }
  }

  back() {
    twilioVideo.current?.disconnect();

    this.props.navigationRef.current?.navigate('UserProfile');

    let params = {
      uuid: global.deviceid,
      callee: global.userProfile[0].user_id,
      caller: global.user_id,
    };

    global.socket.emit('twilio_caller_drop', params);
  }

  onRoomDidConnect() {
    this.setState({
      callStatus: 1,
      messageText: global.locale == 'en' ? ' Connected' : '接続済み',
    });
  }

  onRoomDidDisconnect() {}

  onRoomDidFailToConnect() {
    let self = this;

    this.setState(
      {
        messageText:
          global.locale == 'en' ? ' Connection Failed' : '接続に失敗しました',
      },
      () => {
        self.props.navigationRef.current?.navigate('UserProfile');
      },
    );
  }

  onParticipantAddedVideoTrack({participant, track}) {
    this.setState({
      trackSid: track.trackSid,
      trackIdentifier: {
        participantSid: participant.sid,
        videoTrackSid: track.trackSid,
      },
    });
  }

  onParticipantRemovedVideoTrack() {
    console.log('Removed video track');
  }

  render() {
    return (
      <View
        styles={{
          width: windowWidth,
          height: windowHeight,
          flexDirection: 'column',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            flexDirection: 'column',
          }}>
          <TwilioVideo
            style={{width: 300, height: 300}}
            ref={twilioVideo}
            onRoomDidConnect={this.onRoomDidConnect}
            onRoomDidDisconnect={this.onRoomDidDisconnect}
            onRoomDidFailToConnect={this.onRoomDidFailToConnect}
            onParticipantAddedVideoTrack={this.onParticipantAddedVideoTrack}
            onParticipantRemovedVideoTrack={this.onParticipantRemovedVideoTrack}
          />

          {this.state.calleeVideoOn ? (
            <TwilioVideoParticipantView
              style={{
                top: 0,
                position: 'absolute',
                width: windowWidth,
                height: windowHeight,
                backgroundColor: '#000',
              }}
              key={this.state.trackSid}
              trackIdentifier={this.state.trackIdentifier}
            />
          ) : (
            <></>
          )}

          <View style={{position: 'absolute', top: 150, width: windowWidth}}>
            <Image
              source={require('../img/coin.png')}
              style={{width: 50, height: 50, alignSelf: 'center'}}
            />

            <Text
              style={{
                width: windowWidth,
                lineHeight: 30,
                fontSize: 15,
                textAlign: 'center',
                marginTop: 10,
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              {this.state.usernameText}
            </Text>

            <Text
              style={{
                width: windowWidth,
                lineHeight: 20,
                fontSize: 12,
                textAlign: 'center',
                marginTop: 5,
                color: '#FFF',
              }}>
              {this.state.messageText}
            </Text>
          </View>

          {this.state.videoOn ? (
            <TwilioVideoLocalView
              enabled={true}
              style={{
                position: 'absolute',
                top: windowHeight - 340,
                width: 180,
                height: 200,
                right: 20,
                borderRadius: 5,
              }}
            />
          ) : (
            <></>
          )}

          <View
            style={{
              top: windowHeight - 120,
              position: 'absolute',
              width: windowWidth - 40,
              height: 80,
              marginLeft: 20,
              flexDirection: 'row',
            }}>
            <View style={{width: (windowWidth - 40) / 4, height: 80}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignSelf: 'center',
                  marginTop: 12.5,
                }}
                onPress={() => this.mute()}>
                {this.state.mute ? (
                  <Svg
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="microphone"
                    class="svg-inline--fa fa-microphone fa-w-10"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512">
                    <Path
                      fill="#FFF"
                      d="M160 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S64 42.98 64 96v160c0 53.02 42.98 96 96 96zM96 96c0-35.29 28.71-64 64-64s64 28.71 64 64v160c0 35.29-28.71 64-64 64s-64-28.71-64-64V96zm216 96h-16c-4.42 0-8 3.58-8 8v56c0 73.46-62.2 132.68-136.73 127.71C83.3 379.18 32 319.61 32 251.49V200c0-4.42-3.58-8-8-8H8c-4.42 0-8 3.58-8 8v50.34c0 83.39 61.65 156.12 144 164.43V480H72c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h176c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8h-72v-65.01C256.71 406.9 320 338.8 320 256v-56c0-4.42-3.58-8-8-8z"></Path>
                  </Svg>
                ) : (
                  <Svg
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="microphone-slash"
                    class="svg-inline--fa fa-microphone-slash fa-w-20"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512">
                    <Path
                      fill="#FFF"
                      d="M256 96c0-35.3 28.7-64 64-64s64 28.7 64 64v149.3l30.7 24.1c.6-4.4 1.3-8.8 1.3-13.4V96c0-53-43-96-96-96s-96 43-96 96v23.3l32 25.2zm224 160v-56c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v56c0 12.3-2.3 24-5.6 35.3l27 21.3C476.2 295 480 276 480 256zm-72 224h-72v-65c27.2-2.7 52.1-12.7 73.6-27.3l-26.4-20.8c-21 12-45.6 18.6-71.9 16.8-68-4.5-119.3-64.1-119.3-132.2v-35.2l-28.5-22.5c-2 1.5-3.5 3.5-3.5 6.1v50.3c0 83.4 61.7 156.1 144 164.4V480h-72c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h176c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-88-128c12.6 0 24.5-2.6 35.5-7l-32.2-25.4c-1.1.1-2.1.3-3.3.3-31.3 0-57.3-22.6-62.8-52.4l-33.2-26V256c0 53 43 96 96 96zm317 133.2L23 1.8C19.6-1 14.5-.5 11.8 3l-10 12.5C-1 19-.4 24 3 26.7l614 483.5c3.4 2.8 8.5 2.2 11.2-1.2l10-12.5c2.8-3.5 2.3-8.5-1.2-11.3z"></Path>
                  </Svg>
                )}
              </TouchableOpacity>
            </View>

            <View style={{width: (windowWidth - 40) / 4, height: 80}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignSelf: 'center',
                  marginTop: 12.5,
                }}
                onPress={() => this.videoOn()}>
                {this.state.videoOn ? (
                  <Svg
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="video-slash"
                    class="svg-inline--fa fa-video-slash fa-w-20"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512">
                    <Path
                      fill="#FFF"
                      d="M637 485.2L142.7 96l-16.2-12.7L23 1.8C19.6-1 14.5-.4 11.8 3l-10 12.5C-1 19-.4 24 3 26.8L438.9 370l9.1 7.2 169 133.1c3.4 2.8 8.5 2.2 11.2-1.2l10-12.5c2.8-3.6 2.2-8.6-1.2-11.4zM396.2 416H83.8c-10.7 0-19.8-7.2-19.8-15.8V135.9l-31.9-25.1c0 .4-.1.7-.1 1.1v288.4c0 26.4 23.2 47.8 51.8 47.8h312.4c16.6 0 31.2-7.3 40.7-18.5l-25.3-19.9c-3.7 3.7-9.1 6.3-15.4 6.3zm0-320c10.7 0 19.8 7.2 19.8 15.8v138.3l32 25.2v-65.8L576 128v248.1l28.4 22.4c2.1-4.2 3.6-8.8 3.6-14v-257C608 109 592.5 96 575.9 96c-6.2 0-12.5 1.8-18.2 5.7L448 171.6v-59.8c0-26.4-23.2-47.8-51.8-47.8H179.6l40.6 32h176z"></Path>
                  </Svg>
                ) : (
                  <Svg
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="video"
                    class="svg-inline--fa fa-video fa-w-18"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512">
                    <Path
                      fill="#FFF"
                      d="M543.9 96c-6.2 0-12.5 1.8-18.2 5.7L416 171.6v-59.8c0-26.4-23.2-47.8-51.8-47.8H51.8C23.2 64 0 85.4 0 111.8v288.4C0 426.6 23.2 448 51.8 448h312.4c28.6 0 51.8-21.4 51.8-47.8v-59.8l109.6 69.9c5.7 4 12.1 5.7 18.2 5.7 16.6 0 32.1-13 32.1-31.5v-257c.1-18.5-15.4-31.5-32-31.5zM384 400.2c0 8.6-9.1 15.8-19.8 15.8H51.8c-10.7 0-19.8-7.2-19.8-15.8V111.8c0-8.6 9.1-15.8 19.8-15.8h312.4c10.7 0 19.8 7.2 19.8 15.8v288.4zm160-15.7l-1.2-1.3L416 302.4v-92.9L544 128v256.5z"></Path>
                  </Svg>
                )}
              </TouchableOpacity>
            </View>

            <View style={{width: (windowWidth - 40) / 4, height: 80}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignSelf: 'center',
                  marginTop: 12.5,
                }}
                onPress={() => this.speakerOn()}>
                {this.state.speakerOn ? (
                  <Svg
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="volume-off"
                    class="svg-inline--fa fa-volume-off fa-w-8"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512">
                    <Path
                      fill="#FFF"
                      d="M231.81 64a23.44 23.44 0 0 0-16.78 7l-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.06L215 441a23.47 23.47 0 0 0 16.81 7c12.33 0 24.19-9.52 24.19-24V88c0-14.51-11.86-24-24.19-24zM224 404.67L139.31 320H32V192h107.31L224 107.33v297.34z"></Path>
                  </Svg>
                ) : (
                  <Svg
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="volume-mute"
                    class="svg-inline--fa fa-volume-mute fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <Path
                      fill="#FFF"
                      d="M454.63 256l55.03-55.03c3.12-3.12 3.12-8.19 0-11.31l-11.31-11.31c-3.12-3.12-8.19-3.12-11.31 0L432 233.37l-55.03-55.03c-3.12-3.12-8.19-3.12-11.31 0l-11.31 11.31c-3.12 3.12-3.12 8.19 0 11.31L409.37 256l-55.03 55.03c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c3.12 3.12 8.19 3.12 11.31 0L432 278.63l55.03 55.03c3.12 3.12 8.19 3.12 11.31 0l11.31-11.31c3.12-3.12 3.12-8.19 0-11.31L454.63 256zM231.81 64c-5.91 0-11.92 2.18-16.78 7.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c4.87 4.87 10.88 7.05 16.78 7.05 12.33 0 24.19-9.52 24.19-24.02V88.02C256 73.51 244.13 64 231.81 64zM224 404.67l-75.32-75.3-9.37-9.37H32V192h107.31l9.37-9.37 75.32-75.3v297.34z"></Path>
                  </Svg>
                )}
              </TouchableOpacity>
            </View>

            <View style={{width: (windowWidth - 40) / 4, height: 80}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignSelf: 'center',
                  marginTop: 12.5,
                }}
                onPress={() => this.back()}>
                <Svg
                  style={{
                    width: 30,
                    height: 30,
                    marginTop: 11,
                    alignSelf: 'center',
                    transform: [{rotate: '224deg'}],
                  }}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="phone"
                  class="svg-inline--fa fa-phone fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <Path
                    fill="#FFF"
                    d="M487.8 24.1L387 .8c-14.7-3.4-29.8 4.2-35.8 18.1l-46.5 108.5c-5.5 12.7-1.8 27.7 8.9 36.5l53.9 44.1c-34 69.2-90.3 125.6-159.6 159.6l-44.1-53.9c-8.8-10.7-23.8-14.4-36.5-8.9L18.9 351.3C5 357.3-2.6 372.3.8 387L24 487.7C27.3 502 39.9 512 54.5 512 306.7 512 512 307.8 512 54.5c0-14.6-10-27.2-24.2-30.4zM55.1 480l-23-99.6 107.4-46 59.5 72.8c103.6-48.6 159.7-104.9 208.1-208.1l-72.8-59.5 46-107.4 99.6 23C479.7 289.7 289.6 479.7 55.1 480z"></Path>
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Caller;

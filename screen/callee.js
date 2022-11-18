// import React, {useRef, Component} from 'react';

// import {
//   Easing,
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   Animated,
//   NativeModules,
//   Platform,
//   Dimensions,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   FlatList,
//   Modal,
//   TextInput,
//   KeyboardAvoidingView,
//   findNodeHandle,
// } from 'react-native';

// import Svg, {G, Path} from 'react-native-svg';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const twilioVideo = React.createRef();

// class Callee extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       accessToken: null,
//       trackSid: null,
//       trackIdentifier: null,
//       messageText: global.locale == 'en' ? ' Connecting...' : '接続する...',
//       usernameText: global.name,
//       callStatus: 0,
//       videoOn: false,
//       calleeVideoOn: false,
//       mute: false,
//       speakerOn: false,
//     };

//   }

//   componentDidMount() {

//     global.socket.on('emit-drop-callee-audio-call', function (ret) {
//       global.socket.off('emit-drop-callee-audio-call');

//       // global.callerData = ret;

//       self.props.navigationRef.current?.navigate('home');
//     });

//   }

//   render() {
//     return (
//       <View
//         styles={{
//           width: windowWidth,
//           height: windowHeight,
//           flexDirection: 'column',
//           backroundColor:'#000'
//         }}>

//       </View>
//     );
//   }
// }

// export default Callee;

import React, {useRef, Component} from 'react';
import ZegoUIKitPreBuildCall, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ZegoLayoutMode} from '@zegocloud/zego-uikit-rn';
import {View, Dimensions, TouchableOpacity} from 'react-native';

import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Callee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: global.nickname,
      userid: global.otherid,
      call: false,
    };
  }

  componentDidMount() {
  
    // global.socket.on('emit-someone-is-calling', function (ret) {
    //   global.socket.off('emit-someone-is-calling');

    //   // alert(2222)
    // });

    let params = {};
    params['nickname'] = global.nickname;
    params['from'] = global.myid;
    params['to_id'] = global.otherid;

    // alert(111);

    global.socket.emit('on-audio-call', params);
  }

  // _renderItem() {
  //   return (
  //     <View
  //     style={{
  //       flex: 1,
  //       backgroundColor: 'black',
  //     }}>
  //     <ZegoUIKitPreBuildCall
  //       appID={1297989214}
  //       appSign={
  //         '53fd764d62cbb035bdd970cb7b82d72e65883fc49b7a8fd60fcfa0c875ae001a'
  //       }
  //       userID={'to_id'}
  //       userName={this.state.username}
  //       callID="testidcall"
  //       config={{
  //         ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
  //         onOnlySelfInRoom: () => {
  //           this.props.navigation.navigate('Chat');
  //         },
  //         onHangUp: () => {
  //           this.props.navigation.navigate('Chat');
  //         },
  //         //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //         layout: {
  //           mode: ZegoLayoutMode.pictureInPicture,
  //           config: {
  //             showMyViewWithVideoOnly: false,
  //             isSmallViewDraggable: true,
  //             switchLargeOrSmallViewByClick: true,
  //           },
  //         },
  //         ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
  //       }}
  //     />
  //     </View>
  //   );
  // }

  onAnswerCall() {
    this.setState({
      call: true,
    });
  }

  onCancel(){
    global.socket.on("emit-audio-is-calling", function (ret) {
      global.socket.off("emit-audio-is-calling");

      alert(2222)
    });

    let params = {};
   
    params['from'] = 321;
    params['to_id'] = 165;
    params['nickname'] = global.nickname;
    // params['busy'] = 0;

    // alert(111);

    global.socket.emit('on-test-call', params);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        {
          (this.state.call == false ? (
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
                    alignSelf: 'flex-start',
                    marginTop: 12.5,
                  }}
                  onPress={() => this.onAnswerCall()}>
                  <Svg
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 11,
                      alignSelf: 'center',
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

              <View style={{width: (windowWidth - 40) / 2, height: 80}}></View>

              <View style={{width: (windowWidth - 40) / 4, height: 80}}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    alignSelf: 'flex-end',
                    marginTop: 12.5,
                  }}
                  onPress={() => this.onCancel()}>
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
          ) : (
            <ZegoUIKitPreBuildCall
              appID={1297989214}
              appSign={
                '53fd764d62cbb035bdd970cb7b82d72e65883fc49b7a8fd60fcfa0c875ae001a'
              }
              userID={'to_id'}
              userName={this.state.username}
              callID="testidcall"
              config={{
                ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                onOnlySelfInRoom: () => {
                  this.props.navigation.navigate('home');
                },
                onHangUp: () => {
                  this.props.navigation.navigate('Chat');
                },
                //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
                layout: {
                  mode: ZegoLayoutMode.pictureInPicture,
                  config: {
                    showMyViewWithVideoOnly: false,
                    isSmallViewDraggable: true,
                    switchLargeOrSmallViewByClick: true,
                  },
                },
                ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
              }}
            />
          ))
        }
      </View>
    );
  }
}

export default Callee;

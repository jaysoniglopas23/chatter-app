import React, {useRef, Component} from 'react';
import Sound from 'react-native-sound';
import ZegoUIKitPreBuildCall, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import {
//   ZegoUIKitPrebuiltCallWithInvitation,
//   ZegoSendCallInvitationButton,
//   ZegoInvitationType,
//   ONE_ON_ONE_VIDEO_CALL_CONFIG,
//   ONE_ON_ONE_VOICE_CALL_CONFIG,
//   GROUP_VIDEO_CALL_CONFIG,
//   GROUP_VOICE_CALL_CONFIG,
// } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ZegoLayoutMode} from '@zegocloud/zego-uikit-rn';
import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';

import Svg, {G, Path} from 'react-native-svg';

class Callee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: global.nickname,
      userid: global.otherid,
      turnOffCameraWhenJoining: true,
    };
  }

  componentDidMount() {
    let self = this;
    this.onCancel();
    // global.socket.on('emit-drop-caller', function (ret) {
    //   global.socket.off('emit-drop-caller');

    //   // alert(2222)

    //   self.props.navigation.navigate('Chat');
    // });

    // global.socket.on('emit-someone-is-calling', function (ret) {
    //   global.socket.off('emit-someone-is-calling');
    // });

    let params = {};
    params['nickname'] = global.nickname;
    params['from'] = global.myid;
    params['to_id'] = global.otherid;

    // alert(111);

    global.socket.emit('on-audio-call', params);
  }

  componentWillUnmount() {}

  onCancel() {
    let self = this;

    global.socket.on('emit-drop-caller', function (ret) {
      global.socket.off('emit-drop-caller');

      // alert(2222)

      self.props.navigation.navigate('Chat');
    });
  }

  unRegisterCallback() {
    // If the parameter is null, the previously registered callback is cleared
    ZegoExpressManager.instance().onRoomUserUpdate();
    ZegoExpressManager.instance().onRoomUserDeviceUpdate();
    ZegoExpressManager.instance().onRoomStateUpdate();
  }

  onDropnCall() {
    // this.setState({
    //   call: true,
    // });
    global.socket.on('emit-drop-callee-audio-call', function (ret) {
      global.socket.off('emit-drop-callee-audio-call');

      alert(2222);
    });
    // alert(1);
    let params = {};
    // params['nickname'] = global.nickname;
    params['from'] = global.myid;
    params['to'] =  global.otherid;

    // alert(111);

    global.socket.emit('on-drop-caller-audio-call', params);
    //  alert(JSON.stringify(params));
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <ZegoUIKitPreBuildCall
          appID={2121618171}
          appSign={
            '27f803f0403f9ee518839624fe2a75fd7d3ec04dea29fe3ebbf0947235815969'
          }
          userID={'from'}
          userName={this.state.username}
          callID="testidcall"
          config={{
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            // ...ONE_ON_ONE_VOICE_CALL_CONFIG ,
            serverUrl: 'https://chatter-call.herokuapp.com/',

            onOnlySelfInRoom: () => {
              this.props.navigation.navigate('Chat');
            },
            onHangUp: () => {this.onDropnCall()
              this.props.navigation.navigate('Chat');
            },

            layout: {
              mode: ZegoLayoutMode.pictureInPicture,

                config: {
                showMyViewWithVideoOnly:false,
                isSmallViewDraggable:true,
                switchLargeOrSmallViewByClick: true,
              },
              
            },
            // audioVideoViewConfig:{},
            //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
            // ShowSoundWavesInAudioMode: false,
            turnOnCameraWhenJoining: false,
            // showCameraStateOnView:true,
            // showMicrophoneStateOnView:true,
            // enableCamera:true,
            // showMyViewWithVideoOnly:true,
            // useSpeakerWhenJoining: false,
            turnOnMicrophoneWhenJoining: false,
            //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
          }}
        />
      </View>
      // <View
      //   style={{
      //     flex: 1,
      //     backgroundColor: 'black',
      //   }}>
      //   <ZegoUIKitPrebuiltCallWithInvitation
      //     appID={2111048678}
      //     appSign={
      //       '43032705e2d8aa1253c4168b9d6b6a868c74c8c58291a3dee2e55d899c8934e4'
      //     }
      //     userID={'from'} // userID can be something like a phone number or the user id on your own user system.
      //     userName={this.state.username}
      //     ringtoneConfig={{
      //       incomingCallFileName: 'zego_incoming.mp3',
      //       outgoingCallFileName: 'zego_outgoing.mp3',
      //     }}
      //     plugins={[ZegoUIKitSignalingPlugin]} // The signaling plug-in used for call invitation must be set here.
      //     requireConfig={data => {
      //       console.warn('requireConfig', data);
      //       const callConfig =
      //         data.invitees.length > 1
      //           ? ZegoInvitationType.videoCall === data.type
      //             ? GROUP_VIDEO_CALL_CONFIG
      //             : GROUP_VOICE_CALL_CONFIG
      //           : ZegoInvitationType.videoCall === data.type
      //           ? ONE_ON_ONE_VIDEO_CALL_CONFIG
      //           : ONE_ON_ONE_VOICE_CALL_CONFIG;
      //       return {
      //         ...callConfig,
      //       };
      //     }}
      //     notifyWhenAppRunningInBackgroundOrQuit={true}
      //     isIOSSandboxEnvironment={false} // Ignore this if you are not building an iOS app.
      //   >
      //     {/* ... */}
      //     <ZegoSendCallInvitationButton
      //       invitees={[{userID: global.otherid, userName: global.name}]} // List of user object.
      //       isVideoCall={false}
      //       resourceID={'zego_uikit_call'} // For offline call notification
      //     />
      //     <ZegoSendCallInvitationButton
      //       invitees={[{userID: global.otherid, userName: global.name}]} // List of user object.
      //       isVideoCall={true}
      //       resourceID={'zego_uikit_call'} // For offline call notification
      //     />
      //   </ZegoUIKitPrebuiltCallWithInvitation>
      // </View>
    );
  }
}

<<<<<<< Updated upstream
export default Callee;
=======
export default Caller;
>>>>>>> Stashed changes

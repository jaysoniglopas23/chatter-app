import React, {useRef, Component} from 'react';
import ZegoUIKitPreBuildCall, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ZegoLayoutMode} from '@zegocloud/zego-uikit-rn';
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

  onCancel(){

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

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <ZegoUIKitPreBuildCall
          appID={1297989214}
          appSign={
            '53fd764d62cbb035bdd970cb7b82d72e65883fc49b7a8fd60fcfa0c875ae001a'
          }
          userID={'from'}
          userName={this.state.username}
          callID="testidcall"
         
          config={{
            
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            // ...ONE_ON_ONE_VOICE_CALL_CONFIG ,
            serverUrl:'https://chatter-call.herokuapp.com/',
            
            onOnlySelfInRoom: () => {
              this.props.navigation.navigate('Chat');
            },
            onHangUp: () => {
              this.props.navigation.navigate('Chat');
            },

            layout: {
              mode: ZegoLayoutMode.pictureInPicture,

              config: {
                showMyViewWithVideoOnly: false,
                isSmallViewDraggable: true,
                switchLargeOrSmallViewByClick: false,
                // turnOffCameraWhenJoining: false,
                // // enableCamera:true,
                // turnOnMicrophoneWhenJoining: false,

                // // useSpeakerWhenJoining: true,
              },
            },
            turnOnCameraWhenJoining: false,
            // enableCamera:true,
            turnOnMicrophoneWhenJoining: false,
          }}
        />
      </View>
    );
  }
}

export default Callee;

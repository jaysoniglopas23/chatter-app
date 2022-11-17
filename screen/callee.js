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
import ZegoUIKitPreBuildCall,{ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { ZegoLayoutMode } from '@zegocloud/zego-uikit-rn'
import {
  View
} from 'react-native';

import Svg, {G, Path} from 'react-native-svg';


class Callee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: global.nickname,
      userid: global.otherid,
    };
}

componentDidMount() {

  
        global.socket.on('emit-someone-is-calling', function (ret) {
          global.socket.off('emit-someone-is-calling');
    
          // alert(2222)
    
        });
    
        let params = {};
        params['nickname'] = global.nickname;
        params['from'] = global.myid;
        params['to_id'] =global.otherid;
  
        // alert(111);
    
        global.socket.emit('on-audio-call', params);
    
    
  
  
    }
  




  render() {
    return (
     
      <View
        style={{
          flex:1,
          backgroundColor:'black'
        }}>
<ZegoUIKitPreBuildCall
  appID={1297989214}
  appSign={"53fd764d62cbb035bdd970cb7b82d72e65883fc49b7a8fd60fcfa0c875ae001a"}
  userID={'from'}
  userName={this.state.username}
  callID="testidcall"
  
  config={{
    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
    onOnlySelfInRoom: () => {this.props.navigation.navigate('Chat')},
    onHangUp: () => {this.props.navigation.navigate('Chat')},
    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
    layout:{
        mode: ZegoLayoutMode.pictureInPicture,
        config: {
            showMyViewWithVideoOnly: false,
            isSmallViewDraggable: true,
            switchLargeOrSmallViewByClick: true,
            
        }
    }
    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
  }}
  />
      </View>
     
    );
  }
}

export default Callee;
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

import Svg, {G, Path} from 'react-native-svg';



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
      usernameText: global.name,
      callStatus: 0,
      videoOn: false,
      calleeVideoOn: false,
      mute: false,
      speakerOn: false,
    };


  }

  componentDidMount() {

  
      global.socket.on('emit-someone-is-calling', function (ret) {
        global.socket.off('emit-someone-is-calling');
  
        alert(2222)
  
      });
  
      let params = {};
      params['nickname'] = global.nickname;
      params['from'] = global.myid;
      params['to_id'] =global.otherid;
  
      global.socket.emit('on-audio-call', params);
  
  


  }




  render() {
    return (
      <View
        styles={{
          width: windowWidth,
          height: windowHeight,
          flexDirection: 'column',
          backroundColor:'black'
        }}>

      

      </View>
    );
  }
}

export default Caller;
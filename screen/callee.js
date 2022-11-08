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

class Callee extends Component {
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




  }




  render() {
    return (
      <View
        styles={{
          width: windowWidth,
          height: windowHeight,
          flexDirection: 'column',
          backroundColor:'#000'
        }}>

      

      </View>
    );
  }
}

export default Callee;
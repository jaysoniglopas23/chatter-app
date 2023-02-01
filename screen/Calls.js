import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Slider from '@react-native-community/slider';
import Svg, {G, Path} from 'react-native-svg';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Calls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: '0',
      drop_calls: '',
      toggled: false,
    };

    this.goBack = this.goBack.bind(this);
  }

  // toggleSwitch = value => {
  //   this.setState({toggled: value});
  // };

  componentDidMount() {
    this.getToggleSwitch();
  }

  getToggleSwitch = toggled => {
    let self = this;

    this.setState(
      {
        // toggled: value,
      },

      () => {
        global.socket.on('emit-callsettings', function (ret) {
          global.socket.off('emit-callsettings');
          // alert(JSON.stringify(ret));
          self.setState({
            drop_calls: ret.drop_calls,
          });

          if (self.state.drop_calls == 0) {
            self.setState({
              toggled: false,
            });
          } else {
            self.setState({
              toggled: true,
            });
          }
        });
        let params = {};

        params['drop_calls'] = this.state.drop_calls;
        params['userid'] = this.state.userid;
        // console.log(params);
        global.socket.emit('on-callsettings', params);
      },
    );
  };

  toggleSwitch = toggled => {
    this.setState({
      toggled: toggled,
    });

    if (toggled == false) {
      this.setState({
        drop_calls: 0,
      });
    } else {
      this.setState({
        drop_calls: 1,
      });
    }
  };

  goBack() {
    this.props.navigationRef.current?.navigate('Dashboard');
  }

  Save() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-callsettings-save', function (ret) {
        global.socket.off('emit-callsettings-save');

        // alert(JSON.stringify(ret));
        self.setState({
          intDropCalls: ret.drop_calls,
        });
      });

      let params = {};

      params['drop_calls'] = this.state.drop_calls;
      this.props.navigation.navigate('home');
      console.log(params);
      global.socket.emit('on-callsettings-save', params);
    });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#ffff',
          height: windowHeight,
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={styles.view}>
          <Switch
            style={{
              left: 200,
              // bottom: windowWidth / 2 - 190,
              justifyContent: 'center',
            }}
            onValueChange={value => this.toggleSwitch(value)}
            value={this.state.toggled}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#5B5B5B',
              justifyContent: 'center',
              fontSize: 20,
            }}>
            現在の通話設定 :
          </Text>
        </View>
        <View
          style={{
            height: windowHeight / 1 - 1000,
            width: windowWidth - 25,
            bottom: windowWidth / 2 - 630,
            flexDirection: 'row',
            alignSelf: 'center',
            // backgroundColor:'black',
          }}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              backgroundColor: '#ECECEC',
              height: windowHeight / 24,
              flexDirection: 'row',
              width: windowWidth / 7,
              borderRadius: 2,
            }}>
            <Svg
              style={{width: 20, height: 30}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512">
              <Path
                fill="black"
                d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></Path>
            </Svg>
            <Text style={{right: 0, top: 6, color: '#5B5B5B'}}>戻る</Text>
          </TouchableOpacity>
<<<<<<< Updated upstream
          <TouchableOpacity
            onPress={() => this.Save()}
            style={{
              backgroundColor: '#ECECEC',
              height: 31,
              left: windowWidth / 1.7,
              flexDirection: 'row',
              width: 70,
              borderRadius: 2,
            }}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5, color: 'black'}}>保存</Text>
          </TouchableOpacity>
=======

          <View style={styles.view}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000000',
                justifyContent: 'center',
                fontSize: 20,
                left: 60,
              }}>
              現在の通話設定 
            </Text>
            <ToggleSwitch
              style={{left: windowWidth / 3 - 20, height: 26, borderRadius: 15,bottom:18}}
              isOn={this.state.toggled}
              onColor="#FFF5F8"
              offColor="#FFF5F8"
              thumbOffStyle={{backgroundColor: '#EA337E'}}
              thumbOnStyle={{backgroundColor: '#68B984'}}
              trackOffStyle={{borderColor: '#EA337E', borderWidth: 1}}
              trackOnStyle={{borderColor: '#68B984', borderWidth: 1}}
              size="medium"
              label={this.state.toggled ? "オフ" : "オン"}
              
              labelStyle ={{color:'red',alignSelf:'center', left:40,top:20}}
              onToggle={value => this.toggleSwitch(value)}
            />
          </View>

          <View
            style={{
              height: windowHeight / 1 - 1000,
              width: windowWidth - 25,
              bottom: windowWidth / 2 - 630,
              // flexDirection: 'row',
              alignSelf: 'center',
              // backgroundColor:'black',
            }}>
          <TouchableOpacity
              style={{
                backgroundColor: '#FFF5F8',
                height: windowHeight / 25,
                // left: windowWidth / 1.4,
                flexDirection: 'row',
                width: windowWidth / 5 - 5,
                borderRadius: 10,
                // bottom: 34,
                alignSelf: 'center',
              }}
              onPress={() => this.Save()}>
                <Svg
                style={{alignSelf: 'center', left: 9, height: 20, width: 20}}
                aria-hidden="true"
                focusable="false"
                data-prefix="fal"
                data-icon="angle-left"
                class="svg-inline--fa fa-angle-left fa-w-6"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <Path
                  d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 416c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"
                  fill="#EA337E"
                />
              </Svg>
              <Text style={{left: 15, top: 5, color: 'black'}}>保存</Text>
            </TouchableOpacity>
          </View>
>>>>>>> Stashed changes
        </View>
      </View>
    );
  }
}
export default Calls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    top: 50,
    marginHorizontal: 150,
  },

  view: {
    top: 70,
    height: windowHeight / 2 - 320,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',

    // backgroundColor: 'black',
  },

  view1: {
    top: 10,
    borderWidth: 1,
    borderColor: '#cdd5d5',
    height: 100,
    marginHorizontal: 22,
    right: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  label: {
    bottom: 11,
    right: 142,
    backgroundColor: '#fff',
    marginHorizontal: 147,
  },

  email: {
    bottom: 11,
    right: 155,
    backgroundColor: '#fff',
    marginHorizontal: 162,
  },

  introduction: {
    bottom: 11,
    right: 135,
    backgroundColor: '#fff',
    marginHorizontal: 142,
  },

  text: {
    bottom: 5,
    left: 11,
  },

  Image: {
    top: 10,
    width: 100,
    height: 100,
    borderRadius: 1,
    left: 15,
    borderWidth: 1,
  },
});

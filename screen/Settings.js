import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Slider from '@react-native-community/slider';
import {getVersion} from 'react-native-device-info';
import Svg, {G, Path} from 'react-native-svg';
import Modal from 'react-native-modal';
import Storage from '../utils/storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const version = getVersion();

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
      toggled2: false,
      // toggled2: true,
      sliderValue: '0',
      modalConfirmLogout: false,
      loadingLogoutConfrimReport: false,
    };

    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    this.props.navigation.push('home');
  }

  componentDidMount() {
    // this.toggleSwitch2();
    this.toggleSwitch();
  }

  // toggleSwitch2 = value2 => {
  //   this.setState({toggled2: value2});
  // };

  // toggleSwitch2 = toggled2 => {
  //   let self = this;

  //   let notify_likes = 0;

  //   this.setState(
  //     {

  //     },

  //     () => {
  //       global.socket.on('emit-settings', function (ret) {
  //         global.socket.off('emit-settings');
  //         // console.log(ret);
  //         self.setState({
  //           notify_likes: ret.notify_likes,
  //         });
  //         // alert(self.state.notify_likes);

  //         if (self.state.notify_likes == 0) {
  //           self.setState({
  //             toggled2: false,
  //           });
  //         } else {
  //           self.setState({
  //             toggled2: true,
  //           });
  //         }

  //         // self.Save();
  //       });
  //       let params = {};

  //       params['notify_likes'] = this.state.notify_likes;
  //       params['notify_updates'] = this.state.notify_updates;

  //       // console.log();
  //       global.socket.emit('on-settings', params);
  //     },
  //   );
  // };

  toggleSwitch = toggled => {
    let self = this;

    // let notify_updates = 0;

    this.setState(
      {},

      () => {
        global.socket.on('emit-settings', function (ret) {
          global.socket.off('emit-settings');
          console.log(ret);
          self.setState({
            notify_updates: ret.notify_updates,
            notify_likes: ret.notify_likes,
          });
          // alert('sssssss');

          if (self.state.notify_updates == 0) {
            self.setState({
              toggled: false,
            });
          } else {
            self.setState({
              toggled: true,
            });
          }

          if (self.state.notify_likes == 0) {
            self.setState({
              toggled2: false,
            });
          } else {
            self.setState({
              toggled2: true,
            });
          }

          // self.Save();
        });
        let params = {};

        params['notify_updates'] = this.state.notify_updates;
        params['notify_likes'] = this.state.notify_likes;

        console.log(params);
        global.socket.emit('on-settings', params);
      },
    );
  };

  getToggleSwitch = toggled => {
    this.setState({
      toggled: toggled,
    });

    if (toggled == false) {
      this.setState({
        notify_updates: 0,
      });
    } else {
      this.setState({
        notify_updates: 1,
      });
    }
  };

  getToggleSwitch2 = toggled2 => {
    this.setState({
      toggled2: toggled2,
    });

    if (toggled2 == false) {
      this.setState({
        notify_likes: 0,
      });
    } else {
      this.setState({
        notify_likes: 1,
      });
    }
  };

  Save() {
    let self = this;

    this.setState(
      {},

      () => {
        global.socket.on('emit-settings-save', function (ret) {
          global.socket.off('emit-settings-save');

          self.setState({
            notify_likes: ret.notify_likes,
            notify_updates: ret.notify_updates,
          });
        });

        let params = {};

        params['notify_updates'] = this.state.notify_updates;
        params['notify_likes'] = this.state.notify_likes;
        params['distanceThreshold'] = 4;
        this.props.navigation.push('home');
        console.log(params);
        global.socket.emit('on-settings-save', params);
      },
    );
  }

  // goLogout() {
  //   let self = this;

  //   this.setState({
  //     modalConfirmLogout: true,
  //   });
  // }

  // closeLogutConfirm() {
  //   this.setState({
  //     modalConfirmLogout: false,
  //   });
  // }

  // continueLogoutConfirm() {
  //   let self = this;

  //   this.setState(
  //     {
  //       loadingLogoutConfrimReport: true,
  //     },
  //     () => {
  //       let jsonData = {
  //         id: '',
  //         profile_image: '',
  //         nickname: '',
  //         username: '',
  //         password: '',
  //         searchSettings: global.searchFields,
  //         likes: 0,
  //       };

  //       Storage.storeData(jsonData).then(() => {
  //         self.setState(
  //           {
  //             modalConfirmLogout: false,
  //           },
  //           () => {
  //             // self.props.launcher.init();

  //             self.props.navigation.push('Launcher');
  //           },
  //         );
  //       });
  //     },
  //   );
  // }

  render() {
    return (
      <View
        style={{
          height: windowHeight - 74,
          width: windowWidth,
          // backgroundColor:'black',
        }}>
        <TouchableOpacity
          style={{
            marginLeft: 10,
            marginTop: windowHeight / 10 - 65,
            width: 50,
            height: 30,
          }}
          onPress={() => this.goHome()}>
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
        </TouchableOpacity>
        <View
          style={{
            alignSelf: 'center',
            height:'82%',
            width: windowWidth - 50,
            alignSelf:'center',
            // justifyContent:'center',
            // backgroundColor:'red',
          }}>
          <View
            style={{
              alignSelf: 'center',
              top: 80,
              flexDirection: 'row',
              borderWidth: 1,
              height: 50,
              width: 350,
              borderRadius: 4,
            }}>
            <Text style={{left: 85, top: 13, color: '#5B5B5B'}}>
              最新情報を通知
            </Text>
            <Switch
              style={{left: 100}}
              onValueChange={value => this.getToggleSwitch(value)}
              value={this.state.toggled}></Switch>
          </View>
          <View
            style={{
              alignSelf: 'center',
              top: 100,
              flexDirection: 'row',
              borderWidth: 1,
              height: 50,
              width: 350,
              borderRadius: 4,
            }}>
            <Text style={{left: 85, top: 13, color: '#5B5B5B'}}>
              いいねの通知
            </Text>
            <Switch
              style={{left: 100}}
              onValueChange={value => this.getToggleSwitch2(value)}
              value={this.state.toggled2}></Switch>
          </View>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#ECECEC',
              paddingHorizontal: 130,
              height: 31,
              flexDirection: 'row',
              width: 70,
              borderWidth: 1,
              borderRadius: 2,
              bottom: windowWidth / 2 - 360,
            }}>
            <Text
              style={{
                left: 85,
                position: 'absolute',
                color: '#5B5B5B',
                alignSelf: 'center',
              }}>
              Version {version}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.Save()}
            style={{
              backgroundColor: '#ECECEC',
              marginHorizontal: 170,
              height: 31,
              // left: windowWidth/3.8,
              alignSelf:'center',
              marginBottom: 30,
              flexDirection: 'row',
              width: 70,
              borderRadius: 2,
              bottom: windowHeight / 2 - 600,
              
            }}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5, color: '#5B5B5B'}}>保存</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 19,
    justifyContent: 'center',
    backgroundColor: '#ffef8a',
  },
});

export default Settings;

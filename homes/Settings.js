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
    this.toggleSwitch2();
    this.toggleSwitch();
  }

  // toggleSwitch2 = value2 => {
  //   this.setState({toggled2: value2});
  // };

  toggleSwitch2 = value2 => {
    let self = this;

    let notify_likes = 0;

    this.setState(
      {
        toggled2: value2,
      },

      () => {
        global.socket.on('emit-settings', function (ret) {
          global.socket.off('emit-settings');
          // console.log(ret);
          self.setState({
            notify_likes: ret.notify_likes,
          });
          // alert(self.state.notify_likes);

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

        params['notify_likes'] = notify_likes;
        params['notify_updates'] = this.state.notify_updates;
        global.value2 = value2;
        console.log(value2);
        global.socket.emit('on-settings', params);
      },
    );
  };

  toggleSwitch = value => {
    let self = this;

    let notify_updates = 0;

    this.setState(
      {
        toggled: value,
      },

      () => {
        global.socket.on('emit-settings', function (ret) {
          global.socket.off('emit-settings');
          console.log(ret);
          self.setState({
            notify_updates: ret.notify_updates,
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

          // self.Save();
        });
        let params = {};

        params['notify_updates'] = notify_updates;
        params['notify_likes'] = this.state.notify_likes;
        global.value = value;

        console.log(params);
        global.socket.emit('on-settings', params);
      },
    );
  };

  Save() {
    let self = this;

    let notify_likes = 0;

    let notify_updates = 0;

    let value = global.value;

    let value2 = global.value2;

    this.setState(
      {
        toggled: value,
        toggled2: value2,
        saving: true,
      },

      () => {
        global.socket.on('emit-settings-save', function (ret) {
          global.socket.off('emit-settings-save');

          // self.setState({
          //  notify_likes: ret.notify_likes,
          //  notify_updates:ret.notify_updates,
          // });

          if (global.value == true) {
            self.setState({
              notify_updates: 1,
            });
            // alert('1111111');
          } else {
            self.setState({
              notify_updates: 0,
            });
          }

          if (global.value2 == true) {
            self.setState({
              notify_likes: 1,
            });
            // alert('wweqweqwe11');
          } else {
            self.setState({
              notify_likes: 0,
            });
          }
        });

        let params = {};

        params['notify_updates'] = this.state.notify_updates;
        params['notify_likes'] = this.state.notify_likes;
        params['distanceThreshold'] = 4;

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
          height: windowHeight,
          width: '100%',
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
          <Text style={{left: 85, top: 13, color: 'black'}}>
            最新情報を通知
          </Text>
          <Switch
            style={{left: 100}}
            onValueChange={this.toggleSwitch}
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
          <Text style={{left: 85, top: 13, color: 'black'}}>いいねの通知</Text>
          <Switch
            style={{left: 100}}
            onValueChange={this.toggleSwitch2}
            value={this.state.toggled2}></Switch>
        </View>

        <View style={{width:'100%' ,height:windowWidth ,alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => this.goHome()}
            style={{
              backgroundColor: '#ECECEC',
              marginHorizontal: 170,
              height: 31,
              right: 150,
              marginBottom: 30,
              flexDirection: 'row',
              width: 50,
              borderRadius: 2,
              bottom: windowHeight / 2 - 970,
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
            <Text style={{right: 0, top: 6, color: 'black'}}>戻る</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#ECECEC',
              paddingHorizontal: 130,
              height: 31,
              left: windowWidth /2-190,
              marginBottom: 30,
              flexDirection: 'row',
              width: 70,
              borderWidth: 1,
              borderRadius: 2,
              bottom: windowWidth/2 -270,
            }}>
            <Text style={{left: 85, position: 'absolute', color: 'black'}}>
              Version {version}
            </Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => this.goLogout()}
            style={{
              backgroundColor: '#ECECEC',
              height: 31,

              marginBottom: 30,
              flexDirection: 'row',
              width: windowWidth / 3.8,
              borderRadius: 2,
              alignSelf: 'center',
              bottom: windowHeight / 2 - 555,
            }}>
            <Text style={{left: 15, top: 5, color: 'black'}}>ログアウト</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => this.Save()}
            style={{
              backgroundColor: '#ECECEC',
              marginHorizontal: 170,
              height: 31,
              left: 130,
              marginBottom: 30,
              flexDirection: 'row',
              width: 70,
              borderRadius: 2,
              bottom: windowHeight / 2 -789,
            }}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5, color: 'black'}}>保存</Text>
          </TouchableOpacity>
        </View>
        {/* <Modal
          animationType="slide"
          // transparent={true}
          isVisible={this.state.modalConfirmLogout}
          style={{bottom: 400, alignSelf: 'center'}}>
          <View
            style={{
              width: windowWidth,
              backgroundColorL: 'black',
              height: windowHeight - 100,
              borderRadius: 30,
              flexDirection: 'column',
            }}>
            <TouchableWithoutFeedback
              style={{width: windowWidth, height: windowHeight - 290}}
              onPress={() => this.closeLogutConfirm()}>
              <View style={{width: '100%', height: windowHeight - 180}}></View>
            </TouchableWithoutFeedback>

            <View
              style={{
                width: windowWidth,
                height: windowHeight,
              }}>
              <View
                style={{
                  height: 180,
                  width: windowWidth,
                  backgroundColor: '#f2f2f2',
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    width: '100%',
                    height: 30,
                    lineHeight: 30,
                    marginTop: 30,
                    textAlign: 'center',
                    fontSize: 13,
                    color: global.textColor,
                  }}>
                  {this.state.logoutText}
                </Text>

                {this.state.loadingLogoutConfrimReport ? (
                  <View
                    style={{
                      width: 20,
                      height: 50,
                      flexDirection: 'row',
                      marginLeft: windowWidth / 2 - 10,
                    }}>
                    <ActivityIndicator size="small" color="#69747f" />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 210,
                      height: 50,
                      flexDirection: 'row',
                      marginLeft: windowWidth / 2 - 105,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 30,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        marginRight: 5,
                        borderRadius: 3,
                      }}
                      onPress={() => this.closeLogutConfirm()}>
                      <Text
                        style={{
                          width: '100%',
                          height: 30,
                          textAlign: 'center',
                          lineHeight: 30,
                          fontSize: 12,
                          color: 'black',
                        }}>
                        キャンセル
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 30,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        marginLeft: 5,
                        borderRadius: 3,
                      }}
                      onPress={() => this.continueLogoutConfirm()}>
                      <Text
                        style={{
                          width: '100%',
                          height: 30,
                          textAlign: 'center',
                          lineHeight: 30,
                          fontSize: 12,
                          color: 'black',
                        }}>
                        はい
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal> */}
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

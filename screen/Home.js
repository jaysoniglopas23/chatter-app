import React, {Component} from 'react';
import {
  Text,
  Dimensions,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';

import Tabs from './tabs';
import Happy from './Happy';
import User from './User';
import Calls from './Calls';
import Card from './Card';
import Heart from './Heart';
import Lock from './Lock';
import News from './News';
import Pacman from './Pacman';
import Picture from './Picture';
import Star from './Star';
import {CardStyleInterpolators} from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Login from './Login';
import moment from 'moment';
import Storage from '../utils/storage';
import PhotoLibrary from './Photolibrary';
import CoinScreen from './CoinScreen';
import Policy from './Terms';
import SpecialCC from './SpecialCC';
import Privacy from './Privacy';
import Launcher from './launcher';
import Userlikes from './Userlikes';
import {panHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

const DeviceWidth = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();
const navigationRef = React.createRef();

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class DisplayAnImage extends Component {
  refresh = () => {
    // re-renders the component
    this.setState({});
  };
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',

      age: '',

      mail_count: '',

      call_minutes: '',

      points: points,

      moment: moment(new Date()).format('YYYY-MM-DD  HH:mm:ss '),

      time: Date.now(),

      hasProfilePhoto: false,

      modalVisible: false,

      profilePhoto: '',

      profile_image: '',

      profile_image_dir: '',

      modalConfirmLogout: false,
    };

    // this.goProfile = this.goProfile.bind(this);

    this.goLogout = this.goLogout.bind(this);

    // this.goCard = this.goCard.bind(this);

    // this.goCall = this.goCall.bind(this);

    // this.goHeart = this.goHeart.bind(this);

    // this.goLock = this.goLock.bind(this);

    // this.goNews = this.goNews.bind(this);

    // this.goPacman = this.goPacman.bind(this);

    // this.goPicture = this.goPicture.bind(this);

    // this.goStart = this.goStar.bind(this);

    // this.goCoin = this.goCoin.bind(this);

    this.goSettings = this.goSettings.bind(this);

    this.goPhoto = this.goPhoto.bind(this);
  }

  goPhoto() {
    this.props.navigation.navigate('photoLibrary');
  }

  goSettings() {
    this.props.navigation.navigate('Settings');
  }

  goCoin() {
    this.props.navigation.navigate('Coin');
  }

  // goCard() {
  //   this.props.navigationRef.current?.navigate('Card');
  // }

  // goCall() {
  //   this.props.navigationRef.current?.navigate('Calls');
  // }

  // goHeart() {
  //   this.props.navigationRef.current?.navigate('Heart');
  // }

  // goLock() {
  //   this.props.navigationRef.current?.navigate('Lock');
  // }

  // goNews() {
  //   this.props.navigationRef.current?.navigate('News');
  // }

  // goPacman() {
  //   this.props.navigationRef.current?.navigate('Pacman');
  // }

  // goStar() {
  //   this.props.navigationRef.current?.navigate('Star');
  // }

  // goPicture() {
  //   this.props.navigationRef.current?.navigate('Picture');
  // }

  // goProfile() {
  //   this.props.navigationRef.current?.navigate('Happy');
  // }

  goLogout() {
    this.props.navigationRef.current?.navigate('Login');
  }

  handleText = () => {
    let nickname = this.state.nickname;

    if (nickname.length == 0) {
    }
  };

  componentDidMount() {
    this.getProfile();

    if (global.prevPage == 'Register') {
      this.getProfile();
    } else if (global.prevPage != 'Register') {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // Alert.alert('Refreshed');
        this.getProfile();
      });
    }





    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //   // Alert.alert('Refreshed');
    //   this.getProfile();
    // });
  }

  // componentDidMount() {
  //   this.interval = setInterval(() => this.getProfile({ time: Date.now() }), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  componentWillUnmount() {
    this.getProfile();
    this._unsubscribe();
  }

  getProfile() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-details', function (ret) {
        global.socket.off('emit-details');
        // alert(JSON.stringify(ret));

        self.setState({
          nickname: ret.nickname,
          mail_count: ret.mail_count,
          call_minutes: ret.call_minutes,
          age: ret.age,
          id: ret.id,
          profile_image: ret.profile_image,
          profile_image_dir: ret.profile_image_dir,
        });

        global.myuserid = ret.id;

        // global.socket.on('emit-profile-photo', function (ret1) {
        //   global.socket.off('emit-profile-photo');

        //   self.setState({
        //     profile_image: ret1.profile_image,
        //     profile_image_dir: ret1.profile_image_dir,
        //     // hasProfilePhoto: true,
        //   });
        // });

        // global.socket.emit('on-profile-photo', params);
      });

     

      // console.log(params);
      global.socket.emit('on-details');
    });
  }

  goLogout() {
    let self = this;

    this.setState({
      modalConfirmLogout: true,
    });
  }

  closeLogutConfirm() {
    this.setState({
      modalConfirmLogout: false,
    });
  }

  continueLogoutConfirm() {
    let self = this;

    this.setState(
      {
        loadingLogoutConfrimReport: true,
      },
      () => {
        let jsonData = {
          user_id: '',
          profile_image: '',
          nickname: '',
          coin: '',
          username: '',
          password: '',
          searchSettings: global.searchFields,
          shared: 0,
        };

        Storage.storeData(jsonData).then(() => {
          self.setState(
            {
              modalConfirmLogout: false,
            },
            () => {
              // self.props.launcher.init();

              self.props.navigation.push('Launcher');
            },
          );
        });
      },
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: '180%',
          // flex: 1,
          // borderWidth: 10,
          // borderColor: '#FAEA48',
          // backgroundColor:'black',
          borderBottomWidth: 0,
          width: '100%',
        }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.goPhoto()} style={{left: 2}}>
            <Image
              source={{
                uri:
                  URL_TEMP +
                  '/' +
                  this.state.profile_image_dir +
                  '/' +
                  this.state.profile_image,
              }}
              style={{
                position: 'absolute',
                alignSelf: 'center',
                top: 10,
                width: windowWidth / 4,
                height: windowWidth / 4,
                borderRadius: 1,
                right: 110,
              }}
            />
          </TouchableOpacity>
          <View style={styles.txtview}>
            <Text
              style={styles.nickname}
              value={this.state.nickname}
              onChangeText={value => this.getProfile(value)}>
              {this.state.nickname}
            </Text>
            <Text
              style={{
                top: 26,
                left: windowWidth / 10 - 121,
                fontWeight: 'bold',
                color: '#5B5B5B',
                fontSize: 17,
                position: 'absolute',
                width: windowWidth / 3,
              }}>
              通話 :{this.state.call_minutes}分
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                top: 46,
                left: windowWidth / 10 - 121,
                fontWeight: 'bold',
                color: '#5B5B5B',
                position: 'absolute',
                fontSize: 17,
                width: windowWidth / 3,
              }}>
              メール :{this.state.mail_count}通
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.goSettings()}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 35,
              marginLeft: windowWidth / 1.4,
              position: 'absolute',
              backgroundColor: 'black',
            }}>
            <Image
              onPress={() => this.goSettings()}
              style={{
                width: windowWidth / 10,
                height: windowWidth / 12,
                marginRight: windowWidth / 11,
                right: windowWidth / 2.9,
                resizeMode: 'contain',
                position: 'absolute',
                alignItems: 'center',
              }}
              source={require('../icon/Asset12.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.goCoin()}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 35,
              marginLeft: windowWidth / 2.1,
              position: 'absolute',
            }}>
            <Image
              onPress={() => this.goCoin()}
              style={{
                width: windowWidth / 12,
                height: windowWidth / 12,
                marginRight: 1,
                right: 30,
                resizeMode: 'contain',
                position: 'absolute',
              }}
              source={require('../icon/Asset14.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <NavigationContainer independent={true} ref={navigationRef}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                gestureEnable: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}>
              <Stack.Screen name="Dashboard">
                {props => <Dashboard navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Happy">
                {props => <Happy navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Calls">
                {props => <Calls navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Card">
                {props => <Card navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Heart">
                {props => <Heart navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="News">
                {props => <News navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Pacman">
                {props => <Pacman navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Star">
                {props => <Star navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Picture">
                {props => <Picture navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Settings">
                {props => <Settings navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Coin">
                {props => <CoinScreen navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Policy">
                {props => <Policy navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Privacy">
                {props => <Privacy navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="SpecialCC">
                {props => <SpecialCC navigationRef={navigationRef} />}
              </Stack.Screen>
              <Stack.Screen name="Userlikes">
                {props => <Userlikes navigationRef={navigationRef} />}
              </Stack.Screen>
              {/* <Stack.Screen name="Launcher">
                {props => <Launcher navigationRef={navigationRef} />}
              </Stack.Screen> */}
            </Stack.Navigator>
          </NavigationContainer>
          <TouchableOpacity
            onPress={() => this.goLogout()}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 325,
              height:'10%',
              width:'23%',
              left:280,
              position: 'absolute',
              backgroundColor:'transparent',
             
            }}>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
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
        </Modal>

        {global.age_verified != 1 ? (
          <View>
            {global.age_verified == 2 ? (
              <View style={{bottom: windowWidth / 1 - 135, width: '100%', backgroundColor:'red'}}>
                <Text style={{alignSelf: 'center'}}>確認中</Text>
              </View>
            ) : (
              <View style={{bottom: windowWidth / 1 - 135, width: '100%'}}>
                <Text style={{alignSelf: 'center'}}>
                  本人確認登録後に利用可能
                </Text>
              </View>
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }
}

export default DisplayAnImage;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    left: 20,
    // backgroundColor:'black',
    height: '10%',
    width: '100%',
  },
  avatar: {
    paddingTop: 10,
    width: 130,
    height: 130,
    marginBottom: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  iconRight: {
    marginTop: 20,
    width: 48,
    height: 48,
    marginBottom: 5,
    marginLeft: 30,
  },
  txtview: {
    flexDirection: 'row',
    marginLeft: 20,
    left: windowWidth / 2.5,
    top: 10,
    width: '100%',
    position: 'absolute',
  },
  nickname: {
    left: windowWidth / 10 - 121,
    top: 0,
    fontSize: 20,
    fontWeight: 'bold',
    // borderWidth: 1,
    color: '#5B5B5B',
    position: 'absolute',
    width: windowWidth / 2,
  },
});

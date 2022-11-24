import React, {Component} from 'react';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  NativeModules,
  Platform,
  Dimensions,
  PermissionsAndroid,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
// import Peer from 'react-native-peerjs';
import io from 'socket.io-client';
import Socket from '../utils/socket';
import Storage from '../utils/storage';
import {getVersion} from 'react-native-device-info';
import Dashboard from './Dashboard';
// import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { onDisplayRemoteNotification } from '../utils/pushNotification';

// import {
//   VoipPushNotification,
//   RNVoipPushRemoteNotifications,
// } from 'react-native-voip-push-notification';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Stack = createStackNavigator();
const navigationRef = React.createRef();

const version = getVersion();

// async function requestCameraPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Cool Photo App Camera Permission',
//         message:
//           'Cool Photo App needs access to your camera ' +
//           'so you can take awesome pictures.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the camera');
//     } else {
//       console.log('Camera permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }

class Launcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      nickname: '',

      fadeOut: new Animated.Value(1),
      fadeIn: new Animated.Value(0),
      locale: '',
      maintenanceText:
        global.locale == 'en'
          ? 'サーバーメンテナンス中です'
          : 'サーバーメンテナンス中です',
      maintenance: false,
    };

    this.addGlobalListeners = this.addGlobalListeners.bind(this);

    global.passcodeCorrect = true;
  }

  onDisplayRemoteNotification = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging()
        .getToken()
        .then(fcmToken => {
          console.log('MyFCM Token ->', fcmToken);
        });
    } else {
      console.log('Not Authorization status', authStatus);
      // this.getFcmToken();
    }
    // messaging().onMessage(async remoteMessage => {
    //   console.log('New FCM', JSON.stringify(remoteMessage));
    // });
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log('onNotificatation', JSON.stringify(remoteMessage));
    // });

    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log(
    //         'Notification caused app to open from quit state',
    //         JSON.stringify(remoteMessage),
    //       );
    //     }
    //   });
  };

  addGlobalListeners() {
    let self = this;

    global.inCall = false;

    // global.socket.off('');
    // globalsocket.on('', function (ret) {

    //   if(!global.inCall){
    //     global.inCall = true;
    //     self.props.navigationRef.current?.navigate('Callee');
    //   }
    // });

    // global.socket.on('emit-drop-caller', function (ret) {
    //     global.socket.off('emit-drop-caller');
    //       alert(ret);

    //     self.props.navigationRef.current?.navigate('Tabs');
    //   });

    global.socket.on('emit-someone-is-calling', function (ret) {
      global.socket.off('emit-someone-is-calling');

      // alert(JSON.stringify(ret));
      self.setState({
        from: ret.from,
        nickname: ret.nickname,
        to_id: ret.to_id,
      });
      global.nickname = ret.nickname;
      global.otherid = ret.from;
      global.myid = ret.to_id;

      self.props.navigationRef.current?.navigate('Callee');
    });

    // let params = {};
    // params['nickname'] =this.state.nickname;
    // params['from'] = this.state.from;
    // params['to'] =this.state.to;

    // global.socket.emit('on-audio-call', params);
  }

  // getFcmToken = async () => {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');

  //   console.log('old Fcm Token:', fcmToken);
  //   if (!fcmToken) {
  //     try {
  //       const fcmToken = await messaging().getToken();
  //       if (fcmToken) {
  //         console.log('new Generated Fcm Token', fcmToken);
  //         await AsyncStorage.setItem('fcmToken', fcmToken);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // RemotePushController = () => {}

  onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification chatter',
      body: 'First try',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  componentDidMount() {
    this.init();
    this.onDisplayRemoteNotification();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  init() {
    let self = this;

    this.setState({
      maintenance: false,
    });

    let deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    global.socketid = '';

    global.barColor = '#00d49c';

    global.id = '';
    global.age = '';
    global.nickname = '';
    global.points = 0;

    global.textColor = '#5f6368';
    global.glTextColor = '#5ebea1';
    global.inputBorderColor = '#bbc0c4';
    global.errorTextColor = '#ef3d4c';
    global.buttonColor = '#ececec';

    global.currentPage = 'Login';
    global.previousPage = '';

    global.profilePhotoChanged = false;

    /*if(deviceLanguage.toString().contains('en')){
      global.locale = 'en'
    }else{
      global.locale = 'jp'
    }*/

    global.locale = 'en';

    this.setState({locale: global.locale}, () => {
      Storage.retrieveData()
        .then(data => {
          if (data == null) {
            self.processSearchFields(function () {
              let jsonData = {
                email: '',
                password: '',
                id: '',
                socketid: '',
                searchSettings: global.searchFields,
              };

              Storage.storeData(jsonData)
                .then(() => {
                  //setTimeout(() => {

                  self.fadeOutText(self.fadeInLoading());

                  Socket.connect(
                    function () {
                      console.log('Connected. No Data');

                      let params = {
                        id: id,
                        deviceWidth: windowWidth,
                        deviceHeight: windowHeight,
                      };

                      global.socket.emit('user-connected', params);
                      // alert(jsonData);

                      self.props.navigationRef.current?.navigate('Login');
                    },
                    function () {
                      self.setState({
                        maintenance: true,
                      });
                    },
                  );

                  //}, 2000);
                })
                .catch(e => console.log(e));
            });
          } else {
            //setTimeout(() => {

            self.fadeOutText(self.fadeInLoading());

            Socket.connect(
              function () {
                console.log('Connected. With Data');

                let params = {
                  id: id,
                  deviceWidth: windowWidth,
                  deviceHeight: windowHeight,
                };

                global.socket.emit('user-connected', params);

                Storage.retrieveData().then(data => {
                  self.autoLogin(data);
                });
              },
              function () {
                self.setState({
                  maintenance: true,
                });
              },
            );

            //}, 2000);
          }
        })
        .catch(e => console.log(e));
    });
  }

  autoLogin(data) {
    let self = this;
    global.prevPage = 'Launcher';
    global.socket.on('emit-login', function (ret) {
      global.socket.off('emit-login');
      // alert(JSON.stringify(ret));

      self.setState({
        email: ret.email,
        nickname: ret.nickname,
        id: ret.id,
        socketid: ret.socketid,
        password: ret.password,
      });
      // alert(JSON.stringify(ret.id));

      if (self.state.id == 0) {
        global.searchFields = data.searchSettings;
        self.props.navigationRef.current?.navigate('Login');
      } else {
        Storage.retrieveData().then(d => {
          // alert(2);
          if (parseInt(d.password) == 0 && !global.passwordCorrect) {
            global.passcodeValue = d.PasscodeValue;

            self.props.navigationRef.current?.navigate('Login');
          } else {
            d.username = data.username;
            d.password = data.password;

            Storage.storeData(d).then(() => {
              console.log(ret);
              global.email = ret.email;
              global.password = ret.password;
              global.id = ret.id;
              global.age = ret.age;
              global.nickname = ret.nickname;
              global.points = ret.points;
              global.socketid = ret.socketid;
              global.age_verified = ret.age_verified;

              global.searchFields = data.searchSettings;
              // alert(global.age_verified);
              self.addGlobalListeners();
              global.prevPage = 'Launcher';
              self.props.navigationRef.current?.navigate('Tabs');

              //  self.addGlobalListeners();

              //  alert(1)
            });
          }
        });
      }
    });

    let params = {
      id: this.state.id,
      socketid: this.state.socketid,
      phone_number: this.state.phone_number,
      email: data.email,
      password: data.password,
      new_password: this.state.new_password,
    };

    global.socket.emit('on-login', params);
  }

  processSearchFields(callback) {
    let arr = [];

    for (var i = 0; i < searchFields.length; i++) {
      let field;

      if (global.locale == 'en') {
        field = {
          id: i,
          title: searchFields[i].title_en,
          type: searchFields[i].type,
          value: '0',
          db_name: searchFields[i].db_name,
        };
      } else {
        field = {
          id: i,
          title: searchFields[i].title,
          type: searchFields[i].type,
          value: '0',
          db_name: searchFields[i].db_name,
        };
      }

      arr.push(field);
    }

    global.searchFields = arr;

    callback();
  }

  fadeOutText(callback) {
    this.state.fadeOut.setValue(1);
    Animated.timing(this.state.fadeOut, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(callback);
  }

  fadeInLoading() {
    this.state.fadeIn.setValue(0);
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.bgImageWrapper}>
          <Image
            source={require('../images/wp7632672.jpg')}
            style={styles.bgImage}
          />
        </View>

        {this.state.maintenance ? (
          <Text
            style={{
              width: windowWidth,
              height: 40,
              marginTop: '50%',
              textAlign: 'center',
              fontSize: 15,
              color: global.textColor,
              fontWeight: 'bold',
            }}>
            {this.state.maintenanceText}
          </Text>
        ) : (
          <View style={{marginTop: windowHeight / 2 - 195, height: 50}}>
            <Image
              source={require('../icon/logo.png')}
              style={{
                marginLeft: windowWidth / 2 - 50,
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
            />
            <Animated.View
              style={[{opacity: this.state.fadeIn}, styles.animatedView]}>
              <ActivityIndicator
                size="small"
                color="#2f3337"
                style={styles.activityIndicator}
              />
            </Animated.View>
          </View>
        )}

        {/* <Text style={styles.ltd}>Chatter....</Text> */}
        <Text style={styles.locale}>Version {version}</Text>
      </View>
    );
  }
}

const searchFields = [
  {
    name: 'nickname',
    type: 0,
    title: 'アカウントID',
    title_en: 'Account ID',
    db_name: 'nickname',
  },
  {
    name: 'id',
    type: 0,
    title: 'アカウントID',
    title_en: 'Account ID',
    db_name: 'id',
  },
  {
    name: 'age',
    type: 0,
    title: 'プロフィール',
    title_en: 'age',
    db_name: 'age',
  },
  {
    name: 'mail_count',
    type: 0,
    title: 'ハッシュタグ検索',
    title_en: 'mail_count',
    for_search: 1,
    db_name: 'points',
  },
  {
    name: 'call_minutes',
    type: 0,
    for_search: 1,
    title: '投稿コメント検索',
    title_en: 'call_minutes',
    db_name: 'comment',
  },
  {
    name: 'gender',
    type: 2,
    title: '性別',
    title_en: 'Gender',
    db_name: 'gender',
  },
  {
    name: 'age',
    unit: '',
    type: 1,

    for_search: 1,
    title: '年齢',
    title_en: 'Age',
    db_name: 'age',
  },

  {
    name: 'language',

    type: 2,

    title: '言語',
    title_en: 'Language',
    db_name: 'language',
  },
  {
    name: 'country',

    type: 2,

    title: '居住国',
    title_en: 'Country',
    db_name: 'country',
  },
  {
    name: 'birthplace',

    type: 2,
    title: '出身国',
    title_en: 'Birthplace',
    db_name: 'birthplace',
  },
  {
    name: 'gender_interest',

    type: 2,
    title: '興味',
    title_en: 'Gender Interest',
    db_name: 'gender_interest',
  },
  {
    name: 'hobby',
    multiselect: 1,
    type: 2,
    title: '趣味',
    title_en: 'Hobby',
    db_name: 'hobby',
  },
  {
    name: 'blood',

    type: 2,
    title: '血液型',
    title_en: 'Blood',
    db_name: 'blood',
  },
  {
    name: 'job',
    type: 2,

    title: '職業',
    title_en: 'Job',
    db_name: 'job',
  },
  {
    name: 'smoke',

    type: 2,
    title: '喫煙',
    title_en: 'Smoke',
    db_name: 'smoke',
  },
  {
    name: 'wine',

    type: 2,
    title: '飲酒',
    title_en: 'Alcoholic drink',
    db_name: 'wine',
  },
  {
    name: 'brand',
    multiselect: 1,
    type: 2,
    title: '好きなブランド',
    title_en: 'Brand',
    db_name: 'brand',
  },
  {
    name: 'bodytype',

    type: 2,
    title: '体型',
    title_en: 'Body Type',
    db_name: 'bodytype',
  },
  {
    name: 'haircolor',

    type: 2,
    title: 'ヘアカラー',
    title_en: 'Hair Color',
    db_name: 'haircolor',
  },
  {
    name: 'eyescolor',

    type: 2,
    title: 'アイズカラー',
    title_en: 'Eye Color',
    db_name: 'eyescolor',
  },
  {
    name: 'dresssize',

    type: 2,
    title: 'ドレスサイズ',
    title_en: 'Dress Size',
    db_name: 'dresssize',
  },
  {
    name: 'shoesize',

    type: 2,
    title: 'シューズサイズ',
    title_en: 'Shoe Size',
    db_name: 'shoesize',
  },
  {
    name: 'modeloffer',

    type: 2,
    title: 'モデルオファー',
    title_en: 'Model Offer',
    db_name: 'modeloffer',
  },
  {
    name: 'height',

    type: 1,
    unit: 'cm',
    title: '身長',
    title_en: 'Height',
    for_search: 1,
    db_name: 'height',
  },
  {
    name: 'weight',
    type: 1,
    unit: 'kg',
    keyboard_type: 1,
    title: '体重',
    for_search: 1,
    title_en: 'Weight',
    db_name: 'weight',
  },
  {
    name: 'bust',
    unit: 'cm',
    type: 1,

    for_search: 1,
    title: 'バスト',
    title_en: 'Bust Size',
    db_name: 'bust',
  },
  {
    name: 'breastsize',

    type: 2,
    title: 'カップ',
    title_en: 'Breast Size',
    db_name: 'breastsize',
  },
  {
    name: 'waist',

    type: 1,
    unit: 'cm',
    keyboard_type: 1,
    title: 'ウエスト',
    title_en: 'Waist',
    db_name: 'waist',
  },
  {
    name: 'hip',

    type: 1,
    unit: 'cm',
    keyboard_type: 1,
    title: 'ヒップ',
    title_en: 'Hip',
    db_name: 'hip',
  },
  {
    name: 'hairtype',

    type: 2,
    title: '髪型',
    title_en: 'Hair Type',
    db_name: 'hairtype',
  },
  {
    name: 'marriagestatus',
    type: 2,
    title: '結婚歴',
    title_en: 'Marriage Status',
    db_name: 'marriagestatus',
  },
  {
    name: 'childnum',
    type: 2,
    title: '子供',
    title_en: 'Number of Children',
    db_name: 'childnum',
  },
  {
    name: 'socialstatus',

    type: 2,
    title: '交際ステータス',
    title_en: 'Social Status',
    db_name: 'socialstatus',
  },
];

const styles = StyleSheet.create({
  bgImageWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bgImage: {
    width: null,
    flex: 1,
    resizeMode: 'stretch',
  },
  title: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    top: '30%',
    width: '100%',
    color: '#2f3337',
  },
  activityIndicator: {
    width: '100%',
    color: '#2f3337',
    marginTop: 30,
  },
  animatedView: {
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  ltd: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    top: '90%',
    width: '100%',
    color: '#2f3337',
  },
  locale: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    top: '92%',
    width: '100%',
    color: '#2f3337',
  },
});

export default Launcher;

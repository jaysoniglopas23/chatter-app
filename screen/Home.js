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
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
<<<<<<< Updated upstream
=======
import Svg, {
  G,
  Path,
  Stop,
  Defs,
  Circle,
  LinearGradient,
} from 'react-native-svg';
>>>>>>> Stashed changes

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

      loadingLogoutConfrimReport: false,
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

    this._unsubscribe = this._unsubscribe.bind(this);
  }

  goPhoto() {
    // if (global.prevPage == 'Register') {
    //   global.prevPage = 'RegistertoHome'
    // } else if (global.prevPage != 'Register') {
    //   global.prevPage = 'LauncertoHome'
    // }
    if (global.prevPage != 'Register') {
      global.prevPage = 'LaunchertoHome';
      return this.props.navigation.navigate('photoLibrary');
    }
    if (global.prevPage == 'Register') {
      global.prevPage = 'RegistertoHome';
      return this.props.navigationRef.current?.navigate('photoLibrary');
    }
    if (global.prevPage == 'RegistertoHometoPhotoLibrary') {
      global.prevPage = 'RegistertoHome';
      return this.props.navigationRef.current?.navigate('photoLibrary');
    }
    if (global.prevPage == 'LaunchertoHometoPhotoLibrary') {
      global.prevPage = 'LaunchertoHome';
      return this.props.navigation.navigate('photoLibrary');
    }
    if (global.prevPage == 'Launcher') {
      global.prevPage = 'LaunchertoHome';
      return this.props.navigation.navigate('photoLibrary');
    }
    if (global.prevPage == 'Login') {
      global.prevPage = 'LaunchertoHome';
      return zthis.props.navigation.navigate('photoLibrary');
    }
    // } else if (global.prevPage != 'Register') {
    //   this.props.navigation.navigate('photoLibrary');
    //   global.prevPage = 'LaunchertoHome';
    // } else if (global.prevPage == 'RegistertoHometoPhotoLibrary') {
    //   this.props.navigationRef.current?.navigate('photoLibrary');
    //   global.prevPage = 'RegistertoHome';
    // } else if (global.prevPage != 'RegistertoHometoPhotoLibrary') {
    //   this.props.navigation.navigate('photoLibrary');
    //   global.prevPage = 'LaunchertoHome';
    // }
  }

  goSettings() {
    this.props.navigation.push('Settings');
  }

  goCoin() {
    this.props.navigation.navigate('Coin');
  }

  _unsubscribe() {}

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

<<<<<<< Updated upstream
  // goProfile() {
  //   this.props.navigationRef.current?.navigate('Happy');
  // }
=======
  goProfile() {
    this.props.navigation.push('Happy');
  }
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

    // if (global.prevPage == 'Register') {
    //   this.getProfile();
    // } else if (global.prevPage != 'Register') {
    //   this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //     // Alert.alert('Refreshed');
    //     this.getProfile();
    //   });
    // }

    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //   // Alert.alert('Refreshed');
    //   this.getProfile();
    // });
=======
    //  if(global.prevPage == 'Register'){
    //   this.props.navigationRef.current?.navigate('Tabs');
    //     return;
    //  } else {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getProfile();
    });
    // }
>>>>>>> Stashed changes
  }

  // componentDidMount() {
  //   this.interval = setInterval(() => this.getProfile({ time: Date.now() }), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  componentWillUnmount() {
    this.continueLogoutConfirm();
    this.getProfile();
    this._unsubscribe;
  }

  getProfile() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-details', function (ret) {
        global.socket.off('emit-details');
<<<<<<< Updated upstream
        console.log(JSON.stringify(ret));
=======
        //  alert(JSON.stringify(ret));
>>>>>>> Stashed changes

        self.setState({
          nickname: ret.nickname,
          mail_count: ret.mail_count,
          call_minutes: ret.call_minutes,
          age: ret.age,
          id: ret.id,
          profile_image: ret.profile_image,
          profile_image_dir: ret.profile_image_dir,
<<<<<<< Updated upstream
          age_verified: ret.age_verified,
=======
          email: ret.email,
          introduction: ret.introduction,
          character: ret.character,
          company: ret.company,
          dob: ret.dob,
          drink: ret.drink,
          gender: ret.gender,
          gender_pref: ret.gender_pref,
          hobbie: ret.hobbie,
          about: ret.about,
          holiday: ret.holiday,
          job_title: ret.job_title,
          like_children_or_not: ret.like_children_or_not,
          location: ret.location,
          marriage_desire: ret.marriage_desire,
          married: ret.marital_status,
          presence_of_children: ret.presence_of_children,
          presence_of_pet: ret.presence_of_pet,
          school: ret.school,
          bloodtype: ret.bloodtype,
          smoker: ret.smoker,
>>>>>>> Stashed changes
        });
        // self.state.intgender = ret.gender;
        global.bloodtype = self.state.bloodtype;
        global.gender = self.state.gender;
        global.smoker = self.state.smoker;
        global.drink = self.state.drink;
        global.married = self.state.married;
        global.presence_of_children = self.state.presence_of_children;
        global.marriage_desire = self.state.marriage_desire;
        global.like_children_or_not = self.state.like_children_or_not;
        global.presence_of_pet = self.state.presence_of_pet;
        global.holiday = self.state.holiday;
        global.birthday = ret.dob;
        global.myuserid = ret.id;
        global.age_verified = ret.age_verified;

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
      loadingLogoutConfrimReport: false,
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
          id: '',
          profile_image: '',
          profile_image: '',
          nickname: '',
          mail_count: '',
          call_minutes: '',
          email: '',
          password: '',
          age_verified: '',
          searchSettings: global.searchFields,
          shared: 0,
        };

        Storage.storeData(jsonData).then(() => {
          self.setState(
            {
              modalConfirmLogout: false,
            },
            () => {
              //  self.props.launcher.init();

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
          width: windowWidth,
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
<<<<<<< Updated upstream
                top: 26,
                left: windowWidth / 10 - 121,
=======
                // top: 186,
                left: windowWidth / 3.1 - 50,
>>>>>>> Stashed changes
                fontWeight: 'bold',
                color: '#5B5B5B',
                fontSize: 17,
                textAlign: 'center',
                position: 'absolute',
                width: windowWidth / 3,
              }}>
              通話 :{this.state.call_minutes}分
            </Text>
<<<<<<< Updated upstream
            <Text
              style={{
                alignSelf: 'center',
                top: 46,
                left: windowWidth / 10 - 121,
=======
            <Svg
              style={{bottom: '12.5%', left: windowWidth / 2 - 63}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M16.9995 13.4765V16.1862C17.0004 16.4377 16.9517 16.6867 16.8563 16.9172C16.7609 17.1477 16.6211 17.3546 16.4457 17.5247C16.2702 17.6947 16.0632 17.8242 15.8376 17.9048C15.6121 17.9854 15.3732 18.0153 15.1361 17.9927C12.5059 17.6907 9.97937 16.7409 7.75957 15.2197C5.69433 13.8329 3.94337 11.9827 2.63104 9.80026C1.18648 7.44389 0.287505 4.76107 0.0069378 1.96915C-0.0144221 1.71938 0.0136689 1.46764 0.089422 1.22996C0.165175 0.992288 0.286931 0.773885 0.446937 0.588659C0.606943 0.403433 0.801693 0.255443 1.01879 0.15411C1.23589 0.0527778 1.47057 0.00032375 1.7079 8.75714e-05H4.27217C4.68699 -0.00422671 5.08914 0.151 5.40366 0.436835C5.71818 0.722669 5.92362 1.11961 5.98168 1.55366C6.08991 2.42084 6.29063 3.27229 6.58001 4.09177C6.69501 4.41507 6.7199 4.76642 6.65173 5.1042C6.58355 5.44198 6.42518 5.75203 6.19537 5.99761L5.10983 7.14473C6.32662 9.40604 8.09844 11.2784 10.2384 12.5642L11.3239 11.4171C11.5563 11.1742 11.8497 11.0069 12.1694 10.9348C12.489 10.8628 12.8215 10.8891 13.1274 11.0106C13.9029 11.3164 14.7087 11.5285 15.5293 11.6429C15.9445 11.7048 16.3237 11.9258 16.5948 12.2639C16.8658 12.6019 17.0099 13.0335 16.9995 13.4765Z"
                fill="#EA337E"
              />
            </Svg>

            <Text
              style={{
                alignSelf: 'center',
                // top: 186,
                left: windowWidth / 10 - 45,
>>>>>>> Stashed changes
                fontWeight: 'bold',
                color: '#5B5B5B',
                textAlign: 'center',
                position: 'absolute',
                fontSize: 17,
                width: windowWidth / 3,
              }}>
              メール :{this.state.mail_count}通
            </Text>
<<<<<<< Updated upstream
=======
            <Svg
              style={{
                bottom: '130.5%',
                position: 'absolute',
                left: windowWidth / 7 - 5,
              }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              width="18"
              height="18"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M15 0.25H3C1.35 0.25 0 1.6 0 3.25V10.75C0 12.4 1.35 13.75 3 13.75H15C16.65 13.75 18 12.4 18 10.75V3.25C18 1.6 16.65 0.25 15 0.25ZM16.2 4.6L10.275 8.575C9.9 8.8 9.45 8.95 9 8.95C8.55 8.95 8.1 8.8 7.725 8.575L1.8 4.6C1.5 4.375 1.425 3.925 1.65 3.55C1.875 3.25 2.325 3.175 2.7 3.4L8.625 7.375C8.85 7.525 9.225 7.525 9.45 7.375L15.375 3.4C15.75 3.175 16.2 3.25 16.425 3.625C16.575 3.925 16.5 4.375 16.2 4.6Z"
                fill="#EA337E"
              />
            </Svg>
>>>>>>> Stashed changes
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
              height: '10%',
              width: '23%',
              left: 280,
              position: 'absolute',
              backgroundColor: 'transparent',
            }}></TouchableOpacity>
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
<<<<<<< Updated upstream
=======
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  足跡
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.2,
                  height: DeviceWidth * 0.2,
                  backgroundColor: 'transparent',
                  borderColor: '#cdd5d5',
                }}
                onPress={() => this.goHeart()}>
                <Svg
                  alignSelf="center"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="angle-left"
                  class="svg-inline--fa fa-angle-left fa-w-6"
                  role="img"
                  width="29"
                  height="26"
                  viewBox="0 0 29 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.7777 0.896973C3.4822 0.896973 0 4.3658 0 8.64476C0 16.3925 9.19182 23.436 14.1413 25.0744C19.0907 23.436 28.2825 16.3925 28.2825 8.64476C28.2825 4.3658 24.8003 0.896973 20.5048 0.896973C17.8744 0.896973 15.5488 2.19783 14.1413 4.18894C12.7337 2.19783 10.4082 0.896973 7.7777 0.896973Z"
                    fill="#ED70B0"
                  />
                </Svg>

                <Text
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  いいね
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#fff', height: '100%'}}>
              {/* <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.2,
                  height: DeviceWidth * 0.2,
                  marginBottom: 1,
                  marginRight: 30,
                  backgroundColor: 'transparent',
                  borderColor: '#cdd5d5',
                }}
                onPress={() => this.goPicture()}>
                <Svg
                  alignSelf="center"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="angle-left"
                  class="svg-inline--fa fa-angle-left fa-w-6"
                  role="img"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M17.0204 18.6412L17.1457 18.7458L26.44 27.8697C25.7755 28.2793 24.9929 28.5156 24.1551 28.5156H8.7266C7.88878 28.5156 7.10615 28.2793 6.44173 27.8697L15.736 18.7458L15.8481 18.6506C16.1959 18.3966 16.6696 18.3934 17.0204 18.6412ZM24.1551 4.36662C26.5631 4.36662 28.5153 6.31875 28.5153 8.72684V24.1553C28.5153 24.9967 28.277 25.7822 27.8644 26.4484L18.5555 17.3098L18.3831 17.1529C17.2659 16.2121 15.628 16.2094 14.5079 17.1452L14.3262 17.3098L5.01732 26.4484C4.60462 25.7822 4.36638 24.9967 4.36638 24.1553V15.7728C5.39894 16.2034 6.5319 16.4411 7.72039 16.4411C12.5366 16.4411 16.4408 12.5369 16.4408 7.72064C16.4408 6.53215 16.2031 5.39919 15.7726 4.36662H24.1551ZM7.72039 0.341797C11.7956 0.341797 15.0992 3.64541 15.0992 7.72064C15.0992 11.7959 11.7956 15.0995 7.72039 15.0995C3.64517 15.0995 0.341553 11.7959 0.341553 7.72064C0.341553 3.64541 3.64517 0.341797 7.72039 0.341797ZM21.4747 8.39144C19.806 8.39144 18.4533 9.7442 18.4533 11.4129C18.4533 13.0816 19.806 14.4343 21.4747 14.4343C23.1434 14.4343 24.4961 13.0816 24.4961 11.4129C24.4961 9.7442 23.1434 8.39144 21.4747 8.39144ZM21.4747 10.4039C22.032 10.4039 22.4837 10.8556 22.4837 11.4129C22.4837 11.9702 22.032 12.4219 21.4747 12.4219C20.9174 12.4219 20.4657 11.9702 20.4657 11.4129C20.4657 10.8556 20.9174 10.4039 21.4747 10.4039ZM7.72039 3.02398L7.59981 3.03479C7.326 3.08449 7.1101 3.3004 7.0604 3.57421L7.04959 3.69478L7.04912 7.0488L3.69242 7.04983L3.57184 7.06065C3.29803 7.11034 3.08212 7.32625 3.03243 7.60005L3.02161 7.72064L3.03243 7.84122C3.08212 8.11503 3.29803 8.33094 3.57184 8.38063L3.69242 8.39144L7.05046 8.39041L7.05108 11.7501L7.06188 11.8707C7.11159 12.1445 7.32749 12.3604 7.6013 12.4101L7.72188 12.421L7.84245 12.4101C8.11628 12.3604 8.33218 12.1445 8.38187 11.8707L8.39269 11.7501L8.39207 8.39041L11.7513 8.39144L11.8719 8.38063C12.1457 8.33094 12.3616 8.11503 12.4113 7.84122L12.4222 7.72064L12.4113 7.60005C12.3616 7.32625 12.1457 7.11034 11.8719 7.06065L11.7513 7.04983L8.39073 7.0488L8.3912 3.69478L8.38038 3.57421C8.33069 3.3004 8.11479 3.08449 7.84098 3.03479L7.72039 3.02398Z"
                    fill="#ED70B0"
                  />
                </Svg>

                <Text
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  写真登録
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.2,
                  height: DeviceWidth * 0.2,
                  // marginLeft: 1,
                  marginBottom: 1,
                  marginRight: 25,
                  backgroundColor: 'transparent',
                  borderColor: '#cdd5d5',
                }}
                onPress={() => this.goNews('News')}>
                <Svg
                  alignSelf="center"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="angle-left"
                  class="svg-inline--fa fa-angle-left fa-w-6"
                  role="img"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M16.498 7.33037V2.64648C16.5688 2.70518 16.6395 2.77561 16.6984 2.83431L23.3683 9.47862C23.4273 9.53732 23.498 9.60775 23.5569 9.67818H18.8549C18.2304 9.67633 17.632 9.42837 17.1904 8.98847C16.7488 8.54858 16.4999 7.95248 16.498 7.33037Z"
                    fill="#ED70B0"
                  />
                  <Path
                    d="M24.6766 12.0261H18.8551C17.6049 12.0261 16.406 11.5314 15.522 10.6508C14.638 9.77018 14.1414 8.57583 14.1414 7.33047V1.53137C13.8847 1.48466 13.6244 1.46109 13.3636 1.46094H7.07072C6.13309 1.46094 5.23387 1.83197 4.57087 2.49243C3.90787 3.15288 3.5354 4.04864 3.5354 4.98266V23.7652C3.5354 24.6992 3.90787 25.5949 4.57087 26.2554C5.23387 26.9158 6.13309 27.2869 7.07072 27.2869H21.212C22.1496 27.2869 23.0488 26.9158 23.7118 26.2554C24.3748 25.5949 24.7473 24.6992 24.7473 23.7652V12.8009C24.7472 12.541 24.7235 12.2817 24.6766 12.0261V12.0261ZM8.24916 16.7217H12.9629C13.2755 16.7217 13.5752 16.8454 13.7962 17.0656C14.0172 17.2857 14.1414 17.5843 14.1414 17.8956C14.1414 18.207 14.0172 18.5056 13.7962 18.7257C13.5752 18.9459 13.2755 19.0695 12.9629 19.0695H8.24916C7.93662 19.0695 7.63688 18.9459 7.41587 18.7257C7.19487 18.5056 7.07072 18.207 7.07072 17.8956C7.07072 17.5843 7.19487 17.2857 7.41587 17.0656C7.63688 16.8454 7.93662 16.7217 8.24916 16.7217ZM20.0335 23.7652H8.24916C7.93662 23.7652 7.63688 23.6415 7.41587 23.4213C7.19487 23.2012 7.07072 22.9026 7.07072 22.5913C7.07072 22.2799 7.19487 21.9813 7.41587 21.7612C7.63688 21.541 7.93662 21.4173 8.24916 21.4173H20.0335C20.3461 21.4173 20.6458 21.541 20.8668 21.7612C21.0878 21.9813 21.212 22.2799 21.212 22.5913C21.212 22.9026 21.0878 23.2012 20.8668 23.4213C20.6458 23.6415 20.3461 23.7652 20.0335 23.7652Z"
                    fill="#ED70B0"
                  />
                </Svg>

                <Text
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  各種書類
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.2,
                  height: DeviceWidth * 0.2,
                  marginBottom: 1,
                  marginLeft: 1,
                  backgroundColor: 'transparent',
                  borderColor: '#cdd5d5',
                }}
                onPress={() => this.goPacman()}>
                <Image
                  style={{width: 29, height: 29, alignSelf: 'center'}}
                  source={require('../icon/Asset66.png')}
                />

                <Text
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  ガイド
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.2,
                  height: DeviceWidth * 0.2,
                  marginBottom: 1,
                  marginLeft: 1,
                  backgroundColor: 'transparent',
                  borderColor: '#cdd5d5',
                }}
                onPress={() => this.goLogout()}>
                <Svg
                  alignSelf="center"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="angle-left"
                  class="svg-inline--fa fa-angle-left fa-w-6"
                  role="img"
                  width="29"
                  height="25"
                  viewBox="0 0 29 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M8.83829 3.56957C9.81603 3.56957 10.606 2.78269 10.606 1.80871C10.606 0.834736 9.81603 0.0478516 8.83829 0.0478516H5.30298C2.37529 0.0478516 0 2.41401 0 5.33043V19.4173C0 22.3337 2.37529 24.6999 5.30298 24.6999H8.83829C9.81603 24.6999 10.606 23.913 10.606 22.939C10.606 21.9651 9.81603 21.1782 8.83829 21.1782H5.30298C4.32524 21.1782 3.53532 20.3913 3.53532 19.4173V5.33043C3.53532 4.35646 4.32524 3.56957 5.30298 3.56957H8.83829ZM27.8682 13.3313C28.1334 13.0837 28.2825 12.737 28.2825 12.3739C28.2825 12.0107 28.1334 11.664 27.8682 11.4164L19.9138 3.93275C19.5271 3.56957 18.9637 3.47052 18.4776 3.67963C17.9914 3.88873 17.6766 4.36746 17.6766 4.89022V8.85215H10.606C9.62822 8.85215 8.83829 9.63904 8.83829 10.613V14.1347C8.83829 15.1087 9.62822 15.8956 10.606 15.8956H17.6766V19.8575C17.6766 20.3858 17.9914 20.859 18.4776 21.0681C18.9637 21.2772 19.5271 21.1782 19.9138 20.815L27.8682 13.3313Z"
                    fill="#ED70B0"
                  />
                </Svg>

                <Text
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  ログアウト
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.2,
                  height: DeviceWidth * 0.2,
                  marginBottom: 1,
                  marginLeft: 1,
                  backgroundColor: 'transparent',
                  borderColor: '#cdd5d5',
                }}
                onPress={() => this.goCard()}>
                <Svg
                  alignSelf="center"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="angle-left"
                  class="svg-inline--fa fa-angle-left fa-w-6"
                  role="img"
                  width="29"
                  height="29"
                  viewBox="0 0 29 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M0 3.90676H28.1738C28.1738 2.18338 26.77 0.782227 25.0433 0.782227H3.13042C1.4038 0.782227 0 2.18338 0 3.90676ZM0 5.46903V19.5294C0 21.2528 1.4038 22.654 3.13042 22.654H25.0433C26.77 22.654 28.1738 21.2528 28.1738 19.5294V5.46903H0ZM3.13042 19.007C3.13042 17.5668 4.29943 16.4049 5.73747 16.4049H11.4798C12.9228 16.4049 14.0869 17.5717 14.0869 19.007C14.0869 19.2951 13.8521 19.5294 13.5635 19.5294H3.65378C3.3652 19.5294 3.13042 19.2951 3.13042 19.007ZM8.60865 14.8426C6.88203 14.8426 5.47823 13.4415 5.47823 11.7181C5.47823 9.99472 6.88203 8.59356 8.60865 8.59356C10.3353 8.59356 11.7391 9.99472 11.7391 11.7181C11.7391 13.4415 10.3353 14.8426 8.60865 14.8426ZM17.2173 9.37469C17.2173 8.94507 17.5695 8.59356 17.9999 8.59356H24.2607C24.6912 8.59356 25.0433 8.94507 25.0433 9.37469C25.0433 9.80432 24.6912 10.1558 24.2607 10.1558H17.9999C17.5695 10.1558 17.2173 9.80432 17.2173 9.37469ZM17.2173 12.4992C17.2173 12.0696 17.5695 11.7181 17.9999 11.7181H24.2607C24.6912 11.7181 25.0433 12.0696 25.0433 12.4992C25.0433 12.9288 24.6912 13.2804 24.2607 13.2804H17.9999C17.5695 13.2804 17.2173 12.9288 17.2173 12.4992ZM17.2173 15.6238C17.2173 15.1941 17.5695 14.8426 17.9999 14.8426H24.2607C24.6912 14.8426 25.0433 15.1941 25.0433 15.6238C25.0433 16.0534 24.6912 16.4049 24.2607 16.4049H17.9999C17.5695 16.4049 17.2173 16.0534 17.2173 15.6238Z"
                    fill="#ED70B0"
                  />
                </Svg>

                <Text
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  個人証明書
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.2,
                  height: DeviceWidth * 0.2,
                  marginBottom: 1,
                  marginLeft: 1,
                  backgroundColor: 'transparent',
                  borderColor: '#cdd5d5',
                }}
                onPress={() => this.goCall()}>
                <Svg
                  alignSelf="center"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="angle-left"
                  class="svg-inline--fa fa-angle-left fa-w-6"
                  role="img"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <G clip-path="url(#clip0_61_1823)">
                    <Path
                      d="M28.367 21.9165V25.74C28.3684 26.095 28.2949 26.4463 28.151 26.7716C28.0072 27.0968 27.7962 27.3888 27.5315 27.6287C27.2669 27.8687 26.9545 28.0514 26.6144 28.1651C26.2742 28.2788 25.9137 28.321 25.5561 28.2891C21.5884 27.8629 17.7771 26.5228 14.4285 24.3763C11.3131 22.4195 8.67175 19.8086 6.69208 16.7291C4.51296 13.4042 3.15685 9.61854 2.73361 5.67898C2.70139 5.32653 2.74376 4.97131 2.85804 4.63594C2.97231 4.30057 3.15598 3.99239 3.39735 3.73102C3.63872 3.46966 3.93251 3.26083 4.26 3.11785C4.58749 2.97486 4.94151 2.90085 5.29953 2.90051H9.16774C9.7935 2.89443 10.4001 3.11346 10.8746 3.51679C11.3491 3.92012 11.659 4.48022 11.7466 5.0927C11.9098 6.31633 12.2126 7.51778 12.6491 8.67412C12.8226 9.13031 12.8602 9.62608 12.7573 10.1027C12.6545 10.5793 12.4156 11.0168 12.0689 11.3634L10.4314 12.982C12.2669 16.1729 14.9397 18.8148 18.1678 20.6292L19.8053 19.0105C20.1559 18.6679 20.5985 18.4317 21.0807 18.3301C21.5629 18.2284 22.0645 18.2655 22.526 18.437C23.6958 18.8685 24.9113 19.1678 26.1492 19.3292C26.7756 19.4165 27.3476 19.7284 27.7565 20.2054C28.1654 20.6824 28.3827 21.2914 28.367 21.9165Z"
                      fill="#ED70B0"
                    />
                    <Path
                      d="M28.8909 7.51824L28.6637 7.38238C28.3933 7.22105 28.2318 6.93145 28.2318 6.60833C28.2318 6.28521 28.3933 5.99562 28.6637 5.83428L28.8909 5.69842C29.5111 5.32748 29.7231 4.50874 29.3651 3.86697L28.9332 3.09292C28.576 2.4525 27.7818 2.23262 27.1633 2.60221L26.9361 2.73763C26.6657 2.89941 26.3423 2.89941 26.0723 2.73763C25.802 2.57584 25.6404 2.28669 25.6404 1.96357V1.6923C25.6404 0.953106 25.0591 0.351562 24.3447 0.351562H23.4809C22.7666 0.351562 22.1853 0.953106 22.1853 1.6923V1.96402C22.1853 2.28714 22.0237 2.57629 21.7534 2.73807C21.483 2.89941 21.1599 2.89986 20.8896 2.73807L20.6624 2.60221C20.0439 2.23262 19.2497 2.4525 18.8921 3.09292L18.4602 3.86697C18.1021 4.50874 18.3142 5.32793 18.9344 5.69842L19.162 5.83428C19.4324 5.99562 19.5939 6.28521 19.5939 6.60833C19.5939 6.93145 19.4324 7.22105 19.162 7.38238L18.9348 7.51824C18.3146 7.88873 18.1026 8.70793 18.4606 9.34969L18.8925 10.1237C19.2501 10.7642 20.0444 10.984 20.6624 10.6145L20.8896 10.479C21.1599 10.3168 21.483 10.3177 21.7534 10.479C22.0237 10.6408 22.1853 10.93 22.1853 11.2531V11.5244C22.1853 12.2636 22.7666 12.8651 23.4809 12.8651H24.3447C25.0591 12.8651 25.6404 12.2636 25.6404 11.5244V11.2526C25.6404 10.9295 25.802 10.6404 26.0723 10.4786C26.3423 10.3173 26.6657 10.3168 26.9361 10.4786L27.1633 10.6145C27.7818 10.9836 28.576 10.7637 28.9332 10.1237L29.3651 9.34969C29.7231 8.70793 29.5111 7.88873 28.8909 7.51824ZM23.9128 8.84289C22.7221 8.84289 21.7534 7.84047 21.7534 6.60833C21.7534 5.3762 22.7221 4.37377 23.9128 4.37377C25.1036 4.37377 26.0723 5.3762 26.0723 6.60833C26.0723 7.84047 25.1036 8.84289 23.9128 8.84289Z"
                      fill="#ED70B0"
                    />
                  </G>
                </Svg>

                <Text
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  通話設定
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.2,
                  height: DeviceWidth * 0.2,
                  marginBottom: 1,
                  marginLeft: 1,
                  backgroundColor: 'transparent',
                  borderColor: '#cdd5d5',
                }}
                onPress={() => this.goLogout()}>
                <Svg
                  alignSelf="center"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="angle-left"
                  class="svg-inline--fa fa-angle-left fa-w-6"
                  role="img"
                  width="29"
                  height="25"
                  viewBox="0 0 29 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M8.83829 3.56957C9.81603 3.56957 10.606 2.78269 10.606 1.80871C10.606 0.834736 9.81603 0.0478516 8.83829 0.0478516H5.30298C2.37529 0.0478516 0 2.41401 0 5.33043V19.4173C0 22.3337 2.37529 24.6999 5.30298 24.6999H8.83829C9.81603 24.6999 10.606 23.913 10.606 22.939C10.606 21.9651 9.81603 21.1782 8.83829 21.1782H5.30298C4.32524 21.1782 3.53532 20.3913 3.53532 19.4173V5.33043C3.53532 4.35646 4.32524 3.56957 5.30298 3.56957H8.83829ZM27.8682 13.3313C28.1334 13.0837 28.2825 12.737 28.2825 12.3739C28.2825 12.0107 28.1334 11.664 27.8682 11.4164L19.9138 3.93275C19.5271 3.56957 18.9637 3.47052 18.4776 3.67963C17.9914 3.88873 17.6766 4.36746 17.6766 4.89022V8.85215H10.606C9.62822 8.85215 8.83829 9.63904 8.83829 10.613V14.1347C8.83829 15.1087 9.62822 15.8956 10.606 15.8956H17.6766V19.8575C17.6766 20.3858 17.9914 20.859 18.4776 21.0681C18.9637 21.2772 19.5271 21.1782 19.9138 20.815L27.8682 13.3313Z"
                    fill="#ED70B0"
                  />
                </Svg>

                <Text
                  style={{alignSelf: 'center', color: '#5B5B5B', fontSize: 12}}>
                  ログアウト
                </Text>
              </TouchableOpacity> */}
              <Modal
                animationType="slide"
                // transparent={true}
                isVisible={this.state.modalConfirmLogout}
                style={{bottom: 400, alignSelf: 'center'}}>
                <View
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
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
                              backgroundColor: '#EA337E',
                              marginTop: 10,
                              marginRight: 5,
                              borderRadius: 10,
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
                              backgroundColor: '#EA337E',
                              marginTop: 10,
                              marginLeft: 5,
                              borderRadius: 10,
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
>>>>>>> Stashed changes
                  </View>
                )}
              </View>
            </View>
          </View>
<<<<<<< Updated upstream
        </Modal>

        {global.age_verified != 1 ? (
          <View>
            {global.age_verified == 2 ? (
              <View
                style={{
                  bottom: windowWidth / 1 - 135,
                  width: '100%',
                  backgroundColor: 'red',
                }}>
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
=======
        </View>
        {global.age_verified == 1 ? (
          <></>
        ) : (
          <View
            style={{
              alignSelf: 'center',
              bottom: '12%',
              borderWidth: 5,
              borderRadius: 10,
              borderColor: '#EA337E',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              身分証の登録後利用可能になります
            </Text>
          </View>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    height: '10%',
    width: '100%',
=======
    height: '100%',
    width: windowWidth - 10,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    marginLeft: 20,
    left: windowWidth / 2.5,
    top: 10,
    width: '100%',
=======
    // marginLeft: 20,
    right: windowWidth / 10 - 35,
    //  alignItems: 'center',
    bottom: windowHeight / 1 - 267,
    //  backgroundColor:'red',
    width: windowWidth - 195,
>>>>>>> Stashed changes
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

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
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';

import Tabs from '../navigation/tabs';
import Happy from '../homes/Happy';
import User from '../homes/User';
import Calls from '../homes/Calls';
import Card from '../homes/Card';
import Heart from '../homes/Heart';
import Lock from '../homes/Lock';
import News from '../homes/News';
import Pacman from '../homes/Pacman';
import Picture from '../homes/Picture';
import Star from '../homes/Star';
import {CardStyleInterpolators} from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Settings from '../homes/Settings';
import Login from './Login';
import moment from 'moment';
import Storage from '../utils/storage';
import PhotoLibrary from './Photolibrary';
import CoinScreen from '../homes/CoinScreen';
import Policy from '../homes/Terms';
import SpecialCC from '../homes/SpecialCC';
import Privacy from '../homes/Privacy';
import Launcher from './launcher';
import Userlikes from '../homes/Userlikes';
import {panHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

const DeviceWidth = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();
const navigationRef = React.createRef();

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class DisplayAnImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',

      age: '',

      mail_count: '',

      call_minutes: '',

      points: points,

      moment: moment(new Date()).format('YYYY-MM-DD  HH:mm:ss '),

      hasProfilePhoto: false,

      modalVisible: false,

      profilePhoto: '',

      profile_image: '',

      profile_image_dir: '',
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
  }

  // componentWillUnmount() {
  //   this.getProfile();
  // }

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

      let params = {};
      params['account_id'] = global.account_id;
      params['id'] = global.account_id;
      params['firstname'] = '';
      params['lastname'] = '';
      params['age'] = this.state.age;
      params['about'] = '';
      params['job'] = '';
      params['company'] = '';
      params['school'] = '';
      params['gender'] = 1;
      params['gender_pref'] = 1;
      params['distance_threshold'] = 0;
      params['nickname'] = this.state.nickname;
      params['smoking'] = 0;
      params['drinking'] = 0;
      params['marrried'] = 0;
      params['presence_of_children'] = 0;
      params['like_children_or_not'] = 0;
      params['marriage_desire'] = 0;
      params['presence_of_pet'] = 0;
      params['holiday'] = 0;
      params['hobbie'] = '';
      params['bloodtype'] = '';
      params['email'] = this.state.email;
      params['name'] = '';
      params['introduction'] = '';
      params['character'] = '';
      params['location'] = '';
      params['points'] = this.state.points;
      params['mail_count'] = this.state.mail_count;
      params['call_minutes'] = this.state.call_minutes;
      // params['profile_image_dir'] = this.state.profile_image_dir;
      // params['profile_image'] = this.state.profile_image;

      // console.log(params);
      global.socket.emit('on-details', params);
    });
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
                color: 'black',
                fontSize: 17,
                position: 'absolute',
                width: windowWidth / 3,
              }}>
              通話 :{this.state.mail_count}分
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                top: 46,
                left: windowWidth / 10 - 121,
                fontWeight: 'bold',
                color: 'black',
                position: 'absolute',
                fontSize: 17,
                width: windowWidth / 3,
              }}>
              メール :{this.state.call_minutes}通
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
                width: windowWidth / 7,
                height: windowWidth / 9,
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
                width: windowWidth / 9,
                height: windowWidth / 9,
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
            flex: 0.6,
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
            </Stack.Navigator>
          </NavigationContainer>
        </View>
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
    width: 60,
    height: 60,
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
    color: 'black',
    position: 'absolute',
    width: windowWidth / 2,
  },
});

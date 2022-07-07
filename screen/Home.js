import React, {Component} from 'react';
import {
  Text,
  Dimensions,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';

import Tabs from '../navigation/tabs';

import Happy from '../homes/Happy';
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

const DeviceWidth = Dimensions.get('window').width;

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

    this.goProfile = this.goProfile.bind(this);

    this.goLogout = this.goLogout.bind(this);

    this.goCard = this.goCard.bind(this);

    this.goCall = this.goCall.bind(this);

    this.goHeart = this.goHeart.bind(this);

    this.goLock = this.goLock.bind(this);

    this.goNews = this.goNews.bind(this);

    this.goPacman = this.goPacman.bind(this);

    this.goPicture = this.goPicture.bind(this);

    this.goStart = this.goStar.bind(this);

    this.goCoin = this.goCoin.bind(this);

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
    this.props.navigationRef.current?.navigate('Coin');
  }

  goCard() {
    this.props.navigationRef.current?.navigate('Card');
  }

  goCall() {
    this.props.navigationRef.current?.navigate('Calls');
  }

  goHeart() {
    this.props.navigationRef.current?.navigate('Heart');
  }

  goLock() {
    this.props.navigationRef.current?.navigate('Lock');
  }

  goNews() {
    this.props.navigationRef.current?.navigate('News');
  }

  goPacman() {
    this.props.navigationRef.current?.navigate('Pacman');
  }

  goStar() {
    this.props.navigationRef.current?.navigate('Star');
  }

  goPicture() {
    this.props.navigationRef.current?.navigate('Picture');
  }

  goProfile() {
    this.props.navigationRef.current?.navigate('Happy');
  }

  goLogout() {
    this.props.navigationRef.current?.navigate('Login');
  }

  handleText = () => {
    let nickname = this.state.nickname;

    if (nickname.length == 0) {
    }
  };

  componentDidMount() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-details', function (ret) {
        global.socket.off('emit-details');

        self.setState({
          nickname: ret.nickname,
          mail_count: ret.mail_count,
          call_minutes: ret.call_minutes,
          age: ret.age,
        });

        global.socket.on('emit-profile-photo', function (ret1) {
          global.socket.off('emit-profile-photo');

          self.setState({
            profile_image: ret1.profile_image,
            profile_image_dir: ret1.profile_image_dir,
            // hasProfilePhoto: true,
          });
        });

        global.socket.emit('on-profile-photo', params);
      });

      let params = {};

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
      <View style={{backgroundColor: '#fff', height: '180%'}}>
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
                width: 100,
                height: 150,
                borderRadius: 1,
                right: 110,
              }}
            />
          </TouchableOpacity>
          <View style={styles.txtview}>
            <Text
              style={styles.nickname}
              value={ret}
              onChangeText={value => this.componentDidMount(value)}>
              {this.state.nickname}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                top: 15,
                right: 175,
                fontWeight: 'bold',
                position: 'absolute',
              }}>
              Age : {this.state.age}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                top: 32,
                right: 135,
                fontWeight: 'bold',
                position: 'absolute',
              }}>
              Message : {this.state.mail_count}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                top: 48,
                right: 166,
                fontWeight: 'bold',
                position: 'absolute',
              }}>
              Call : {this.state.call_minutes}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.goSettings()}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 35,
              marginLeft: 250,
              position: 'absolute',
            }}>
            <Image
              style={{
                width: 40,
                height: 40,
                marginRight: 1,
                right: 130,
                position: 'absolute',
              }}
              source={require('../icon/settings.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.goCoin()}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 35,
              marginLeft: 200,
              position: 'absolute',
            }}>
            <Image
              style={{
                width: 40,
                height: 40,
                marginRight: 1,
                right: 30,
                position: 'absolute',
              }}
              source={require('../icon/Buy.png')}
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
              <Stack.Screen name="home">
                {props => <DisplayAnImage navigationRef={navigationRef} />}
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
              <Stack.Screen name="Lock">
                {props => <Lock navigationRef={navigationRef} />}
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
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    left: 20,
    height: 100,
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
    left: 300,
    top: 10,
    position: 'absolute',
  },
  nickname: {
    flex: 1,
    alignSelf: 'center',
    right: 148,
    top: 0,
    fontWeight: 'bold',
    // borderWidth: 1,
    position: 'absolute',
  },
});

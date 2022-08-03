import React, {Component} from 'react';

import {
  Text,
  View,
  ImageBackground,
  TextInput,
  backgroundColor,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';

// import {BlurView} from '@react-native-community/blur';
import {BlurView, VibrancyView} from 'react-native-blur';
import Svg from 'react-native-svg';
import {ColorSpace, Transition, Transitioning} from 'react-native-reanimated';
import {react} from '@babel/types';
import {ThemeConsumer} from 'styled-components';
import io from 'socket.io-client';
import Socket from '../utils/socket';
import Storage from '../utils/storage';
import {StackActions} from '@react-navigation/native';

const navigationRef = React.createRef();

const windowWidth = Dimensions.get('window').width;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ui: [],
      refresh: 0,
      emailPlaceHolder: '',
      passwordPlaceHolder: '',
      messageOne: '',
      invalidCredentials: '',
      invalidCredentialsOpacity: 0,
      loginButton: '',
      registerButton: '',
      forgotPasswordButton: '',
      messageTwo: '',
      email: '',
      password: 'asasin123',
      loginginOpacity: 0,
      id: '',
      age: '',
      phone_number: '',
      new_password: '',
      nickname: '',
      points: '',
    };

    this.goLogin = this.goLogin.bind(this);

    this.goRegister = this.goRegister.bind(this);
  }
  componentDidMount() {
    let self = this;

    if (global.locale == 'en') {
      this.setState(
        {
          invalidCredentials: 'Email / Password is invalid',
          loginButton: 'ログイン',
          registerButton: 'Sign Up',
          forgotPasswordButton: 'Forgot Password',

          emailPlaceHolder: 'Please enter email address.',
          passwordPlaceHolder: 'Please enter password.',
          messageOne:
            'If you have already registered, please enter your email address and password to log in.',
          messageTwo: 'New to Goodlookin, Sign up here',
        },
        () => {
          self.getUI();
        },
      );
    }
  }

  getUI() {
    let self = this;

    global.socket.on('ui', function (ret) {
      ``;
      global.socket.off('ui');

      self.setState({
        ui: ret,
        invalidCredentials: ret[3].ui,
        loginButton: ret[0].ui,
        registerButton: ret[2].ui,
        forgotPasswordButton: ret[1].ui,
      });
    });

    let params = {locale: global.locale, type: '30'};

    global.socket.emit('ui', params);
  }

  goLogin(id) {
    let self = this;

    this.setState(
      {
        invalidCredentialsOpacity: 0,
        loginginOpacity: 1,
      },
      () => {
        global.socket.on('emit-login', function (ret) {
          global.socket.off('emit-login');
          console.log(ret);

          if (ret.id == 0) {
            self.setState({
              invalidCredentialsOpacity: 1,
              loginginOpacity: 1,
              id: ret.id,
            });
          } else {
            Storage.retrieveData().then(data => {
              console.log('Login Success');
              data.email = self.state.email;
              data.password = self.state.password;
              console.log(self.state.email + ' ' + self.state.password);
              Storage.storeData(data).then(() => {
                global.email = ret.email;
                global.password = ret.password;
                global.ret = ret.id;
                global.nickname = ret.nickname;
                global.age = ret.age;
                global.points = ret.points;
                global.profile_image = ret.profile_image;

                self.props.navigationRef.current?.navigate('Tabs');
              });
            });
          }
        });
      },
    );

    let params = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(params);

    global.socket.emit('on-login', params);
  }

  goRegister() {
    this.props.navigationRef.current?.navigate('Register');
  }

  render() {
    // console.log(windowWidth);
    return (
      <View>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/image.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/alex-vinogradov-BO7kc38mkGU-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/alp-duran-pVHRC3e9_XM-unsplash.jpg')}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/daniel-j-schwarz-REjuIrs2YaM-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/dave-hoefler-gqLJxCHQs5w-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/dave-hoefler-iXmTYBLM4qg-unsplash.jpg')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/devashish-W1WT03ELa3E-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/houcine-ncib-B4TjXnI0Y2c-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/jackson-eaves-4mmMstrqt-k-unsplash.jpg')}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/jeremy-hynes-DOK1NgRJMdI-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/kellen-riggin-F0_WG6ddwGs-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/marek-piwnicki-2XxFqN39hEo-unsplash.jpg')}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/martin-katler-v6le3b_biH4-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/martin-katler-v6le3b_biH4-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/nicola-pavan-9IZwARETOMQ-unsplash.jpg')}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/nicola-pavan-Q4VZGRZiPfk-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/wolfgang-hasselmann-YoPPrVoiP5A-unsplash.jpg')}
            />
            <Image
              style={{width: windowWidth / 3, height: windowWidth / 3}}
              source={require('../images/wolfgang-hasselmann-zU2M99diK3M-unsplash.jpg')}
            />
          </View>
        </View>
        <BlurView
          style={styles.absolute2}
          // viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}
        />
        <View style={{bottom: 700}}>
          <Image
            source={require('../icon/logo.png')}
            style={{
              marginLeft: windowWidth / 2 - 50,
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 60,
            borderWidth: 0,
            marginTop: -580,
            width: '100%',
            paddingHorizontal: 10,
            // backgroundColor: '#fff',
            // opacity: 0.9,

            paddingVertical: 0,
          }}>
          <TextInput
            // placeholder="testing5@gmail.com"
            placeholderTextColor="#000000"
            placeholder={this.state.emailPlaceHolder}
            style={{
              alignItems: 'center',
              marginHorizontal: 0,
              width: '70%',
              backgroundColor: '#fff',
              borderRadius: 5,
              right: 10,
            }}
            onChangeText={email => this.setState({email: email})}
            value={this.state.email}
          />
          <Text
            style={{
              color: 'black',
              backgroundColor: '#fff',
              fontSize: 10,
              fontFamily: 'SemiBold',
              right: windowWidth / 1.5,
              bottom: 22,
            }}>
            メールアドレス
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 60,
            borderWidth: 0,
            marginTop: 30,
            width: '100%',
            paddingHorizontal: 10,
            // opacity: 0.9,
            borderRadius: 5,
            paddingVertical: 0,
          }}>
          <TextInput
            secureTextEntry={true}
            placeholderTextColor="#000000"
            style={{
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              width: '70%',
              borderRadius: 5,
              right: 10,
            }}
            onChangeText={password => this.setState({password: password})}
            value={this.state.password}
          />
          <Text
            style={{
              color: 'black',
              backgroundColor: 'white',
              fontSize: 9,
              fontFamily: 'SemiBold',
              right: windowWidth / 1.5,
              bottom: 22,
            }}>
            パスワード
          </Text>
        </View>

        <ActivityIndicator
          style={{
            marginLeft: windowWidth / 2 - 15,
            width: 30,
            height: 30,
            marginTop: 15,
            fontSize: 13,
            opacity: this.state.loginginOpacity,
          }}
          size="small"
          color="#69747f"
        />
        <Text
          style={{
            alignItems: 'flex-start',
            marginLeft: windowWidth / 2 - (windowWidth - 100) / 2,
            width: windowWidth - 100,
            height: 30,
            lineHeight: 18,
            textAlign: 'center',
            marginTop: -25,
            fontSize: 13,
            color: 'red',
            opacity: this.state.invalidCredentialsOpacity,
          }}>
          {this.state.invalidCredentials}
        </Text>

        <TouchableOpacity
          onPress={() => this.goLogin(id)}
          style={{
            marginHorizontal: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            backgroundColor: '#0B9C7F',
            paddingVertical: 6,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'black',
              opacity: 0.4,
              fontSize: 20,
              fontFamily: 'SemiBold',
            }}>
            {this.state.loginButton}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.goRegister()}
          style={{
            marginHorizontal: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 90,
            paddingBottom: 0,
            backgroundColor: '#fff',
            paddingVertical: 0,
            borderRadius: 5,
            bottom: 50,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'black',
              fontFamily: 'SemiBold',
              paddingVertical: 10,
            }}>
            新しいユーザー
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginHorizontal: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 250,
            paddingVertical: 3,
            borderRadius: 0,
            opacity: 0.9,
            bottom: 260,
          }}>
          <Icon.Button
            backgroundColor="#3b5998"
            style={{marginHorizontal: 60, borderRadius: 0}}>
            <Image source={require('../images/facebook.png')} />
            <Text style={{fontFamily: 'Arial', fontSize: 15}}>
              Login with Facebook
            </Text>
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute2: {
    backgroundColor: 'grey',
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Login;

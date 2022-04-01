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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import {BlurView, VibrancyView} from '@react-native-community/blur';
import {BlurView, VibrancyView} from 'react-native-blur';
import Svg from 'react-native-svg';
import {ColorSpace, Transition, Transitioning} from 'react-native-reanimated';
import {react} from '@babel/types';
import {ThemeConsumer} from 'styled-components';
import io from 'socket.io-client';
import Socket from '../utils/socket';

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
      password: '',
      loginginOpacity: 0,
      id: '',
      phone_number: '',
      new_password: '',
    };

    this.goLogin = this.goLogin.bind(this);

    this.goRegister = this.goRegister.bind(this);
  }
  componentDidMount() {
    Socket.connect(
      function () {
        console.log('Connected');
      },
      function () {},
    );
  }

  goLogin() {
    let self = this;

    this.setState(
      {
        invalidCredentialsOpacity: 0,
        loginginOpacity: 1,
      },
      () => {
        global.ws.on('on-login', function (ret) {
          global.ws.off('on-login');

          console.log(ret);

          if (ret.user_id == '') {
            self.setState({
              invalidCredentialsOpacity: 1,
              loginginOpacity: 0,
            });
          }
        });
      },
    );

    let params = {
      id: this.state.ui,
      phone_number: this.state.phone_number,
      email: this.state.email,
      password: this.state.password,
      new_password: this.state.new_password,
    };
    console.log(params);

    global.ws.emit('emit-login', params);

    this.props.navigation.navigate('Tab');
  }

  goRegister() {
    this.props.navigation.navigate('Register');
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
        {/* <BlurView
          blurType="light"
          blurAmount={25}
          overlayColor={'rgba(150, 150, 150, .7)'}></BlurView> */}
        {/* <BlurView
          style={styles.absolute2}
            // viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={32}
          overlayColor={'rgba(150, 150, 150, .7)'}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 60,
            borderWidth: 0,
            marginTop: -580,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            opacity: 0.9,
            borderRadius: 5,
            paddingVertical: 0,
          }}>
          <TextInput
            // placeholder="testing5@gmail.com"
            placeholderTextColor="#000000"
            placeholder={this.state.emailPlaceHolder}
            style={{paddingHorizontal: 10}}
            onChangeText={email => this.setState({email: email})}
            value={this.state.email}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 60,
            borderWidth: 0,
            marginTop: 30,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            opacity: 0.9,
            borderRadius: 5,
            paddingVertical: 0,
          }}>
          <TextInput
            secureTextEntry
            placeholderTextColor="#000000"
            style={{paddingHorizontal: 10}}
            onChangeText={password => this.setState({password: password})}
            value={this.state.password}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.goLogin()}
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
            Login
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
            New User
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 180,
            borderWidth: 0,
            marginTop: 1,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            opacity: 0.9,
            borderRadius: 0,
            paddingVertical: 0,
            right: 110,
            bottom: 334,
          }}>
          <Text
            style={{
              color: 'black',
              opacity: 0.8,
              fontSize: 11,
              fontFamily: 'SemiBold',
            }}>
            Email
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 170,
            borderWidth: 0,
            marginTop: 65,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            opacity: 0.9,
            borderRadius: 0,
            paddingVertical: 3,
            right: 101,
            bottom: 338,
          }}>
          <Text
            style={{
              color: 'black',
              opacity: 0.9,
              fontSize: 9,
              fontFamily: 'SemiBold',
            }}>
            パスワード
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 250,
            paddingVertical: 3,
            borderRadius: 0,
            opacity: 0.9,
            bottom: 350,
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Login;

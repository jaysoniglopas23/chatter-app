import {MaskedViewComponent} from '@react-native-community/masked-view';
import React, {Component, memo, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
} from 'react-native';

// import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Socket} from 'socket.io-client';
import moment from 'moment';
import Storage from '../utils/storage';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ui: [{One: 'invalid', two: 'Valid'}],
      refresh: 0,

      hasProfilePhoto: false,
      modalVisible: false,
      profilePhoto: '',
      openPhotoLibraryText: '',
      openCameraText: '',

      accountIdText: '',
      emailText: '',
      passwordText: '',
      confirmPasswordText: '',

      accountIdError: '',
      emailError: '',
      passwordError: '',
      confirm_passwordError: '',

      passwordRequirementText: '',

      fillinText: '各項目にご記入ください',

      taText: '',

      nickname: 'ニックネームを変更する',

      intGender: 0,

      accountIdErrorOpacity: 0,

      emailErrorOpacity: 0,

      passwordErrorOpacity: 0,

      phone_numberOpacity: 0,

      confirmPassworderrorOpacity: 0,

      datetime: moment(),

      id: '',
      account_id: '',
      email: '',
      password: '',
      phone_number: '',
      confirm_password: '',
      gender: '1',

      registerButton: '',
      title: '',

      fieldComplete: true,

      registeringOpacity: 0,

      checked: 'first',

      enableKAV: false,
    };

    this.onDisableKAVFocus = this.onDisableKAVFocus.bind(this);

    this.valid1 = false;
    this.valid2 = false;
    this.valid3 = false;
    this.valid4 = false;

    this.arrFields = [];

    this.goBack = this.goBack.bind(this);

    this.goRegister = this.goRegister.bind(this);
  }

  onEnableKAVFocus() {
    this.setState({
      enableKAV: true,
    });
  }

  onDisableKAVFocus() {
    this.setState({
      enableKAV: false,
    });
  }

  goBack() {
    this.props.navigationRef.current?.navigate('Login');
  }

  checkEmail(email) {
    let self = this;

    this.setState(
      {
        email: email,
      },
      () => {
        if (email == '') {
          self.valid1 = false;

          self.setState({
            emailErrorOpacity: 1,
          });
        } else {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!re.test(String(email).toLowerCase())) {
            self.valid1 = false;

            self.setState({
              emailErrorOpacity: 1,
              emailError: 'valid',
            });
          } else {
            global.socket.on('emit-check-email', function (ret) {
              global.socket.off('emit-check-email');

              if (parseInt(ret) == 1) {
                self.valid1 = false;

                self.setState({
                  emailError: 'invalid',
                  emailErrorOpacity: 1,
                });
              } else {
                self.valid1 = true;

                self.setState({
                  emailError: 'Valid',
                  emailErrorOpacity: 0,
                });
              }

              self.showRegisterButton();
            });
            global.email = this.state.email;

            let params = {email: this.state.email};
            console.log(params);
            global.ws.emit('on-check-email', params);
          }
        }

        self.showRegisterButton();
      },
    );
  }

  phoneNumber(phone_number) {
    let self = this;

    this.setState(
      {
        phone_number: phone_number,
      },
      () => {
        var re = /^[0-9\b]+$/;

        if (!re.test(self.state.phone_number)) {
          this.valid2 = false;

          self.setState({
            phone_numberOpacity: 1,
          });
        } else {
          this.valid2 = true;

          self.setState({
            phone_numberOpacity: 0,
          });
        }

        self.showRegisterButton();

        let params = {phone_number: this.state.phone_number};
      },
    );
  }

  checkPassword(password) {
    let self = this;

    this.setState(
      {
        password: password,
      },
      () => {
        var re = /^([a-zA-Z0-9_-]){8,13}$/;

        if (!re.test(self.state.password)) {
          this.valid3 = false;

          self.setState({
            passwordErrorOpacity: 1,
          });
        } else {
          this.valid3 = true;

          self.setState({
            passwordErrorOpacity: 0,
          });
        }

        global.password = this.state.password;

        self.showRegisterButton();
        let params = {password: this.state.password};
        // console.log(params);
      },
    );
  }

  confirmPassword(confirm_password) {
    let self = this;

    this.setState({confirm_password: confirm_password}, () => {
      if (this.state.password == this.state.confirm_password) {
        this.valid4 = true;

        this.setState({
          confirm_passworderrorOpacity: 0,
        });
      } else {
        this.valid4 = false;

        this.setState({
          confirm_passworderrorOpacity: 1,
        });
      }

      self.showRegisterButton();
    });
  }

  showRegisterButton() {
    if (this.valid1 && this.valid2 && this.valid3 && this.valid4) {
      this.setState({
        fieldComplete: true,
      });
    } else {
      this.setState({
        fieldComplete: false,
      });
    }
  }

  getGender(gender) {}

  goRegister() {
    let self = this;

    this.setState(
      {
        registeringOpacity: 1,
      },
      () => {
        global.socket.on('emit-register', function (ret) {
          global.socket.off('emit-register');
          // alert(JSON.stringify(ret));

          if (ret == 0) {
            self.setState({
              fieldComplete: false,
              registeringOpacity: 1,
              emailErrorOpacity: 1,
              id: ret.id,
            });
          }

          global.socket.on('emit-login', function (ret1) {
            global.socket.off('emit-login');
            // alert(ret1);

            if (ret.id == 0) {
              self.setState({
                invalidCredentialsOpacity: 1,
                loginginOpacity: 1,
                id: ret1.id,
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

                  self.props.navigationRef.current?.navigate('home');
                });
              });
            }
          });

          let params = {
            nickname: 'ニックネームを変更する',
            email: global.email,
            password: global.password,
          };

          global.socket.emit('on-login', params);
        });

        let params = {
          account_id: global.account_id,
          email: global.email,
          nickname: this.state.nickname,
          password: global.password,
          phone_number: this.state.phone_number,
          confirm_password: this.state.confirm_password,
          gender: this.state.gender,
          age_verified: 0,
          datetime: moment(new Date()).format('YYYY-MM-DD  HH:mm:ss '),
        };

        // alert(global.account_id);
        console.log(params);

        global.socket.emit('on-register', params);
      },
    );
  }

  renderCell(field) {
    let self = this;

    return <RegisterField field={field} self={self} />;
  }

  setChecked() {
    let self = this;
  }

  // this.props.navigation.navigate('Tab');

  render() {
    let gender = [
      {label: '男性', value: 0},

      {label: '>女性', value: 1},
    ];
    return (
      <View
        style={{backgroundColor: '#fff', height: windowHeight, width: '100%'}}>
        <TouchableOpacity
          style={{
            marginLeft: 5,
            marginTop: windowHeight / 10 - 65,
            width: 40,
            height: 40,
          }}
          onPress={() => this.goBack()}>
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
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            borderWidth: 2,
            marginTop: 50,
            paddingHorizontal: 10,
            borderColor: '#cdd5d5',
            borderRadius: 5,
            paddingVertical: 2,
          }}>
          <TextInput
            onFocus={() => this.onDisableKAVFocus()}
            placeholderTextColor="#00716F"
            style={{
              paddingHorizontal: 10,
              borderEndWidth: 310,
              borderRadius: 10,
              color: 'black',
            }}
            value={this.state.email}
            onChangeText={value => this.checkEmail(value)}
          />
          <Text
            style={{
              width: '100%',
              height: 15,
              lineHeight: 15,
              color: 'red',
              fontSize: 11,
              color: 'red',
              textAlign: 'right',
              opacity: this.state.emailErrorOpacity,
            }}>
            {this.state.emailError}
          </Text>
        </View>
        <Text
          style={{
            backgroundColor: '#fff',
            color: 'gray',
            fontSize: 10,
            bottom: 63,
            left: 30,
            alignSelf: 'flex-start',
          }}>
          Eメール
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            borderWidth: 2,
            height: 57,
            marginTop: 15,
            paddingHorizontal: 100,
            borderColor: '#cdd5d5',
            borderRadius: 5,
            paddingVertical: 2,
          }}>
          <RadioForm
            radio_props={gender}
            initial={0}
            value={this.state.gender}
            onPress={value => this.getGender(value)}
            buttonSize={10}
            buttonOuterSize={20}
            buttonColor={'grey'}
            selectedButtonColor={'grey'}
            selectedLabelColor={'grey'}
            labelStyle={{fontSize: 15, paddingHorizontal: 30}}
            disabled={false}
            formHorizontal={true}
            labelHorizontal={true}
            style={{top: 0}}
          />
          {/* <RadioButton
            value="first"
            status={this.state.checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => this.setChecked('first')}
          />
          <Text style={{color: 'black'}}>男</Text>
          <RadioButton
            value="second"
            status={this.state.checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => this.setChecked('second')}
          />
          <Text style={{color: 'black'}}>女性</Text> */}
          <Text
            style={{
              bottom: 11,
              right: 280,
              backgroundColor: '#fff',
              color: 'gray',
              fontSize: 10,
              alignSelf: 'flex-start',
            }}>
            性別
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            borderWidth: 2,
            marginTop: 15,
            paddingHorizontal: 10,
            borderColor: '#cdd5d5',
            borderRadius: 5,
            paddingVertical: 2,
          }}>
          <TextInput
            onFocus={() => this.onDisableKAVFocus()}
            keyboardType="numeric"
            style={{
              paddingHorizontal: 10,
              borderEndWidth: 310,
              borderRadius: 10,
              color: 'black',
            }}
            value={this.state.phone_number}
            onChangeText={value => this.phoneNumber(value)}
          />
        </View>
        <Text
          style={{
            backgroundColor: '#fff',
            bottom: 63,
            color: 'gray',
            fontSize: 10,
            left: 30,
            alignSelf: 'flex-start',
          }}>
          電話番号
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            borderWidth: 2,
            marginTop: 15,
            paddingHorizontal: 10,
            borderColor: '#cdd5d5',
            borderRadius: 5,
            paddingVertical: 2,
          }}>
          <TextInput
            onFocus={() => this.onDisableKAVFocus()}
            secureTextEntry
            style={{
              paddingHorizontal: 10,
              color: 'black',
              borderEndWidth: 310,
              borderRadius: 10,
            }}
            value={this.state.password}
            onChangeText={value => this.checkPassword(value)}
          />

          <Text
            style={{
              width: '100%',
              height: 15,
              lineHeight: 15,
              color: global.textColor,
              fontSize: 11,
              color: global.errorTextColor,
              textAlign: 'right',
              opacity: this.state.passwordErrorOpacity,
            }}>
            {this.state.passwordError}
          </Text>
        </View>
        <Text
          style={{
            backgroundColor: '#fff',
            bottom: 63,
            color: 'gray',
            fontSize: 10,
            left: 30,
            alignSelf: 'flex-start',
          }}>
          パスワード
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            borderWidth: 2,
            marginTop: 15,
            paddingHorizontal: 10,
            borderColor: '#cdd5d5',
            borderRadius: 5,
            paddingVertical: 2,
          }}>
          <TextInput
            secureTextEntry
            style={{
              paddingHorizontal: 10,
              borderEndWidth: 310,
              borderRadius: 10,
              color: 'black',
            }}
            onChangeText={value => this.confirmPassword(value)}
            value={this.state.confirm_password}
          />
          <Text
            style={{
              width: '100%',
              height: 15,
              lineHeight: 15,
              color: global.textColor,
              fontSize: 11,
              color: global.errorTextColor,
              textAlign: 'right',
              opacity: this.state.confirmPassworderrorOpacity,
            }}>
            {this.state.confirm_passwordError}
          </Text>
        </View>

        <Text
          style={{
            backgroundColor: '#fff',
            bottom: 63,
            color: 'gray',
            fontSize: 10,
            left: 30,
            alignSelf: 'flex-start',
          }}>
          パスワードを認証する
        </Text>

        <ActivityIndicator
          style={{opacity: this.state.registeringOpacity}}
          size="small"
          color="#69747f"
        />

        {this.state.fieldComplete ? (
          <TouchableOpacity
            onPress={() => this.goRegister()}
            style={{
              marginHorizontal: 150,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              backgroundColor: '#cdd5d5',
              paddingVertical: 10,
              borderRadius: 0,
            }}>
            <Text
              style={{
                color: '#5b5c5a',
                fontFamily: 'SemiBold',
              }}>
              登録
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              width: '100%',
              height: 30,
              marginTop: 25,
              marginBottom: 15,
              lineHeight: 15,
              color: global.textColor,
              fontSize: 13,
              color: global.textColor,
              fontWeight: 'bold',
              textAlign: 'center',
              opacity: this.state.fillinOpacity,
            }}>
            {this.state.fillinText}
          </Text>
        )}
      </View>
    );
  }
}

const RegisterField = ({field, self}) => (
  <View style={{width: '100%', height: 85, flexDirection: 'column', flex: 1}}>
    <Text
      style={{
        width: '100%',
        height: 20,
        lineHeight: 20,
        color: global.textColor,
        fontSize: 11,
        color: global.textColor,
        textAlign: 'center',
      }}>
      {self.state.errorTexts[field.item.id]}
    </Text>

    <Text
      style={{
        width: '100%',
        height: 28,
        lineHeight: 30,
        color: global.textColor,
        fontSize: 12,
      }}>
      {field.item.name}
    </Text>
    <TextInput
      style={{
        width: '100%',
        height: 35,
        borderWidth: 1,
        padding: 5,
        marginBottom: 5,
        borderRadius: 3,
        borderRadius: 3,
        borderColor: global.inputBorderColor,
        color: global.glTextColor,
        color: 'black',
      }}
    />

    <Text
      style={{
        width: '100%',
        height: 20,
        lineHeight: 20,
        color: global.textColor,
        fontSize: 11,
        color: global.errorTextColor,
        textAlign: 'center',
      }}>
      {self.state.errorTexts[field.item.id]}
    </Text>
  </View>
);

export default Register;

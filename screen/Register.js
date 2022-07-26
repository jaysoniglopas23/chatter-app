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
<<<<<<< HEAD
  ToastAndroid,
=======
  Dimensions,
>>>>>>> f043494391c8adb40b66b7f4d6fd0b445f783295
} from 'react-native';

// import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Socket} from 'socket.io-client';
import moment from 'moment';
import Storage from '../utils/storage';
<<<<<<< HEAD
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
=======
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
>>>>>>> f043494391c8adb40b66b7f4d6fd0b445f783295

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

        self.showRegisterButton();
        let params = {password: this.state.password};
        // console.log(params);
      },
    );
  }

  confirmPassword(password) {
    let self = this;

    this.setState({confirm_password: password}, () => {
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

  goRegister() {
    let self = this;

    this.setState(
      {
        registeringOpacity: 1,
      },
      () => {
        global.socket.on('emit-register', function (ret) {
          global.socket.off('emit-register');
          console.log(ret);
          if (parseInt(ret) == 0) {
            self.setState({
              fieldComplete: false,
              registeringOpacity: 1,
              emailErrorOpacity: 1,
            });
          } else if (parseInt(ret)) {
            if (self.state.hasProfilePhoto) {
              const data = new FormData();

              data.append('account_id', ret.account_id);

              let i = {
                uri: self.state.profilePhoto,
                type: 'multipart/form-data',
                name: `image.jpg`,
              };

              data.append('post', i);

              axios
                .request({
                  method: 'post',
                  url: 'https://goodlookin.live:8002/upload_profile_photo',
                  data: data,
                  onUploadProgress: p => {
                    console.log(p);
                    //this.setState({
                    //fileprogress: p.loaded / p.total
                    //})
                  },
                })
                .then(data => {
                  self.props.navigationRef.current?.navigate('Tabs');
                });
            } else {
              global.account_id = ret.account_id;
              global.gender = '';
              global.nickname = ret.nickname;
              global.points = 0;

              self.props.navigationRef.current?.navigate('Tabs');
            }
          }
        });

        let params = {
          account_id: this.state.account_id,
          email: this.state.email,
          password: this.state.password,
          phone_number: this.state.phone_number,
          confirm_password: this.state.confirm_password,
          gender: value,
          datetime: moment(new Date()).format('YYYY-MM-DD  HH:mm:ss '),
        };

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
      {label: '男', value: 0},

      {label: '>女性', value: 1},
    ];
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <TouchableOpacity
            style={{
              marginLeft: 5,
              marginTop: windowHeight / 10 - 65,
              width: 40,
              height: 40,
            }}
            onPress={() => this.back()}>
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
              color: global.textColor,
              fontSize: 11,
              color: global.errorTextColor,
              textAlign: 'right',
              opacity: this.state.emailErrorOpacity,
            }}>
            {this.state.emailError}
          </Text>
        </View>
        <Text
          style={{
            bottom: 65,
            left: 29,
            backgroundColor: '#fff',
            marginRight: 370,
            color: 'black',
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
            onPress={value => {
              ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
            }}
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
              bottom: 28,
              right: 257,
              backgroundColor: '#fff',
              color: 'black',
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
            bottom: 64,
            right: 339,
            marginLeft: 363,
            backgroundColor: '#fff',
            color: 'black',
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
            bottom: 64,
            right: 328,
            marginLeft: 355,
            backgroundColor: '#fff',
            color: 'black',
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
            bottom: 68,
            right: 270,
            marginLeft: 300,
            backgroundColor: '#fff',
            color: 'black',
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

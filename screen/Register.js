import React, {Component, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Socket} from 'socket.io-client';

// const [checked, setChecked] = React.useState('first');

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ui: [],
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

      fillinText: '',

      taText: '',

      accountIdErrorOpacity: 0,

      emailErrorOpacity: 0,

      passwordErrorOpacity: 0,

      confirmPassworderrorOpacity: 0,

      account_id: '',
      email: '',
      password: '',
      phone_number: '',
      confirm_password: '',

      registerButton: '',
      title: '',

      fieldComplete: true,

      registeringOpacity: 0,

      enableKAV: false,
    };

    this.onDisableKAVFocus = this.onDisableKAVFocus.bind(this);

    this.valid1 = false;
    this.valid2 = false;
    this.valid3 = false;
    this.valid4 = false;

    this.arrFields = [];

    this.setChecked = this.setChecked.bind(this);

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

  setChecked() {
    this.props.navigation.navigate('Login');
  }

  checkEmail(email) {
    let self = this;

    this.setState(
      {
        email: email,
      },
      () => {
        if (email == '') {
          self.valid2 = false;

          self.setState({
            emailError: self.state.ui[20].ui,
            emailErrorOpacity: 1,
          });
        } else {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!re.test(String(email).toLowerCase())) {
            self.valid2 = false;

            self.setState({
              emailErrorOpacity: 1,
              emailError: self.state.ui[20],
            });
          } else {
            global.ws.on('emit-check-email', function (ret) {
              global.ws.off('emit-check-email');

              if (parseInt(ret.exists) == 1) {
                self.valid2 = false;

                self.setState({
                  emailError: self.state.ui[20].ui,
                  emailErrorOpacity: 1,
                });
              } else {
                self.valid2 = true;

                self.setState({
                  emailError: self.state.ui[20].ui,
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
        global.ws.on('on-register', function (ret) {
          global.ws.off('on-register');
          if (parseInt(ret.status) == 0) {
            self.setState({
              fieldComplete: false,
              registeringOpacity: 0,
              accountIdErrorOpacity: 1,
            });
          } else if (parseInt(ret.status) == 1) self.props.navigationRef.current?.navigate('Tab');
        });

        let params = {
          // accountid: this.state.accountId,
          email: this.state.email,
          password: this.state.password,
          phone_number: this.state.phone_number,
          confirm_password: this.state.confirm_password,
          gender: '',
        };
        console.log(params);
        global.ws.emit('emit-register', params);
      },
    );
  }

  componentDidMount() {
    this.getUI();
  }

  renderCell(field) {
    let self = this;

    return <RegisterField field={field} self={self} />;
  }

  // this.props.navigation.navigate('Tab');

  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <TouchableOpacity
          onPress={() => this.setChecked()}
          style={{
            backgroundColor: 'tranparent',
            marginHorizontal: 170,
            height: 50,
            right: 167,
            top: 10,
          }}>
          <Image source={require('../icon/arrow.png')} style={{height: 30}} />
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
            }}
            // value={this.state.email}
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
            marginRight: 360,
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
          <RadioButton value="first" />
          <Text>MALE</Text>
          <RadioButton value="second" />
          <Text>FEMALE</Text>
          <Text style={{bottom: 28, right: 255, backgroundColor: '#fff'}}>
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
            style={{
              paddingHorizontal: 10,

              borderEndWidth: 310,
              borderRadius: 10,
            }}
            onChangeText={phone_number =>
              this.setState({phone_number: phone_number})
            }
            value={this.state.phone_number}
          />
        </View>
        <Text
          style={{
            bottom: 64,
            right: 323,
            marginLeft: 353,
            backgroundColor: '#fff',
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

              borderEndWidth: 310,
              borderRadius: 10,
            }}
            onChangeText={value => this.checkPassword(value)}
            // value={this.state.password}
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
            right: 310,
            marginLeft: 340,
            backgroundColor: '#fff',
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
            }}
            onChangeText={value => this.confirmPassword(value)}
            // value={this.state.confirm_password}
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
            right: 240,
            marginLeft: 270,
            backgroundColor: '#fff',
          }}>
          パスワードを認証する
        </Text>

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

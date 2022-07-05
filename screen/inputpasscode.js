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
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';

import Svg, {G, Path} from 'react-native-svg';

import Storage from '../utils/storage';

import SwitchSelector from 'react-native-switch-selector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class InputPasscode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ui: [],

      title: global.locale == 'en' ? 'Passcode Lock' : 'パスコードロック',
      buttonText: global.locale == 'en' ? 'Login' : 'ログインする',
      showLoading: true,
      passcodeMesssage:
        global.locale == 'en'
          ? 'Passcode correct, Redirecting...'
          : 'パスコードが正しい、リダイレクトしています...',
      refresh: 0,
      saving: false,
      passcodeValue: '',
      passcodeMesssageShow: false,
    };

    this.renderCell = this.renderCell.bind(this);

    this.inputPasscode = this.inputPasscode.bind(this);

    this.back = this.back.bind(this);
  }

  componentDidMount() {
    this.setState({
      showLoading: false,
    });
  }

  inputPasscode() {
    let self = this;

    console.log(this.state.passcodeValue + ' ' + global.passcodeValue);

    if (this.state.passcodeValue == global.passcodeValue) {
      this.setState(
        {
          saving: true,
          passcodeMesssageShow: true,
          passcodeMesssage:
            global.locale == 'en'
              ? 'Passcode set, Redirecting...'
              : 'パスコードセット、リダイレクト...',
        },
        () => {
          global.passcodeCorrect = true;

          self.props.navigationRef.current?.navigate('Launcher');

          this.props.launcher.init();
        },
      );
    } else {
      this.setState(
        {
          saving: true,
          passcodeMesssageShow: true,
          passcodeMesssage:
            global.locale == 'en' ? 'Passcode invalid' : 'パスコードが無効です',
        },
        () => {
          self.setState({
            saving: false,
          });
        },
      );
    }
  }

  back() {
    this.props.navigationRef.current?.navigate('PasscodeSettings');
  }

  renderCell(item) {
    if (item.index == 0) {
      return <></>;
    } else {
      return <PN item={item} self={this} />;
    }
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', height: windowHeight}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#00d49c',
            height: 100,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              position: 'absolute',
              width: '100%',
              height: 30,
              lineHeight: 32,
              textAlign: 'center',
              fontSize: 13,
              marginTop: 58,
              fontWeight: 'bold',
              color: '#FFF',
            }}>
            {this.state.title}
          </Text>
        </View>

        {this.state.showLoading ? (
          <View
            style={{
              position: 'absolute',
              width: windowWidth,
              height: windowHeight,
              top: 100,
              left: 0,
              opacity: this.state.loadingOpacity,
            }}>
            <ActivityIndicator
              style={{marginTop: 100}}
              size="small"
              color="#69747f"
            />
          </View>
        ) : (
          <View
            style={{
              width: windowWidth,
              height: windowHeight,
              flexDirection: 'column',
            }}>
            <View style={{width: windowWidth, height: 40, marginTop: 50}}>
              <TextInput
                value={this.state.passcodeValue}
                onChangeText={passcodeValue => this.setState({passcodeValue})}
                keyboardType="numeric"
                maxLength={6}
                autoFocus={true}
                style={{
                  marginLeft: windowWidth / 2 - 100,
                  width: 200,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#bbc0c4',
                  borderRadius: 3,
                  textAlign: 'center',
                }}
              />
            </View>

            {this.state.passcodeMesssageShow ? (
              <Text
                style={{
                  width: windowWidth,
                  height: 40,
                  lineHeight: 40,
                  textAlign: 'center',
                  color: global.glTextColor,
                  marginTop: 20,
                }}>
                {this.state.passcodeMesssage}
              </Text>
            ) : (
              <View
                style={{width: windowWidth, height: 40, marginTop: 20}}></View>
            )}

            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                borderRadius: 3,
                backgroundColor: global.buttonColor,
                marginLeft: windowWidth / 2 - 50,
                marginTop: 10,
              }}
              onPress={() => this.inputPasscode()}>
              {this.state.saving ? (
                <></>
              ) : (
                <Text
                  style={{
                    width: 100,
                    height: 40,
                    lineHeight: 40,
                    textAlign: 'center',
                    color: global.glTextColor,
                  }}>
                  {this.state.buttonText}
                </Text>
              )}
            </TouchableOpacity>

            {this.state.saving ? (
              <View
                style={{
                  position: 'absolute',
                  width: windowWidth,
                  height: 30,
                  top: 75,
                  left: 0,
                }}>
                <ActivityIndicator
                  style={{marginTop: 100}}
                  size="small"
                  color="#69747f"
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default InputPasscode;

import React, {Component, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Animated,
  ToastAndroid,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown-v2';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Storage from '../utils/storage';
import Svg, {G, Path} from 'react-native-svg';

import Icon from 'react-native-vector-icons/FontAwesome5';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import User from './User';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Happy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: nickname,

      email: '',

      modalDatePicker: false,

      saving: false,

      chosenDate: '',

      nicknameErrorOpacity: 1,
    };

    this.goBack = this.goBack.bind(this);

    this.closeModal = this.closeModal.bind(this);

    this.closeDateModal = this.closeDateModal.bind(this);

    this.openDateModal = this.openDateModal.bind(this);
  }
  closeDateModal() {
    this.setState({
      modalDatePicker: false,
    });
  }

  openDateModal() {
    this.setState({
      modalDatePicker: true,
    });
  }

  handleDate(datetime) {
    this.setState({
      modalDatePicker: false,
      chosenDate: moment(new Date()).format('YYYY-MM-DD  HH:mm:ss '),
      // moment(datetime).format('YYYY-MM-DD  HH:mm:ss '),
    });
  }

  closeModal() {
    this.setState({
      modalSingleVisible: false,
    });
  }

  goBack() {
    this.props.navigationRef.current?.navigate('Dashboard');
  }

  setNickname(nickname) {
    let self = this;

    this.setState(
      {
        nickname: nickname,
      },
      () => {
        global.socket.on('on-check-nickname', function (ret) {
          global.socket.off('on-check-nickname');
          console.log(ret);
          if (nickname == '') {
          } else {
            self.valid1 = true;

            self.setState({
              nicknameErrorOpacity: 0,
            });
          }

          self.save();
        });

        let params = {nickname: this.state.nickname};
        console.log(params);
        global.socket.emit('on-check-nickname', params);
      },
    );
  }

  checkEmail(email) {
    let self = this;

    this.setState(
      {
        email: email,
      },
      () => {
        global.socket.on('emit-check-amail', function (ret) {
          global.socket.off('on-check-email');
          console.log(ret);
          // self.setState({
          //   email: ret.email,
          // });
          // console.log(email);

          if (email == 1) {
            self.valid1 = false;
          } else {
            self.valid1 = true;
          }

          self.save();
        });

        let params = {email: this.state.email};
        console.log(params);
        global.socket.emit('on-check-email', params);
      },
    );
  }

  save() {
    let self = this;

    this.setState(
      {
        saving: true,
      },
      () => {
        global.socket.on('emit-details-save-new', function (ret) {
          global.socket.off('on-details-save-new');

          self.setState({
            nickname: global.nickname,
            email: global.email,
          });
        });

        let params = {};

        params['firstname'] = '';
        params['lastname'] = '';
        params['dob'] = moment(new Date()).format('YYYY-MM-DD  HH:mm:ss ');
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

        // if (gender_rb == '0') {
        // }
        self.props.navigationRef.current?.navigate('Dashboard');

        console.log(params);
        global.socket.emit('on-details-save-new', params);
      },
    );
  }
  componentDidMount() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-details', function (ret) {
        global.socket.off('on-details');

        self.setState({
          nickname: ret.nickname,
          email: ret.email,
        });
      });

      let params = {};

      params['firstname'] = '';
      params['lastname'] = '';
      params['dob'] = moment(new Date()).format('YYYY-MM-DD  HH:mm:ss ');
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

      // if (gender_rb == '0') {
      // }

      global.socket.emit('on-details', params);
    });
  }

  render() {
    let gender = [
      {label: '男性', value: 0},

      {label: '女性', value: 1},
    ];
    let second = [
      {label: '未設定', value: 0},

      {label: '吸う', value: 1},

      {label: '時々吸う', value: 2},

      {label: '吸わない', value: 3},
    ];
    let third = [
      {label: '未設定', value: 0},

      {label: '飲む', value: 1},

      {label: '時々飲む', value: 2},

      {label: '飲まない', value: 3},
    ];
    let fourth = [
      {label: '未婚', value: 0},

      {label: '既婚', value: 1},

      {label: '離婚', value: 2},
    ];
    let fifth = [
      {label: 'いない', value: 0},

      {label: 'いる', value: 1},
    ];
    let sixth = [
      {label: 'あり', value: 0},

      {label: 'なし', value: 1},
    ];
    let seventh = [
      {label: '好き', value: 0},

      {label: '嫌い', value: 1},
    ];
    let Pets = [
      {label: 'いる', value: 0},

      {label: 'いない', value: 1},
    ];
    let holiday = [
      {label: 'インドア', value: 0},

      {label: 'アウトドア', value: 1},
    ];

    let Bloodtype = [{value: 'A'}, {value: 'B'}, {value: 'O'}, {value: 'AB'}];
    return (
      <View style={{backgroundColor: '#fff', height: '85%', width: '100%'}}>
        <ScrollView>
          <View style={{marginBottom: 50}}>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      height: 35,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 10,
                      width: windowWidth / 1.2,
                      paddingHorizontal: 10,

                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      color: 'black',
                    }}
                    placeholder={this.state.nickname}
                    value={this.state.nickname}
                    onChangeText={value => this.setNickname(value)}
                  />
                  <Text
                    style={{
                      bottom: 44,
                      right: 137,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 145,
                      color: 'black',
                      width: windowWidth / 4.6,
                      // this is nickname*********************
                    }}>
                    ニックネーム
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      width: windowWidth / 1.2,
                      height: 35,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 10,
                      paddingHorizontal: 10,
                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      height: 80,
                      color: 'black',
                    }}
                    placeholder={this.state.email}
                    value={this.state.email}
                    onChangeText={value => this.checkEmail(value)}
                  />
                  <Text
                    style={{
                      bottom: 88,
                      right: 132,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 143,
                      width: windowWidth / 4.2,
                      color: 'black',
                      // this is email*********************
                    }}>
                    メールアドレス
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      // alignSelf: 'center',
                      width: windowWidth / 1.2,
                      height: 95,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 60,
                      paddingHorizontal: 10,
                      // paddingVertical: 100,
                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      color: 'black',
                    }}
                  />
                  <Text
                    style={{
                      bottom: 103,
                      right: 130,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 140,
                      color: 'black',
                      width: windowWidth / 7.2,
                      // this is self introduction*********************
                    }}>
                    自己紹介
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      // alignSelf: 'center',
                      height: 35,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 10,
                      paddingHorizontal: 10,
                      width: windowWidth / 1.2,
                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      color: 'black',
                    }}
                  />
                  <Text
                    style={{
                      bottom: 44,
                      right: 130,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 139,
                      width: windowWidth / 4.2,
                      color: 'black',
                      // this is  area live in*********************
                    }}>
                    住んでいる地域
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      // alignSelf: 'center',
                      width: windowWidth / 1.2,
                      height: 95,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 60,
                      paddingHorizontal: 10,
                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      color: 'black',
                    }}
                  />
                  <Text
                    style={{
                      bottom: 103,
                      right: 141,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 150,
                      color: 'black',
                      width: windowWidth / 12.2,
                      // this is character*********
                    }}>
                    性格
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      // alignSelf: 'center',
                      width: windowWidth / 1.2,
                      height: 35,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 10,
                      paddingHorizontal: 10,
                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      color: 'black',
                    }}
                  />
                  <Text
                    style={{
                      bottom: 42,
                      right: 150,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 160,
                      color: 'black',
                      width: windowWidth / 12.2,
                      // this is society*********
                    }}>
                    趣味
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      // alignSelf: 'center',
                      width: windowWidth / 1.2,
                      height: 35,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 10,
                      paddingHorizontal: 10,
                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      color: 'black',
                    }}
                  />
                  <Text
                    style={{
                      bottom: 44,
                      right: 133,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 143,
                      color: 'black',
                      width: windowWidth / 12.2,
                      // this is graduate school*********
                    }}>
                    仕事
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      // alignSelf: 'center',
                      width: windowWidth / 1.2,
                      height: 35,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 10,
                      paddingHorizontal: 10,
                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      color: 'black',
                    }}
                  />
                  <Text
                    style={{
                      bottom: 44,
                      right: 133,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 143,
                      color: 'black',
                      width: windowWidth / 12.2,
                    }}>
                    会社
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  top: 15,
                  right: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TextInput
                    style={{
                      // alignSelf: 'center',
                      width: windowWidth / 1.2,
                      height: 35,
                      margin: 0,
                      borderWidth: 1,
                      paddingBottom: 10,
                      paddingHorizontal: 10,
                      left: 5,
                      borderColor: '#cdd5d5',
                      borderRadius: 4,
                      color: 'black',
                    }}
                  />
                  <Text
                    style={{
                      bottom: 44,
                      right: 133,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      marginHorizontal: 143,
                      color: 'black',
                      width: windowWidth / 7.2,
                    }}>
                    出身大学
                  </Text>
                </View>
              </View>
            </View>
            <Dropdown
              style={{
                top: 10,
                backgroundColor: 'white',
                borderWidth: 1,
                height: 40,
                width: windowWidth / 1.2,
                left: 25,
                borderRadius: 1,
                borderColor: '#cdd5d5',
                borderRadius: 4,
                color: 'black',
              }}
              label=""
              Blood={Bloodtype}
            />
            <Text
              style={{
                bottom: 40,
                right: 148,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 177,
                color: 'black',
                width: windowWidth / 9.2,
                // this is graduate bloodtype*********
              }}>
              血液型
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 4,
                  top: 20,
                  width: windowWidth / 1.2,
                  left: 25,
                  borderColor: '#cdd5d5',
                  alignItems: 'center',
                }}
                onPress={() => this.openDateModal()}></TouchableOpacity>
              <TouchableWithoutFeedback
                style={{width: windowWidth, height: 40}}
                onPress={() => this.closeDateModal()}>
                <View style={{width: '100%', height: 40}}>
                  <Text style={{top: 15}}>{this.chosenDate}</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalDatePicker}>
                <DateTimePicker
                  modalDatePicker={this.state.modalDatePicker}
                  textColor={global.textColor}
                  testID="dateTimePicker"
                  value={new Date(1598051730000)}
                  mode={'date'}
                  is24Hour={true}
                  display="spinner"
                  onChange={this.handleDate}
                />
              </Modal>
              <Text
                style={{
                  bottom: 78,
                  right: 148,
                  fontSize: 12,
                  backgroundColor: '#fff',
                  marginHorizontal: 177,
                  color: 'black',
                  width: windowWidth / 7.5,
                  // this is graduate bloodtype*********
                }}>
                生年月日
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 0,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
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
                selectedLabelColor={'black'}
                labelStyle={{fontSize: 15, paddingHorizontal: 30}}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 98,
                right: 148,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 177,
                color: 'black',
                width: windowWidth / 7.5,
                // this is graduate bloodtype*********
              }}>
              恋愛対象
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 20,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
              }}>
              <RadioForm
                radio_props={second}
                initial={0}
                onPress={value => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                buttonSize={8}
                buttonOuterSize={18}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 9,
                  paddingHorizontal: 0,
                  width: windowWidth / 6.5,
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{
                  top: 30,
                  width: windowWidth - 70,
                }}
              />
            </View>
            <Text
              style={{
                bottom: 78,
                right: 148,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 177,
                color: 'black',
                width: windowWidth / 9.5,
                // this is graduate bloodtype*********
              }}>
              タバコ
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 20,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
              }}>
              <RadioForm
                radio_props={third}
                initial={0}
                onPress={value => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                buttonSize={8}
                buttonOuterSize={18}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 9,
                  paddingHorizontal: 0,
                  width: windowWidth / 6.5,
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{
                  top: 30,
                  width: windowWidth - 70,
                }}
              />
            </View>
            <Text
              style={{
                bottom: 78,
                right: 148,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 177,
                color: 'black',
                width: windowWidth / 10.5,
                // this is graduate bloodtype*********
              }}>
              飲酒
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 20,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
              }}>
              <RadioForm
                radio_props={fourth}
                initial={0}
                onPress={value => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{fontSize: 15, paddingHorizontal: 30}}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 78,
                right: 148,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 177,
                color: 'black',
                width: windowWidth / 9.5,
                // this is graduate bloodtype*********
              }}>
              結婚歴
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 20,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
              }}>
              <RadioForm
                radio_props={fifth}
                initial={0}
                onPress={value => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{fontSize: 15, paddingHorizontal: 30}}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 78,
                right: 139,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 167,
                color: 'black',
                width: windowWidth / 4.8,
                // this is graduate bloodtype*********
              }}>
              子どもの有無
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 20,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
              }}>
              <RadioForm
                radio_props={sixth}
                initial={0}
                onPress={value => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{fontSize: 15, paddingHorizontal: 30}}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 78,
                right: 148,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 177,
                color: 'black',
                width: windowWidth / 6.3,
                // this is graduate bloodtype*********
              }}>
              結婚願望
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 20,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
              }}>
              <RadioForm
                radio_props={seventh}
                initial={0}
                onPress={value => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{fontSize: 15, paddingHorizontal: 30}}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 78,
                right: 142,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 170,
                color: 'black',
                width: windowWidth / 5.5,
                // this is graduate bloodtype*********
              }}>
              子ども好き
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 20,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
              }}>
              <RadioForm
                radio_props={Pets}
                initial={0}
                onPress={value => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{fontSize: 15, paddingHorizontal: 30}}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 78,
                right: 138,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 168,
                color: 'black',
                width: windowWidth / 5,
                // this is graduate bloodtype*********
              }}>
              ペットの有無
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 90,
                borderRadius: 4,
                top: 20,
                width: windowWidth / 1.2,
                left: 25,
                borderColor: '#cdd5d5',
                alignItems: 'center',
              }}>
              <RadioForm
                radio_props={holiday}
                initial={0}
                onPress={value => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{fontSize: 15, paddingHorizontal: 30}}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 78,
                right: 155,
                fontSize: 12,
                backgroundColor: '#fff',
                marginHorizontal: 185,
                color: 'black',
                width: windowWidth / 12,
                // this is graduate bloodtype*********
              }}>
              休日
            </Text>
          </View>
        </ScrollView>
        {/* Back Button */}
        <View
          style={{
            height: windowHeight / 13,
            width: '100%',
            top: windowHeight / 2 - 420,
          }}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              backgroundColor: '#ECECEC',
              height: windowHeight / 24,
              left: windowWidth / 16,
              flexDirection: 'row',
              width: windowWidth / 7,
              borderRadius: 2,
              bottom: windowHeight / 2 - 428,
            }}>
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
            <Text style={{right: 0, top: 6, color: 'black'}}>戻る</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              height: windowHeight / 25,
              left: windowWidth / 1.3,
              flexDirection: 'row',
              width: windowWidth / 5 - 5,
              borderRadius: 2,
              bottom: windowHeight / 2 - 397,
            }}
            onPress={() => this.save()}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5, color: 'black'}}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 10,
    left: 20,
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
});

const searchFields = [
  {
    name: 'nickname',
    type: 0,
    title: 'アカウントID',
    title_en: 'Account ID',
    db_name: 'nickname',
    rn_name: 'nickname',
  },

  {
    name: 'nickname',
    type: 0,
    title: 'アカウントID',
    title_en: 'Account ID',
    db_name: 'nickname',
    rn_name: 'nickname',
  },
  {
    name: 'introduce',
    type: 4,
    title: 'プロフィール',
    title_en: 'Introduce',
    db_name: 'introduce',
    rn_name: 'introduce',
  },
  {
    name: 'gender',
    type: 2,
    title: '性別',
    title_en: 'Gender',
    db_name: 'my_sex',
    rn_name: 'gender',
  },
  {
    name: 'age',
    unit: '',
    type: 3,

    switchtitle: '年齢非公開',
    switchtitle_en: 'Show Age',
    title: '年齢',
    title_en: 'Birthday',
    db_name: 'date_of_birth',
    rn_name: 'date_of_birth',
  },
  {
    name: 'language',

    type: 2,

    title: '言語',
    title_en: 'Language',
    db_name: 'my_language',
    rn_name: 'language',
  },
  {
    name: 'country',

    type: 2,

    title: '居住国',
    title_en: 'Country',
    db_name: 'my_country',
    rn_name: 'country',
  },
  {
    name: 'birthplace',

    type: 2,
    title: '出身国',
    title_en: 'Birthplace',
    db_name: 'my_birth_place',
    rn_name: 'birthplace',
  },
  {
    name: 'gender_interest',

    type: 2,
    title: '興味',
    title_en: 'Gender Interest',
    db_name: 'my_search_sex',
    rn_name: 'gender_interest',
  },
  {
    name: 'hobby',

    type: 2,
    title: '趣味',
    title_en: 'Hobby',
    multiselect: 1,
    db_name: 'my_hobby',
    rn_name: 'hobby',
  },
  {
    name: 'blood',

    type: 2,
    title: '血液型',
    title_en: 'Blood Type',
    db_name: 'my_blood',
    rn_name: 'blood',
  },
  {
    name: 'job',
    type: 2,

    title: '職業',
    title_en: 'Job',
    db_name: 'my_job',
    rn_name: 'job',
  },

  {
    name: 'wine',

    type: 2,
    title: '飲酒',
    title_en: 'Alcoholic drink',
    db_name: 'my_wine',
    rn_name: 'wine',
  },
  {
    name: 'brand',
    multiselect: 1,
    type: 2,
    title: '好きなブランド',
    title_en: 'Brand',
    db_name: 'my_brand',
    rn_name: 'brand',
  },

  {
    name: 'haircolor',

    type: 2,
    title: 'ヘアカラー',
    title_en: 'Hair Color',
    db_name: 'my_hair_color',
    rn_name: 'haircolor',
  },
  {
    name: 'eyescolor',

    type: 2,
    title: 'アイズカラー',
    title_en: 'Eye Color',
    db_name: 'my_eyes_color',
    rn_name: 'eyescolor',
  },
  {
    name: 'dresssize',

    type: 2,
    title: 'ドレスサイズ',
    title_en: 'Dress Size',
    db_name: 'my_dress_size',
    rn_name: 'dresssize',
  },
  {
    name: 'shoesize',

    type: 2,
    title: 'シューズサイズ',
    title_en: 'Shoe Size',
    db_name: 'my_shoe_size',
    rn_name: 'shoesize',
  },
  {
    name: 'modeloffer',

    type: 2,
    title: 'モデルオファー',
    title_en: 'Model Offer',
    db_name: 'my_model_offer',
    rn_name: 'modeloffer',
  },
  {
    name: 'weight',
    type: 0,
    unit: 'kg',
    keyboard_type: 1,
    title: '体重',
    title_en: 'Weight',
    db_name: 'my_weight_kg',
    rn_name: 'weight',
  },
  {
    name: 'bust_size',
    type: 0,
    unit: 'cm',
    title: 'バスト',
    title_en: 'Bust Size',
    db_name: 'my_bust_cm',
    rn_name: 'bust',
  },
  {
    name: 'breastsize',

    type: 2,
    title: 'カップ',
    title_en: 'Breast Size',
    db_name: 'my_breast_size',
    rn_name: 'breast',
  },
  {
    name: 'waist',
    unit: 'cm',
    type: 0,
    keyboard_type: 1,
    title: 'ウエスト',
    title_en: 'Waist',
    db_name: 'my_waist_cm',
    rn_name: 'waist',
  },
  {
    name: 'hip',
    unit: 'cm',
    type: 0,
    keyboard_type: 1,
    title: 'ヒップ',
    title_en: 'Hip',
    db_name: 'my_hip_cm',
    rn_name: 'hip',
  },
  {
    name: 'hairtype',

    type: 2,
    title: '髪型',
    title_en: 'Hair Type',
    db_name: 'my_hair_type',
    rn_name: 'hairtype',
  },
  {
    name: 'marriagestatus',
    type: 2,
    title: '結婚歴',
    title_en: 'Marriage Status',
    db_name: 'my_marriage_status',
    rn_name: 'marriagestatus',
  },
  {
    name: 'childnum',
    type: 2,
    title: '子供',
    title_en: 'Number of Children',
    db_name: 'my_child_num',
    rn_name: 'childnum',
  },
  {
    name: 'socialstatus',

    type: 2,
    title: '交際ステータス',
    title_en: 'Social Status',
    db_name: 'my_social_status',
    rn_name: 'socialstatus',
  },
];

const Blood = [
  {
    label: 'data 1',
  },
  {
    label: 'data 2',
  },
];

export default Happy;

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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Storage from '../utils/storage';
<<<<<<< Updated upstream
import Svg, {G, Path} from 'react-native-svg';

=======
import Svg, {
  G,
  Path,
  Stop,
  Defs,
  LinearGradient,
  Circle,
} from 'react-native-svg';
>>>>>>> Stashed changes
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
      // intgender:  this.state.intgender,
      modalDatePicker: false,
      saving: false,
      chosenDate: '',
<<<<<<< Updated upstream

      nicknameErrorOpacity: 0,

      searchValues: {},
=======
      nicknameErrorOpacity: 1,
>>>>>>> Stashed changes
    };
    this.goBack = this.goBack.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDateModal = this.closeDateModal.bind(this);
    this.openDateModal = this.openDateModal.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getJob = this.getJob.bind(this);
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
  // handleDate(dob) {
  //   this.setState({
  //     modalDatePicker: false,
  //     dob: moment(new Date()).format('YYYY-MM-DD'),
  //     // dob: moment(datetime).format('YYYY-MM-DD  HH:mm:ss '),
  //   });
 
  // }
 
  handleDate(value, selectedDate) {
    let self = this;
 
    let formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    let completeFormatDate = moment(selectedDate).format('YYYY-MM-DD');
 
    global.birthday = formattedDate;
    console.log( global.birthday );
  }
<<<<<<< Updated upstream

  onDateChange(event, selectedDate) {
    let self = this;

    let formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    let completeFormatDate = moment(selectedDate).format('YYYY-MM-DD');

    let searchValues = this.state.searchValues;

    for (var i = 0; i < this.arrSearch.length; i++) {
      if (this.arrSearch[i].db_dob == 'dob') {
        global.birthday = formattedDate;

        searchValues[this.arrSearch[i].dob] = completeFormatDate;

        break;
      }
    }

    console.log(searchValues);

    this.setState({
      searchValues: searchValues,
    });
  }

=======
 
>>>>>>> Stashed changes
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
        global.socket.on('emit-check-nickname', function (ret) {
          global.socket.off('emit-check-nickname');
          console.log(ret);
          if (ret.exists == 1) {
            self.valid1 = true;

            self.setState({
              nicknameErrorOpacity: 1,
            });
          } else {
            self.valid1 = true;
            self.setState({
              nicknameErrorOpacity: 0,
            });
          }
<<<<<<< Updated upstream

          // self.save();
=======
          self.save();
>>>>>>> Stashed changes
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
              // alert(JSON.stringify(ret));
          self.setState({
            nickname: global.nickname,
            email: global.email,
          });
        });
        let params = {};
        params['firstname'] = '';
        params['lastname'] = '';
<<<<<<< Updated upstream
        params['dob'] =  this.state.dob ;
=======
        params['dob'] = global.birthday;
>>>>>>> Stashed changes
        params['about'] = this.state.about;
        params['job'] = this.state.job_title;
        params['company'] = this.state.company;
        params['school'] = this.state.school;
        params['gender'] = this.state.gender;
        params['gender_pref'] = this.state.gender_pref;
        params['distance_threshold'] = 0;
        params['nickname'] = this.state.nickname;
        params['smoking'] = this.state.smoker;
        params['drinking'] = this.state.drink;
        params['marrried'] = this.state.married;
        params['presence_of_children'] = this.state.presence_of_children;
        params['like_children_or_not'] = this.state.like_children_or_not;
        params['marriage_desire'] = this.state.marriage_desire;
        params['presence_of_pet'] = this.state.presence_of_pet;
        params['holiday'] = this.state.holiday;
        params['hobbie'] = this.state.hobbie;
        params['bloodtype'] = this.state.bloodtype;
        params['email'] = this.state.email;
        params['name'] = '';
        params['introduction'] = this.state.introduction;
        params['character'] = this.state.character;
        params['location'] = '';
        params['intLicUpload'] = global.age_verified;
        // if (gender_rb == '0') {
        // }
<<<<<<< Updated upstream
        self.props.navigationRef.current?.navigate('Dashboard');

=======
        self.props.navigation.navigate('home');
>>>>>>> Stashed changes
        console.log(params);
        global.socket.emit('on-details-save-new', params);
      },
    );
  }
  componentDidMount(selectedDate) {
    this.getProfile();
<<<<<<< Updated upstream
    this.setNickname();
    // this.initProfile();
  }

  componentWillUnmount() {
    this.getProfile();
  }

 
=======
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // Alert.alert('Refreshed');
      this.getProfile();
    });
    // let formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    // global.birthday = formattedDate;
    // this.handleDate();
  }
 
  componentWillUnmount() {
    this.getProfile();
    this._unsubscribe();
 
  }
  // this.initProfile();
 
  // initProfile() {
  //   let self = this;
  //   this.setState({}, () => {
  //     global.socket.on('emit-details', function (ret) {
  //       global.socket.off('emit-details');
  //       // alert(JSON.stringify(ret));
  //       self.setState({
  //         nickname: ret.nickname,
  //         email: ret.email,
  //         introduction: ret.introduction,
  //         character: ret.character,
  //         company: ret.company,
  //         dob: ret.dob,
  //         drink: ret.drink,
  //         gender: ret.gender,
  //         gender_pref: ret.gender_pref,
  //         hobbie: ret.hobbie,
  //         about: ret.about,
  //         holiday: ret.holiday,
  //         job_title: ret.job_title,
  //         like_children_or_not: ret.like_children_or_not,
  //         location: ret.location,
  //         marriage_desire: ret.marriage_desire,
  //         married: ret.marital_status,
  //         presence_of_children: ret.presence_of_children,
  //         presence_of_pet: ret.presence_of_pet,
  //         school: ret.school,
  //         smoker: ret.smoker,
  //       });
  //       // self.state.intgender = ret.gender;
  //       // global.gender = self.state.gender ;
  //     });
  //     // global.gender = this.state.gender;
  //     // let params = {};
  //     // params['firstname'] = '';
  //     // params['lastname'] = '';
  //     // params['dob'] = moment(new Date()).format('YYYY-MM-DD');
  //     // params['about'] = this.state.about;
  //     // params['job'] = this.state.job_title;
  //     // params['company'] = this.state.company;
  //     // params['school'] = this.state.school;
  //     // params['gender'] = this.state.intgender;
  //     // params['gender_pref'] = 1;
  //     // params['distance_threshold'] = 0;
  //     // params['nickname'] = this.state.nickname;
  //     // params['smoking'] = 0;
  //     // params['drinking'] = 0;
  //     // params['marrried'] = 0;
  //     // params['presence_of_children'] = 0;
  //     // params['like_children_or_not'] = 0;
  //     // params['marriage_desire'] = 0;
  //     // params['presence_of_pet'] = 0;
  //     // params['holiday'] = 0;
  //     // params['hobbie'] = this.state.hobbie;
  //     // params['bloodtype'] = '';
  //     // params['email'] = this.state.email;
  //     // params['name'] = '';
  //     // params['introduction'] = this.state.introduction;
  //     // params['character'] = this.state.character;
  //     // params['location'] = '';
  //     //  alert(this.state.job_title);
  //     // global.job_title = this.state.job_title;
  //     //  alert(global.about);
  //     // if (gender_rb == '0') {
  //     // }
  //     global.socket.emit('on-details');
  //   });
  // }
>>>>>>> Stashed changes
  getProfile() {
 
    if (global.birthday == null) {
      global.birthday = '1970-01-01';
    } else {
      global.birthday = moment(new Date(global.birthday)).format('YYYY-MM-DD');
    }
    let self = this;
    this.setState({}, () => {
      global.socket.on('emit-details', function (ret) {
        global.socket.off('emit-details');
        // alert(JSON.stringify(ret));
        self.setState({
          nickname: ret.nickname,
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
 
      });
      this.state.children = global.presence_of_children;
      global.socket.emit('on-details');
    });
  }
  getIntroduction(introduction) {
    let self = this;
    this.setState(
      {
        introduction: introduction,
      },
      () => {
        if (introduction == '') {
        } else {
          self.valid1 = true;
          self.setState({
            introductionOpacity: 0,
          });
        }
        // self.goSave();
      },
    );
  }
  // getIntroduction(introduction) {
  //   let self = this;
  //   this.setState(
  //     {
  //       introduction: introduction,
  //     },
  //     () => {
  //       if (introduction == '') {
  //       } else {
  //         self.valid1 = true;
  //         self.setState({
  //           introductionOpacity: 0,
  //         });
  //       }
  //       // self.goSave();
  //     },
  //   );
  // }
  getLocation(about) {
    let self = this;
    this.setState(
      {
        about: about,
      },
      () => {
        if (about == '') {
        } else {
          self.valid1 = true;
          self.setState({
            characterOpacity: 0,
          });
        }
        // self.goSave();
      },
    );
  }
  getCharacter(character) {
    let self = this;
    this.setState(
      {
        character: character,
      },
      () => {
        if (character == '') {
        } else {
          self.valid1 = true;
          self.setState({
            characterOpacity: 0,
          });
        }
        // self.goSave();
      },
    );
  }
  getHobbie(hobbie) {
    let self = this;
    this.setState(
      {
        hobbie: hobbie,
      },
      () => {
        if (hobbie == '') {
        } else {
          self.valid1 = true;
          self.setState({
            hobbieOpacity: 0,
          });
        }
        // self.goSave();
      },
    );
  }
  getJob(job_title) {
    let self = this;
    this.setState(
      {
        job_title: job_title,
      },
      () => {
        if (job_title == '') {
        } else {
          self.valid1 = true;
          self.setState({
            jobOpacity: 0,
          });
        }
        // self.goSave();
      },
    );
  }
  getCompany(company) {
    let self = this;
    this.setState(
      {
        company: company,
      },
      () => {
        if (company == '') {
        } else {
          self.valid1 = true;
          self.setState({
            companyOpacity: 0,
          });
        }
        // self.goSave();
      },
    );
  }
  getSchool(school) {
    let self = this;
    this.setState(
      {
        school: school,
      },
      () => {
        if (school == '') {
        } else {
          self.valid1 = true;
          self.setState({
            schoolOpacity: 0,
          });
        }
        // self.goSave();
      },
    );
  }
  getBloodtype(bloodtype) {
    // alert(bloodtype);
    this.setState({
      bloodtype: bloodtype,
    });
  }
  // getSchool(gender) {
  //   let self = this;
  //   this.setState(
  //     {
  //       gender: gender,
  //     },
  //     () => {
  //       if (school == '') {
  //       } else {
  //         self.valid1 = true;
  //         self.setState({
  //           schoolOpacity: 0,
  //         });
  //       }
  //       // self.goSave();
  //     },
  //   );
  // }
  getGender(gender) {
    // alert(value);
    this.setState({
      gender: gender,
    });
  }
  getSmoking(smoker) {
    // alert(value);
    this.setState({
      smoker: smoker,
    });
  }
  getDrinking(drink) {
    // alert(value);
    this.setState({
      drink: drink,
    });
  }
  getMarried(married) {
    this.setState({
      married: married,
    });
  }
  // getMarried(married) {
  //   this.setState({
  //     married: married,
  //   });
  // }
  getPoc(presence_of_children) {
    this.setState({
      presence_of_children: presence_of_children,
    });
  }
  getDtm(marriage_desire) {
    this.setState({
      marriage_desire: marriage_desire,
    });
  }
  getLcon(like_children_or_not) {
    this.setState({
      like_children_or_not: like_children_or_not,
    });
  }
  getPet(presence_of_pet) {
    this.setState({
      presence_of_pet: presence_of_pet,
    });
  }
  getHoliday(holiday) {
    this.setState({
      holiday: holiday,
    });
  }
  render() {
    let genders = [
      {label: '男性', value: 0},
      {label: '女性', value: 1},
    ];
    let smokings = [
      {label: '未設定', value: 0},
      {label: '吸う', value: 1},
      {label: '時々吸う', value: 2},
      {label: '吸わない', value: 3},
    ];
    let drinkings = [
      {label: '未設定', value: 0},
      {label: '飲む', value: 1},
      {label: '時々飲む', value: 2},
      {label: '飲まない', value: 3},
    ];
    let marrieds = [
      {label: '未婚', value: 0},
      {label: '既婚', value: 1},
      {label: '離婚', value: 2},
    ];
    let presence_of_children = [
      {label: 'いない', value: 0},
      {label: 'いる', value: 1},
    ];
    let marriage_desires = [
      {label: 'あり', value: 0},
      {label: 'なし', value: 1},
    ];
    let like_children_or_nots = [
      {label: '好き', value: 0},
      {label: '嫌い', value: 1},
    ];
    let presence_of_pets = [
      {label: 'いる', value: 0},
      {label: 'いない', value: 1},
    ];
    let holidays = [
      {label: 'インドア', value: 0},
      {label: 'アウトドア', value: 1},
    ];
    let Bloodtype = [{value: 'A'}, {value: 'B'}, {value: 'O'}, {value: 'AB'}];
    return (
<<<<<<< Updated upstream
      <View style={{backgroundColor: '#fff', height: '85%', width: '100%'}}>
        <ScrollView>
          <View style={{marginBottom: 110}}>
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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.nickname}
                    value={this.state.nickname}
                    onChangeText={value => this.setNickname(value)}
                  />
                  <Text
                    style={{
                      left: 168,
                      backgroundColor: '#fff',
                      // marginHorizontal: 145,
                      color: 'red',
                      fontSize: 10,
                      bottom: 42,
                      alignSelf: 'flex-start',
                      opacity: this.state.nicknameErrorOpacity,
                      // this is nickname*********************
                    }}>
                    ニックネームはすでに存在します
                  </Text>
                  <Text
                    style={{
                      left: 10,
                      backgroundColor: '#fff',
                      // marginHorizontal: 145,
                      color: '#5B5B5B',
                      fontSize: 10,
                      bottom: 56,
                      alignSelf: 'flex-start',
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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.email}
                    value={this.state.email}
                    onChangeText={value => this.checkEmail(value)}
                  />
                  <Text
                    style={{
                      bottom: 87,
                      backgroundColor: '#fff',
                      left: 10,
                      alignSelf: 'flex-start',
                      color: '#5B5B5B',
                      fontSize: 10,

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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.introduction}
                    value={this.state.introduction}
                    onChangeText={value => this.getIntroduction(value)}
                  />
                  <Text
                    style={{
                      bottom: 103,
                      fontSize: 12,
                      backgroundColor: '#fff',
                      left: 10,
                      color: '#5B5B5B',
                      fontSize: 10,
                      alignSelf: 'flex-start',
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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.about}
                    value={this.state.about}
                    onChangeText={value => this.getLocation(value)}
                  />
                  <Text
                    style={{
                      bottom: 44,
                      backgroundColor: '#fff',
                      left: 10,
                      alignSelf: 'flex-start',
                      color: '#5B5B5B',
                      fontSize: 10,
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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.character}
                    value={this.state.character}
                    onChangeText={value => this.getCharacter(value)}
                  />
                  <Text
                    style={{
                      bottom: 103,
                      backgroundColor: '#fff',
                      left: 10,
                      color: '#5B5B5B',
                      fontSize: 10,
                      alignSelf: 'flex-start',
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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.hobbie}
                    value={this.state.hobbie}
                    onChangeText={value => this.getHobbie(value)}
                  />
                  <Text
                    style={{
                      bottom: 42,
                      backgroundColor: '#fff',
                      left: 10,
                      color: '#5B5B5B',
                      fontSize: 10,
                      alignSelf: 'flex-start',
                      // this is hobbie*********
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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.job_title}
                    value={this.state.job_title}
                    onChangeText={value => this.getJob(value)}
                  />
                  <Text
                    style={{
                      bottom: 42,
                      backgroundColor: '#fff',
                      left: 10,
                      color: '#5B5B5B',
                      fontSize: 10,
                      alignSelf: 'flex-start',
                      // this is job*********
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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.company}
                    value={this.state.company}
                    onChangeText={value => this.getCompany(value)}
                  />
                  <Text
                    style={{
                      bottom: 42,
                      backgroundColor: '#fff',
                      left: 10,
                      color: '#5B5B5B',
                      fontSize: 10,
                      alignSelf: 'flex-start',
                      // this is company*********
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
                      color: '#5B5B5B',
                    }}
                    placeholder={this.state.school}
                    value={this.state.school}
                    onChangeText={value => this.getSchool(value)}
                  />
                  <Text
                    style={{
                      bottom: 42,
                      backgroundColor: '#fff',
                      left: 10,
                      color: '#5B5B5B',
                      fontSize: 10,
                      alignSelf: 'flex-start',
                      // Graduating school*************
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
                color: '#5B5B5B',
              }}
              // label={this.state.bloodtype}
              data={Bloodtype}
              onChangeText={value => this.getBloodtype(value)}
              value={this.state.bloodtype}
            />
            <Text
              style={{
                bottom: 38,
                backgroundColor: '#fff',
                left: 30,
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
                // this is graduate bloodtype*********
              }}>
              血液型
            </Text>
            <View style={{paddingBottom: 30}}>
              {/* <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 4,
                  top: 20,
                  width: windowWidth / 1.2,
                  left: 25,
                  borderColor: '#cdd5d5',
                  alignItems: 'center',
                  // backgroundColor:'red',
                }}
                onPress={() => this.openDateModal()}></TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => this.openDateModal(this.state.nickname)}>
                <Text
=======
      <View
        style={{
          backgroundColor: '#FFF',
          height: windowHeight,
          width: windowWidth,
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#FFF',
            height: windowHeight,
            width: windowWidth - 30,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 0,
              marginTop: windowHeight / 10 - 60,
              width: 40,
              height: 40,
              backgroundColor: '#FFF5F8',
              borderRadius: 10,
            }}
            onPress={() => this.goBack()}>
            <Svg
              style={{alignSelf: 'center', top: 10, right: 2}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              width="16"
              height="21"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.65863 10.0143C5.39578 10.2771 4.96961 10.2771 4.70676 10.0143L0.668298 5.97582C0.405446 5.71297 0.405446 5.2868 0.668298 5.02395L4.70676 0.985489C4.96961 0.722635 5.39578 0.722635 5.65863 0.985489C5.92149 1.24834 5.92149 1.67451 5.65863 1.93736C3.69111 3.90489 3.69111 7.09488 5.65863 9.06241C5.92149 9.32526 5.92149 9.75143 5.65863 10.0143Z"
                fill="#EA337E"
              />
              <Defs>
                <LinearGradient
                  id="paint0_linear_50_2341"
                  x1="3.16347"
                  y1="10.2114"
                  x2="3.16347"
                  y2="0.788349"
                  gradientUnits="userSpaceOnUse">
                  <Stop stop-color="#ED70B0" />
                  <Stop offset="1" stop-color="#EA337E" />
                </LinearGradient>
              </Defs>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFF5F8',
              height: windowHeight / 25,
              left: windowWidth / 1.4,
              flexDirection: 'row',
              width: windowWidth / 5 - 5,
              borderRadius: 10,
              bottom: 34,
            }}
            onPress={() => this.save()}>
            <Svg
              style={{alignSelf: 'center', left: 9, height: 20, width: 20}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <Path
                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 416c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"
                fill="#EA337E"
              />
            </Svg>
            <Text style={{left: 15, top: 5, color: 'black'}}>保存</Text>
          </TouchableOpacity>
          <ScrollView
            style={{
              alignSelf: 'center',
              width: windowWidth - 30,
              height: windowHeight,
            }}>
            <View
              style={{
                marginBottom: 110,
                top: 30,
                alignSelf: 'center',
                width: windowWidth - 20,
                // height:windowHeight
              }}>
              <View style={styles.container}>
                <View
                  style={{
                    // flex: 1,
                    top: 15,
                    // right: 20,
                    // marginHorizontal: 20,
                    width: windowWidth,
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    // backgroundColor:'gray'
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
                    <TextInput
                      style={{
                        height: 35,
                        // margin: 0,
                        borderWidth: 1,
                        paddingBottom: 10,
                        width: windowWidth / 1.2,
                        paddingHorizontal: 10,
                        alignSelf: 'center',
                        // left: 5,
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        color: 'black',
                        fontSize: 14,

                      }}
                      maxLength={16}
                      placeholder={this.state.nickname}
                      value={this.state.nickname}
                      onChangeText={value => this.setNickname(value)}
                    />
                    <Text
                      style={{
                        left: '10%',
                        backgroundColor: '#fff',
                        // marginHorizontal: 145,
                        color: 'gray',
                        fontSize: 12,
                        bottom: 55,
                        fontWeight: 'bold',
                        alignSelf: 'flex-start',
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
                    // flex: 1,
                    top: 15,
                    // right: 20,
                    // marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: windowWidth,
                    height: '100%',
                    // backgroundColor:'red'
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
                    <TextInput
                      style={{
                        width: windowWidth / 1.2,
                        height: 35,
                        // margin: 0,
                        borderWidth: 1,
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                        // left: 5,
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        height: 80,
                        color: 'black',
                        alignSelf: 'center',
                      }}
                      placeholder={this.state.email}
                      value={this.state.email}
                      onChangeText={value => this.checkEmail(value)}
                    />
                    <Text
                      style={{
                        bottom: 100,
                        backgroundColor: '#fff',
                        left: '10%',
                        alignSelf: 'flex-start',
                        color: 'gray',
                        fontSize: 12,
                        fontWeight: 'bold',
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
                    // flex: 1,
                    top: 15,
                    // right: 20,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth,
                    height: '100%',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
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
                        // left: 5,
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        alignSelf: 'center',
                        color: 'black',
                      }}
                      placeholder={this.state.introduction}
                      value={this.state.introduction}
                      onChangeText={value => this.getIntroduction(value)}
                    />
                    <Text
                      style={{
                        bottom: 116,
                        fontSize: 12,
                        backgroundColor: '#fff',
                        left: '10%',
                        color: 'gray',
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        fontWeight: 'bold',
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
                    width: windowWidth,
                    height: '100%',
                    top: 15,
                    // right: 20,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
                    <TextInput
                      style={{
                        // alignSelf: 'center',
                        height: 35,
                        margin: 0,
                        borderWidth: 1,
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                        width: windowWidth / 1.2,
                        // left: 5,
                        alignSelf: 'center',
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        color: 'black',
                      }}
                      placeholder={this.state.about}
                      value={this.state.about}
                      onChangeText={value => this.getLocation(value)}
                    />
                    <Text
                      style={{
                        bottom: 57,
                        backgroundColor: '#fff',
                        left: '10%',
                        alignSelf: 'flex-start',
                        color: 'gray',
                        fontSize: 12,
                        fontWeight: 'bold',
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
                    width: windowWidth,
                    height: '100%',
                    top: 15,
                    // right: 20,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
                    <TextInput
                      style={{
                        // alignSelf: 'center',
                        width: windowWidth / 1.2,
                        height: 95,
                        margin: 0,
                        borderWidth: 1,
                        paddingBottom: 60,
                        paddingHorizontal: 10,
                        // left: 5,
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        color: 'black',
                        alignSelf: 'center',
                      }}
                      placeholder={this.state.character}
                      value={this.state.character}
                      onChangeText={value => this.getCharacter(value)}
                    />
                    <Text
                      style={{
                        bottom: 116,
                        backgroundColor: '#fff',
                        left: '10%',
                        color: 'gray',
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        fontWeight: 'bold',
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
                    width: windowWidth,
                    height: '100%',
                    top: 15,
                    // right: 20,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
                    <TextInput
                      style={{
                        // alignSelf: 'center',
                        width: windowWidth / 1.2,
                        height: 35,
                        margin: 0,
                        borderWidth: 1,
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                        // left: 5,
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        color: 'black',
                        alignSelf: 'center',
                      }}
                      placeholder={this.state.hobbie}
                      value={this.state.hobbie}
                      onChangeText={value => this.getHobbie(value)}
                    />
                    <Text
                      style={{
                        bottom: 55,
                        backgroundColor: '#fff',
                        left: '10%',
                        color: 'gray',
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        fontWeight: 'bold',
                        // this is hobbie*********
                      }}>
                      趣味
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View
                  style={{
                    width: windowWidth,
                    height: '100%',
                    top: 15,
                    // right: 20,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
                    <TextInput
                      style={{
                        // alignSelf: 'center',
                        width: windowWidth / 1.2,
                        height: 35,
                        margin: 0,
                        borderWidth: 1,
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                        // left: 5,
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        color: 'black',
                        alignSelf: 'center',
                      }}
                      placeholder={this.state.job_title}
                      value={this.state.job_title}
                      onChangeText={value => this.getJob(value)}
                    />
                    <Text
                      style={{
                        bottom: 55,
                        backgroundColor: '#fff',
                        left: '10%',
                        color: 'gray',
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        fontWeight: 'bold',
                        // this is job*********
                      }}>
                      仕事
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View
                  style={{
                    width: windowWidth,
                    height: '100%',
                    top: 15,
                    // right: 20,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
                    <TextInput
                      style={{
                        // alignSelf: 'center',
                        width: windowWidth / 1.2,
                        height: 35,
                        margin: 0,
                        borderWidth: 1,
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                        // left: 5,
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        color: 'black',
                        alignSelf: 'center',
                      }}
                      placeholder={this.state.company}
                      value={this.state.company}
                      onChangeText={value => this.getCompany(value)}
                    />
                    <Text
                      style={{
                        bottom: 55,
                        backgroundColor: '#fff',
                        left: '10%',
                        color: 'gray',
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        fontWeight: 'bold',
                        // this is company*********
                      }}>
                      会社
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View
                  style={{
                    width: windowWidth,
                    height: '100%',
                    top: 15,
                    // right: 20,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: windowWidth,
                      height: '100%',
                    }}>
                    <TextInput
                      style={{
                        // alignSelf: 'center',
                        width: windowWidth / 1.2,
                        height: 35,
                        margin: 0,
                        borderWidth: 1,
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                        // left: 5,
                        borderColor: '#EA337E',
                        borderRadius: 4,
                        color: 'black',
                        alignSelf: 'center',
                      }}
                      placeholder={this.state.school}
                      value={this.state.school}
                      onChangeText={value => this.getSchool(value)}
                    />
                    <Text
                      style={{
                        bottom: 55,
                        backgroundColor: '#fff',
                        left: '10%',
                        color: 'gray',
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        fontWeight: 'bold',
                        // Graduating school*************
                      }}>
                      出身大学
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View        style={{
                    top: 10,
                    backgroundColor: '#FFF',
                    borderWidth: 1,
                    height: 40,
                    width: windowWidth / 1.2,
                    // left:0,
                    // borderRadius: 1,
                    borderColor: '#EA337E',
                    borderRadius: 4,
                    color: 'black',
                    alignSelf: 'center',
                 
                  }}>
                <Dropdown
                  style={{
                    bottom: 1,
                    backgroundColor: 'transparent',
                    // borderWidth: 1,
                    height: 40,
                    width: windowWidth / 1.2 - 12,
                    // left:0,
                    // borderRadius: 1,
                    borderColor: '#EA337E',
                    borderRadius: 4,
                    color: 'black',
                    alignSelf: 'center',
                 
                  }}
                  itemColor={'red'}
                  // label={this.state.bloodtype}
                  data={Bloodtype}
                  onChangeText={value => this.getBloodtype(value)}
                  value={this.state.bloodtype}
                />
                </View>
              </View>
              <Text
                style={{
                  bottom: '3.9%',
                  // right: windowWidth/2 ,
                  backgroundColor: '#fff',
                  color: 'gray',
                  left: '8.5%',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
                  // this is graduate bloodtype*********
                }}>
                血液型
              </Text>
              <View style={{alignSelf: 'center', width: windowWidth}}>
                <TouchableOpacity
>>>>>>> Stashed changes
                  style={{
                    borderWidth: 1,
                    height: 50,
                    borderRadius: 4,
                    top: 20,
                    width: windowWidth / 1.2,
<<<<<<< Updated upstream
                    left: 25,
                    borderColor: '#cdd5d5',
                    alignItems: 'center',
                    textAlign:'center'
                    // backgroundColor:'red',
=======
                    // left: 15,
                    borderColor: '#EA337E',
                    alignSelf: 'center',
                    marginBottom: 20,
                  }}
                  onPress={() => this.openDateModal()}>
                  <Text
                    style={{
                      top: 12,
                      alignSelf: 'center',
                      color: 'black',
                    }}
                    // value={this.state.dob}
                    // onChangeText={value => this.handleDate(value)}
                    >
                    {global.birthday}
                  </Text>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalDatePicker}>
                  <TouchableWithoutFeedback
                    style={{
                      width: windowWidth,
                      height: windowHeight - 220,
                    }}
                    onPress={() => this.closeDateModal()}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        // backgroundColor:'red'
                      }}></View>
                  </TouchableWithoutFeedback>
                  <DateTimePicker
                    modalDatePicker={this.state.modalDatePicker}
                    textColor={global.textColor}
                    testID="dateTimePicker"
                    value={new Date(global.birthday)}
                    mode={'date'}
                    is24Hour={true}
                    display="spinner"
                    onChange={this.handleDate}
                      // onChange={value => this.handleDate(value)}
                  />
                </Modal>
                <Text
                  style={{
                    bottom: 72,
                    backgroundColor: '#fff',
                    left: '10%',
                    color: 'gray',
                    fontSize: 12,
                    alignSelf: 'flex-start',
                    fontWeight: 'bold',
                    // this is graduate dateofbirth*********
>>>>>>> Stashed changes
                  }}>
                  {parseInt(this.state.searchValues[this.state.dob]) != 0
                    ? moment(
                        this.state.searchValues[this.state.dob],
                      ).format('YYYY-MM-DD')
                    : '01-01-1970'}
                </Text>
<<<<<<< Updated upstream
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalDatePicker}>
                <TouchableWithoutFeedback
                  style={{width: windowWidth, height: windowHeight - 220}}
                  onPress={() => this.closeDateModal()}>
                  <View
                    style={{width: '100%', height: windowHeight - 220}}></View>
                </TouchableWithoutFeedback>
                <DateTimePicker
                  modalDatePicker={this.state.modalDatePicker}
                  // onCancel={() => this.closeDateModal()}
                  // onOk={() => this.closeDateModal()}
                  textColor={global.textColor}
                  testID="dateTimePicker"
                  value={new Date()}
                  // value = {}
                  mode={'date'}
                  is24Hour={true}
                  display="spinner"
                  onChange={this.onDateChange}
=======
              </View>
              <View
                style={{
                  borderWidth: 1,
                  height: 90,
                  borderRadius: 4,
                  top: 20,
                  width: windowWidth / 1.2,
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignItems: 'center',
                  marginBottom: 40,
                }}>
                <RadioForm
                  radio_props={genders}
                  initial={global.gender}
                  // onPress={value => {
                  //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  // }}
                  onPress={value => this.getGender(value)}
                  buttonSize={10}
                  value={this.state.gender}
                  buttonOuterSize={20}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 150,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: '42%',
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
>>>>>>> Stashed changes
                />
              </Modal>
              <Text
                style={{
<<<<<<< Updated upstream
                  bottom: 36,
                  backgroundColor: '#fff',
                  left: 30,
                  color: '#5B5B5B',
                  fontSize: 10,
                  alignSelf: 'flex-start',

                  // this is graduate dateofbirth*********
                }}>
                生年月日
=======
                  bottom: '5.6%',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  left: '8.2%',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
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
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignSelf: 'center',
                  marginBottom: 30,
                }}>
                <RadioForm
                  radio_props={smokings}
                  initial={global.smoker}
                  // onPress={value => {
                  //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  // }}
                  onPress={value => this.getSmoking(value)}
                  value={this.state.smoker}
                  buttonSize={8}
                  buttonOuterSize={18}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 170,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: windowWidth - 100,
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
                />
              </View>
              <Text
                style={{
                  bottom: 122,
                  backgroundColor: '#fff',
                  left: '8.2%',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
                  // this is graduate prefGender*********
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
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <RadioForm
                  radio_props={drinkings}
                  initial={global.drink}
                  onPress={value => this.getDrinking(value)}
                  value={this.state.drink}
                  buttonSize={8}
                  buttonOuterSize={18}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 170,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: windowWidth - 100,
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
                />
              </View>
              <Text
                style={{
                  bottom: 122,
                  backgroundColor: '#fff',
                  left: '8.2%',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
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
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <RadioForm
                  radio_props={marrieds}
                  initial={global.married}
                  onPress={value => this.getMarried(value)}
                  value={this.state.married}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 170,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: windowWidth - 207,
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
                />
              </View>
              <Text
                style={{
                  bottom: 121,
                  fontSize: 12,
                  backgroundColor: '#fff',
                  left: '8.2%',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
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
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <RadioForm
                  radio_props={presence_of_children}
                  initial={global.presence_of_children}
                  onPress={value => this.getPoc(value)}
                  value={this.state.presence_of_children}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 170,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: '38%',
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
                />
              </View>
              <Text
                style={{
                  bottom: 121,
                  left: '8.2%',
                  backgroundColor: '#fff',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
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
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <RadioForm
                  radio_props={marriage_desires}
                  initial={global.marriage_desire}
                  onPress={value => this.getDtm(value)}
                  value={this.state.marriage_desire}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 170,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: '37%',
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
                />
              </View>
              <Text
                style={{
                  bottom: 111,
                  left: '8.2%',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
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
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <RadioForm
                  radio_props={like_children_or_nots}
                  initial={global.like_children_or_not}
                  onPress={value => this.getLcon(value)}
                  value={this.state.like_children_or_not}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 170,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: '37%',
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
                />
              </View>
              <Text
                style={{
                  bottom: 122,
                  left: '8.2%',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
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
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <RadioForm
                  radio_props={presence_of_pets}
                  initial={global.presence_of_pet}
                  onPress={value => this.getPet(value)}
                  value={this.state.presence_of_pet}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 170,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: '38%',
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
                />
              </View>
              <Text
                style={{
                  bottom: 110,
                  left: '8.2%',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
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
                  alignSelf: 'center',
                  borderColor: '#EA337E',
                  alignItems: 'center',
                }}>
                <RadioForm
                  radio_props={holidays}
                  initial={global.holiday}
                  onPress={value => this.getHoliday(value)}
                  value={this.state.holiday}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonColor={'grey'}
                  selectedButtonColor={'grey'}
                  selectedLabelColor={'black'}
                  labelStyle={{
                    fontSize: 9,
                    paddingHorizontal: windowWidth / 2 - 170,
                    // width: windowWidth / 7.5,
                    alignSelf: 'center',
                  }}
                  disabled={false}
                  formHorizontal={true}
                  labelHorizontal={true}
                  style={{
                    top: 30,
                    width: '47%',
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}
                />
              </View>
              <Text
                style={{
                  bottom: 90,
                  left: '8.2%',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  color: 'gray',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
                  // this is graduate holiday*********
                }}>
                休日
>>>>>>> Stashed changes
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
                radio_props={genders}
                initial={global.gender}
                // onPress={value => {
                //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                // }}
                onPress={value => this.getGender(value)}
                buttonSize={10}
                value={this.state.gender}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 15,
                  paddingHorizontal: 30,
                  color: '#5B5B5B',
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 96,
                fontSize: 12,
                backgroundColor: '#fff',
                left: 30,
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
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
                radio_props={smokings}
                initial={global.smoker}
                // onPress={value => {
                //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                // }}
                onPress={value => this.getSmoking(value)}
                value={this.state.smoker}
                buttonSize={8}
                buttonOuterSize={18}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 9,
                  paddingHorizontal: 0,
                  width: windowWidth / 6.5,
                  color: '#5B5B5B',
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
                bottom: 76,
                backgroundColor: '#fff',
                left: 30,
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
                // this is graduate prefGender*********
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
                radio_props={drinkings}
                initial={global.drink}
                onPress={value => this.getDrinking(value)}
                value={this.state.drink}
                buttonSize={8}
                buttonOuterSize={18}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 9,
                  paddingHorizontal: 0,
                  width: windowWidth / 6.5,
                  color: '#5B5B5B',
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
                bottom: 76,
                backgroundColor: '#fff',
                left: 30,
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
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
                radio_props={marrieds}
                initial={global.married}
                onPress={value => this.getMarried(value)}
                value={this.state.married}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 15,
                  paddingHorizontal: 30,
                  color: '#5B5B5B',
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 76,
                fontSize: 12,
                backgroundColor: '#fff',
                left: 30,
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
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
                radio_props={presence_of_childrens}
                initial={global.presence_of_children}
                onPress={value => this.getPoc(value)}
                value={this.state.presence_of_children}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 15,
                  paddingHorizontal: 30,
                  color: '#5B5B5B',
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 76,
                left: 30,

                backgroundColor: '#fff',

                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
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
                radio_props={marriage_desires}
                initial={global.marriage_desire}
                onPress={value => this.getDtm(value)}
                value={this.state.marriage_desire}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 15,
                  paddingHorizontal: 30,
                  color: '#5B5B5B',
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 76,
                left: 30,
                fontSize: 12,
                backgroundColor: '#fff',
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
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
                radio_props={like_children_or_nots}
                initial={global.like_children_or_not}
                onPress={value => this.getLcon(value)}
                value={this.state.like_children_or_not}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 15,
                  paddingHorizontal: 30,
                  color: '#5B5B5B',
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 76,
                left: 30,
                fontSize: 12,
                backgroundColor: '#fff',
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
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
                radio_props={presence_of_pets}
                initial={global.presence_of_pet}
                onPress={value => this.getPet(value)}
                value={this.state.presence_of_pet}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 15,
                  paddingHorizontal: 30,
                  color: '#5B5B5B',
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 76,
                left: 30,
                fontSize: 12,
                backgroundColor: '#fff',
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
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
                radio_props={holidays}
                initial={global.holiday}
                onPress={value => this.getHoliday(value)}
                value={this.state.holiday}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'grey'}
                selectedButtonColor={'grey'}
                selectedLabelColor={'black'}
                labelStyle={{
                  fontSize: 15,
                  paddingHorizontal: 30,
                  color: '#5B5B5B',
                }}
                disabled={false}
                formHorizontal={true}
                labelHorizontal={true}
                style={{top: 30}}
              />
            </View>
            <Text
              style={{
                bottom: 76,
                left: 30,
                fontSize: 12,
                backgroundColor: '#fff',
                color: '#5B5B5B',
                fontSize: 10,
                alignSelf: 'flex-start',
                // this is graduate holiday*********
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
            bottom: 90,
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              backgroundColor: '#ECECEC',
              marginHorizontal: 170,
              height: 31,
              right: 150,
              marginBottom: 30,
              flexDirection: 'row',
              width: 50,
              borderRadius: 2,
              // top:windowWidth /2 -170
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
            <Text style={{right: 0, top: 6, color: '#5B5B5B'}}>戻る</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              height: windowHeight / 25,
              left: windowWidth / 1.3,
              flexDirection: 'row',
              width: windowWidth / 5 - 5,
              borderRadius: 2,
              bottom: 60,
            }}
            onPress={() => this.save()}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5, color: '#5B5B5B'}}>保存</Text>
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
<<<<<<< Updated upstream
    marginBottom: 10,
    left: 20,
=======
    paddingBottom: 40,
    // left: 10,
    alignSelf: 'center',
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
    width: 60,
    height: 60,
    marginBottom: 5,
    marginLeft: 30,
  },
});
<<<<<<< Updated upstream

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
  // {
  //   name: 'job',
  //   type: 2,

  //   title: '職業',
  //   title_en: 'Job',
  //   db_name: 'my_job',
  //   rn_name: 'job',
  // },

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

=======
>>>>>>> Stashed changes
export default Happy;
 


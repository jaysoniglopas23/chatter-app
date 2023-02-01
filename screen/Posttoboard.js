import React, {Component} from 'react';
import {
  Container,
  Card,
  Card1,
  UserInfo,
  UserInfo1,
  UserImgWrapper,
  UserImg,
  UserImg1,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  MessageText1,
  TextSection,
  PostsImg,
  UserIcon,
} from '../styles/FeedStyles';
import {
  Image,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import _ from 'lodash';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
// import {getUsers, contains} from './api/index';
import {getUsers, contains} from '../styles/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import User from './User';
import Tabs from './tabs';
import moment from 'moment';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import {launchImageLibrary} from 'react-native-image-picker';
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
  Rect,
} from 'react-native-svg';
>>>>>>> Stashed changes

const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const DeviceWidth = Dimensions.get('window').width;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';
URL_UPLOAD_POST = 'http://18.181.88.243:8081/Post';

class Posttoboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasUploadPhoto: false,
      UploadPhoto: '',
      datetime: moment(new Date()).format('YYYY-MM-DD  HH:mm:ss '),
      postid: '',
      Description:'',
      description: '',
      boardid: '',
      fkboard: 1,
      descriptionOpacity: 1,
      loadingOpacity: 0,
    };

    this.goChat = this.goChat.bind(this);
    this.goSave = this.goSave.bind(this);
  }

  goChat() {
    this.props.navigation.navigate('User');
  }

  back() {
    this.props.navigation.push('Post');
    global.postid = '';
<<<<<<< Updated upstream
    global.description ='';
=======
    global.description = '';
    global.path = '';
    global.file = '';
>>>>>>> Stashed changes
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // Alert.alert('Refreshed');
      this.getEditPost();
    });
    this.getEditPost();
  }

  componentWillUnmount() {
    this.getEditPost();
    this._unsubscribe();
  }

  getEditPost() {
    let self = this;

    this.setState(
      {},

      () => {
        global.socket.on('emit-your-posts', function (ret) {
          global.socket.off('emit-your-posts');
          // alert(JSON.stringify(ret));
          // console.log(ret);

          self.setState({
            callRefreshed: true,
            refresh: 1,

            path: ret.path,
            id: ret.id,
            description: ret.description,
            file: ret.file,
          });
        });
        let params = {};

        params['name'] = this.state.name;
        params['userid'] = this.state.userid;
        params['description'] = global.description;
        params['id'] = global.postid;
        params['datetime'] = this.state.datetime;
        params['file'] = global.path;
        params['path'] = global.file;

        this.state.forDescription = global.description;

        // global.user_id = userid;
        // alert(global.postid);
        global.socket.emit('on-your-posts', params);
        // console.log(params);s
      },
    );
  }

  getDescription(description) {
    let self = this;

    this.setState(
      {
        description: description,
      },
      () => {
        if (description == '') {
        } else {
          self.valid1 = true;

          self.setState({
            descriptionOpacity: 0,
          });
        }

        // self.goSave();
      },
    );
  }

  postPhoto() {
    let self = this;

    this.setState(
      {
        modalVisible: false,
      },
      () => {
        launchImageLibrary(options, function (assets) {
          if (assets.didCancel) {
            console.log('User cancelled image picker');
          } else if (assets.error) {
            console.log('ImagePicker Error: ', assets.error);
          } else if (assets.customButton) {
            console.log('User tapped custom button: ', assets.customButton);
            alert(assets.customButton);
          } else {
            self.setState({
              // filename: assets.assets[0].fileName,
              UploadPhoto: assets.assets[0].uri,
              hasUploadPhoto: true,
            });
          }
        });
        let options = {mediaType: 'photo'};
      },
    );
  }

  goSave() {
    let self = this;

    let postid = postid;
    let datetime = datetime;
    let description = self.state.description;
    let boardid = boardid;
    let fkboard = fkboard;

    this.setState(
      {
        saving: true,
        loadingOpacity: 1,
      },

      () => {
        global.socket.on('emit-post-save', function (ret) {
          global.socket.off('emit-post-save');
          // alert(JSON.stringify(ret));
          // console.log(JSON.stringify(ret));

          self.setState({
            postid: ret.postid,
            loadingOpacity: 1,
          });

          if (self.state.hasUploadPhoto) {
            const data = new FormData();

            data.append('socketid', socketid);
            data.append('postid', self.state.postid);
            data.append('datetime', datetime);
            data.append('description', self.state.description);
            data.append('boardid', boardid);
            data.append('fkboard', fkboard);

            data.append('photo', {
              method: 'POST',
              uri: self.state.UploadPhoto,
              name: 'image.jpg',
              type: 'image/jpg',
            });
            console.log(JSON.stringify(data));
            fetch(URL_UPLOAD_POST, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              method: 'POST',

              body: data,
            })
              .then(body => {
                self.props.navigation.push('Post');
                global.postid = '';
                global.description = '';
                global.path = '';
                global.file = '';
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            let params = {};
            params['description'] = self.state.description;
<<<<<<< Updated upstream

=======
            global.postid = '';
            global.description = '';
            global.path = '';
            global.file = '';
>>>>>>> Stashed changes
            self.props.navigation.push('Post');
          }
        });
        let params = {};

        params['boardid'] = 1;
        params['postid'] = global.postid;
        params['description'] = this.state.description;
        params['datetime'] = this.state.datetime;
        params['fkboard'] = this.state.fkboard;

        // console.log(params);

        global.socket.emit('on-post-save', params);
      },
    );
    // this.props.navigationRef.current?.navigate('Dashboard');
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          // flex: 1,
          width: '100%',
          height: windowHeight,
          // borderBottomWidth: 0,
          // borderTopWidth: 10,
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#f8f8f9',
            height: windowHeight / 13,
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
              marginTop: windowHeight / 10 - 35,
              fontWeight: 'bold',
              color: '#FFF',
            }}>
            {this.state.title}
          </Text>

          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginTop: windowHeight / 10 - 65,
              width: 50,
              height: 30,
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
<<<<<<< Updated upstream
=======
        </View>
        <View
          style={{
            alignSelf: 'center',
            top: 0,
            width: windowWidth - 200,
            height: '10%',
          }}>
          <TouchableOpacity
            onPress={() => this.postPhoto()}
            style={{
              alignSelf: 'center',
              // top: 20,
              backgroundColor: '#FFF5F8',
              width: 45,
              height: 45,
              borderRadius: 10,
            }}>
            <Svg
              style={{alignSelf: 'center', top: 7, right: 1}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M21 10C20.7348 10 20.4804 10.1054 20.2929 10.2929C20.1054 10.4804 20 10.7348 20 11V14.38L18.52 12.9C17.9974 12.3815 17.2911 12.0906 16.555 12.0906C15.8189 12.0906 15.1126 12.3815 14.59 12.9L13.89 13.61L11.41 11.12C10.8874 10.6015 10.1811 10.3106 9.445 10.3106C8.70887 10.3106 8.00258 10.6015 7.48 11.12L6 12.61V7C6 6.73478 6.10536 6.48043 6.29289 6.29289C6.48043 6.10536 6.73478 6 7 6H15C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5C16 4.73478 15.8946 4.48043 15.7071 4.29289C15.5196 4.10536 15.2652 4 15 4H7C6.20435 4 5.44129 4.31607 4.87868 4.87868C4.31607 5.44129 4 6.20435 4 7V19.22C4.00264 19.9565 4.29637 20.6621 4.81715 21.1828C5.33794 21.7036 6.04351 21.9974 6.78 22H19.22C19.491 21.9978 19.7603 21.9574 20.02 21.88V21.88C20.5974 21.718 21.1058 21.3711 21.4671 20.8924C21.8283 20.4137 22.0226 19.8297 22.02 19.23V11C22.02 10.867 21.9935 10.7353 21.942 10.6126C21.8905 10.49 21.8151 10.3789 21.7201 10.2857C21.6251 10.1926 21.5125 10.1194 21.3888 10.0703C21.2652 10.0212 21.133 9.99734 21 10ZM7 20C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V15.43L8.89 12.54C9.03615 12.3947 9.23389 12.3131 9.44 12.3131C9.64611 12.3131 9.84385 12.3947 9.99 12.54L17.46 20H7ZM20 19C19.9936 19.1936 19.931 19.3812 19.82 19.54L15.3 15L16.01 14.3C16.0817 14.2268 16.1673 14.1687 16.2617 14.129C16.3561 14.0893 16.4576 14.0689 16.56 14.0689C16.6624 14.0689 16.7639 14.0893 16.8583 14.129C16.9527 14.1687 17.0383 14.2268 17.11 14.3L20 17.21V19ZM23 4H22V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2C20.7348 2 20.4804 2.10536 20.2929 2.29289C20.1054 2.48043 20 2.73478 20 3V4H19C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5C18 5.26522 18.1054 5.51957 18.2929 5.70711C18.4804 5.89464 18.7348 6 19 6H20V7C20 7.26522 20.1054 7.51957 20.2929 7.70711C20.4804 7.89464 20.7348 8 21 8C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7V6H23C23.2652 6 23.5196 5.89464 23.7071 5.70711C23.8946 5.51957 24 5.26522 24 5C24 4.73478 23.8946 4.48043 23.7071 4.29289C23.5196 4.10536 23.2652 4 23 4V4Z"
                fill="#EA337E"
              />
              <Defs>
                <LinearGradient
                  id="paint0_linear_50_2152"
                  x1="14"
                  y1="2"
                  x2="14"
                  y2="22"
                  gradientUnits="userSpaceOnUse">
                  <Stop stop-color="#ED70B0" />
                  <Stop offset="1" stop-color="#EA337E" />
                </LinearGradient>
              </Defs>
            </Svg>
          </TouchableOpacity>

>>>>>>> Stashed changes
          <Text
            style={{
              color: '#5B5B5B',
              fontSize: 25,
              fontWeight: 'bold',
              height: '100%',
              left: 37,
              top: 15,
            }}>
            新しい投稿を作成
          </Text>
        </View>

        {this.state.hasUploadPhoto ? (
          <Image
            source={{uri: this.state.UploadPhoto}}
            // defaultSource={require('../images/image.jpg')}
            style={{
              marginLeft: 20,
              top: 20,
              width: 70,
              height: 70,
              borderRadius: 1,
              left: 0,
            }}
          />
        ) : (
          <Image
            source={{
              uri: URL_TEMP + '/' + global.path + '/' + global.file,
            }}
            // defaultSource={require('../icon/userprofile.png')}
            style={{
              left: 0,
              top: 20,
              width: 70,
              height: 70,
              borderRadius: 1,
              marginLeft: 20,
            }}
          />
        )}
        <View
          style={{
            alignSelf: 'center',
            top: 60,
            borderWidth: 1,
            width: 355,
            height: 70,
            borderColor: '#cdd5d5',
          }}>
          <TextInput
            placeholder={this.state.forDescription}
            value={this.state.description}
            onChangeText={value => this.getDescription(value)}
            placeholderTextColor="black"
            multiline
            numberOfLines={11}
            // maxLength={100}
            style={{
              top: 0,
              // paddingHorizontal: 10,
              // borderEndWidth: 280,
              borderRadius: 10,
              color: 'black',
              // backgroundColor:'red',
              //  paddingBottom:130
              // height:"100%"
            }}
          />
       <Text
            style={{
<<<<<<< Updated upstream
              fontSize: 14,
              marginTop: windowHeight / 12 - 125,
              backgroundColor: '#fff',
              left: windowHeight / 86,
              color: '#5B5B5B',
              alignSelf: 'flex-start',
=======
              fontSize: 16,
              bottom:"120%",
              backgroundColor: '#fff',
              alignSelf:'center',
              fontWeight:"bold",
              color: '#EA337E',
              // alignSelf: 'flex-start',
              fontWeight: 'bold',
>>>>>>> Stashed changes
            }}>
            コメント
          </Text>
        </View>
        <View
          style={{
            left: 290,
            top: 90,
            backgroundColor: '#f8f8f9',
            width: 85,
            height: 20,
          }}>
          <TouchableOpacity onPress={() => this.postPhoto()}>
            <Text style={{color: '#5B5B5B', alignSelf: 'center', top: 1}}>
              アルバム選択
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            top: 120,
            flexDirection: 'column',
            width: windowWidth - 40,
            alignSelf: 'center',
            height: windowHeight / 2 - 150,
          }}>
<<<<<<< Updated upstream
          <Text style={{color: '#5B5B5B', fontSize: 16}}>※掲示板注意事項</Text>
          <Text style={{color: '#5B5B5B', fontSize: 16, top: 15}}>
            掲示板は不特定多数の方が見れる場所になります。
          </Text>
          <Text style={{color: '#5B5B5B', fontSize: 16, top: 30}}>
            電話番号、ラインID、メールアドレス、
          </Text>
          <Text style={{color: '#5B5B5B', fontSize: 16, top: 45}}>
            SNSアカウント等の古竿はお控えください。
=======
          <Svg
            style={{
              left: windowWidth / 2 - 81,
              top: 15,
              width: 40,
              height: 40,
              // backgroundColor: '#FFF5F8',
              borderRadius: 10,
            }}
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="angle-left"
            class="svg-inline--fa fa-angle-left fa-w-6"
            role="img"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Rect width="13" height="13" rx="6.5" fill="#EA337E" />
            <Path
              d="M6.60037 2.6001C6.21282 2.6001 5.83911 2.76291 5.57518 3.04664C5.31117 3.33024 5.17572 3.71467 5.20359 4.10138L5.38709 6.64509C5.43274 7.27812 5.96569 7.77401 6.60039 7.77401C7.23505 7.77401 7.768 7.27812 7.8137 6.64509L7.99717 4.10138C8.02508 3.71467 7.88965 3.33024 7.62569 3.04677C7.36168 2.76291 6.98795 2.6001 6.60037 2.6001Z"
              fill="white"
            />
            <Path
              d="M6.60037 8.34375C5.97565 8.34375 5.46742 8.85194 5.46742 9.47661V9.95401C5.46742 10.5787 5.97568 11.0869 6.60039 11.0869C7.2251 11.0869 7.73333 10.5787 7.73333 9.95401V9.47661C7.73333 8.85194 7.22508 8.34375 6.60037 8.34375Z"
              fill="white"
            />
            <Defs>
              <LinearGradient
                id="paint0_linear_50_2305"
                x1="6.5"
                y1="0"
                x2="6.5"
                y2="13"
                gradientUnits="userSpaceOnUse">
                <Stop stop-color="#ED70B0" />
                <Stop offset="1" stop-color="#EA337E" />
              </LinearGradient>
            </Defs>
          </Svg>

          <Text style={{color: '#5B5B5B', fontSize: 12, alignSelf: 'center'}}>
            掲示板注意事項
>>>>>>> Stashed changes
          </Text>
          <Text
            style={{
              color: '#5B5B5B',
              fontSize: 16,
              top: 60,
              width: windowWidth - 40,
            }}>
            事件、トラブルの元になりますので、見つけ次第削除させていただきます。
          </Text>
          <Text
            style={{
              color: '#5B5B5B',
              fontSize: 16,
              top: 75,
              width: windowWidth - 40,
            }}>
            また記載されていても無闇に電話をしたりしないようお気をつけください。
          </Text>
        </View>

        {this.state.loadingOpacity == 0 ? (
          <View
            style={{
              alignSelf: 'center',
              top: 210,
              backgroundColor: '#f8f8f9',
              width: 182,
              height: 25,
            }}>
            <TouchableOpacity onPress={() => this.goSave()}>
              <Text
                style={{
                  color: '#5B5B5B',
                  alignSelf: 'center',
                  top: 1,
                  fontSize: 16,
                }}>
                注意事項をご理解の上、投稿する
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator
            style={{
              marginLeft: windowWidth / 2 - 15,
              width: 30,
              height: 30,
              marginTop: 210,
              fontSize: 13,
              alignItems: 'center',
              opacity: this.state.loadingOpacity,
            }}
            size="small"
            color="#69747f"
          />
        )}
      </View>
    );
  }
}

export default Posttoboard;

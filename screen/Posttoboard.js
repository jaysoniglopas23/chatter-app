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
} from 'react-native';
import _ from 'lodash';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
// import {getUsers, contains} from './api/index';
import {getUsers, contains} from '../styles/index';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import User from '../homes/User';
import Tabs from '../navigation/tabs';
import moment from 'moment';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import {launchImageLibrary} from 'react-native-image-picker';
import Svg, {G, Path} from 'react-native-svg';

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
      description: '',
      boardid: '',
      fkboard: 1,
      descriptionOpacity: 1,
    };

    this.goChat = this.goChat.bind(this);
  }

  goChat() {
    this.props.navigation.navigate('User');
  }

  back() {
    this.props.navigation.navigate('Post');
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
          // alert(JSON.stringify(assets));
          self.setState({
            // filename: assets.assets[0].fileName,
            UploadPhoto: assets.assets[0].uri,
            hasUploadPhoto: true,
          });
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
      },

      () => {
        global.socket.on('emit-post-save', function (ret) {
          global.socket.off('emit-post-save');
          // alert(JSON.stringify(ret));
          // console.log(JSON.stringify(ret));

          self.setState({
            postid: ret.postid,
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
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            let params = {};
            params['description'] = self.state.description;

            self.props.navigation.push('Post');
          }
        });
        let params = {};

        params['boardid'] = 1;
        params['postid'] = this.state.postid;
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
          borderBottomWidth: 0,
          borderTopWidth: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: windowHeight / 20,
            right: windowWidth / 2 - 205,
            // marginTop: windowHeight / 2 - 415,
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginTop: windowHeight / 12 - 69,
              width: 50,
              height: '100%',
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

          <Text
            style={{
              color: 'gray',
              fontSize: 25,
              left: 120,
              height: '100%',
              marginTop: windowHeight / 12 - 105,
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
            source={require('../images/image.jpg')}
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
            value={this.state.description}
            onChangeText={value => this.getDescription(value)}
            style={{
              top: 10,
              paddingHorizontal: 10,
              borderEndWidth: 310,
              borderRadius: 10,
              color: 'black',
            }}
          />
          <Text
            style={{
              fontSize: 14,
              marginTop: windowHeight / 12 - 125,
              backgroundColor: '#fff',
              left: windowHeight / 86,
              color: 'black',
              width: windowWidth / 7,
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
            <Text style={{color: 'black', alignSelf: 'center', top: 1}}>
              アルバム選択
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{top: 120, left: 20, flexDirection: 'column'}}>
          <Text style={{color: 'black', fontSize: 16}}>※掲示板注意事項</Text>
          <Text style={{color: 'black', fontSize: 16, top: 15}}>
            掲示板は不特定多数の方が見れる場所になります。
          </Text>
          <Text style={{color: 'black', fontSize: 16, top: 30}}>
            電話番号、ラインID、メールアドレス、
          </Text>
          <Text style={{color: 'black', fontSize: 16, top: 45}}>
            SNSアカウント等の古竿はお控えください。
          </Text>
          <Text style={{color: 'black', fontSize: 16, top: 60, width: 350}}>
            事件、トラブルの元になりますので、見つけ次第削除させていただきます。
          </Text>
          <Text style={{color: 'black', fontSize: 16, top: 75, width: 350}}>
            また記載されていても無闇に電話をしたりしないようお気をつけください。
          </Text>
        </View>

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
                color: 'black',
                alignSelf: 'center',
                top: 1,
                fontSize: 16,
              }}>
              注意事項をご理解の上、投稿する
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Posttoboard;

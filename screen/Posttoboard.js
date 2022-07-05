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
    let description = self.state.getDescription;
    let boardid = boardid;
    let fkboard = fkboard;

    this.setState(
      {
        saving: true,
      },

      () => {
        global.socket.on('emit-post-save', function (ret) {
          global.socket.off('emit-post-save');
          alert(JSON.stringify(ret));
          console.log(JSON.stringify(ret));

          self.setState({
            postid: ret.postid,
          });

          if (self.state.hasUploadPhoto != '' && self.state.description != '') {
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
                self.props.navigation.navigate('Post');
              })
              .catch(err => {
                console.log(err);
              });
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
      <View>
        <TouchableOpacity
          onPress={() => this.goSave()}
          style={{alignSelf: 'center', borderWidth: 1, height: 30, width: 40}}>
          <Text style={{textAlign: 'center', top: 4}}>Post</Text>
        </TouchableOpacity>
        {this.state.hasUploadPhoto ? (
          <Image
            source={{uri: this.state.UploadPhoto}}
            // defaultSource={require('../images/image.jpg')}
            style={{
              alignSelf: 'center',
              top: 40,
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
              top: 40,
              width: 70,
              height: 70,
              borderRadius: 1,
              alignSelf: 'center',
            }}
          />
        )}

        <View style={{alignSelf: 'center', top: 80, borderWidth: 1, width: 85}}>
          <TouchableOpacity onPress={() => this.postPhoto()}>
            <Text>Uploadphoto</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
            top: 100,
            borderWidth: 1,
            width: 355,
            height: 70,
          }}>
          <TextInput
            value={this.state.description}
            onChangeText={value => this.getDescription(value)}
            style={{
              top: 10,
              paddingHorizontal: 10,
              borderEndWidth: 310,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    );
  }
}

export default Posttoboard;

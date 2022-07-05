import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {launchImageLibrary} from 'react-native-image-picker';
import Storage from '../utils/storage';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const DeviceWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();
const navigationRef = React.createRef();

const URL_UPLOAD_PROFILE = 'http://18.181.88.243:8081/Profile/Upload';
const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class PhotoLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false,

      profile_image: '',

      profile_image_dir: '',

      hasUploadPhoto: false,

      modalVisible: false,

      UploadPhoto: '',

      loginginOpacity: 0,

      boardid: '',
    };

    this.goBack = this.goBack.bind(this);

    this.goSave = this.goSave.bind(this);
  }

  componentDidMount() {
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

    this.setState(
      {
        saving: true,
      },

      () => {
        global.socket.on('emit-posts', function (ret) {
          global.socket.off('emit-posts');

          // alert(JSON.stringify(ret));

          self.setState({
            // loginginOpacity: 3,
            // profile_image: ret.profile_image,
            // profile_image_dir: ret.profile_image_dir,
            // hasUploadPhoto: true,
          });

          if (self.state.hasUploadPhoto) {
            const data = new FormData();

            data.append('socketid', socketid);

            data.append('photo', {
              method: 'POST',
              uri: self.state.UploadPhoto,
              name: 'image.jpg',
              type: 'image/jpg',
            });

            fetch(URL_UPLOAD_PROFILE, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              method: 'POST',

              body: data,
            })
              .then(body => {
                self.props.navigation.navigate('home');
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
        let params = {};

        params['boardid'] = this.state.boardid;
        params['lastname'] = '';
        params['description'] = '';
        params['start'] = 1;
        params['size'] = 1;

        // console.log(params);

        global.socket.emit('on-posts', params);
      },
    );
    // this.props.navigationRef.current?.navigate('Dashboard');
  }

  goBack() {
    this.props.navigation.navigate('home');
  }

  render() {
    return (
      <View style={{right: 17}}>
        {this.state.hasUploadPhoto ? (
          <Image
            source={{uri: this.state.UploadPhoto}}
            // defaultSource={require('../images/image.jpg')}
            style={{
              alignSelf: 'center',
              top: 200,
              width: 300,
              height: 400,
              borderRadius: 1,
              left: 15,
            }}
          />
        ) : (
          <Image
            source={require('../images/image.jpg')}
            style={{
              left: 15,
              top: 100,
              width: 300,
              height: 400,
              borderRadius: 1,
              alignSelf: 'center',
            }}
          />
        )}

        <ActivityIndicator
          style={{
            marginLeft: windowWidth / 2 - 15,
            width: 30,
            height: 30,
            marginTop: 15,
            fontSize: 13,
            opacity: this.state.loginginOpacity,
          }}
          size="small"
          color="#69747f"
        />

        <View style={{right: 140, top: 200}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              marginHorizontal: 170,
              height: 31,
              left: 150,
              marginBottom: 30,
              flexDirection: 'row',
              width: 70,
              borderRadius: 2,
              bottom: 16,
            }}
            onPress={() => this.goSave()}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5}}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default PhotoLibrary;

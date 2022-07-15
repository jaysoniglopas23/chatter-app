import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Alert,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Storage from '../utils/storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: '',

      response: '',

      socketid: '',

      hasProfilePhoto: false,

      modalVisible: false,

      profilePhoto: '',

      livVerFiles: ret.licver_image,

      strLicVerHash: ret.licver_image_dir,
    };

    this.goback = this.goback.bind(this);
  }

  goback() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-license_verification', function (ret) {
        global.socket.off('emit-license_verification');
        // console.log(ret);

        self.setState({
          livVerFiles: ret.licver_image,
          strLicVerHash: ret.licver_image_dir,
          socketid: global.socketid,
        });

        // console.log(2);
        if (self.state.hasProfilePhoto) {
          const data = new FormData();

          // console.log(3);
          let body = {
            socketid: socketid,
          };

          data.append(body);
          console.log(body);

          let i = {
            method: 'post',
            uri: self.state.profilePhoto,
            type: 'multipart/form-data',
            name: `image.jpg`,
          };

          data.append('post', i);
          console.log(i);

          fetch('http://18.181.88.243:8081/LicenseVerification', {
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: data,
          })
            .then(response => {
              self.props.navigationRef.current?.navigate('Dashboard');
            })
            .catch(err => {
              console.log(err);
            });

          // console.log(5);

          // axios
          //   .request({
          //     method: 'post',
          //     url: 'http://18.181.88.243:8081/LicenseVerification',
          //     data: data,
          //     onUploadProgress: p => {
          //       console.log(p);
          //       // this.setState({
          //       //   fileprogress: p.loaded / p.total,
          //       // });
          //     },
          //   })

          // .then(data => {
          //   self.props.navigationRef.current?.navigate('Dashboard');
          // });
        }
      });

      let params = {};

      params['licver_image_dir'] = this.state.strLicVerHash;
      params['licver_image'] = this.state.livVerFiles;

      params['age'] = this.state.age;

      params['nickname'] = this.state.nickname;

      params['email'] = this.state.email;

      params['points'] = this.state.points;
      params['mail_count'] = this.state.mail_count;
      params['call_minutes'] = this.state.call_minutes;

      params['socketid'] = global.socketid;

      // console.log(params);

      global.socket.emit('on-license_verification', params);
    });

    // this.props.navigationRef.current?.navigate('Dashboard');
  }

  openPhotoAlbum() {
    let self = this;

    this.setState(
      {
        modalVisible: false,
      },
      () => {
        let options = {mediaType: 'photo'};

        launchImageLibrary(options, function (assets) {
          self.setState({
            profilePhoto: assets.assets[0].uri,
            hasProfilePhoto: true,
          });
        });
      },
    );
  }

  openCamera() {
    let options = {mediaType: 'photo'};

    launchImageLibrary(options, function () {
      console.log(1);
    });
  }

  render() {
    let {photo} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: 700,flex:1}}>
        {this.state.hasProfilePhoto ? (
          <Image
            source={{uri: this.state.profilePhoto}}
            
            style={{
              alignSelf: 'center',
              top: 50,
              width: 350,
              height: 350,
              borderRadius: 1,
            }}
          />
        ) : (
          <Image
            source={require('../images/image.jpg')}
            style={{
              top: 50,
              width: 350,
              height: 350,
              borderRadius: 1,
              alignSelf: 'center',
            }}
          />
        )}

        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            bottom: 300,
            flex:1,
          }}>
          <View
            style={{
              marginTop: windowHeight - 190,
              height: 150,
              width: windowWidth,
              backgroundColor: '#FFF',
              borderRadius: 15,
            }}>
            <TouchableOpacity
              style={{
                width: 200,
                height: 30,
                backgroundColor: '#ececec',
                marginTop: 20,
                marginLeft: windowWidth / 2 - 100,
                borderRadius: 3,
                bottom: 200,
              }}
              onPress={() => this.openPhotoAlbum()}>
              <Text
                style={{
                  width: '100%',
                  height: 30,
                  textAlign: 'center',
                  lineHeight: 30,
                  color: 'grey',
                }}>
                UPLOAD {this.state.openPhotoLibraryText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 200,
                height: 30,
                backgroundColor: '#ececec',
                marginTop: 20,
                marginLeft: windowWidth / 2 - 100,
                borderRadius: 3,
              }}
              onPress={() => this.openCamera()}>
              <Text
                style={{
                  width: '100%',
                  height: 30,
                  textAlign: 'center',
                  lineHeight: 30,
                  color: global.glTextColor,
                }}>
                {this.state.openCameraText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.goback()}
          style={{
            backgroundColor: '#ECECEC',
            marginHorizontal: 170,
            height: 31,
            right: 150,
            marginBottom: 30,
            flexDirection: 'row',
            width: 70,
            borderRadius: 2,
            bottom: 80,
          }}>
          <Image
            source={require('../icon/arrow.png')}
            style={{height: 20, top: 5}}
          />
          <Text style={{right: 15, top: 4,color:'black'}}>戻る</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Card;
const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 350,
  },
  text: {
    color: 'red',
    fontSize: 18,
    top: 12,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'A0A0A0',
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#330066',
    bottom: 40,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
});

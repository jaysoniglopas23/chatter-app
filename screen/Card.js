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
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';
const URL_UPLOAD_PROFILE = 'http://18.181.88.243:8081/Profile/Upload';
const URL_UPLOAD_LIC_VERIFY = 'http://18.181.88.243:8081/LicenseVerification';

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
    };

    this.goBack = this.goBack.bind(this);

    this.goSave = this.goSave.bind(this);
  }

  goBack() {
    this.props.navigationRef.current?.navigate('Dashboard');
  }

  goSave() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-posts', function (ret) {
        global.socket.off('emit-posts');
        // alert(JSON.stringify(ret));

        self.setState({
          licver_image: ret.licver_image,
          licver_image_dir: ret.licver_image_dir,
          socketid: global.socketid,
        });

        // console.log(2);
        if (self.state.hasProfilePhoto) {
          const data = new FormData();

          // console.log(3);
          // let body = {
          //   socketid: socketid,
          // };

          data.append('socketid', socketid);

          // console.log(body);

          data.append('photo', {
            method: 'POST',
            uri: self.state.profilePhoto,
            name: 'image.jpg',
            type: 'image/jpg',
          });

          data.append('POST');
          // console.log(i);

          fetch(URL_UPLOAD_LIC_VERIFY, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            method: 'POST',

            body: data,
          })
            .then(response => {
              let params = {};

              // params['licver_image_dir'] = self.state.licver_image_dir;
              // params['licver_image'] = self.state.licver_image;

              self.props.navigationRef.current?.navigate('Dashboard');
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
      // params['licver_image_dir'] = this.state.licver_image_dir;
      // params['licver_image'] = this.state.licver_image;

      // params['licver_image_dir'] = this.state.licver_image_dir;
      // params['licver_image'] = this.state.licver_image;

      params['socketid'] = global.socketid;

      global.socket.emit('on-posts', params);
    });

    // this.props.navigationRef.current?.navigate('Dashboard');
  }

  componentDidMount() {
    this.getLicense();
  }

  getLicense() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-license_verification', function (ret) {
        global.socket.off('emit-license_verification');
        console.log(ret);

        self.setState({
          licver_image: ret.licver_image,
          licver_image_dir: ret.licver_image_dir,
          socketid: global.socketid,
        });
        // this.state.licver_image = self.state.licver_image;
        // this.state.licver_image_dir = self.state.licver_image_dir;

        // alert(JSON.stringify(global.licver_image));
      });

      let params = {};

      params['licver_image_dir'] = this.state.licver_image_dir;
      params['licver_image'] = this.state.licver_image;

      params['socketid'] = global.socketid;
      // alert(    URL_TEMP +
      //   '/' +
      //   self.state.licver_image_dir +
      //   '/' +
      //   self.state.licver_image,);

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
          if (assets.didCancel) {
            console.log('User cancelled image picker');
          } else if (assets.error) {
            console.log('ImagePicker Error: ', assets.error);
          } else if (assets.customButton) {
            console.log('User tapped custom button: ', assets.customButton);
            alert(assets.customButton);
          } else {
            self.setState({
              profilePhoto: assets.assets[0].uri,
              hasProfilePhoto: true,
            });
          }
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
      <View
        style={{
          backgroundColor: '#fff',
          height: windowHeight,
          flex: 1,
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: windowHeight / 2,
            width: windowWidth - 40,
            alignSelf: 'center',
            marginTop: 20,
          }}>
          {this.state.hasProfilePhoto ? (
            <Image
            source={{uri: this.state.profilePhoto}}
            // source={require('../icon/userprofile.png')}
              style={{
                alignSelf: 'center',
                top: 0,
                width: '100%',
                height: '100%',
                borderRadius: 1,
              }}
            />
          ) : (
            <Image
              source={{
                uri:
                  URL_TEMP +
                  '/' +
                  this.state.licver_image_dir +
                  '/' +
                  this.state.licver_image,
              }}
              style={{
                top: 0,
                width: '100%',
                height: '100%',
                borderRadius: 1,
                alignSelf: 'center',
                // opacity: 0.3,
              }}
            />
          )}
        </View>

        <View
          style={{
            width: '100%',
            height: windowHeight / 13,
            top: windowWidth / 12,
            // flex: 1,
            // backgroundColor: 'black',
          }}>
          <TouchableOpacity
            style={{
              width: 110,
              height: 30,
              backgroundColor: '#ececec',
              left: windowWidth / 10 - 54,
              marginLeft: windowWidth / 2 - 10,
              borderRadius: 3,
              bottom: windowHeight / 2 - 432,
            }}
            onPress={() => this.openPhotoAlbum()}>
            <Svg
              style={{width: 20, height: 20, left: 10, top: 3}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <Path
                fill="black"
                d="M480 352h-152C323.6 352 320 355.6 320 360s3.582 8 8 8H480c8.822 0 16 7.178 16 16v96c0 8.822-7.178 16-16 16H32c-8.822 0-16-7.178-16-16v-96c0-8.822 7.178-16 16-16h152C188.4 368 192 364.4 192 360S188.4 352 184 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM464 432c0-17.6-14.4-32-32-32s-32 14.4-32 32c0 17.6 14.4 32 32 32S464 449.6 464 432zM416 432c0-8.822 7.178-16 16-16s16 7.178 16 16S440.8 448 432 448S416 440.8 416 432zM109.7 165.7L248 27.31V408C248 412.4 251.6 416 256 416s8-3.594 8-8V27.31l138.3 138.3c3.125 3.125 8.188 3.125 11.31 0s3.125-8.188 0-11.31l-152-152c-3.125-3.125-8.188-3.125-11.31 0l-152 152C96.78 155.9 96 157.9 96 160s.7813 4.094 2.344 5.656C101.5 168.8 106.5 168.8 109.7 165.7z"
              />
            </Svg>
            <Text
              style={{
                width: '100%',
                height: 30,
                textAlign: 'center',
                lineHeight: 30,
                color: 'black',
                bottom: 19,
                left: 15,
              }}>
              アップロード
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.goSave()}
            style={{
              width: 60,
              height: 30,
              backgroundColor: '#ececec',
              marginTop: 25,
              left: windowWidth / 1.3,
              borderRadius: 3,
              bottom: windowHeight / 2 - 377,
            }}>
            <Svg
              style={{width: 20, height: 20, left: 10, top: 3}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <Path
                fill="black"
                d="M429.3 141.3l-90.51-90.51C326.7 38.74 310.5 32 293.5 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V186.5C448 169.5 441.3 153.3 429.3 141.3zM80 48h213.5C297.1 48 300.6 48.48 304 49.25V152c0 13.23-10.78 24-24 24h-176C90.78 176 80 165.2 80 152V48zM432 416c0 26.47-21.53 48-48 48H64c-26.47 0-48-21.53-48-48V96c0-26.47 21.53-48 48-48v104C64 174.1 81.94 192 104 192h176C302.1 192 320 174.1 320 152V55.98c2.643 1.758 5.137 3.783 7.432 6.078l90.51 90.51C427 161.6 432 173.7 432 186.5V416zM224 240c-48.53 0-88 39.47-88 88S175.5 416 224 416s88-39.47 88-88S272.5 240 224 240zM224 400c-39.69 0-72-32.3-72-72S184.3 256 224 256s72 32.3 72 72S263.7 400 224 400z"
              />
            </Svg>
            <Text
              style={{
                width: '100%',
                height: 30,
                textAlign: 'center',
                lineHeight: 30,
                color: 'black',
                bottom: 19,
                left: 15,
              }}>
              保存
            </Text>
          </TouchableOpacity>

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
              bottom: windowHeight / 2 - 346,
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
        </View>
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

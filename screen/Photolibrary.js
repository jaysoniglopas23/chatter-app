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
import Svg, {G, Path} from 'react-native-svg';


const windowHeight = Dimensions.get('window').height;
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

      loadingOpacity: 0,

      profile_image: '',

      profile_image_dir: '',

      hasUploadPhoto: false,

      modalVisible: false,

      UploadPhoto: '',

      loginginOpacity: 0,

      boardid: '',
    };

    this.goHome = this.goHome.bind(this);

    this.goSave = this.goSave.bind(this);

    this.getImage = this.getImage.bind(this);
  }

  goHome() {
    if (global.prevPage == 'RegistertoHome') {
      this.props.navigationRef.current?.navigate('home');
      global.prevPage = 'RegistertoHometoPhotoLibrary'
    } else if (global.prevPage != 'RegistertoHome') {
     this.props.navigation.push('home');
     global.prevPage = 'LaunchertoHometoLibrary'
    }
  }

  componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //   // Alert.alert('Refreshed');
    //   this.getImage();
    // });
    // alert('now');

    if (global.prevPage == 'RegistertoHome') {
      this.getImage();
    } else if (global.prevPage !=  'RegistertoHome') {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // Alert.alert('Refreshed');
        this.getImage();
      });
    }
  }

  _unsubscribe() {
   
  }

  componentWillUnmount() {
<<<<<<< Updated upstream
  
=======
    this.getImage();
>>>>>>> Stashed changes
    this._unsubscribe();
  }

  getImage() {
    let self = this;

    this.setState(
      {
        modalVisible: false,
      },
      () => {
        launchImageLibrary(options, function (assets) {
          // alert(JSON.stringify(assets));
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

    this.setState(
      {
        saving: true,
        loadingOpacity: 1,
      },

      () => {
        global.socket.on('emit-posts', function (ret) {
          global.socket.off('emit-posts');

          // alert(JSON.stringify(ret));

          self.setState({
            loadingOpacity: 0,
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
                self.props.navigation.push('home');
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

 

  render() {
    return (
      <View style={{right: 17 ,width:windowWidth  ,height:windowHeight}}>
      <View style={{width:windowWidth - 50,alignSelf:'center',height:windowHeight - 50}}>
         <TouchableOpacity
            style={{
              marginLeft: 10,
              marginTop: windowHeight / 10 - 65,
              width: 50,
              height: 30,
            }}
            onPress={() => this.goHome()}>
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
        {this.state.hasUploadPhoto ? (
           <TouchableOpacity onPress={() => this.getImage()}>
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
<<<<<<< Updated upstream
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity onPress={() => this.getImage()}>
            <Image
              source={require('../icon/userprofile.png')}
              style={{
                left: 15,
                top: 100,
                width: 300,
                height: 400,
                borderRadius: 1,
=======
          {this.state.loadingOpacity == 0 ? (
            <View style={{ top:"15%", alignSelf: 'center'}}>
              <TouchableOpacity
              style={{
                backgroundColor: '#FFF5F8',
                height: windowHeight / 25,
                flexDirection: 'row',
                width: windowWidth / 5 - 5,
                borderRadius: 10,
                // bottom: 34,
                alignSelf:'center',
              }}
              onPress={() => this.goSave()}>
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
            </View>
          ) : (
            <ActivityIndicator
              style={{
                // marginLeft: windowWidth / 3 - 105,
                width: 30,
                height: 30,
                marginTop: 160,
                fontSize: 13,
>>>>>>> Stashed changes
                alignSelf: 'center',
              }}
            />
            </TouchableOpacity>
            <Text style={{alignSelf: 'center', color: 'gray', top: 100}}>
              プロフィール画像はこちら
            </Text>
          </View>
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
         {this.state.loadingOpacity == 0 ? (
        <View style={{right: 140, top: 180, alignSelf: 'center'}}>
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
            <Text style={{left: 15, top: 5, color: 'black'}}>保存</Text>
          </TouchableOpacity>
        </View>
         ) : (
          <ActivityIndicator
          style={{
            marginLeft: windowWidth / 3 - 105,
            width: 30,
            height: 30,
            marginTop: 160,
            fontSize: 13,
            alignSelf: 'center',
            opacity: this.state.loadingOpacity,
          }}
          size="small"
          color="#69747f"
        />
      )}
      </View>
      </View>
    );
  }
}

export default PhotoLibrary;

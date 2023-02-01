import React, {Component} from 'react';

import {
  Easing,
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
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Linking,
  AppState,
} from 'react-native';

var Sound = require('react-native-sound');

import moment from 'moment';

import Svg, {G, Path} from 'react-native-svg';

import ZegoSendCallInvitationButton from '@zegocloud/zego-uikit-prebuilt-call-rn';

import StringUtils from '../utils/stringutils';

// import Video from 'react-native-video';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ui: [],
      showLoading: true,
      profileData: [],
      offset: 0,
      chats: [],
      loadingChats: true,
      refresh: 0,
      message: '',
      date: moment(new Date()).format('YYYY-MM-DD  LT'),
      chatsRefreshed: true,
      receivedAdded: false,
      time: Date.now(),
      appState: AppState.currentState,
    };

    this.back = this.back.bind(this);

    this.onEndReached = this.onEndReached.bind(this);

    this.handleScrollView = this.handleScrollView.bind(this);

    this.renderCell = this.renderCell.bind(this);

    this.sendMesage = this.sendMesage.bind(this);

    // this.pressURL = this.pressURL.bind(this);

    this.gotoUserProfile = this.gotoUserProfile.bind(this);

    this.bellSound = null;
  }

  // componentDidMount() {
  //   this.getChat();
  //   this.getChatPoint();
  // }

  componentDidMount() {
<<<<<<< Updated upstream
    // this.getChat();
    this.interval = setInterval(() => this.getChat({ time: Date.now() }), 1000);
=======
    this.getChat();
    // this.readMessage();
    this.interval = setInterval(() => this.getChat({time: Date.now()}), 1000);
>>>>>>> Stashed changes
    this.getChatPoint();
    this.subscription = AppState.addEventListener('change', this.getChat);

    //  subscription.remove();
  }
  componentWillUnmount() {
    this.subscription.remove();
    // AppState.remove()('change', this.getChat);
    clearInterval(this.interval);
    this.getChatPoint();
  }

  readMessage(){
    let self = this;

    let params = {};

    this.setState(
      {
        params: params,
        refresh: 1,
      },

      () => {
        global.socket.on('read-message', function (ret) {
          global.socket.off('read-message');
          // alert(JSON.stringify(ret));
          // console.log(ret);

          self.setState({
        
          });
         
        });
        let params = {};
        params['msgid'] = global.myid;
        // params['call_minutes'] = global.call_minutes;
        // params['name'] = global.name;
        // params['id'] = global.myid;
        // params[''] = ;

        // alert(global.call_minutes);
        // alert(global.myid)

        global.socket.emit('read-message', params);
        // console.log(params);
      },
    );
  }

  // componentWillUnmount() {
  //   this.getChat();
  //   this.getChatPoint();
  // }
  getChatPoint = () => {
    let self = this;

    let params = {};

    this.setState(
      {
        params: params,
        refresh: 1,
      },

      () => {
        global.socket.on('emit-details', function (ret) {
          global.socket.off('emit-details');
          // alert(JSON.stringify(ret));
          // console.log(ret);

          self.setState({
            mail_count: ret.mail_count,
            call_minutes: ret.call_minutes,
            myid: ret.id,
          });
          global.myid = self.state.myid;
          global.call_minutes = self.state.call_minutes;
          global.mail_count = self.state.mail_count;
        });
        let params = {};
        params['mail_count'] = global.mail_count;
        params['call_minutes'] = global.call_minutes;
        params['name'] = global.name;
        params['id'] = global.myid;
        // params[''] = ;

        // alert(global.call_minutes);
        // alert(global.myid)

        global.socket.emit('on-details', params);
        // console.log(params);
      },
    );
  };

  getChat = () => {
    let self = this;

    let params = {};
    

    this.setState(
      {
        params: params,
        refresh: 1,
      },

      () => {
        global.socket.on('emit-messages', function (ret) {
          global.socket.off('emit-messages');
          // alert(JSON.stringify(ret));
          // console.log(ret);
          // token = ret[0].token;

          if (global.prevPage == 'Messages') {
<<<<<<< Updated upstream

          self.setState({
            showLoading: false,
            loadingChats: false,
            // id: ret.otherid,
            ret: ret,
            data: ret.data,
            profile_image: ret.profile_image,
            profile_image_dir: ret.profile_image_dir,
            datetime: ret.datetime,
            msg_to: ret.msg_to,
            msg_from: ret.msg_from,
            timezone: ret.timezone,
            type:ret.type,
            token:ret[0].token,
          });
          // console.log(se.data);
          global.token = ret[0].token;

=======
            self.setState({
              showLoading: false,
              loadingChats: false,
              // id: ret.otherid,
              // id:ret[0].id,
              ret: ret,
              data: ret.data,
              profile_image: ret.profile_image,
              profile_image_dir: ret.profile_image_dir,
              datetime: ret.datetime,
              msg_to: ret.msg_to,
              msg_from: ret.msg_from,
              timezone: ret.timezone,
              type: ret.type,
              token: ret.token,
            });
            // alert(ret[0].id);
            // global.token = ret[0].token;
>>>>>>> Stashed changes
          } else {
            self.setState({
              showLoading: false,
              loadingChats: false,
              // id: ret.otherid,
              ret: ret,
              data: ret.data,
              profile_image: ret.profile_image,
              profile_image_dir: ret.profile_image_dir,
              datetime: ret.datetime,
              msg_to: ret.msg_to,
              msg_from: ret.msg_from,
              timezone: ret.timezone,
              type:ret.type,
              token:ret.token,
            });

            // global.token = ret[0].token;;

            // alert(  global.token)
          }
          // self.flatListRef.scrollToOffset({
          //   animated: true,
          //   offset: self.state.data.length,
          // });
        });
        if (global.otherid == undefined) {
          global.otherid = 0;
        } else {
          global.otherid = global.otherid;
        }
        let params = {};
        params['name'] = global.name;
        params['otherid'] = global.otherid;
        params['data'] = this.state.data;
        params['profile_image'] = global.profile_image;
        params['profile_image_dir'] = global.profile_image_dir;
        params[' datetime'] = this.state.datetime;
        params['msg_to'] = this.state.msg_to;
        params['msg_from'] = this.state.msg_from;
        params['lastmessage'] = global.lastmessage;
        params['read'] = 1;
        params['type'] = this.state.type;
<<<<<<< Updated upstream
        params['token'] =global.token;
=======
        params['token'] = global.token;
        params['id'] = this.state.id;
>>>>>>> Stashed changes
        // params[''] = ;
 this.state.token = global.token;
        
        // alert(this.state.token);

        global.socket.emit('on-messages', params);
        // console.log(params);
      },
    );

    // this.bellSound = new Sound(require('../sound/bell.m4a'), error => {
    //   if (error) {
    //     console.log('failed to load the sound', error);
    //     return;
    //   }

    //   self.getProfile();
    // });a
  };

  onEndReached() {}

  back() {
    // this.props.navigation.push('Messages');
    if (global.prevPage == 'UserCanSearch') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'Chatsearch';
    } else if (global.prevPage == 'Messages') {
      this.props.navigation.push('Messages');
      global.otherid;
      global.click = 1;
    }  else if (global.prevPage == 'unReadMessage') {
      this.props.navigation.push('Messages');
      global.otherid;
      global.click = 2;
    }  else if (global.prevPage == 'UserCanCall') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'UserCanCall';
    }  else if (global.prevPage == 'UserCanStar') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'UserCanStar';
    } else if (global.prevPage == 'UserCanHeart') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'UserCanHeart';
    } else if (global.prevPage == 'User') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'UserCanHeart';
    }else if (global.prevPage == 'Call') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'UserCanCall';
    }else if (global.prevPage == 'Search') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'Chatsearch';
    }else if (global.prevPage == 'Post') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'UserCanPost';
    }else if (global.prevPage == 'UserCanPost') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
      global.prevPage = 'UserCanPost';
    } else if (global.prevPage == 'Launcher') {
      this.props.navigation.push('Messages');
      global.otherid;
      // global.prevPage = 'UserCanPost';
    }else if (global.prevPage == 'Chat') {
      this.props.navigation.push('Messages');
      global.otherid;
      // global.prevPage = 'UserCanPost';
    }

    // alert(prevPage)
  }

  handleScrollView() {
    if (this.state.chatsRefreshed) {
      let self = this;

      this.setState(
        {
          chatsRefreshed: false,
        },
        () => {
          global.socket.on('emit-messages', function (ret) {
            global.socket.off('emit-messages');

            // for (var i = ret.length - 1; i >= 0; i--) {
            //   self.setState(prevState => ({
            //     data: [...prevState.data, ret[i]],
            //   }));
            // }

            self.setState(
              {
                animated: true,
                chatsRefreshed: true,
              },
              () => {},
            );
          });

          let offset = this.state.offset + 10;

          this.setState(
            {
              offset: offset,
            },
            () => {
              let params = {};

              params['name'] = global.name;
              params['otherid'] = global.otherid;
              params['data'] = this.state.data;
              params['profile_image'] = this.state.profile_image;
              params['profile_image_dir'] = this.state.profile_image_dir;
              params[' datetime'] = this.state.datetime;
              params['msg_to'] = this.state.msg_to;
              params['msg_from'] = this.state.msg_from;

              global.socket.emit('emit-messages', params);
            },
          );
        },
      );
    }
  }

  sendMesage(id) {
    this.getChat();
    // this.handleScrollView();
    let self = this;

    global.mail_count = global.mail_count - 1;

    // alert(global.mail_count);

    global.socket.on('emit-send-message-from', function (ret) {
      global.socket.off('emit-send-message-from');

      //  alert(JSON.stringify(ret));
      self.setState({
        photo: ret.file,
        msgid: ret.msgid,
        socketid: ret.socketid,
        msg_from: ret.msg_from,
        msg_to: ret.msg_to,
      });
    });

    let params = {};

    params['datetime'] = this.state.date;
    params['to'] = global.otherid;
    params['from'] = this.state.msg_from;
    params['timezone'] = this.state.timezone;
    params['data'] = this.state.message;
    params['points'] = this.state.points;
    params['type'] = 'string';
    params['token'] = global.token;

    console.log(params);

    global.socket.emit('on-send-message', params);

    let message = {
      data: this.state.message,
      id: this.state.msg_to,
      nickname: global.name,
      profile_image: global.profile_image,
      msg_from: global.user_id,
    };

    console.log(message);

    self.setState(
      prevState => ({
        message: '',
        //  data: [message, ...prevState.data],
      }),
      // () => {
      //   self.setState(
      //     {
      //       refresh: 1,
      //     },
      //     () => {
      //       self.flatListRef.scrollToOffset({
      //         animated: true,
      //         offset: self.state.data.length,
      //       });
      //     },
      //   );
      // },
    );
  }

  renderCell(msg) {

  
    this.state.msg = msg.index;

    // const Othermsg = msg.

    console.log(JSON.stringify(msg))

    if (msg.item.msg_from == global.otherid) {
     
      return <Left msg={msg} self={this} />;
    } else {
    
      return <Right msg={msg} self={this} />;
    };


  

   
  }

  gotoUserProfile(msg_from) {
<<<<<<< Updated upstream
    // global.prevPageCall = 'Chat';
   
=======
    global.prevPage = 'Chat';
>>>>>>> Stashed changes

  

    let self = this;

    let params = {};

    this.setState(
      {
        params: params,
        refresh: 1,
      },

      () => {
        global.socket.on('emit-messages', function (ret) {
          global.socket.off('emit-messages');
          // alert(JSON.stringify(ret));
          console.log(ret);

          self.setState({
            showLoading: false,
            loadingChats: false,
            id: ret[0].otherid,
            ret: ret,
            data: ret[0].data,
            profile_image: ret[0].profile_image,
            profile_image_dir: ret[0].profile_image_dir,
            datetime: ret[0].datetime,
            msg_to: ret[0].msg_to,
            msg_from: ret[0].msg_from,
          });

          self.flatListRef.scrollToOffset({
            animated: true,
            offset: self.state.data.length,
          });
        });
        let params = {};
        params['name'] = global.name;
        params['otherid'] = global.otherid;
        params['data'] = this.state.data;
        params['profile_image'] = this.state.profile_image;
        params['profile_image_dir'] = this.state.profile_image_dir;
        params[' datetime'] = this.state.datetime;
        params['msg_to'] = this.state.msg_to;
        params['msg_from'] = this.state.msg_from;
        params['lastmessage'] = global.lastmessage;
        // params[''] = ;

        global.user_id = self.state.msg_from;

        // alert(global.user_id);
        this.props.navigation.navigate('UserCanSearch');
        global.socket.emit('on-messages', params);
        // console.log(params);
      },
    );
  }

  

  startCall() {
    global.prevPage = 'Chat';
    global.otherid;
    global.name;
    this.props.navigation.navigate('Caller');
  }

  messageAlert(){
    alert('通話を行うにはまだ会話が足りていません🥲')
  }

  render() {
    let tableHeight = 0;

    // const messages = ret.reverse();

    if (windowHeight >= 926) {
      tableHeight = windowHeight - 110;
    } else if (windowHeight >= 667) {
      tableHeight = windowHeight - 70;
    }

    return (
      <View
        styles={{
          width: windowWidth,
          height: windowHeight,
          flexDirection: 'column',
        }}>
        <View
          style={{
<<<<<<< Updated upstream
            width: '100%',
            backgroundColor: '#E9EBEE',
            height: windowHeight / 15,
=======
            width: windowWidth,
            // backgroundColor: 'green',
            height: '7%',
>>>>>>> Stashed changes
            flexDirection: 'row',
            zIndex: 2,
          }}>
          {this.state.showLoading ? (
            <></>
          ) : (
            <TouchableOpacity
              style={{
                position: 'absolute',
<<<<<<< Updated upstream
                width: '30%',
                // backgroundColor:'black',
                // alignSelf:'flex-star',
                height: 30,
                marginLeft: 145,
                marginTop: windowHeight / 10 - 65,
=======
                // width: '30%',
                // backgroundColor: 'green',
                // alignSelf:'flex-star',
                justifyContent: 'center',
                // height: 30,
                marginLeft: 65,
                marginTop: windowWidth / 10 - 20,
>>>>>>> Stashed changes
                flexDirection: 'row',
              }}
              onPress={() => this.gotoUserProfile(global.otherid)}>
              <Image
                style={{width: 30, height: 30, borderRadius: 30}}
                source={{
                  uri:
                    URL_TEMP +
                    '/' +
                    global.profile_image_dir +
                    '/' +
                    global.profile_image,
                }}
                defaultSource={require('.././icon/Picture.png')}
              />

              <Text
                style={{
                  width: '100%',
                  marginLeft: 3,
                  // height: 30,
                  lineHeight: 20,
                  textAlign: 'left',
<<<<<<< Updated upstream
                  fontSize: 13,
=======
                  fontSize: 18,
>>>>>>> Stashed changes
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {StringUtils.convertUnicode(global.name)}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
<<<<<<< Updated upstream
              marginLeft: 5,
              marginTop: windowHeight / 10 - 65,
=======
              marginLeft: 15,
              marginTop: windowWidth / 13 - 22,
>>>>>>> Stashed changes
              width: 40,
              height: 40,
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
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 30,
              left: '79%',
              top: 13,
=======
          <Svg
            style={{
              marginLeft: windowHeight / 2 - 190,
              marginTop: windowWidth / 10 - 15,
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
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Circle cx="5" cy="5" r="5" fill="#EA337E" />
            <Defs>
              <LinearGradient
                id="paint0_linear_24_4975"
                x1="5"
                y1="0"
                x2="5"
                y2="10"
                gradientUnits="userSpaceOnUse">
                <Stop stop-color="#ED70B0" />
                <Stop offset="1" stop-color="#EA337E" />
              </LinearGradient>
            </Defs>
          </Svg>

          <Text
            style={{
              marginLeft: 10,
              marginTop: windowWidth / 10 - 19,
              width: 40,
              height: 40,
              // backgroundColor: '#FFF5F8',
              borderRadius: 10,
              color: 'gray',
            }}>
            Online
          </Text>

          <View
            style={{
              position: 'absolute',
              // backgroundColor:'red',
              height: '80%',
              marginLeft: windowWidth - 58,
              marginTop: windowHeight / 10 - 66,
>>>>>>> Stashed changes
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            {(() => {
              if (global.call_minutes != 0) {
                if (this.state.msg >= 5) {
                  return (
<<<<<<< Updated upstream
                    <TouchableOpacity   onPress={() => this.startCall()}>
                     <Svg
                   style={{width: 27, height: 27}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <Path
                fill='grey'
              d="M480.3 320.3L382.1 278.2c-21.41-9.281-46.64-3.109-61.2 14.95l-27.44 33.5c-44.78-25.75-82.29-63.25-108-107.1l33.55-27.48c17.91-14.62 24.09-39.7 15.02-61.05L191.7 31.53c-10.16-23.2-35.34-35.86-59.87-30.19l-91.25 21.06C16.7 27.86 0 48.83 0 73.39c0 241.9 196.7 438.6 438.6 438.6c24.56 0 45.53-16.69 50.1-40.53l21.06-91.34C516.4 355.5 503.6 330.3 480.3 320.3zM463.9 369.3l-21.09 91.41c-.4687 1.1-2.109 3.281-4.219 3.281c-215.4 0-390.6-175.2-390.6-390.6c0-2.094 1.297-3.734 3.344-4.203l91.34-21.08c.3125-.0781 .6406-.1094 .9531-.1094c1.734 0 3.359 1.047 4.047 2.609l42.14 98.33c.75 1.766 .25 3.828-1.25 5.062L139.8 193.1c-8.625 7.062-11.25 19.14-6.344 29.14c33.01 67.23 88.26 122.5 155.5 155.5c9.1 4.906 22.09 2.281 29.16-6.344l40.01-48.87c1.109-1.406 3.187-1.938 4.922-1.125l98.26 42.09C463.2 365.2 464.3 367.3 463.9 369.3z"/></Svg>
=======
                    <TouchableOpacity
                      onPress={() => this.startCall()}
                      style={{
                        backgroundColor: '#FFF5F8',
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        alignSelf: 'center',
                        // right: '10%',
                        position: 'absolute',
                      }}>
                      <Svg
                        style={{
                          //  right: windowWidth / 2.7,
                          top: 9,
                          right: 1,
                          alignSelf: 'center',
                        }}
                        alignSelf="center"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fal"
                        data-icon="angle-left"
                        class="svg-inline--fa fa-angle-left fa-w-6"
                        role="img"
                        width="20"
                        height="25"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <G clip-path="url(#clip0_145_165)">
                          <Path
                            d="M10.0334 3.33317C10.6845 3.46021 11.283 3.77867 11.7521 4.24779C12.2212 4.71691 12.5397 5.31535 12.6667 5.9665M10.0334 0.666504C11.3862 0.816795 12.6478 1.42262 13.6109 2.38451C14.574 3.3464 15.1814 4.60718 15.3334 5.95984M14.6667 11.2798V13.2798C14.6675 13.4655 14.6294 13.6493 14.555 13.8194C14.4807 13.9895 14.3716 14.1422 14.2348 14.2677C14.0979 14.3933 13.9364 14.4888 13.7605 14.5483C13.5847 14.6078 13.3983 14.6299 13.2134 14.6132C11.1619 14.3903 9.19137 13.6893 7.46004 12.5665C5.84926 11.5429 4.48359 10.1773 3.46004 8.5665C2.33336 6.82731 1.6322 4.84717 1.41337 2.7865C1.39671 2.60215 1.41862 2.41634 1.4777 2.24092C1.53679 2.0655 1.63175 1.9043 1.75655 1.76758C1.88134 1.63087 2.03324 1.52164 2.20256 1.44685C2.37189 1.37206 2.55493 1.33334 2.74004 1.33317H4.74004C5.06357 1.32999 5.37723 1.44456 5.62254 1.65553C5.86786 1.86649 6.02809 2.15947 6.07337 2.47984C6.15779 3.11988 6.31434 3.74832 6.54004 4.35317C6.62973 4.59179 6.64915 4.85111 6.59597 5.10042C6.5428 5.34973 6.41928 5.57858 6.24004 5.75984L5.39337 6.6065C6.34241 8.27553 7.72434 9.65747 9.39337 10.6065L10.24 9.75984C10.4213 9.58059 10.6501 9.45707 10.8995 9.4039C11.1488 9.35073 11.4081 9.37014 11.6467 9.45984C12.2516 9.68554 12.88 9.84209 13.52 9.9265C13.8439 9.97219 14.1396 10.1353 14.3511 10.3848C14.5625 10.6344 14.6748 10.9529 14.6667 11.2798Z"
                            // stroke="url(#paint0_linear_145_165)"
                            stroke="#EA337E"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </G>
                        <Defs>
                          <LinearGradient
                            id="paint0_linear_145_165"
                            x1="8.37067"
                            y1="0.666504"
                            x2="8.37067"
                            y2="14.6186"
                            gradientUnits="userSpaceOnUse">
                            <Stop stop-color="#ED70B0" />
                            <Stop offset="1" stop-color="#EA337E" />
                          </LinearGradient>
                          <ClipPath id="clip0_145_165">
                            <Rect width="16" height="16" fill="white" />
                          </ClipPath>
                        </Defs>
                      </Svg>
>>>>>>> Stashed changes
                    </TouchableOpacity>
                  );
                } else {
                  return (
<<<<<<< Updated upstream
                    <TouchableOpacity onPress={() => this.messageAlert()}>
=======
                    <TouchableOpacity
                      onPress={() => this.messageAlert()}
                      style={{
                        backgroundColor: '#FFF5F8',
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        alignSelf: 'center',
                        // right: '10%',
                        position: 'absolute',
                      }}>
>>>>>>> Stashed changes
                      <Svg
              style={{width: 27, height: 27}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <Path
              fill='grey'
               d="M480.3 320.3L382.1 278.2c-21.41-9.281-46.64-3.109-61.2 14.95l-27.44 33.5c-44.78-25.75-82.29-63.25-108-107.1l33.55-27.48c17.91-14.62 24.09-39.7 15.02-61.05L191.7 31.53c-10.16-23.2-35.34-35.86-59.87-30.19l-91.25 21.06C16.7 27.86 0 48.83 0 73.39c0 241.9 196.7 438.6 438.6 438.6c24.56 0 45.53-16.69 50.1-40.53l21.06-91.34C516.4 355.5 503.6 330.3 480.3 320.3zM463.9 369.3l-21.09 91.41c-.4687 1.1-2.109 3.281-4.219 3.281c-215.4 0-390.6-175.2-390.6-390.6c0-2.094 1.297-3.734 3.344-4.203l91.34-21.08c.3125-.0781 .6406-.1094 .9531-.1094c1.734 0 3.359 1.047 4.047 2.609l42.14 98.33c.75 1.766 .25 3.828-1.25 5.062L139.8 193.1c-8.625 7.062-11.25 19.14-6.344 29.14c33.01 67.23 88.26 122.5 155.5 155.5c9.1 4.906 22.09 2.281 29.16-6.344l40.01-48.87c1.109-1.406 3.187-1.938 4.922-1.125l98.26 42.09C463.2 365.2 464.3 367.3 463.9 369.3z"/></Svg>
                    </TouchableOpacity>
                  );
                }
              } else {
                return (
                  <Text
                    style={{
                      color: 'red',
                      right: '70%',
                      top: '2%',
                      alignSelf: 'center',
                      alignSelf: 'center',
                    }}>
                    通話ポイントなし
                  </Text>
                );
              }
            })()}
          </View>
        </View>

        <KeyboardAvoidingView
          style={{width: '100%', height: '95%'}}
          behavior="position">
          {this.state.loadingChats ? (
            <View
              style={{
                position: 'absolute',
                width: windowWidth,
                height: windowHeight,
                top: 200,
                left: 0,
              }}>
              <ActivityIndicator
                style={{marginTop: 100}}
                size="small"
                color="#69747f"
              />
              {/* <Text></Text> */}
            </View>
          ) : (
            <View style={{width: '100%', height: tableHeight}}>
              <FlatList
                inverted
                ref={ref => {
                  this.flatListRef = ref;
                }}
                onEndReachedThreshold={0.3}
                onScrollBeginDrag={this.handleScrollView}
                initialNumToRender={10}
                removeClippedSubviews={true}
                extraData={this.state.refresh}
                style={{width: '100%', height: windowHeight - 500, top: 15}}
                data={this.state.ret}
                renderItem={this.renderCell}
                keyExtractor={item => item.id}
                // scrollEnabled = {false}
              />
              {global.mail_count != 0 ? (
                <View
                  style={{
                    width: '100%',
                    padding: 8,
                    // alignSelf:"center",
                    // top: "23%",
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingTop:windowWidth/ 13,
                    // position: 'absolute',
                  }}>
                  <TextInput
                    autoCapitalize={false}
                    multiline={true}
                    autoFocus={true}
                    style={{
                      backgroundColor: '#E9EBEE',
                      width: windowWidth - 50,
                      lineHeight: 20,
                      borderRadius: 5,
                      padding: 5,
                      color: 'black',
                      fontSize: 13,
                    }}
                    onChangeText={message => this.setState({message})}
                    value={this.state.message}></TextInput>

                  <TouchableOpacity
                    style={{width: 35, height: 30, marginLeft: 0}}
                    onPress={() => this.sendMesage(id)}>
                    <Svg
                      style={{
                        marginTop: 4,
                        marginLeft: 10,
                        width: 22,
                        height: 22,
                      }}
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fal"
                      data-icon="paper-plane"
                      class="svg-inline--fa fa-paper-plane fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512">
                      <Path
                        fill="black"
                        d="M464 4.3L16 262.7C-7 276-4.7 309.9 19.8 320L160 378v102c0 30.2 37.8 43.3 56.7 20.3l60.7-73.8 126.4 52.2c19.1 7.9 40.7-4.2 43.8-24.7l64-417.1C515.7 10.2 487-9 464 4.3zM192 480v-88.8l54.5 22.5L192 480zm224-30.9l-206.2-85.2 199.5-235.8c4.8-5.6-2.9-13.2-8.5-8.4L145.5 337.3 32 290.5 480 32l-64 417.1z"></Path>
                    </Svg>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: '#E9EBEE',
                    bottom: 36,
                    height: 60,
                  }}>
                  <Text
                    style={{
                      // backgroundColor: '#E9EBEE',
                      lineHeight: 40,
                      borderRadius: 5,
                      padding: 0,
                      color: 'black',
                      fontSize: 20,
                      fontWeight: 'bold',
                      left: 0,
                      top: 10,
                      alignSelf: 'center',
                    }}>
                    メッセージへのポイントはありません
                  </Text>
                </View>
              )}
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const Left = ({msg, self}) => (
  <View
    style={{
      margin: 10,
      width: windowWidth - 10,
      borderRadius: 5,
      flexDirection: 'row',
    }}>
    <TouchableOpacity
      style={{width: 26, height: 26}}
      onPress={() => self.gotoUserProfile()}>
      <Image
        style={{width: 26, height: 26, borderRadius: 13}}
        source={{
          uri:
            URL_TEMP +
            '/' +
            global.profile_image_dir +
            '/' +
            global.profile_image,
        }}
        defaultSource={require('.././icon/Picture.png')}
      />
    </TouchableOpacity>

    <View
      style={{
<<<<<<< Updated upstream
        backgroundColor: '#FFF',
        padding: 10,
=======
        backgroundColor: '#FFF5F8',
        padding: 1,
        paddingLeft: 5,
        paddingRight: 5,
>>>>>>> Stashed changes
        borderRadius: 10,
        marginLeft: 5,
      }}>
      <Text
        selectable={true}
        style={{fontSize: 13, textAlign: 'center', color: global.textColor}}>
        {StringUtils.findURLs(StringUtils.convertUnicode(msg.item.data), self)}
      </Text>
    </View>
  </View>
);

const Right = ({msg, self}) => (
  <View style={{margin: 10, alignItems: 'flex-end', width: windowWidth - 20}}>
<<<<<<< Updated upstream
    <View style={{backgroundColor: '#FFF', padding: 10, borderRadius: 10}}>
=======
    <View
      style={{
        backgroundColor: '#EA337E',
        padding: 1,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 10,
        borderBottomRightRadius: 0,
      }}>
>>>>>>> Stashed changes
      <Text
        selectable={true}
        style={{fontSize: 12, textAlign: 'center', color: 'black'}}>
        {StringUtils.findURLs(StringUtils.convertUnicode(msg.item.data), self)}
      </Text>
    </View>
  </View>
);

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

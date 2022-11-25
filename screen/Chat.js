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
} from 'react-native';

var Sound = require('react-native-sound');

import moment from 'moment';

import Svg, {G, Path} from 'react-native-svg';

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
    // this.getChat();
    this.interval = setInterval(() => this.getChat({ time: Date.now() }), 1000);
    this.getChatPoint();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.getChatPoint();
  }

  // componentWillUnmount() {
  //   this.getChat();
  //   this.getChatPoint();
  // }
  getChatPoint() {
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
  }

  getChat() {
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
          // console.log(se.data);
          global.othertoken = ret.token;


          // alert(JSON.stringify(global.type));

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
        params['token'] =global.token;
        // params[''] = ;
//  this.state.type = global.type;
        
        // alert(this.state.type);

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
  }

  onEndReached() {}

  back() {
    // this.props.navigation.push('Messages');
    if (global.prevPage == 'UserCanSearch') {
      this.props.navigation.push('UserCanSearch');
      global.otherid;
    } else {
      this.props.navigation.push('Messages');
      global.otherid;
    }
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
    params['token'] = global.othertoken;

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
    // global.prevPageCall = 'Chat';
   

    this.props.navigation.navigate('UserCanSearch');

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
          alert(JSON.stringify(ret));
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

        global.socket.emit('on-messages', params);
        // console.log(params);
      },
    );
  }

  startCall() {
    global.prevPageCall = 'Chat';

    this.props.navigation.navigate('caller');
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
            width: '100%',
            backgroundColor: '#E9EBEE',
            height: windowHeight / 15,
            flexDirection: 'row',
            zIndex: 2,
          }}>
          {this.state.showLoading ? (
            <></>
          ) : (
            <TouchableOpacity
              style={{
                position: 'absolute',
                width: '30%',
                // backgroundColor:'black',
                // alignSelf:'flex-star',
                height: 30,
                marginLeft: 145,
                marginTop: windowHeight / 10 - 65,
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
                  marginLeft: 5,
                  height: 30,
                  lineHeight: 32,
                  textAlign: 'left',
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {StringUtils.convertUnicode(global.name)}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              marginLeft: 5,
              marginTop: windowHeight / 10 - 65,
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
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 30,
              left: '79%',
              top: 13,
              flexDirection: 'row',
            }}>
            {(() => {
              if (global.call_minutes != 0) {
                if (this.state.msg >= 5) {
                  return (
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
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity onPress={() => this.messageAlert()}>
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
        backgroundColor: '#FFF',
        padding: 10,
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
    <View style={{backgroundColor: '#FFF', padding: 10, borderRadius: 10}}>
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

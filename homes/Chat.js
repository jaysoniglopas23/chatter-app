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
      chatsRefreshed: true,
      receivedAdded: false,
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

  componentDidMount() {
    this.getChat();
    this.getChatPoint();
  }
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
            id: ret[0].otherid,
            ret: ret,
            data: ret[0].data,
            profile_image: ret[0].profile_image,
            profile_image_dir: ret[0].profile_image_dir,
            datetime: ret[0].datetime,
            msg_to: ret[0].msg_to,
            msg_from: ret[0].msg_from,
            timezone: ret[0].timezone,
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
    // });
  }

  onEndReached() {}

  back() {
    this.props.navigation.navigate('Messages');
    // if (global.previousPage == 'UserProfile') {
    //   this.props.navigationRef.current?.navigate('UserProfile');
    // } else {
    //   this.props.navigationRef.current?.navigate('Messages');
    // }
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

            for (var i = ret.length - 1; i >= 0; i--) {
              self.setState(prevState => ({
                data: [...prevState.data, ret[i]],
              }));
            }

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

      // alert(ret);
      self.setState({
        photo: ret.file,
        msgid: ret.msgid,
        socketid: ret.socketid,
        msg_from: ret.msg_from,
        msg_to: ret.msg_to,
      });
    });

    let params = {};

    params['datetime'] = this.state.datetime;
    params['to'] = global.otherid;
    params['from'] = this.state.msg_from;
    params['timezone'] = this.state.timezone;
    params['data'] = this.state.message;
    params['points'] = this.state.points;
    params['type'] = 'string';

    console.log(params);

    global.socket.emit('on-send-message', params);

    let message = {
      data: this.state.message,
      id: this.state.msg_to,
      nickname: global.name,
      profile_image: global.profile_image,
      msg_from: global.user_id,
    };

    self.setState(
      prevState => ({
        message: '',
        data: [message, ...prevState.data],
      }),
      () => {
        self.setState(
          {
            refresh: 1,
          },
          () => {
            self.flatListRef.scrollToOffset({
              animated: true,
              offset: self.state.data.length,
            });
          },
        );
      },
    );
  }

  renderCell(msg) {
    if (msg.item.msg_from == global.otherid) {
      // alert(2);
      return <Left msg={msg} self={this} />;
    } else {
      // alert(1);
      return <Right msg={msg} self={this} />;
    }
  }

  gotoUserProfile(msg_from) {
    // global.previousPage = 'Chats';
    // global.currentPage = 'UserProfile';

    this.props.navigation.navigate('User');

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

        global.socket.emit('on-messages', params);
        // console.log(params);
      },
    );
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
                width: '100%',
                height: 30,
                marginLeft: 145,
                marginTop: windowHeight / 10 - 65,
                flexDirection: 'row',
              }}
              onPress={() => this.gotoUserProfile(msg_from)}>
              <Image
                style={{width: 30, height: 30, borderRadius: 30}}
                source={{
                  uri:
                    URL_TEMP +
                    '/' +
                    this.state.profile_image_dir +
                    '/' +
                    this.state.profile_image,
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
          {global.call_minutes != 0 ? (
            <TouchableOpacity>
              <Image
                style={{
                  resizeMode: 'contain',
                  height: 35,
                  width: 35,
                  left: 320,
                  top: 10,
                }}
                source={require('../icon/Asset5.png')}
              />
            </TouchableOpacity>
          ) : (
            <Text style={{color: 'red', left: 265, top: 15}}>
              通話ポイントなし
            </Text>
          )}
        </View>

        <KeyboardAvoidingView
          style={{width: '100%', height: tableHeight}}
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
                style={{width: '100%', height: windowHeight - 500, top: 100}}
                data={this.state.ret}
                renderItem={this.renderCell}
                keyExtractor={item => item.id}
                // scrollEnabled = {false}
              />
              {global.mail_count != 0 ? (
                <View
                  style={{
                    width: '100%',
                    padding: 100,
                    right: 90,
                    top: 23,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
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
                      fontSize:20,
                      fontWeight:'bold',
                      left: 0,
                      top:10,
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
            self.state.profile_image_dir +
            '/' +
            self.state.profile_image,
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

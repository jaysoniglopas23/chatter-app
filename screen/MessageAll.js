import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
  Message1Text,
} from '../styles/MessageStyles';
import Tabs from './tabs';
import Chat from './Chat';
import {Message} from 'react-native-gifted-chat';
import { cos } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class MessagesScrean extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goChat = this.goChat.bind(this);
  }

  goChat(id, name, lastmessage, profile_image, profile_image_dir, token) {
    global.prevPage = 'Messages';
    this.props.navigation.push('Chat');

    let self = this;

    let params = {};

    this.setState(
      {
        params: params,
        refresh: 1,
      },

      () => {
        global.socket.on('emit-matched', function (ret) {
          global.socket.off('emit-matthed');
          // alert(JSON.stringify(ret));
          // console.log(ret);

          self.setState({
            id: ret[0].id,
            date_time: ret[0].date_time,
            lastmessage: ret[0].lastmessage,
            message_count: ret[0].message_count,
            name: ret[0].name,
            online: ret[0].online,
            profile_image: ret[0].profile_image,
            profile_image_dir: ret[0].profile_image_dir,
            save: ret[0].save,
            timezone: ret[0].timezone,
            unread_count: ret[0].unread_count,
            ret: ret,
<<<<<<< Updated upstream
            token:ret.token
=======
            token: ret[0].token,
>>>>>>> Stashed changes
          });

          // global.otherid = ret.id;
        });
        let params = {};
        params['id'] = id;
        params['date_time'] = this.state.date_time;
        params['lastmessage'] = this.state.lastmessage;
        params['message_count'] = this.state.message_count;
        params['name'] = name;
        params['online'] = this.state.online;
        params['profile_image'] = profile_image;
        params['profile_image_dir'] = profile_image_dir;
        params['save'] = this.state.save;
        params['timezone'] = this.state.timezone;
        params['unread_count'] = this.state.unread_count;
        params['token'] = token;

        global.otherid = id;
        global.name = name;
        global.lastmessage = lastmessage;
        global.profile_image_dir = profile_image_dir;
        global.profile_image = profile_image;
<<<<<<< Updated upstream
       

=======
        global.token = token;
>>>>>>> Stashed changes
        // alert(global.otherid);

        global.socket.emit('on-matched', params);
        // console.log(params);
      },
    );
  }

  // componentDidUpdate() {
  //   this.getChats();
  // }

  componentDidMount() {
  
    this.getChats();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // Alert.alert('Refreshed');
      this.getChats();
    });
    // this.interval = setInterval(() => this.state.lastmessage({ time: Date.now() }), 1000);
    
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
    this.getChats();
    this._unsubscribe();
    
  }

  getChats(id, name) {
    // this.makeRemoteRequest();

    let self = this;

    let params = {};

    this.setState(
      {
        params: params,
        refresh: 1,
      },

      () => {
        global.socket.on('emit-matched', function (ret) {
          global.socket.off('emit-mathed');
          // alert(JSON.stringify(ret));
          // console.log(ret);

          self.setState({
            id: ret[0].id,
            date_time: ret[0].date_time,
            lastmessage: ret[0].lastmessage,
            message_count: ret[0].message_count,
            name: ret[0].name,
            online: ret[0].online,
            profile_image: ret[0].profile_image,
            profile_image_dir: ret[0].profile_image_dir,
            save: ret[0].save,
            timezone: ret[0].timezone,
            unread_count: ret[0].unread_count,
            ret: ret,
            token: ret[0].token,
          });
        });
        let params = {};
        params['id'] = id;
        params['date_time'] = this.state.date_time;
        params['lastmessage'] = this.state.lastmessage;
        params['message_count'] = this.state.message_count;
        params['name'] = name;
        params['online'] = this.state.online;
        params['profile_image'] = this.state.profile_image;
        params['profile_image_dir'] = this.state.profile_image_dir;
        params['save'] = this.state.save;
        params['timezone'] = this.state.timezone;
        params['unread_count'] = this.state.unread_count;
        params['token'] = this.state.token;
        // params['token'] = this.state.token;

        global.otherid = id;
        global.name = name;

        // alert(self.state.name);

        global.socket.emit('on-matched', params);
      },
    );
  }

  // makeRemoteRequest = _.debounce(() => {
  //   this.setState({loading: true});

  //   getUsers(20, this.state.query)
  //     .then(ret => {
  //       this.setState({
  //         loading: false,
  //         data: ret,
  //         fullData: ret,
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({error, loading: false});
  //     });
  // }, 250);

  handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, ret => {
      return contains(user, formattedQuery);
    });
    this.setState({data, query: text}, () => this.makeRemoteRequest());
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={{}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <Container>
        <FlatList
          data={this.state.ret}
          style={{width: windowWidth - 40, height: '100%', alignSelf: 'center'}}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
<<<<<<< Updated upstream
            <Card
              style={{paddingTop: 10}}
              onPress={() =>
                this.goChat(
                  item.id,
                  item.name,
                  item.lastmessage,
                  item.profile_image,
                  item.profile_image_dir,
              
                )
              }>
              {item.id == global.myuserid ? (
                <></>
              ) : (
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg
                      source={{
                        uri:
                          URL_TEMP +
                          '/' +
                          item.profile_image_dir +
                          '/' +
                          item.profile_image,
                      }}
                    />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.name}</UserName>
                      <PostTime>{item.date_time}</PostTime>
                    </UserInfoText>
                    <MessageText>{item.lastmessage}</MessageText>
                    {/* {item.unread_count <= 0  ? (
=======
            <View
              style={{
                // width: '100%',
                // height: "100%",
                alignSelf: 'center',
                // backgroundColor: '#FFF',
              }}>
              {item.unread_count == 0 ? (
                <></>
              ) : (
                <Card
                  style={{paddingTop:10,paddingBottom:1}}
                  onPress={() =>
                    this.goChat(
                      item.id,
                      item.name,
                      item.lastmessage,
                      item.profile_image,
                      item.profile_image_dir,
                      item.token,
                    )
                  }>
                  {item.id == global.myuserid ? (
                    <></>
                  ) : (
                    <UserInfo>
                      <UserImgWrapper>
                        {item.online == 1 ? (
                          <Svg
                            style={{
                              alignSelf: 'center',
                              top: 10,
                              position: 'absolute',
                            }}
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="angle-left"
                            class="svg-inline--fa fa-angle-left fa-w-6"
                            role="img"
                            width="60"
                            height="60"
                            viewBox="0 0 56 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <Circle
                              cx="28"
                              cy="28"
                              r="27"
                              fill="white"
                              stroke="#EA337E"
                              stroke-width="2"
                            />
                            <Defs>
                              <LinearGradient
                                id="paint0_linear_50_2004"
                                x1="28"
                                y1="0"
                                x2="28"
                                y2="56"
                                gradientUnits="userSpaceOnUse">
                                <Stop stop-color="#ED70B0" />
                                <Stop offset="1" stop-color="#EA337E" />
                              </LinearGradient>
                            </Defs>
                          </Svg>
                        ) : (
                          <></>
                        )}
                        <UserImg
                          source={{
                            uri:
                              URL_TEMP +
                              '/' +
                              item.profile_image_dir +
                              '/' +
                              item.profile_image,
                          }}
                        />
                      </UserImgWrapper>
                      <TextSection>
                        <UserInfoText>
                          <UserName>{item.name}</UserName>
                          <PostTime>{item.date_time}</PostTime>
                        </UserInfoText>
                        <MessageText>{item.lastmessage}</MessageText>
                        {/* {item.unread_count <= 0  ? (
>>>>>>> Stashed changes
                    <Message1Text>{item.lastmessage}</Message1Text>
                    ):( <MessageText>{item.lastmessage}</MessageText>)} */}
                      </TextSection>
                    </UserInfo>
                  )}
                </Card>
              )}
            </View>
          )}
        />
      </Container>
    );
  }
}

export default MessagesScrean;

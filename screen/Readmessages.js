import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
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
} from '../styles/MessageStyles';
import Tabs from './tabs';
import Chat from './Chat';
import {Message} from 'react-native-gifted-chat';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class Readmessages extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goChat = this.goChat.bind(this);
  }

  goChat(id, name, lastmessage, profile_image, profile_image_dir) {
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
          });
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

        global.otherid = id;
        global.name = name;
        global.lastmessage = lastmessage;
        global.profile_image_dir = profile_image_dir;
        global.profile_image = profile_image;

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
        {/* <FlatList
          data={this.state.ret}
          style={{width: windowWidth - 40, height: '100%', alignSelf: 'center'}}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
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
                  </TextSection>
                </UserInfo>
              )}
            </Card>
          )}
        /> */}
      </Container>
    );
  }
}

export default Readmessages;

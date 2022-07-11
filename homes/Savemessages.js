import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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
import Tabs from '../navigation/tabs';
import Chat from './Chat';
import {Message} from 'react-native-gifted-chat';

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class Savemessages extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goChat = this.goChat.bind(this);
  }

  goChat() {
    let item = this;

    this.props.navigation.navigate('Chat');
  }

  componentDidMount() {
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
          global.socket.off('emit-matthed');
          // alert(JSON.stringify(ret));
          // console.log(ret);

          self.setState({
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

        params['date_time'] = this.state.date_time;
        params['lastmessage'] = this.state.lastmessage;
        params['message_count'] = this.state.message_count;
        params['name'] = this.state.name;
        params['online'] = this.state.online;
        params['profile_image'] = this.state.profile_image;
        params['profile_image_dir'] = this.state.profile_image_dir;
        params['save'] = this.state.save;
        params['timezone'] = this.state.timezone;
        params['unread_count'] = this.state.unread_count;

        global.socket.emit('on-matched', params);
        // console.log(params);
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
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card style={{paddingTop: 0}} onPress={() => this.goChat()}>
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
            </Card>
          )}
        />
      </Container>
    );
  }
}

export default Savemessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

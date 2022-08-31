import React, {Component} from 'react';
import {
  Container,
  Card,
  Card1,
  UserInfo,
  UserInfo1,
  UserImgWrapper,
  UserImg,
  UserImg1,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  MessageText1,
  TextSection,
  PostsImg,
  UserIcon,
} from '../styles/HeartStyles';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
// import {getUsers, contains} from './api/index';
import {getUsers, contains} from '../styles/index';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import User from './User';
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class Heart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      fullData: [],
      error: null,
      nickname: '',
      image: '',
      id: '',
      users: '',
      isLoading: true,
      dataSource: [],
    };

    this.goBack = this.goBack.bind(this);

    this.goChat = this.goChat.bind(this);
  }

  goBack() {
    this.props.navigationRef.current?.navigate('Dashboard');
  }

  goChat(id) {
    this.props.navigationRef.current?.navigate('Userlikes');

    let self = this;

    this.setState(
      {
        saving: true,
      },

      () => {
        global.socket.on('emit-likes', function (ret) {
          global.socket.off('emit-likes');
          // alert(JSON.stringify(ret));

          self.setState({
            image: ret.image,
            nickname: ret.nickname,
            id: ret.id,
            users: ret.users,
          });
        });
        let params = {};

        params['boardid'] = this.state.boardid;
        params['lastname'] = '';
        params['pages'] = '';
        params['id'] = id;
        params['nickname'] = this.state.nickname;
        params['image'] = this.state.image;
        params['path'] = '';
        params['start'] = 1;
        params['size'] = 2;

        global.user_id = id;

        global.socket.emit('on-likes', params);
      },
    );
  }

  componentDidMount() {
    this.getUser();
    this.makeRemoteRequest();
  }

  getUser() {
    let self = this;

    this.setState(
      {
        saving: true,
      },

      () => {
        global.socket.on('emit-likes', function (ret) {
          global.socket.off('emit-likes');
          // alert(JSON.stringify(ret));

          self.setState({
            image: ret.image,
            nickname: ret.nickname,
            id: ret.id,
            users: ret.users,
          });
        });
        let params = {};

        params['boardid'] = this.state.boardid;
        params['lastname'] = '';
        params['pages'] = '';
        params['id'] = this.state.id;
        params['nickname'] = this.state.nickname;
        params['image'] = this.state.image;
        params['path'] = '';
        params['start'] = 1;
        params['size'] = 2;

        global.socket.emit('on-likes', params);
      },
    );
    // this.props.navigationRef.current?.navigate('Dashboard');
  }

  makeRemoteRequest = _.debounce(() => {
    this.setState({loading: true});

    getUsers(20, this.state.query)
      .then(ret => {
        this.setState({
          loading: false,
          data: ret,
          fullData: ret,
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }, 250);

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
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <FlatList
          data={this.state.users}
          keyExtractor={item => item.id}
          style={{backgroundColor: '#fff', height: '90%'}}
          renderItem={({item}) => (
            <Card onPress={() => this.goChat(item.id)}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg
                    source={{
                      uri: URL_TEMP + '/' + item.path + '/' + item.image,
                    }}
                  />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.nickname}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
          // keyExtractor={item => item.messageText}
          // ItemSeparatorComponent={this.renderSeparator}

          ListFooterComponent={this.renderFooter}
        />

        <View
          style={{
            height: windowHeight / 13,
            // backgroundColor: 'black',
            width: '100%',
            bottom: '27%',
          }}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              backgroundColor: '#ECECEC',
              height: windowHeight / 24,
              left: windowWidth / 16,
              flexDirection: 'row',
              width: windowWidth / 7,
              borderRadius: 2,
              top: windowWidth / 45,
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
          {/* <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              height: windowHeight / 25,
              left: windowWidth / 1.3,
              flexDirection: 'row',
              width: windowWidth / 5 - 5,
              borderRadius: 2,
              bottom: windowHeight / 2 - 397,
            }}
            onPress={() => this.save()}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5, color: 'black'}}>保存</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

export default Heart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

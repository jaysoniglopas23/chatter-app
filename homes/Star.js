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
} from 'react-native';
import _ from 'lodash';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
// import {getUsers, contains} from './api/index';
import {getUsers, contains} from '../styles/index';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import User from './User';

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class Star extends Component {
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

  goChat() {
    this.props.navigation.navigate('User');
  }

  componentDidMount() {
    this.makeRemoteRequest();

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
            path:ret.path
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

        console.log(global.users);
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
      <View style={{backgroundColor: '#fff', height: 620,}}>
        <FlatList
          data={this.state.users}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card>
              <UserInfo>
                <UserImgWrapper onPress={() => this.goChat()}>
                  <UserImg
                    source={{
                      uri:
                        URL_TEMP +
                        '/' +
                        item.path +
                        '/' +
                        item.image,
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

        <TouchableOpacity
          onPress={() => this.goBack()}
          style={{
            backgroundColor: '#ECECEC',
            marginHorizontal: 170,
            height: 31,
            right: 150,
            marginBottom: 30,
            flexDirection: 'row',
            width: 70,
            borderRadius: 2,
            bottom: 0,
          }}>
          <Image
            source={require('../icon/arrow.png')}
            style={{height: 20, top: 5}}
          />
          <Text style={{right: 15, top: 4}}>戻る</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Star;

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

import React, {Component} from 'react';
import {
  Container,
  Card,
  Card1,
  UserInfo,
  UserInfo1,
  UserInfo2,
  UserInfo3,
  UserImgWrapper,
  UserImg,
  UserImg1,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  MessageText1,
  MessageText2,
  MessageText3,
  TextSection,
  PostsImg,
  UserIcon,
} from '../styles/FeedStyles';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import _ from 'lodash';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
// import {getUsers, contains} from './api/index';
import {getUsers, contains} from '../styles/index';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import User from '../homes/User';
import Tabs from '../navigation/tabs';
import moment from 'moment';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import Svg, {G, Path} from 'react-native-svg';

const Stack = createStackNavigator();

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      like: '',
      dislike: '',
      likeActive: false,
      dislikeActive: false,

      data: [],

      postid: '',

      fullData: [],

      error: null,

      start: '0',

      posts_description: '',

      ret: '',

      boardid: '',

      nickname: '',

      name: '',

      userid: [],

      params: {},

      id: '',

      path: '',

      file: '',

      datetime: '',

      description: '',

      postsRefreshed: true,

      refresh: 0,

      post_likes_count: '',

      count_like: '',

      count_unlike: '',

      loadingDeleteConfrimReport: false,

      legacyImplementation: false,
    };

    this.goChat = this.goChat.bind(this);
  }

  goPost() {
    this.props.navigation.navigate('Posttoboard');
  }

  goEdit() {
    this.props.navigation.navigate('Posttoboard');
  }

  deletePost() {
    this.setState({
      modalDeleteConfirmVisible: true,
      modalDeleteEditVisible: false,
    });
  }

  goChat(userid) {
    this.props.navigation.navigate('User');
    console.log(userid);

    let self = this;

    this.setState(
      {},

      () => {
        global.socket.on('emit-posts', function (ret) {
          global.socket.off('emit-posts');
          // JSON.stringify(ret);
          // console.log(ret);

          self.setState({
            callRefreshed: true,
            refresh: 1,

            name: ret.name,
            image: ret.image,
            path: ret.path,
            users: ret.users,
            userid: ret.userid,
          });

          // console.log(id);
        });
        let params = {};

        params['start'] = 0;
        params['size'] = 15;
        params['filter_type'] = '0';
        params['order'] = '0';
        params['name'] = this.state.name;
        params['userid'] = this.state.userid;
        params['id'] = id;

        global.user_id = userid;

        global.socket.emit('on-posts', params);
        console.log(params);
      },
    );
  }

  // setDislike() {
  //   this.setState({
  //     dislikeActive: !this.state.dislikeActive,
  //     dislike: this.state.dislikeActive
  //       ? this.state.dislike - 1
  //       : this.state.dislike + 1,
  //   });
  // }
  // setLike() {
  //   this.setState({
  //     likeActive: !this.state.likeActive,
  //     like: this.state.likeActive ? this.state.like - 1 : this.state.like + 1,
  //   });
  // }

  likeCount(id) {
    let self = this;

    this.setState(
      {
        refresh: 1,
      },
      () => {
        global.socket.on('emit-like-post', function (ret) {
          global.socket.off('emit-like-post');
          // console.log(ret);

          // if(ret.count_like >= 0){
          //   item => item.post_likes_count + 1,

          //   // return;
          // } else {

          // };

          self.setState({
            count_like: ret.count_like,
            count_unlike: ret.count_unlike,
            post_id: ret.post_id,
            refresh: 1,
          });
        });

        let params = {};

        params['count_like'] = this.state.count_like;
        params['count_unlike'] = this.state.count_unlike;
        params['postid'] = id;
        params['socket'] = this.state.socketid;

        console.log(params);
        global.socket.emit('on-like-post', params);
      },
    );
  }
  continueDeleteConfirm(id) {
    // console.log(id);
    let self = this;

    let postid = self.state.postid;

    this.setState(
      {
        loadingDeleteConfrimReport: true,
      },
      () => {
        global.socket.on('emit-post-delete', function (ret) {
          global.socket.off('emit-post-delete');

          self.setState({
            postid: ret.postid,
            refresh: 1,
          });

          // self.setState(
          //   {
          //     timelineData: self.state.timelineData.filter(
          //       item => item.post_id !== self.state.postActionPostId,
          //     ),
          //     refresh: 1,
          //   },
          //   () => {
          //     self.setState({
          //       modalDeleteConfirmVisible: false,
          //       loadingDeleteConfrimReport: false,
          //       postActionPostId: '',
          //     });
          //   },
          // );
        });

        let params = {};

        params['status'] = 1;
        params['postid'] = id;

        console.log(params);
        global.socket.emit('on-post-delete', params);
      },
    );
  }

  componentDidMount() {
    this.makeRemoteRequest();

    let self = this;

    let params = {};

    this.setState(
      {
        params: params,
        refresh: 1,
      },

      () => {
        global.socket.on('emit-posts', function (ret) {
          global.socket.off('emit-posts');
          // alert(JSON.stringify(ret));
          // console.log(ret);

          self.setState({
            posts: ret,
            post_likes_count: ret.post_likes_count,
            nickname: ret[0].nickname,
            posts_description: ret[0].posts_description,
            id: ret[0].id,
            datetime: ret[0].datetime,
            userid: ret[0].userid,
            postid: ret[0].postid,
            path: ret[0].path,
            file: ret[0].file,
            profilephotopath: ret[0].profilephotopath,
            profilephotofile: ret[0].profilephotofile,
          });
        });
        let params = {};

        params['start'] = 0;
        params['size'] = '1000';
        params['boardid'] = 1;
        params['posts_description'] = this.state.posts_description;
        params['nickname'] = this.state.nickname;
        params['name'] = this.state.name;
        params['userid'] = this.state.userid;
        params['path'] = this.state.path;
        params['file'] = this.state.file;
        params['datetime'] = this.state.datetime;
        params['post_likes_count'] = this.state.post_likes_count;

        global.socket.emit('on-posts', params);
        // console.log(params);
      },
    );
  }

  // yourPosts() {
  //   let self = this;

  //   let params = {};

  //   this.setState(
  //     {
  //       params: params,
  //     },

  //     () => {
  //       global.socket.on('emit-your-posts', function (ret) {
  //         global.socket.off('emit-your-posts');
  //         // alert(JSON.stringify(ret));
  //         console.log(ret);

  //         self.setState({
  //
  //           post: ret,
  //           nickname: ret[0].nickname,
  //           datetime: ret[0].datatime,
  //           path: ret[0].path,
  //           file: ret[0].file,
  //
  //         });
  //       });
  //       let params = {};

  //
  // params['boardid'] = 1;
  // params['description'] = 'description';
  // params['datetime'] = moment(new Date()).format(
  //   'YYYY-MM-DD  HH:mm:ss ',
  // );
  // params['userid'] = 'userid';

  //       global.socket.emit('on-your-posts', params);
  //       console.log(params);
  //     },
  //   );
  // }

  makeRemoteRequest = _.debounce(() => {
    this.setState({loading: true});

    getUsers(20, this.state.query)
      .then(data => {
        this.setState({
          loading: false,
          data: [],
          fullData: [],
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }, 250);

  handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const users = _.filter(this.state.users, users => {
      return contains(users, formattedQuery);
    });
    this.setState({users, query: text}, () => this.makeRemoteRequest());
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
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          flex: 1,
          borderWidth: 10,
          borderColor: '#FAEA48',
          borderBottomWidth: 0,
        }}>
        <View
          style={{
            borderWidth: 1,
            width: 280,
            height: 41,
            top: 12,
            left: 17,
            borderColor: 'black',
          }}>
          <TextInput
            style={{backgroundColor: '#fff'}}
            onChangeText={this.handleSearch}
            value={this.state.query}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.goPost()}
            style={{
              width: 70,
              height: 33,
              left: 310,
              bottom: 26,
              backgroundColor: '#ECECEC',
            }}>
            <Text
              onPress={() => this.goPost()}
              style={{textAlign: 'center', top: 7, fontSize: 11,color:'black'}}>
              ???????????????
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 10,
            marginHorizontal: 169,
            bottom: 68,
            right: 147,
            backgroundColor: '#fff',
            color:'black',
          }}>
          ?????????????????????
        </Text>
        <StatusBar style="light-content" />
        <FlatList
          data={this.state.posts}
          extraData={this.state.refresh}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card>
              <UserInfo>
                <UserImgWrapper onPress={() => this.goChat(item.userid)}>
                  <UserImg
                    source={{
                      uri:
                        URL_TEMP +
                        '/' +
                        item.profilephotopath +
                        '/' +
                        item.profilephotofile,
                    }}
                  />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.name}</UserName>
                    <PostTime>{item.datetime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.description}</MessageText>
                  <UserImg1
                    source={{
                      uri: URL_TEMP + '/' + item.path + '/' + item.file,
                    }}
                  />
                </TextSection>
              </UserInfo>

              <UserInfo1 onPress={() => this.likeCount(item.id)}>
                <MessageText1>
                  {'  ???????????????' + '(' + item.post_likes_count + ')'}
                </MessageText1>
              </UserInfo1>
              <UserInfo2 onPress={() => this.continueDeleteConfirm(item.id)}>
                <MessageText2>??????</MessageText2>
              </UserInfo2>
              <UserInfo3 onPress={() => this.goEdit()}>
                <MessageText3>??????</MessageText3>
                {/* <Svg
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
                </Svg> */}
              </UserInfo3>
            </Card>
          )}
          // keyExtractor={item => item.messageText}
          // ItemSeparatorComponent={this.renderSeparator}

          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

export default Post;

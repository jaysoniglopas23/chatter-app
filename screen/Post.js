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
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button,
} from 'react-native';
import _ from 'lodash';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
// import {getUsers, contains} from './api/index';
import {getUsers, contains} from '../styles/postindex';
// import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import User from '../homes/User';
import Tabs from '../navigation/tabs';
import moment from 'moment';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import Svg, {G, Path} from 'react-native-svg';
import Modal from 'react-native-modal';
// import SearchEngine from 'react-native-search-engine';

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

      count: 0,

      path: '',

      file: '',

      value: '',

      datetime: '',

      description: '',

      postsRefreshed: true,

      refresh: 0,

      post_likes_count: '',

      count_like: '',

      count_unlike: '',

      loadingDeleteConfrimReport: false,

      legacyImplementation: false,

      hasUploadPhoto: false,

      modalReportVisible: false,

      modalDeleteConfirmVisible: false,

      modalDeleteEditVisible: false,
    };

    this.goChat = this.goChat.bind(this);
    this.getPost = this.getPost.bind(this);
  }

  componentDidMount() {
    this.getPost();
    this.getMe();
    this.initPost();
    this.searchItems();
  }

  goPost() {
    this.props.navigation.push('Posttoboard');
  }

  goEdit() {
    this.props.navigation.navigate('Posttoboard');
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
  // }\

  // incrementMe = id => {
  //   const newCount = this.state.count_like + 1;
  //   this.setState({
  //     count: newCount,
  //   });
  // };

  likeCount(id) {
    const newCount = this.state.count_like - 1;
    const prevCount = this.state.count_like + 1;
    let self = this;
    // global.likes = global.likes + 1;

    if (global.count_like == 0) {
      this.setState({
        count: newCount,
      });
    } else {
      this.setState({
        count: prevCount,
      });
    }

    this.setState(
      {
        refresh: 1,
      },
      () => {
        global.socket.on('emit-like-post', function (ret) {
          global.socket.off('emit-like-post');
          // console.log(ret);

          self.setState({
            count_like: ret.count_like,
            count_unlike: ret.count_unlike,
            post_id: ret.post_id,
            refresh: 1,
          });
          global.likes = ret.count_like;
          // alert(global.likes);
          // if (ret.count_like == 0) {
          //   item => item.post_likes_count + 1;
          // } else {
          //   item => item.post_likes_count - 1;
          // }
          // if (global.likes >= 0) {
          //   self.setState({
          //     post_likes_count: global.likes,
          //   });
          // } else {
          //   self.setState({
          //     post_likes_count: self.state.post_likes_count,
          //   });
          // }
        });

        let params = {};

        params['count_like'] = this.state.count_like;
        params['count_unlike'] = this.state.count_unlike;
        params['postid'] = id;
        params['socket'] = this.state.socketid;
        // global.likes = this.state.post_likes_count;
        // alert(global.likes);
        global.socket.emit('on-like-post', params);
      },
    );
  }

  initPost() {
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
            data: ret,
            post_likes_count: ret[0].post_likes_count,
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
          // global.likes = self.state.post_likes_count;
          if (self.state.path) {
            self.setState({
              hasUploadPhoto: true,
            });
          } else {
            self.setState({
              hasUploadPhoto: false,
            });
          }
          global.posts = self.state.posts;

          // alert(global.likes);
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
        // params['posts'] = this.state.posts.filter;

        // global.posts = this.state.posts;

        global.socket.emit('on-posts', params);
        console.log(params);
      },
    );
  }

  getPost() {
    // this.likeCount();
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
            post_likes_count: ret[0].post_likes_count,
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
          // alert(global.socketid);
          // if (self.state.hasUploadPhoto != "") {
          //   self.state.path
          //   self.state.file
          // };
          global.likes = self.state.post_likes_count;
          if (self.state.path) {
            self.setState({
              hasUploadPhoto: true,
            });
          } else {
            self.setState({
              hasUploadPhoto: false,
            });
          }
          global.posts = self.state.posts;
          // alert(global.posts);
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
        // params['posts'] = this.state.posts.filter;

        // global.posts = this.state.posts;

        global.socket.emit('on-posts', params);
        console.log(params);
      },
    );
  }

  getMe() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-details', function (ret) {
        global.socket.off('on-details');
        //  alert(JSON.stringify(ret))

        self.setState({
          nickname: ret.nickname,
          email: ret.email,
          myid: ret.id,
        });

        global.myid = self.state.myid;
      });

      let params = {};

      params['firstname'] = '';
      params['lastname'] = '';
      params['dob'] = moment(new Date()).format('YYYY-MM-DD  HH:mm:ss ');
      params['about'] = '';
      params['job'] = '';
      params['company'] = '';
      params['school'] = '';
      params['gender'] = 1;
      params['gender_pref'] = 1;
      params['distance_threshold'] = 0;
      params['nickname'] = this.state.nickname;
      params['smoking'] = 0;
      params['drinking'] = 0;
      params['marrried'] = 0;
      params['presence_of_children'] = 0;
      params['like_children_or_not'] = 0;
      params['marriage_desire'] = 0;
      params['presence_of_pet'] = 0;
      params['holiday'] = 0;
      params['hobbie'] = '';
      params['bloodtype'] = '';
      params['email'] = this.state.email;
      params['name'] = '';
      params['introduction'] = '';
      params['character'] = '';
      params['location'] = '';

      // global.myid = self.state.email;

      // alert(global.myid);

      global.socket.emit('on-details', params);
    });
  }

  // makeRemoteRequest = () => {
  //   this.setState({loading: true});

  //   getUsers(100, this.state.query)
  //     .then(posts => {
  //       this.setState({
  //         loading: false,
  //         // data: [],
  //         fullData: [],
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({error, loading: false});
  //     });
  // };

  // handleSearch = text => {
  //   const formattedQuery = text.toLowerCase();
  //   const posts = _.filter(this.state.posts, posts => {
  //     return contains(posts, formattedQuery);
  //   });
  //   this.setState({posts, query: text}, () => this.makeRemoteRequest());
  // };

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

  closeReportModal() {
    this.setState({
      modalReportVisible: false,
    });
  }

  inap() {
    let self = this;

    this.setState(
      {
        modalReportVisible: false,
      },
      () => {
        let confrimMessage = '';

        if (global.locale == 'en') {
          confrimMessage = 'Report this user';
        } else {
          confrimMessage = 'このユーザーを報告';
        }

        self.setState({
          modalConfirmVisible: true,
          confirmMessage: confrimMessage,
          reportType: 2,
        });
      },
    );
  }

  spam() {
    let self = this;

    this.setState(
      {
        modalReportVisible: false,
      },
      () => {
        let confrimMessage = '';

        if (global.locale == 'en') {
          confrimMessage = 'Report this user';
        } else {
          confrimMessage = 'このユーザーを報告';
        }

        self.setState({
          modalConfirmVisible: true,
          confirmMessage: confrimMessage,
          reportType: 1,
        });
      },
    );
  }

  setOption() {
    this.setState({
      loading: false,
      // data: [],
      fullData: [],
    });
  }

  report(id) {
    let self = this;

    this.setState(
      {
        modalVisible: false,
      },
      () => {
        self.setState({
          modalReportVisible: true,
        });
      },
    );
  }

  closeDeleteConfirm() {
    this.setState({
      modalDeleteConfirmVisible: false,
    });
  }

  deletePost(id) {
    console.log(id);
    this.setState({
      modalDeleteConfirmVisible: true,
      modalDeleteEditVisible: false,
    });
    global.mypostid = id;
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
            status: ret.status,
          });

          self.setState(
            {
              refresh: 1,
            },
            () => {
              self.setState({
                modalDeleteConfirmVisible: false,
                loadingDeleteConfrimReport: false,
                postid: '',
                refresh: 1,
              });
            },
          );
          self.props.navigation.push('Post');
        });

        let params = {};

        params['status'] = 1;
        params['postid'] = global.mypostid;

        console.log(params);
        global.socket.emit('on-post-delete', params);
      },
    );
  }

  closeEditDeleteConfirmModal() {
    this.setState({
      modalDeleteConfirmVisible: false,
    });
  }

  searchItems = text => {
    const posts = global.posts;
    const newData = _.filter(this.state.posts, item => {
      const itemData = `${item.description.toUpperCase()},${item.nickname.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    if (this.state.data == '') {
      this.setState({
        data: posts,
        value: text,
      });
      // alert(this.state.data) ;
    } else {
      this.setState({
        data: newData,
        value: text,
      });
    }
    // alert(JSON.stringify(data));
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            borderWidth: 1,
            width: windowWidth / 1.4,
            height: 41,
            top: 12,
            left: 17,
            borderColor: 'black',
          }}>
          <TextInput
            style={{backgroundColor: '#fff', color: 'black'}}
            onChangeText={text => this.searchItems(text)}
            value={this.state.value}
            clearButtonMode="always"
          />
        </View>
        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => this.goPost()}
            style={{
              width: windowWidth / 6,
              height: 33,
              left: windowWidth - 75,
              bottom: 26,
              backgroundColor: '#ECECEC',
            }}>
            <Text
              onPress={() => this.goPost()}
              style={{
                textAlign: 'center',
                top: 7,
                fontSize: 11,
                color: 'black',
              }}>
              新しく投稿
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 10,
            width: windowWidth / 5,
            bottom: 68,
            left: windowWidth / 15,
            backgroundColor: '#fff',
            color: 'black',
          }}>
          投稿を検索する
        </Text>

        <StatusBar style="light-content" />
        <View
          style={{
            width: '100%',
            height: windowHeight,
            alignSelf: 'center',
          }}>
          <FlatList
            data={this.state.data}
            extraData={this.state.refresh}
            keyExtractor={item => item.id}
            style={{
              height: '100%',
              alignSelf: 'center',
              top: windowHeight / 2 - 380,
            }}
            renderItem={({item}) => (
              <View
                style={{
                  width: '100%',
                  // height: windowHeight / 2.2,
                  alignSelf: 'center',
                  // backgroundColor: 'black',
                }}>
                {item.path ? (
                  <View
                    style={{
                      width: '100%',
                      height: windowHeight / 2,
                      alignSelf: 'center',
                      // backgroundColor: 'red',
                      paddingBottom: 40,
                      marginTop: 10,
                    }}>
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
                        {item.path ? (
                          <UserImg1
                            source={{
                              uri: URL_TEMP + '/' + item.path + '/' + item.file,
                            }}
                          />
                        ) : (
                          <View style={{paddingBottom: 10}}></View>
                        )}
                      </TextSection>
                    </UserInfo>
                    {item.userid == global.myid ? (
                      <UserInfo1>
                        <MessageText1>
                          {'  お気に入り' + '(' + item.post_likes_count + ')'}
                        </MessageText1>
                      </UserInfo1>
                    ) : (
                      <UserInfo1 onPress={() => this.likeCount(item.id)}>
                        <MessageText1>
                          {'  お気に入り' + '(' + item.post_likes_count + ')'}
                        </MessageText1>
                      </UserInfo1>
                    )}
                    {item.userid == global.myid ? (
                      <UserInfo2 onPress={() => this.deletePost(item.id)}>
                        <MessageText2>削除</MessageText2>
                        <Svg
                          style={{width: 15, height: 15, bottom: 10, left: 8}}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fal"
                          data-icon="angle-left"
                          class="svg-inline--fa fa-angle-left fa-w-6"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512">
                          <Path
                            fill="black"
                            d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"
                          />
                        </Svg>
                      </UserInfo2>
                    ) : (
                      <></>
                    )}

                    {item.userid == global.myid ? (
                      <UserInfo3 onPress={() => this.goEdit()}>
                        <MessageText3>編集</MessageText3>
                        <Svg
                          style={{width: 15, height: 15, bottom: 10, left: 8}}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fal"
                          data-icon="angle-left"
                          class="svg-inline--fa fa-angle-left fa-w-6"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512">
                          <Path
                            fill="black"
                            d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"
                          />
                        </Svg>
                      </UserInfo3>
                    ) : (
                      <></>
                    )}
                  </View>
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: windowHeight / 5.4,
                      alignSelf: 'center',
                      // backgroundColor: 'red',
                    }}>
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
                        {item.path ? (
                          <UserImg1
                            source={{
                              uri: URL_TEMP + '/' + item.path + '/' + item.file,
                            }}
                          />
                        ) : (
                          <View style={{paddingBottom: 10}}></View>
                        )}
                      </TextSection>
                    </UserInfo>
                    {item.userid == global.myid ? (
                      <UserInfo1>
                        <MessageText1>
                          {'  お気に入り' + '(' + item.post_likes_count + ')'}
                        </MessageText1>
                      </UserInfo1>
                    ) : (
                      <UserInfo1 onPress={() => this.likeCount(item.id)}>
                        <MessageText1>
                          {'  お気に入り' + '(' + item.post_likes_count + ')'}
                        </MessageText1>
                      </UserInfo1>
                    )}
                    {item.userid == global.myid ? (
                      <UserInfo2 onPress={() => this.deletePost(item.id)}>
                        <MessageText2>削除</MessageText2>
                        <Svg
                          style={{width: 15, height: 15, bottom: 10, left: 8}}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fal"
                          data-icon="angle-left"
                          class="svg-inline--fa fa-angle-left fa-w-6"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512">
                          <Path
                            fill="black"
                            d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"
                          />
                        </Svg>
                      </UserInfo2>
                    ) : (
                      <></>
                    )}

                    {item.userid == global.myid ? (
                      <UserInfo3 onPress={() => this.goEdit()}>
                        <MessageText3>編集</MessageText3>
                        <Svg
                          style={{width: 15, height: 15, bottom: 10, left: 8}}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fal"
                          data-icon="angle-left"
                          class="svg-inline--fa fa-angle-left fa-w-6"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512">
                          <Path
                            fill="black"
                            d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"
                          />
                        </Svg>
                      </UserInfo3>
                    ) : (
                      <></>
                    )}
                  </View>
                )}
              </View>
            )}
            // keyExtractor={item => item.messageText}
            // ItemSeparatorComponent={this.renderSeparator}

            ListFooterComponent={this.renderFooter}
          />
        </View>
        <Modal
          animationType="slide"
          // transparent={true}
          isVisible={this.state.modalDeleteConfirmVisible}
          style={{bottom: 400, alignSelf: 'center'}}>
          <View
            style={{
              width: windowWidth,
              height: windowHeight - 180,
              borderRadius: 30,
              flexDirection: 'column',
            }}>
            <TouchableWithoutFeedback
              style={{width: windowWidth, height: windowHeight - 290}}
              onPress={() => this.closeEditDeleteConfirmModal()}>
              <View style={{width: '100%', height: windowHeight - 180}}></View>
            </TouchableWithoutFeedback>

            <View
              style={{
                width: windowWidth,
                height: windowHeight,
              }}>
              <View
                style={{
                  height: 180,
                  width: windowWidth,
                  backgroundColor: '#f2f2f2',
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    width: '100%',
                    height: 30,
                    lineHeight: 30,
                    marginTop: 30,
                    textAlign: 'center',
                    fontSize: 13,
                    color: global.textColor,
                  }}>
                  {this.state.deleteText}
                </Text>

                {this.state.loadingDeleteConfrimReport ? (
                  <View
                    style={{
                      width: 20,
                      height: 50,
                      flexDirection: 'row',
                      marginLeft: windowWidth / 2 - 10,
                    }}>
                    <ActivityIndicator size="small" color="#69747f" />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 210,
                      height: 50,
                      flexDirection: 'row',
                      marginLeft: windowWidth / 2 - 105,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 30,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        marginRight: 5,
                        borderRadius: 3,
                      }}
                      onPress={() => this.closeDeleteConfirm()}>
                      <Text
                        style={{
                          width: '100%',
                          height: 30,
                          textAlign: 'center',
                          lineHeight: 30,
                          fontSize: 12,
                          color: 'black',
                        }}>
                        キャンセル
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 30,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        marginLeft: 5,
                        borderRadius: 3,
                      }}
                      onPress={() => this.continueDeleteConfirm()}>
                      <Text
                        style={{
                          width: '100%',
                          height: 30,
                          textAlign: 'center',
                          lineHeight: 30,
                          fontSize: 12,
                          color: 'black',
                        }}>
                        はい
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Post;

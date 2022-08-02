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
} from 'react-native';
import _ from 'lodash';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
// import {getUsers, contains} from './api/index';
import {getUsers, contains} from '../styles/index';
// import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import User from '../homes/User';
import Tabs from '../navigation/tabs';
import moment from 'moment';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import Svg, {G, Path} from 'react-native-svg';
import Modal from 'react-native-modal';

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

      hasUploadPhoto: false,

      modalConfirmLogout: false,
    };

    this.goChat = this.goChat.bind(this);
    this.getPost = this.getPost.bind(this);
  }

  componentDidMount() {
    this.getPost();
    this.getMe();
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

  getPost() {
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
          // alert(global.socketid);
          // if (self.state.hasUploadPhoto != "") {
          //   self.state.path
          //   self.state.file
          // };
          if (self.state.path) {
            self.setState({
              hasUploadPhoto: true,
            });
          } else {
            self.setState({
              hasUploadPhoto: false,
            });
          }
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

  closeLogutConfirm() {
    this.setState({
      modalConfirmLogout: false,
    });
  }

  continueLogoutConfirm() {
    let self = this;

    this.setState(
      {
        loadingLogoutConfrimReport: true,
      },
      () => {
        let jsonData = {
          user_id: '',
          profile_image: '',
          nickname: '',
          coin: '',
          username: '',
          password: '',
          searchSettings: global.searchFields,
          shared: 0,
        };

        Storage.storeData(jsonData).then(() => {
          self.setState(
            {
              modalConfirmLogout: false,
            },
            () => {
              // self.props.Launcher.init();r

              self.props.navigationRef.current.navigate('Launcher');
            },
          );
        });
      },
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={{}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  Option() {
    let self = this;

    this.setState({
      modalConfirmLogout: true,
    });
  }

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
            marginHorizontal: 169,
            bottom: 68,
            right: 147,
            backgroundColor: '#fff',
            color: 'black',
          }}>
          投稿を検索する
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
                    <TouchableOpacity
                      style={{
                        left: 40,
                        marginTop: windowHeight / 10 - 93,
                        width: 50,
                        height: 30,
                      }}
                      onPress={() => this.Option()}>
                      <Svg
                        style={{width: 20, height: 30}}
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fal"
                        data-icon="angle-left"
                        class="svg-inline--fa fa-angle-left fa-w-6"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <Path
                          fill="gray"
                          d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
                        />
                      </Svg>
                    </TouchableOpacity>

                    <Modal
                      animationType="slide"
                      // transparent={true}
                      isVisible={this.state.modalConfirmLogout}
                      style={{bottom: 400, alignSelf: 'center'}}>
                      <View
                        style={{
                          width: windowWidth,
                          backgroundColorL: 'black',
                          height: windowHeight - 100,
                          borderRadius: 30,
                          flexDirection: 'column',
                        }}>
                        <TouchableWithoutFeedback
                          style={{
                            width: windowWidth,
                            height: windowHeight - 290,
                          }}
                          onPress={() => this.closeLogutConfirm()}>
                          <View
                            style={{
                              width: '100%',
                              height: windowHeight - 180,
                            }}></View>
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
                              {this.state.logoutText}
                            </Text>

                            {this.state.loadingLogoutConfrimReport ? (
                              <View
                                style={{
                                  width: 20,
                                  height: 50,
                                  flexDirection: 'row',
                                  marginLeft: windowWidth / 2 - 10,
                                }}>
                                <ActivityIndicator
                                  size="small"
                                  color="#69747f"
                                />
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
                                  onPress={() => this.closeLogutConfirm()}>
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
                                  onPress={() => this.continueLogoutConfirm()}>
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
                <UserInfo2 onPress={() => this.continueDeleteConfirm(item.id)}>
                  <MessageText2>削除</MessageText2>
                </UserInfo2>
              ) : (
                <></>
              )}

              {item.userid == global.myid ? (
                <UserInfo3 onPress={() => this.goEdit()}>
                  <MessageText3>編集</MessageText3>
                </UserInfo3>
              ) : (
                <></>
              )}
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

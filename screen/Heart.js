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
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
// import {getUsers, contains} from './api/index';
import {getUsers, contains} from '../styles/index';
import {
  // ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
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
    this.props.navigation.push('UserCanSearch');
    global.prevPage = "Heart"

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
  
        global.otherid = id;
  
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
        global.socket.on('emit-viewers', function (ret) {
          global.socket.off('emit-viewers');
          // alert(JSON.stringify(ret));
  
          self.setState({
            image: ret.image,
            nickname: ret.nickname,
           id: ret.id,
            users: ret.users,
           //  name:ret.name,
            path:ret.path,
          });
        });
        let params = {};
  
        params['boardid'] = this.state.boardid;
        params['name'] = '';
        params['pages'] = '';
        params['id'] = this.state.id;
        params['nickname'] = this.state.nickname;
        params['image'] = this.state.image;
        params['path'] = '';
<<<<<<< Updated upstream
        params['start'] = 10;
        params['size'] = 10;

        global.socket.emit('on-likes', params);
=======
        params['start'] = 0;
        params['size'] = 10;
  
        global.socket.emit('on-viewers', params);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
=======
  
  likedMe(){
    this.setState({click: true});
  }
  
  youLike(){
    this.setState({click: false});
  }
  
  render() {
    return (
      <View
        style={{backgroundColor: '#fff', height: '100%', width: windowWidth}}>
        <View
          style={{
            // backgroundColor: 'red',
            height: '17%',
            width: windowWidth - 30,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 0,
              marginTop: windowHeight / 10 - 60,
              width: 40,
              height: 40,
              backgroundColor: '#FFF5F8',
              borderRadius: 10,
            }}
            onPress={() => this.goBack()}>
            <Svg
              style={{alignSelf: 'center', top: 10, right: 2}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              width="16"
              height="21"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.65863 10.0143C5.39578 10.2771 4.96961 10.2771 4.70676 10.0143L0.668298 5.97582C0.405446 5.71297 0.405446 5.2868 0.668298 5.02395L4.70676 0.985489C4.96961 0.722635 5.39578 0.722635 5.65863 0.985489C5.92149 1.24834 5.92149 1.67451 5.65863 1.93736C3.69111 3.90489 3.69111 7.09488 5.65863 9.06241C5.92149 9.32526 5.92149 9.75143 5.65863 10.0143Z"
                fill="#EA337E"
              />
              <Defs>
                <LinearGradient
                  id="paint0_linear_50_2341"
                  x1="3.16347"
                  y1="10.2114"
                  x2="3.16347"
                  y2="0.788349"
                  gradientUnits="userSpaceOnUse">
                  <Stop stop-color="#ED70B0" />
                  <Stop offset="1" stop-color="#EA337E" />
                </LinearGradient>
              </Defs>
            </Svg>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignSelf: 'center' ,top: 15}}>
            <TouchableOpacity
              onPress={() => this.likedMe()}
              style={{
                height: 35,
                width: 140,
                backgroundColor: this.state.click ? '#EA337E' : '#F4F9F9',
                borderRadius: 10,
                // top: 15,
                marginRight: 25,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  top: 8,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: this.state.click ? '#FFF':'#9C9DA7' ,
                }}>閲覧者
               {/* 自分から */}
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
             onPress={() => this.youLike()}
              style={{
                height: 35,
                width: 140,
                backgroundColor: this.state.click ? '#F4F9F9' :  '#EA337E',
                borderRadius: 10,
                // top: 15,
                alignSelf:'center'
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  top: 8,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: this.state.click ? '#9C9DA7':'#FFF'  ,
                }}> 私を好きな人
                {/* 相手から */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.click == true ? (
>>>>>>> Stashed changes
        <FlatList
          data={this.state.users}
          keyExtractor={item => item.id}
          style={{backgroundColor: '#fff', height: '90%', marginBottom: 220,alignSelf: 'center'}}
          renderItem={({item}) => (
            <Card onPress={() => this.goChat(item.id)}>
                {item.liked == 0 ? (
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
                      <MessageText>テキスト</MessageText>
                      <PostTime></PostTime>
                    </UserInfoText>
                  </TextSection>
                </UserInfo>
              
              ) : (
                  // { item.id == global.myuserid ? (
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
                        <MessageText>テキスト</MessageText>
                        <PostTime></PostTime>
                      </UserInfoText>
                    </TextSection>
                  </UserInfo>
                  // ) : (  <></> )}
              )}
            </Card>
          )}
          // keyExtractor={item => item.messageText}
          // ItemSeparatorComponent={this.renderSeparator}
  
          ListFooterComponent={this.renderFooter}
        />
         ) : (    <FlatList
          data={this.state.users}
          keyExtractor={item => item.id}
          style={{backgroundColor: '#FFF', height: '100%',width:windowWidth -30, alignSelf:'center'}}
          renderItem={({item}) => (
            <Card onPress={() => this.goChat(item.id)}>
               {item.liked == 0 ? (
                <></>
              ) : (
                  // { item.id == global.myuserid ? (
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
                  // ) : (  <></> )}
              )}
            </Card>
          )}
          // keyExtractor={item => item.messageText}
          // ItemSeparatorComponent={this.renderSeparator}
  
          ListFooterComponent={this.renderFooter}
<<<<<<< Updated upstream
        />
=======
        /> )}
  
>>>>>>> Stashed changes
        <View
          style={{
            height: windowHeight / 13,
            // backgroundColor: 'black',
            width: '30%',
            bottom: '27%',
          }}>
<<<<<<< Updated upstream
           <TouchableOpacity
          onPress={() => this.goBack()}
          style={{
            backgroundColor: '#ECECEC',
            marginHorizontal: 170,
            height: 31,
            right: 150,
            marginBottom: 30,
            flexDirection: 'row',
            width: 50,
            borderRadius: 2,
            // top:windowWidth /2 -170
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
          <Text style={{right: 0, top: 6, color: '#5B5B5B'}}>戻る</Text>
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
=======
      
>>>>>>> Stashed changes
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

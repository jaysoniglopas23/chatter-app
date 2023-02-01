import React, {useState, useEffect, useCallback, Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  BackHandler,
  ToastAndroid,
  Modal,
  AppState,
  Animated,
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';
import Svg, {G, Path} from 'react-native-svg';
// import Modal from 'react-native-modal';
import {BlurView, VibrancyView} from 'react-native-blur';
<<<<<<< Updated upstream
=======
import moment from 'moment';
import SlidingUpPanel from 'rn-sliding-up-panel';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
>>>>>>> Stashed changes

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

<<<<<<< Updated upstream
=======
const {height} = Dimensions.get('window');

>>>>>>> Stashed changes
const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      details: '',
<<<<<<< Updated upstream

=======
      appState: AppState.currentState,
>>>>>>> Stashed changes
      modalReportVisible: false,
      modalProfile: false,
      draggableRange: {top: height + 180 - 64, bottom: 180},
    };

    this.getUser = this.getUser.bind(this);

    // this.goChat = this.goChat.bind();
    this.goBack = this.goBack.bind(this);
  }

<<<<<<< Updated upstream
=======
  static defaultProps = {
    draggableRange: {top: height + 180 - 64, bottom: 180},
  };

  _draggedValue = new Animated.Value(180);

>>>>>>> Stashed changes
  goBack() {
    // this.props.Call.init();
    // this.props.navigation.push('Search');

<<<<<<< Updated upstream
    if (global.prevPageCall == 'Call') {
=======
    if (global.prevPage == 'Call') {
>>>>>>> Stashed changes
      this.props.navigation.push('Call');
      global.otherid;
    } else if (global.prevPage == 'Search') {
      this.props.navigation.push('Search');
    } else if (global.prevPage == 'Chat') {
      this.props.navigation.push('Chat');
    } else if (global.prevPage == 'Chatsearch') {
      this.props.navigation.push('Search');
      // this.props.navigation.push('Call');
    } else if (global.prevPage == 'Post') {
      this.props.navigation.push('Post');
    } else if (global.prevPage == 'UserCanCall') {
      this.props.navigation.push('Call');
    } else if (global.prevPage == 'Star') {
      this.props.navigation.push('Star');
    } else if (global.prevPage == 'UserCanStar') {
      this.props.navigation.push('Star');
    } else if (global.prevPage == 'Heart') {
      this.props.navigation.push('Heart');
    } else if (global.prevPage == 'UserCanHeart') {
      this.props.navigation.push('Heart');
    } else if (global.prevPage == "Launcher") {
      this.props.navigation.push('Search');
    } else if (global.prevPage == "UserCanPost") {
      this.props.navigation.push('Post');
    }

    // alert(prevPage);
  }

<<<<<<< Updated upstream
  goChat(id, name, lastmessage) {
    global.prevPage = 'UserCanSearch';
=======
  goChat(id, name, lastmessage, token) {
>>>>>>> Stashed changes
    global.othertoken;
    this.props.navigation.push('Chat');
    let self = this;

    let params = {};

    self.setState(
      {
        params: params,
        refresh: 1,
      },
      () => {
        global.socket.on('emit-user-details', function (ret) {
          global.socket.off('emit-user-details');
          // alert(JSON.stringify(ret));
          self.setState({
            id: ret.id,
            details: ret,
            profile_image: ret.profile_image,
            profile_image_dir: ret.profile_image_dir,
            nickname: ret.nickname,
            email: ret.email,
            introduction: ret.introduction,
            character: ret.character,
            hobbie: ret.hobbie,
            school: ret.school,
            bloodtype: ret.bloodtype,
            nickname: ret.nickname,
            token:ret.token
          });

          global.othertoken = ret.token;
        });

        let params = {};

        params['id'] = global.otherid;
        params['lastmessage'] = global.lastmessage;
        params['name'] = self.state.nickname;
        params['profile_image'] = this.state.profile_image;
        params['profile_image_dir'] = this.state.profile_image_dir;
<<<<<<< Updated upstream
=======
        params['token'] = global.othertoken;
>>>>>>> Stashed changes

        global.otherid = global.otherid;
        global.name = this.state.nickname;
        global.profile_image_dir = this.state.profile_image_dir;
        global.profile_image = this.state.profile_image;
        global.lastmessage = global.lastmessage;
        global.token = global.othertoken;
        // global.name = name;
        // global.lastmessage = lastmessage;
        // alert(global.otherid);
<<<<<<< Updated upstream
=======
        if (global.prevPage == 'Call') {
          global.prevPage == 'UserCanCall';
        } else if (global.prevPage == 'Search') {
          global.prevPage == 'UserCanSearch';
        } else if (global.prevPage == 'Star') {
          global.prevPage == 'UserCanStar';
        } else if (global.prevPage == 'Heart') {
          global.prevPage == 'UserCanHeart';
        } else if (global.prevPage == 'Post') {
          global.prevPage == 'UserCanPost';
        }
>>>>>>> Stashed changes

        global.socket.emit('on-user-details', params);
        console.log(params);
      },
    );
  }

<<<<<<< Updated upstream
=======
  viewProfile() {
    let self = this;

    // alert(this.state.myliked);
    // if (this.state.myliked == null) {
    //   this.setState({
    //     myliked: 0,

    //     // liked: false,
    //   });
    // } else {
    //   this.setState({
    //     myliked: myliked,
    //     // liked: true,
    //   });
    // }

    let params = {};

    self.setState(
      {
        params: params,
        refresh: 1,
      },
      () => {
        global.socket.on('emit-view-user', function (ret) {
          global.socket.off('emit-view-user');
          // alert(JSON.stringify(ret));
          self.setState({});
        });

        let params = {};

        params['profile'] = global.otherid;
        params['datetime'] = moment(new Date()).format('YYYY-MM-DD  HH:mm:ss ');
        params['nickname'] = global.nickname;
        params['liked'] = this.state.myliked;

        // alert(this.state.myliked);

        // if (this.state.myliked == 1) {
        //   this.setState({
        //     liked: true,
        //   });
        // } else {
        //   this.setState({
        //     liked: false,
        //   });
        // }

        global.socket.emit('on-view-user', params);
        console.log(params);
      },
    );
  }

  // getViewer(){
  //     let self = this;

  //     this.setState(
  //       {
  //         saving: true,
  //       },

  //       () => {
  //         global.socket.on('emit-viewers', function (ret) {
  //           global.socket.off('emit-viewers');
  //           alert(JSON.stringify(ret));

  //           self.setState({
  //             image: ret.image,
  //             nickname: ret.nickname,
  //             id: ret.id,
  //             users: ret.users,
  //             //  name:ret.name,
  //             liked:ret.liked,
  //             path: ret.path,
  //           });

  //           // alert(JSON.stringify(ret.liked));
  //         });
  //         let params = {};

  //         params['boardid'] = this.state.boardid;
  //         params['name'] = '';
  //         params['pages'] = '';
  //         params['liked'] = 0;
  //         params['id'] = global.otherid;
  //         params['nickname'] = this.state.nickname;
  //         params['image'] = this.state.image;
  //         params['path'] = '';
  //         params['start'] = 0;
  //         params['size'] = 2;

  //         global.socket.emit('on-viewers', params);
  //       },
  //     );
  //     // this.props.navigationRef.current?.navigate('Dashboard');
  // }

  iLike = myliked => {
    if (this.state.myliked == 1) {
      this.setState({
        myliked: 0,
        liked: false,
      });
      this.viewProfile();
    } else {
      this.setState({
        myliked: 1,
        liked: true,
      });
      this.viewProfile();
    }

    // this.getUser();
  };

>>>>>>> Stashed changes
  componentDidMount() {
    // this.viewProfile();
    // this.getViewer();
    this.getUser();
    // AppState.addEventListener('change', this.getUser);
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    // AppState.removeEventListener('change', this.getUser);
    // this.getUser();
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  getUser() {
    let self = this;

    self.setState({}, () => {
      global.socket.on('emit-user-details', function (ret) {
        global.socket.off('emit-user-details');
        // alert(JSON.stringify(ret));
        console.log(ret);
        self.setState({
          id: ret.id,
          details: ret,
          profile_image: ret.profile_image,
          profile_image_dir: ret.profile_image_dir,
          nickname: ret.nickname,
          email: ret.email,
          introduction: ret.introduction,
          character: ret.character,
          hobbie: ret.hobbie,
          school: ret.school,
          bloodtype: ret.bloodtype,
<<<<<<< Updated upstream
=======
          age: ret.age,
          token: ret.token,
          myliked: ret.myliked,
>>>>>>> Stashed changes
        });
        global.myliked = ret.myliked;
        global.othertoken = ret.token;
        // alert(global.myliked);
        if (global.myliked == 1) {
          self.setState({
            liked: true,
          });
        } else {
          self.setState({
            liked: false,
          });
        }

        if (global.myliked == null) {
          self.setState({
            myliked: 0,

            // liked: false,
          });
        } else {
          self.setState({
            myliked: global.myliked,
            // liked: true,
          });
        }
        self.viewProfile();
      });

      let params = {};

      params['id'] = global.otherid;
      params['about'] = this.state.about;
      params['firstname'] = this.state.firstname;
      params['lastname'] = this.state.lastname;
      params['age'] = this.state.age;
      params['about'] = this.state.about;
      params['job'] = this.state.job;
      params['company'] = this.state.company;
      params['school'] = this.state.school;
      params['gender'] = this.state.gender;
      params['gender_pref'] = this.state.gender_pref;
      params['distance_threshold'] = 0;
      params['nickname'] = this.state.nickname;
      params['smoking'] = this.state.gender;
      params['drinking'] = this.state.drinking;
      params['marrried'] = this.state.marrried;
      params['presence_of_children'] = this.state.presence_of_children;
      params['like_children_or_not'] = this.state.like_children_or_not;
      params['marriage_desire'] = this.state.marriage_desire;
      params['presence_of_pet'] = this.state.presence_of_pet;
      params['holiday'] = this.state.holiday;
      params['hobbie'] = this.state.hobbie;
      params['bloodtype'] = this.state.bloodtype;
      params['email'] = this.state.email;
      params['name'] = self.state.nickname;
      params['introduction'] = this.state.introduction;
      params['character'] = this.state.character;
      params['location'] = this.state.location;
      params['points'] = this.state.points;
      params['mail_count'] = this.state.mail_count;
      params['call_minutes'] = this.state.call_minutes;
      params['pkuser'] = this.state.pkuser;
<<<<<<< Updated upstream

=======
      params['token'] = this.state.token;
      params['liked'] = this.state.myliked;

      this.state.myliked = global.myliked;
>>>>>>> Stashed changes
      global.otherid = global.otherid;
      global.name = self.state.nickname;
      global.lastmessage = global.lastmessage;
      console.log(this.state.myliked);
      global.socket.emit('on-user-details', params);
    });
    return true;
  }

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

  modalProfile() {
    this.setState({
      modalProfile: true,
    });
  }

  closeModalProfile() {
    this.setState({
      modalProfile: false,
    });
  }

<<<<<<< Updated upstream
=======
  Button() {}

>>>>>>> Stashed changes
  render() {
    const {top, bottom} = this.props.draggableRange;

    const backgoundOpacity = this._draggedValue.interpolate({
      inputRange: [height - 48, height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const iconTranslateY = this._draggedValue.interpolate({
      inputRange: [height - 56, height, top],
      outputRange: [0, 56, 180 - 32],
      extrapolate: 'clamp',
    });

    const textTranslateY = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 28],
      extrapolate: 'clamp',
    });

    const textTranslateX = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 5],
      extrapolate: 'clamp',
    });

    const textScale = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [1, 0.7],
      extrapolate: 'clamp',
    });

    let genders = [
      {label: '男性', value: 0},
      {label: '女性', value: 1},
    ];
    let smokings = [
      {label: '未設定', value: 0},
      {label: '吸う', value: 1},
      {label: '時々吸う', value: 2},
      {label: '吸わない', value: 3},
    ];
    let drinkings = [
      {label: '未設定', value: 0},
      {label: '飲む', value: 1},
      {label: '時々飲む', value: 2},
      {label: '飲まない', value: 3},
    ];
    let marrieds = [
      {label: '未婚', value: 0},
      {label: '既婚', value: 1},
      {label: '離婚', value: 2},
    ];
    let presence_of_children = [
      {label: 'いない', value: 0},
      {label: 'いる', value: 1},
    ];
    let marriage_desires = [
      {label: 'あり', value: 0},
      {label: 'なし', value: 1},
    ];
    let like_children_or_nots = [
      {label: '好き', value: 0},
      {label: '嫌い', value: 1},
    ];
    let presence_of_pets = [
      {label: 'いる', value: 0},
      {label: 'いない', value: 1},
    ];
    let holidays = [
      {label: 'インドア', value: 0},
      {label: 'アウトドア', value: 1},
    ];
    return (
      <View
        style={{
          backgroundColor: 'red',
          height: '100%',
          flex: 1,
          width: windowWidth,
        }}>
<<<<<<< Updated upstream
        <TouchableOpacity
          onPress={() => this.goBack()}
          style={{
            left: 20,
            marginTop: windowHeight / 10 - 60,
            width: 50,
            height: 30,
            marginBottom: windowHeight / 10 - 30,
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
          {/* <Text style={{right: 0, top: 6, color: 'black'}}>戻る</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            left: 360,
            marginTop: windowHeight / 10 - 150,
            width: 50,
            height: 30,
          }}
          onPress={() => this.report()}>
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
              fill="black"
              d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
            />
          </Svg>
        </TouchableOpacity>
        <Image
          style={{
            top: 60,
            width: windowWidth - 10,
            height: windowWidth / 2.6,
            position: 'absolute',
            alignSelf: 'center',
          }}
          source={{
            uri:
              URL_TEMP +
              '/' +
              this.state.profile_image_dir +
              '/' +
              this.state.profile_image,
          }}
        />
        <BlurView
          style={styles.absolute2}
          // viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}
        />
        <TouchableOpacity onPress={() => this.modalProfile()}>
          <Image
=======
        {this.state.profile_image_dir == '' ? (
          <Image
            style={{
              width: windowWidth - 1,
              height: windowHeight / 1 - 180,
              position: 'absolute',
              alignSelf: 'center',
            }}
            source={require('../icon/userprofile.png')}
          />
        ) : (
          <Image
            style={{
              width: windowWidth - 1,
              height: windowHeight / 1 - 180,
              position: 'absolute',
              alignSelf: 'center',
            }}
>>>>>>> Stashed changes
            source={{
              uri:
                URL_TEMP +
                '/' +
                this.state.profile_image_dir +
                '/' +
                this.state.profile_image,
            }}
<<<<<<< Updated upstream
            style={styles.Image}
          />
          <Text style={styles.textname}>{this.state.nickname}</Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalProfile}
          style={{blurRadius: 10}}>
          <TouchableWithoutFeedback
            style={{width: windowWidth, height: windowHeight - 220}}
            onPress={() => this.closeModalProfile()}>
            <View style={{width: '100%', height: windowHeight - 220}}></View>
          </TouchableWithoutFeedback>
          <View
            style={{
              width: windowWidth,
              height: windowHeight,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',

              bottom: windowHeight / 1.4,
              alignSelf: 'center',
            }}>
                 <TouchableWithoutFeedback
            style={{width: windowWidth, height: windowHeight - 220}}
            onPress={() => this.closeModalProfile()}>
            <View style={{width: '100%', height: windowHeight - 220}}></View>
          </TouchableWithoutFeedback>
            <Image
              onPress={() => this.closeModalProfile()}
              source={{
                uri:
                  URL_TEMP +
                  '/' +
                  this.state.profile_image_dir +
                  '/' +
                  this.state.profile_image,
              }}
              style={styles.modalImage}
            />
          </View>
        </Modal>
        <View style={{width: '100%', height: windowHeight / 1.7, top: 60}}>
          <ScrollView style={styles.scrollview}>
            {/* <View style={styles.view}>
              <Text style={styles.label}> ニックネーム</Text>
              <Text style={styles.text}>{this.state.nickname}</Text>
            </View> */}
            {/* <View style={styles.view}>
              <Text style={styles.email}> メールアドレス</Text>
              <Text style={styles.text}>{this.state.email}</Text>
            </View> */}
            <View style={styles.view1}>
              <Text style={styles.introduction}>自己紹介</Text>
              <Text style={styles.text}>{this.state.introduction}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label2}>住んでいる地域</Text>
              <Text style={styles.text}>{this.state.nickname}</Text>
            </View>
            <View style={styles.view1}>
              <Text style={styles.label3}>性格</Text>
              <Text style={styles.text}>{this.state.character}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label4}> 趣味</Text>
              <Text style={styles.text}>{this.state.hobbie}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.introduction}> 仕事</Text>
              <Text style={styles.text}></Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label5}>会社</Text>
              <Text style={styles.text}></Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label6}> 出身大学</Text>
              <Text style={styles.text}>{this.state.school}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label7}> 血液型</Text>
              <Text style={styles.text}>{this.state.bloodtype}</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.Mview}>
          <TouchableOpacity
            onPress={() => this.goChat(global.userid)}
            style={styles.button}>
            <Svg
              style={{width: 15, height: 15, left: 7}}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <Path
                fill="grey"
                d="M492.6 226.6L44.6 34.59C40.54 32.85 36.26 31.1 32.02 31.1c-8.623 0-17.1 3.499-23.3 10.05C-.4983 51.81-2.623 66.3 3.377 78.31L96 256l-92.62 177.7c-6 12.02-3.875 26.5 5.344 36.27c6.188 6.547 14.66 10.05 23.28 10.05c4.25 0 8.531-.8438 12.59-2.594L492.6 285.4c11.78-5.031 19.41-16.61 19.41-29.41C511.1 243.2 504.4 231.6 492.6 226.6zM31.98 64.03C31.99 64.01 31.96 64.04 31.98 64.03L442.7 240H123.7L31.98 64.03zM31.75 448.5L123.7 272h318.1L31.75 448.5z"
              />
            </Svg>
            <Text style={styles.Mtxt}>メッセージを送信</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button1}>
            <Svg
              style={{width: 16, height: 16, left: 10}}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <Path
                fill="grey"
                d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM86.7 109.3C52.62 148.6 32 199.9 32 256C32 379.7 132.3 480 256 480C312.1 480 363.4 459.4 402.7 425.3L86.7 109.3zM480 256C480 132.3 379.7 32 256 32C199.9 32 148.6 52.62 109.3 86.7L425.3 402.7C459.4 363.4 480 312.1 480 255.1V256z"
              />
            </Svg>
            <Text style={styles.Mtxt}>ブロック</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2}>
            <Svg
              style={{width: 16, height: 16, left: 10}}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <Path
                fill="grey"
                d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM256 304c8.844 0 16-7.156 16-16V128c0-8.844-7.156-16-16-16S240 119.2 240 128v160C240 296.8 247.2 304 256 304zM256 344c-13.25 0-24 10.75-24 24s10.75 24 24 24s24-10.75 24-24S269.3 344 256 344z"
              />
            </Svg>
            <Text style={styles.Mtxt}>レポート</Text>
          </TouchableOpacity>
        </View>
=======
          />
        )}
        <TouchableOpacity
          style={{
            marginLeft: 15,
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
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}
          snappingPoints={[360]}
          height={height + 180}
          friction={0.5}>
          <View style={styles.panel}>
            {/* <Animated.View
             style={[
               styles.iconBg,
               {
                 opacity: backgoundOpacity,
                 transform: [{translateY: iconTranslateY}],
               },
             ]}
           /> */}
            <View style={styles.panelHeader}>
              <Animated.View
                style={{
                  transform: [
                    {translateY: textTranslateY},
                    {translateX: textTranslateX},
                    {scale: textScale},
                  ],
                }}>
                <Text style={styles.textHeader}>
                  {this.state.nickname + ',' + this.state.age}
                </Text>
                <Svg
                  style={{left: '95%', bottom: '130%'}}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="angle-left"
                  class="svg-inline--fa fa-angle-left fa-w-6"
                  role="img"
                  width="7"
                  height="25"
                  viewBox="0 0 7 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Circle
                    cx="3.19647"
                    cy="24.6507"
                    r="3.19647"
                    transform="rotate(-90 3.19647 24.6507)"
                    fill="#EA337E"
                  />
                  <Circle
                    cx="3.19647"
                    cy="13.9236"
                    r="3.19647"
                    transform="rotate(-90 3.19647 13.9236)"
                    fill="#EA337E"
                  />
                  <Circle
                    cx="3.19647"
                    cy="3.1966"
                    r="3.19647"
                    transform="rotate(-90 3.19647 3.1966)"
                    fill="#EA337E"
                  />
                  <Defs>
                    <LinearGradient
                      id="paint0_linear_61_2247"
                      x1="3.19647"
                      y1="21.4542"
                      x2="3.19647"
                      y2="27.8472"
                      gradientUnits="userSpaceOnUse">
                      <Stop stop-color="#ED70B0" />
                      <Stop offset="1" stop-color="#EA337E" />
                    </LinearGradient>
                    <LinearGradient
                      id="paint1_linear_61_2247"
                      x1="3.19647"
                      y1="10.7272"
                      x2="3.19647"
                      y2="17.1201"
                      gradientUnits="userSpaceOnUse">
                      <Stop stop-color="#ED70B0" />
                      <Stop offset="1" stop-color="#EA337E" />
                    </LinearGradient>
                    <LinearGradient
                      id="paint2_linear_61_2247"
                      x1="3.19647"
                      y1="0.000124454"
                      x2="3.19647"
                      y2="6.39307"
                      gradientUnits="userSpaceOnUse">
                      <Stop stop-color="#ED70B0" />
                      <Stop offset="1" stop-color="#EA337E" />
                    </LinearGradient>
                  </Defs>
                </Svg>

                <View style={styles.Mview}>
                  <View
                    style={{
                      alignSelf: 'center',
                      flexDirection: 'row',
                      height: windowHeight / 10 - 100,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.goChat(global.userid)}
                      style={styles.button}>
                      <Text style={styles.Mtxt}>メッセージを送信</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: 40, height: 35}}
                      onPress={value => this.iLike(value)}>
                      <Svg
                        style={{}}
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fal"
                        data-icon="angle-left"
                        class="svg-inline--fa fa-angle-left fa-w-6"
                        role="img"
                        width="35"
                        height="30"
                        viewBox="0 0 40 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <Path
                          d="M11.9725 2C6.46482 2 2 6.44768 2 11.9341C2 21.8682 13.7856 30.8992 20.1317 33C26.4779 30.8992 38.2635 21.8682 38.2635 11.9341C38.2635 6.44768 33.7986 2 28.291 2C24.9183 2 21.9365 3.66794 20.1317 6.22091C18.327 3.66794 15.3452 2 11.9725 2Z"
                          stroke="#EA337E"
                          fill={this.state.liked ? '#EA337E' : '#FFF'}
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Defs>
                          <LinearGradient
                            id="paint0_linear_61_2058"
                            x1="20.1317"
                            y1="2"
                            x2="20.1317"
                            y2="33"
                            gradientUnits="userSpaceOnUse">
                            <Stop stop-color="#ED70B0" />
                            <Stop offset="1" stop-color="#EA337E" />
                          </LinearGradient>
                        </Defs>
                      </Svg>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                // alignSelf: 'center',
                width: windowWidth,
                height: windowHeight - 80,
                top: '0%',
                backgroundColor: '#FFF5F8',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              {/* <Text style={styles.textname}>
               {this.state.nickname + ',' + this.state.age}
             </Text>
             <Svg
               style={{left: '90%', bottom: '4%'}}
               aria-hidden="true"
               focusable="false"
               data-prefix="fal"
               data-icon="angle-left"
               class="svg-inline--fa fa-angle-left fa-w-6"
               role="img"
               width="7"
               height="28"
               viewBox="0 0 7 28"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <Circle
                 cx="3.19647"
                 cy="24.6507"
                 r="3.19647"
                 transform="rotate(-90 3.19647 24.6507)"
                 fill="#EA337E"
               />
               <Circle
                 cx="3.19647"
                 cy="13.9236"
                 r="3.19647"
                 transform="rotate(-90 3.19647 13.9236)"
                 fill="#EA337E"
               />
               <Circle
                 cx="3.19647"
                 cy="3.1966"
                 r="3.19647"
                 transform="rotate(-90 3.19647 3.1966)"
                 fill="#EA337E"
               />
               <Defs>
                 <LinearGradient
                   id="paint0_linear_61_2247"
                   x1="3.19647"
                   y1="21.4542"
                   x2="3.19647"
                   y2="27.8472"
                   gradientUnits="userSpaceOnUse">
                   <Stop stop-color="#ED70B0" />
                   <Stop offset="1" stop-color="#EA337E" />
                 </LinearGradient>
                 <LinearGradient
                   id="paint1_linear_61_2247"
                   x1="3.19647"
                   y1="10.7272"
                   x2="3.19647"
                   y2="17.1201"
                   gradientUnits="userSpaceOnUse">
                   <Stop stop-color="#ED70B0" />
                   <Stop offset="1" stop-color="#EA337E" />
                 </LinearGradient>
                 <LinearGradient
                   id="paint2_linear_61_2247"
                   x1="3.19647"
                   y1="0.000124454"
                   x2="3.19647"
                   y2="6.39307"
                   gradientUnits="userSpaceOnUse">
                   <Stop stop-color="#ED70B0" />
                   <Stop offset="1" stop-color="#EA337E" />
                 </LinearGradient>
               </Defs>
             </Svg> */}

              <ScrollView style={styles.scrollview}>
                {/* <View style={styles.view}>
           <Text style={styles.label}> ニックネーム</Text>
           <Text style={styles.text}>{this.state.nickname}</Text>
         </View> */}
                {/* <View style={styles.view}>
           <Text style={styles.email}> メールアドレス</Text>
           <Text style={styles.text}>{this.state.email}</Text>
         </View> */}
                <View style={styles.view1}>
                  <Text style={styles.introduction}>自己紹介</Text>
                  <Text style={styles.text}>{this.state.introduction}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.label2}>住んでいる地域</Text>
                  <Text style={styles.text}></Text>
                </View>
                <View style={styles.view1}>
                  <Text style={styles.label3}>性格</Text>
                  <Text style={styles.text}>{this.state.character}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.label4}> 趣味</Text>
                  <Text style={styles.text}>{this.state.hobbie}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.introduction}> 仕事</Text>
                  <Text style={styles.text}></Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.label5}>会社</Text>
                  <Text style={styles.text}></Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.label6}> 出身大学</Text>
                  <Text style={styles.text}>{this.state.school}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}> 血液型</Text>
                  <Text style={styles.text}>{this.state.bloodtype}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}>恋愛対象</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={genders}
                    initial={this.state.gender}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 150,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      // width: '42%',
                      bottom: '.7%',
                      alignSelf: 'center',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}> タバコ</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={smokings}
                    initial={this.state.smoking}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 170,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      width: '85%',
                      bottom: '.7%',
                      // left: windowWidth / 10 - 20,
                      alignSelf: 'center',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}>飲酒</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={drinkings}
                    initial={this.state.drinking}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 170,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      // left: 18,
                      // width: '42%',
                      alignSelf: 'center',
                      width: '85%',
                      bottom: '.7%',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}>結婚歴</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={marrieds}
                    initial={this.state.marrried}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 170,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      width: '52%',
                      bottom: '.7%',
                      alignSelf: 'center',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}>子どもの有無</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={presence_of_children}
                    initial={this.state.presence_of_children}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 150,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      bottom: '.7%',
                      width: '42%',
                      alignSelf: 'center',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}> 結婚願望</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={marriage_desires}
                    initial={this.state.marriage_desire}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 150,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      bottom: '.7%',
                      width: '42%',
                      alignSelf: 'center',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}> 子ども好き</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={like_children_or_nots}
                    initial={this.state.like_children_or_not}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 150,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      width: '42%',
                      bottom: '.7%',
                      alignSelf: 'center',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}>ペットの有無</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={presence_of_pets}
                    initial={this.state.presence_of_pet}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 150,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      width: '42%',
                      bottom: '.7%',
                      alignSelf: 'center',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <Text style={styles.label7}>休日</Text>
                  {/* <Text style={styles.text}>{this.state.bloodtype}</Text> */}
                  <RadioForm
                    radio_props={holidays}
                    initial={this.state.holiday}
                    // onPress={value => {
                    //   ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    // }}
                    // onPress={value => this.Button()}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'grey'}
                    selectedButtonColor={'grey'}
                    selectedLabelColor={'black'}
                    labelStyle={{
                      fontSize: 9,
                      paddingHorizontal: windowWidth / 2 - 150,
                      // width: windowWidth / 7.5,
                      alignSelf: 'center',
                    }}
                    disabled={true}
                    formHorizontal={true}
                    labelHorizontal={true}
                    style={{
                      // top: 30,
                      width: '42%',
                      bottom: '.7%',
                      alignSelf: 'center',
                      // backgroundColor:'red'
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </SlidingUpPanel>
>>>>>>> Stashed changes
      </View>
    );
  }
}

export default User;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  Mview: {
    // borderWidth: 1,

    borderColor: '#cdd5d5',
    alignSelf: 'center',
    justifyContent: 'center',
<<<<<<< Updated upstream
    top: windowWidth / 4.5,
    width: windowWidth - 33,
    height: windowHeight / 2 - 370,
    flexDirection: 'row',
    // backgroundColor: 'gray',
  },

  Mtxt: {
    bottom: 1,
    left: 11,
    color: '#5B5B5B',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    left: '26%',
    width: windowWidth / 2.5,
=======
    bottom: '10%',
    width: windowWidth,
    height: '10%',
    flexDirection: 'row',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    // backgroundColor: '#FFF',
  },

  Mtxt: {
    // alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // left: '215%',
    fontSize: 16,
    top: '20%',
    color: '#FFF',
  },

  button: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#EA337E',
    height: windowHeight / 2 - 500,
    borderColor: '#cdd5d5',
    height: 35,
    marginRight: 15,
    width: windowWidth / 1.6,
>>>>>>> Stashed changes
  },

  button1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    right: '46%',
    width: windowWidth / 4.2,
  },

<<<<<<< Updated upstream
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    // right: windowHeight / 3.4,
    left: '2%',
    width: windowWidth / 4.3,
  },

  scrollview: {
    top: 30,
    left: 15,
=======
  // button2: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   height: 30,
  //   borderColor: '#cdd5d5',
  //   // right: windowHeight / 3.4,
  //   left: '2%',
  //   width: windowWidth / 4.3,
  // },

  scrollview: {
    top: 10,
    // left: 15,
    width: windowWidth,
    alignSelf: 'center',
>>>>>>> Stashed changes
    height: windowHeight - 10,
  },

  view: {
    top: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F7F7F7',
    height: 50,
    width: windowWidth - 40,
    alignSelf: 'center',
    // right: 20,
    borderRadius: 5,
    marginBottom: 20,
    flex: 1,
  },

  view1: {
    top: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F7F7F7',
    height: 100,
    width: windowWidth - 40,
    alignSelf: 'center',
    // right: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  label: {
    bottom: 8,
    left: 5,
    backgroundColor: '#fff',
    color: 'gray',
    fontSize: 10,
    alignSelf: 'flex-start',
  },

  label2: {
    bottom: 8,
    left: 5,
    backgroundColor: '#fff',
    color: 'gray',
    fontSize: 10,
    alignSelf: 'flex-start',
  },

  label3: {
    bottom: 8,
    left: 5,
    backgroundColor: '#fff',
    color: 'gray',
    fontSize: 10,
    alignSelf: 'flex-start',
  },

  label4: {
    bottom: 8,
    left: 5,
    backgroundColor: '#fff',
    color: 'gray',
    fontSize: 10,
    alignSelf: 'flex-start',
  },

  label5: {
    bottom: 8,
    left: 5,
    backgroundColor: '#fff',
    color: 'gray',
    fontSize: 10,
    alignSelf: 'flex-start',
  },

  label6: {
    bottom: 8,
    left: 5,
    backgroundColor: '#fff',
    color: 'gray',
    fontSize: 10,
    alignSelf: 'flex-start',
  },

  label7: {
    bottom: 8,
    left: 5,
    backgroundColor: '#fff',
    color: 'gray',
    fontSize: 10,
    alignSelf: 'flex-start',
  },

  email: {
    bottom: 14,
    left: 3,
    backgroundColor: '#fff',
    width: windowWidth / 2 - 70,
    color: 'black',
  },

  introduction: {
    bottom: 8,
    left: 7,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    color: 'gray',
    fontSize: 10,
  },

  text: {
    bottom: 5,
    left: 11,
    color: '#5B5B5B',
  },

  textname: {
    top: '18%',
    // left: 50,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    // width:windowWidth / 2.6,
    color: 'white',
  },

  Image: {
    top: 25,
    width: 100,
    height: 100,
    borderRadius: 100,
    // left: 15,
    borderWidth: 1,
    alignSelf: 'center',
  },

  modalImage: {
    // top: 25,
    width: '95%',
    height: windowHeight - 400,
    // borderRadius: 100,
    // left: 15,
    borderWidth: 1,
    alignSelf: 'center',
    bottom: windowHeight /1.5
  },
  absolute2: {
    backgroundColor: 'grey',
    opacity: 0.6,
    position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    top: 60,
    width: windowWidth - 10,
    height: windowWidth / 2.6,
    position: 'absolute',
    alignSelf: 'center',
  },
<<<<<<< Updated upstream
=======

  Container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 180,
    backgroundColor: '#FFF5F8',
    justifyContent: 'flex-end',
    padding: 24,
  },
  textHeader: {
    bottom: 70,
    fontSize: 28,
    color: 'black',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#2b8a3e',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },
>>>>>>> Stashed changes
});

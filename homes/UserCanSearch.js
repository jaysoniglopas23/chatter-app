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
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';
import Svg, {G, Path} from 'react-native-svg';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      details: '',

      modalReportVisible: false,
    };

    this.getUser = this.getUser.bind(this);

    // this.goChat = this.goChat.bind();
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    // this.props.Call.init();
    // this.props.navigation.push('Search');

    if (global.prevPageCall == 'Call') {
      this.props.navigation.push('Call');
      global.otherid;
    } else {
      this.props.navigation.push('Search');
    }
  }

  goChat(id, name, lastmessage) {
    global.prevPage = 'UserCanSearch';
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
          });
        });

        let params = {};

        params['id'] = global.otherid;
        params['lastmessage'] = global.lastmessage;
        params['name'] = self.state.nickname;
        params['profile_image'] = this.state.profile_image;
        params['profile_image_dir'] = this.state.profile_image_dir;

        global.otherid = global.otherid;
        global.name = this.state.nickname;
        global.profile_image_dir = this.state.profile_image_dir;
        global.profile_image = this.state.profile_image;
        global.lastmessage = global.lastmessage;
        // global.name = name;
        // global.lastmessage = lastmessage;
        // alert(global.otherid);

        global.socket.emit('on-user-details', params);
        console.log(params);
      },
    );
  }

  componentDidMount() {
    this.getUser();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  // componentWillUnmount() {
  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

  // handleBackButton() {
  //     ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
  //     return true;
  // }

  getUser() {
    let self = this;

    self.setState({}, () => {
      global.socket.on('emit-user-details', function (ret) {
        global.socket.off('emit-user-details');
        // console.log(ret);
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
        });
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

      global.otherid = global.otherid;
      global.name = self.state.nickname;
      global.lastmessage = global.lastmessage;
      // console.log(params);
      global.socket.emit('on-user-details', params);
    });
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

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          flex: 1,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => this.goBack()}
          style={{
            left: 30,
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
        <Modal
          animationType="slide"
          // transparent={true}
          isVisible={this.state.modalReportVisible}
          style={{bottom: 400, alignSelf: 'center'}}>
          <View
            style={{
              width: windowWidth,
              height: windowHeight - 180,
              borderRadius: 30,
              flexDirection: 'column',
            }}>
            <TouchableWithoutFeedback
              style={{
                width: windowWidth,
                height: windowHeight - 290,
              }}
              onPress={() => this.closeReportModal()}>
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
                <TouchableOpacity
                  style={{
                    width: windowWidth - 20,
                    height: 30,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    marginLeft: 10,
                    borderRadius: 3,
                  }}
                  onPress={() => this.spam()}>
                  <Text
                    style={{
                      width: '100%',
                      height: 30,
                      textAlign: 'center',
                      lineHeight: 30,
                      fontSize: 12,
                      color: global.glTextColor,
                    }}>
                    {this.state.spamText}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: windowWidth - 20,
                    height: 30,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    marginLeft: 10,
                    borderRadius: 3,
                  }}
                  onPress={() => this.inap()}>
                  <Text
                    style={{
                      width: '100%',
                      height: 30,
                      textAlign: 'center',
                      lineHeight: 30,
                      fontSize: 12,
                      color: global.glTextColor,
                    }}>
                    {this.state.inapText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Image
          source={{
            uri:
              URL_TEMP +
              '/' +
              this.state.profile_image_dir +
              '/' +
              this.state.profile_image,
          }}
          style={styles.Image}
        />
        <View style={{width: '100%', height: windowHeight / 1.7}}>
          <ScrollView style={styles.scrollview}>
            <View style={styles.view}>
              <Text style={styles.label}> ニックネーム</Text>
              <Text style={styles.text}>{this.state.nickname}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.email}> メールアドレス</Text>
              <Text style={styles.text}>{this.state.email}</Text>
            </View>
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
      </View>
    );
  }
}

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Mview: {
    // borderWidth: 1,

    borderColor: '#cdd5d5',
    alignSelf: 'center',
    // justifyContent:'center',
    top: windowWidth / 4.5,
    width: windowWidth - 33,
    height: windowHeight / 2 - 370,
    flexDirection: 'row',
    backgroundColor: 'gray',
  },

  Mtxt: {
    bottom: 1,
    left: 11,
    color: 'black',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    left:windowHeight /2 - 300,
    width: windowWidth / 2.5,
  },

  button1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    right:windowHeight/2 - 245,
    width: windowWidth / 4.2,
  },

  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    // right: windowHeight / 3.4,
    left:17,
    width: windowWidth / 4.3,
  },

  scrollview: {
    top: 30,
    left: 15,
    height: windowHeight - 10,
  },

  view: {
    top: 10,
    borderWidth: 1,
    borderColor: '#cdd5d5',
    height: 50,
    width: windowWidth - 40,
    alignSelf: 'center',
    right: 20,
    borderRadius: 5,
    marginBottom: 20,
    flex: 1,
  },

  view1: {
    top: 10,
    borderWidth: 1,
    borderColor: '#cdd5d5',
    height: 100,
    width: windowWidth - 40,
    alignSelf: 'center',
    right: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  label: {
    bottom: 11,
    left: 5,
    backgroundColor: '#fff',
    color: 'black',
    width: windowWidth / 2 - 90,
  },

  label2: {
    bottom: 11,
    left: 5,
    backgroundColor: '#fff',
    color: 'black',
    width: windowWidth / 2 - 78,
  },

  label3: {
    bottom: 11,
    left: 5,
    backgroundColor: '#fff',
    color: 'black',
    width: windowWidth / 2 - 150,
  },

  label4: {
    bottom: 11,
    left: 5,
    backgroundColor: '#fff',
    color: 'black',
    width: windowWidth / 2 - 135,
  },

  label5: {
    bottom: 11,
    left: 5,
    backgroundColor: '#fff',
    color: 'black',
    width: windowWidth / 2 - 150,
  },

  label6: {
    bottom: 11,
    left: 5,
    backgroundColor: '#fff',
    color: 'black',
    width: windowWidth / 2 - 110,
  },

  label7: {
    bottom: 11,
    left: 5,
    backgroundColor: '#fff',
    color: 'black',
    width: windowWidth / 2 - 125,
  },

  email: {
    bottom: 14,
    left: 3,
    backgroundColor: '#fff',
    width: windowWidth / 2 - 70,
    color: 'black',
  },

  introduction: {
    bottom: 11,
    left: 7,
    backgroundColor: '#fff',
    width: windowWidth / 2 - 135,
    color: 'black',
  },

  text: {
    bottom: 5,
    left: 11,
    color: 'black',
  },

  Image: {
    top: 10,
    width: 100,
    height: 100,
    borderRadius: 1,
    left: 15,
    borderWidth: 1,
  },
});

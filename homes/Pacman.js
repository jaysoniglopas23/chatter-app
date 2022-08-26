import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;

const windowWidth = Dimensions.get('window').width;

class Pacman extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  goBack() {
    this.props.navigationRef.current?.navigate('Dashboard');
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', flex: 1 ,width:'100%', height:windowHeight}}>
        <View style={{flexDirection: 'row',width:'100%'}}>
          <Image
            source={require('../icon/Asset66.png')}
            style={{
              marginLeft: windowWidth / 2 - 190,
              width: 40,
              height: 40,
              resizeMode: 'contain',
              top: 10,
            }}
          />
          <Text style={{top: 18, left: 5, color: 'black', fontWeight: 'bold'}}>
            おしゃべりさん使い方
          </Text>
        </View>
        <View
          style={{
            top: 20,
            width: '100%',
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          <Text style={{fontSize: 11, color: 'black'}}>
            おしゃべりさんをインストールしていただきありがとうございます。
          </Text>
          <Text
            style={{fontSize: 11, color: 'black', top: 10, fontWeight: 'bold'}}>
            おしゃべりさんは、誰もが楽しく色々な形でお話を楽しめる場所です。メッセージのやり取り、通話、掲示板、様々な形で全国の人と繋がり、おしゃべりを楽しめます。
          </Text>
        </View>
        <ScrollView
          style={{
            marginHorizontal: 1,
            borderWidth: 1,
            borderColor: 'black',
            marginBottom: 150,
            top: 40,
            width:windowWidth-10,
            alignSelf:'center',
            height:windowHeight ,
          }}>
          <View style={{marginBottom: 30}}>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                source={require('../icon/Asset66.png')}
                style={{
                  marginLeft: windowWidth / 2 - 190,
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                  top: 10,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                下部、アイコンの説明
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                source={require('../icon/Asset3.png')}
                style={{
                  marginLeft: windowWidth / 2 - 190,
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  top: 10,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                ホームの設定画面及びマイページです。
              </Text>
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                いいねや足あとの確認、各種設定ができます。
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                source={require('../icon/Asset4.png')}
                style={{
                  marginLeft: windowWidth / 2 - 190,
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  top: 10,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                メッセージのやり取りページです。
              </Text>
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                  paddingRight: 35,
                }}>
                メッセージを左にスワイプする事でゴミ箱ボタンが表示されメ
                ッセージの消去が可能です。
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                source={require('../icon/Asset5.png')}
                style={{
                  marginLeft: windowWidth / 2 - 190,
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  top: 0,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                通話を許可にしているユーザーが表示されます。
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                source={require('../icon/Asset6.png')}
                style={{
                  marginLeft: windowWidth / 2 - 190,
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  top: 10,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                ユーザー検索ページです。
              </Text>
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                登録している全国のユーザーが表示されます。
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                source={require('../icon/Asset7.png')}
                style={{
                  marginLeft: windowWidth / 2 - 190,
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  top: 10,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                おしゃべり掲示板です。
              </Text>
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                }}>
                示板への書き込みや、掲示板へのいいね、コメントができます。
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                source={require('../icon/Asset9.png')}
                style={{
                  marginLeft: windowWidth / 2 - 190,
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  top: 10,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                  paddingRight: 59,
                  right:5,
                }}>
               ・通話機能について通話機能をご利用になる場合はマイページの通話設定から通話を許可にしてください。
              </Text>
              <Text
                style={{
                  color: 'black',
                  left: 55,
                  bottom: 23,
                  fontWeight: 'bold',
                  top:1,
                  paddingRight: 59,
                }}>
                ・通話するには？ いたずら電話を無くすため、お互いが通話を許可にしていて 尚且つ、三通以上のメッセージのやり取りをしている方同士のみ 通話ができるようになります。
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{bottom:windowWidth /2.2 , width:'100%'}}>
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
            bottom: windowHeight / 2 - 483,
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
        </View>
      </View>
    );
  }
}
export default Pacman;

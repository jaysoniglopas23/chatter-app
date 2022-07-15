import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

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
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={{flexDirection: 'row'}}>
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
            width: '97%',
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
            marginBottom: 130,
            top: 40,
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
        <View style={{bottom: 150}}>
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
              top: 63,
            }}>
            <Image
              source={require('../icon/arrow.png')}
              style={{height: 20, top: 5}}
            />
            <Text style={{right: 15, top: 4}}>戻る</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Pacman;

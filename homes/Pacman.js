import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

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
      <View style={{backgroundColor: '#fff'}}>
        <ScrollView
          style={{
            marginHorizontal: 20,
            borderWidth: 10,
            borderColor: '#cdd5d5',
            marginBottom: 130,
          }}>
          <View style={{marginBottom: 30}}>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  left: 10,
                  top: 10,
                  tintColor: '#3EEE91',
                }}
                source={require('../icon/SMS.png')}
              />
              <Text style={{fontWeight: 'bold', left: 45, bottom: 14}}>
                MESSAGES
              </Text>
              <Text style={{left: 13}}>
                読者が気を散らされることは長い間確立された事実です
                レイアウトを見たときにページの読み取り可能なコンテンツ。ポイント
                Lorem
                Ipsumを使用することの利点は、多かれ少なかれ正常であるということです
                'ここのコンテンツを使用するのではなく、文字の配布
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  left: 10,
                  top: 10,
                  tintColor: '#3EEE91',
                }}
                source={require('../icon/Search.png')}
              />
              <Text style={{fontWeight: 'bold', left: 45, bottom: 14}}>
                MESSAGES
              </Text>
              <Text style={{left: 13}}>
                読者が気を散らされることは長い間確立された事実です
                レイアウトを見たときにページの読み取り可能なコンテンツ。ポイント
                Lorem
                Ipsumを使用することの利点は、多かれ少なかれ正常であるということです
                'ここのコンテンツを使用するのではなく、文字の配布
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  left: 10,
                  top: 10,
                  tintColor: '#3EEE91',
                }}
                source={require('../icon/Post.png')}
              />
              <Text style={{fontWeight: 'bold', left: 45, bottom: 14}}>
                MESSAGES
              </Text>
              <Text style={{left: 13}}>
                読者が気を散らされることは長い間確立された事実です
                レイアウトを見たときにページの読み取り可能なコンテンツ。ポイント
                Lorem
                Ipsumを使用することの利点は、多かれ少なかれ正常であるということです
                'ここのコンテンツを使用するのではなく、文字の配布
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  left: 10,
                  top: 10,
                  tintColor: '#3EEE91',
                }}
                source={require('../icon/settings.png')}
              />
              <Text style={{fontWeight: 'bold', left: 45, bottom: 14}}>
                MESSAGES
              </Text>
              <Text style={{left: 13}}>
                読者が気を散らされることは長い間確立された事実です
                レイアウトを見たときにページの読み取り可能なコンテンツ。ポイント
                Lorem
                Ipsumを使用することの利点は、多かれ少なかれ正常であるということです
                'ここのコンテンツを使用するのではなく、文字の配布
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 30}}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  left: 10,
                  top: 10,
                  tintColor: '#3EEE91',
                }}
                source={require('../icon/Dashboard.png')}
              />
              <Text style={{fontWeight: 'bold', left: 45, bottom: 14}}>
                MESSAGES
              </Text>
              <Text style={{left: 13}}>
                読者が気を散らされることは長い間確立された事実です
                レイアウトを見たときにページの読み取り可能なコンテンツ。ポイント
                Lorem
                Ipsumを使用することの利点は、多かれ少なかれ正常であるということです
                'ここのコンテンツを使用するのではなく、文字の配布
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{bottom: 190}}>
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

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Slider from '@react-native-community/slider';
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SpecialCC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: '0',
      drop_calls: '',
    };

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigationRef.current?.navigate('News');
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffff', height: '100%', flex: 1}}>
        <View
          style={{
            alignSelf: 'center',
            width: windowWidth - 40,
            height: '60%',
            backgroundColor: '#f8f8f9',
            borderRadius: 10,
          }}>
          <Text style={{color: 'black', paddingBottom: 10}}>特商法</Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            Theme 特定商取引違法
          </Text>
          <Text style={{color: 'black'}}>インターネット異性紹介事業 </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            届け出、認定済み 認定番号
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            特定商取引法基づく表記
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・役務の提供者 　おしゃべりさん運営事務局
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・運営責任者 　林 明
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・所在地 　東京都渋谷区代々木3-15
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>連絡先</Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            osyaberisann@gmail.com
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・お支払い方法 　グーグルウォレット
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・料金表 　1コイ
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・利用料金支払い時期 　プラン購入時(前払い)
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・商品引き渡し 　入金後即
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・退会方法 　アプリをアンインストール後、３日でデータ完全削除
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・返金、キャンセル
            　商品の特性上、返品、返金はしかねますのでご了承ください。
          </Text>
        </View>
        <View
          style={{
            top: windowWidth / 2 - 150,
            backgroundColor: '#ffff',
            // flex: 1,
            width: windowWidth - 25,
            height: windowHeight / 2 - 550,
            // backgroundColor: 'black',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              backgroundColor: '#ECECEC',
              height: 31,
              flexDirection: 'row',
              width: 50,
              borderRadius: 2,
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
export default SpecialCC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    top: 50,
    marginHorizontal: 150,
  },

  view: {
    top: 90,
    height: 50,
    right: 370,
  },

  view1: {
    top: 10,
    borderWidth: 1,
    borderColor: '#cdd5d5',
    height: 100,
    marginHorizontal: 22,
    right: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  label: {
    bottom: 11,
    right: 142,
    backgroundColor: '#fff',
    marginHorizontal: 147,
  },

  email: {
    bottom: 11,
    right: 155,
    backgroundColor: '#fff',
    marginHorizontal: 162,
  },

  introduction: {
    bottom: 11,
    right: 135,
    backgroundColor: '#fff',
    marginHorizontal: 142,
  },

  text: {
    bottom: 5,
    left: 11,
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

import React, {Component} from 'react';
import {
  Text,
  Dimensions,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import Happy from '../homes/Happy';
import Calls from '../homes/Calls';
import Card from '../homes/Card';
import Heart from '../homes/Heart';
import Lock from '../homes/Lock';
import News from '../homes/News';
import Pacman from '../homes/Pacman';
import Picture from '../homes/Picture';
import Star from '../homes/Star';
import {CardStyleInterpolators} from '@react-navigation/stack';
import Login from './Login';
import DisplayAnImage from './Home';

const DeviceWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();
const navigationRef = React.createRef();

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goProfile = this.goProfile.bind(this);

    this.goLogout = this.goLogout.bind(this);

    this.goCard = this.goCard.bind(this);

    this.goCall = this.goCall.bind(this);

    this.goHeart = this.goHeart.bind(this);

    this.goLock = this.goLock.bind(this);

    this.goNews = this.goNews.bind(this);

    this.goPacman = this.goPacman.bind(this);

    this.goPicture = this.goPicture.bind(this);

    this.goStart = this.goStar.bind(this);

    // this.goCoin = this.goCoin.bind(this);
  }

  // goSettings() {
  //   this.props.navigationRef.current?.navigate('Settings');
  // }

  // goCoin() {
  //   this.props.navigationRef.current?.navigate('Coin');
  // }

  goCard() {
    this.props.navigationRef.current?.navigate('Card');
  }

  goCall() {
    this.props.navigationRef.current?.navigate('Calls');
  }

  goHeart() {
    this.props.navigationRef.current?.navigate('Heart');
  }

  goLock() {
    this.props.navigationRef.current?.navigate('Lock');
  }

  goNews() {
    this.props.navigationRef.current?.navigate('News');
  }

  goPacman() {
    this.props.navigationRef.current?.navigate('Pacman');
  }

  goStar() {
    this.props.navigationRef.current?.navigate('Star');
  }

  goPicture() {
    this.props.navigationRef.current?.navigate('Picture');
  }

  goProfile() {
    this.props.navigationRef.current?.navigate('Happy');
  }

  goLogout() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <View
          style={{
            flex: 0.6,
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'trasparent',
          }}>
          <View>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderRightWidth: 1,
                borderBottomWidth: 1,
              }}
              onPress={() => this.goProfile()}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset11.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>
                プロフィール
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderRightWidth: 1,
                borderBottomWidth: 1,
              }}
              onPress={() => this.goStart('Star')}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset55.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>足あと</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderRightWidth: 1,
                borderBottomWidth: 1,
              }}
              onPress={() => this.goHeart('Heart')}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset88.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>いいね</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#fff', height: '100%'}}>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginLeft: 1,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
              }}
              onPress={() => this.goPicture()}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset33.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>
                写真登録
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginLeft: 1,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
              }}
              onPress={() => this.goPacman('Pacman')}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset66.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>
                各種使い方
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginLeft: 1,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderRightWidth: 1,
              }}
              onPress={() => this.goNews('News')}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset99.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>
                利用規約等
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginLeft: 1,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderBottomWidth: 1,
                borderLeftWidth: 1,
              }}
              onPress={() => this.goCard()}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset44.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>
                個人証明書
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginLeft: 1,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderBottomWidth: 1,
                borderLeftWidth: 1,
              }}
              onPress={() => this.goCall('Calls')}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset5.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>
                通話設定
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginLeft: 1,
                backgroundColor: 'transparent',
                borderColor: '#cdd5d5',
                borderBottomWidth: 1,
                borderLeftWidth: 1,
              }}
              onPress={() => this.goLogout()}>
              <Image
                style={styles.iconRight}
                source={require('../icon/Asset10.png')}
              />
              <Text style={{alignSelf: 'center', color: 'black'}}>
                ログアウト
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 10,
    left: 20,
  },
  avatar: {
    paddingTop: 10,
    width: 130,
    height: 130,
    marginBottom: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  iconRight: {
    marginTop: 20,
    resizeMode: 'contain',
    width: 60,
    height: 60,
    marginBottom: 5,
    marginLeft: 30,
  },
});

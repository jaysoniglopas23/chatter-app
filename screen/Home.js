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
import Dashboard from './Dashboard';
import Settings from '../homes/Settings';

const DeviceWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();

class DisplayAnImage extends Component {
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

    this.goCoin = this.goCoin.bind(this);

    this.goSettings = this.goSettings.bind(this);
  }

  goSettings() {
    this.props.navigation.navigate('Settings');
  }

  goCoin() {
    this.props.navigation.navigate('Coin');
  }

  goCard() {
    this.props.navigation.navigate('Card');
  }

  goCall() {
    this.props.navigation.navigate('Calls');
  }

  goHeart() {
    this.props.navigation.navigate('Heart');
  }

  goLock() {
    this.props.navigation.navigate('Lock');
  }

  goNews() {
    this.props.navigation.navigate('News');
  }

  goPacman() {
    this.props.navigation.navigate('Pacman');
  }

  goStar() {
    this.props.navigation.navigate('Star');
  }

  goPicture() {
    this.props.navigation.navigate('Picture');
  }

  goProfile() {
    this.props.navigation.navigate('Happy');
  }

  goLogout() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '180%'}}>
        <View style={styles.container}>
          <Avatar
            size="small"
            title="LW"
            source={require('../images/image.jpg')}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            style={{width: 100, height: 100, paddingTop: 10}}
          />
          <Text
            style={{
              alignSelf: 'center',
              left: 24,
              bottom: 23,
            }}>
            名前...
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              top: 0,
              left: 1,
            }}>
            年齢 23
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              top: 22,
              right: 30,
            }}>
            使用メッセージポイント
          </Text>
          <TouchableOpacity
            onPress={() => this.goSettings()}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 35,
              marginLeft: 160,
            }}>
            <Image
              style={{width: 40, height: 40, marginRight: 1, right: 80}}
              source={require('../icon/settings.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.goCoin()}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 35,
              marginRight: 30,
            }}>
            <Image
              style={{
                width: 40,
                height: 40,
                marginRight: 1,
                right: 20,
              }}
              source={require('../icon/Buy.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.6,
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <Stack.Navigator
            screenOptions={{
              gestureEnable: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Happy"
              component={Happy}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              component={DisplayAnImage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Calls"
              component={Calls}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Card"
              component={Card}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Heart"
              component={Heart}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Lock"
              component={Lock}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="News"
              component={News}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Pacman"
              component={Pacman}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Star"
              component={Star}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Picture"
              component={Picture}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
      </View>
    );
  }
}

export default DisplayAnImage;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 10,
    left: 20,
    height: 100,
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
    width: 60,
    height: 60,
    marginBottom: 5,
    marginLeft: 30,
  },
});

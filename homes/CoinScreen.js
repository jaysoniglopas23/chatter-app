import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View, Image, Dimensions} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  Card,
  Container,
  Interaction,
  InteractionText,
  InteractionWrapper,
  Divider,
  Divider1,
  Divider2,
  Divider3,
  Divider4,
  InteractionWrapper1,
  Interaction1,
} from '../styles/CoinStyle';
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;

class CoinScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    this.props.navigation.navigate('home');
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#FAEA48',
          width: '100%',
          height: '100%',
          flex: 1,
        }}>
        <InteractionWrapper>
          <Image
            source={require('../icon/coin13.png')}
            style={{
              marginLeft: windowWidth / 2 - 10,
              width: 70,
              height: 70,
              resizeMode: 'contain',
            }}
          />
          <Interaction active onPress={() => this.goHome()}>
            <Svg
              onPress={() => this.goHome()}
              style={{width: 20, height: 30, top: 12}}
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
          </Interaction>
        </InteractionWrapper>
        <Container>
          <Divider>
            <Image
              source={require('../icon/coin1.png')}
              style={{
                alignSelf: 'center',
                width: 200,
                height: 200,
                resizeMode: 'contain',
              }}
            />
          </Divider>
          <Divider1>
            <Image
              source={require('../icon/coin2.png')}
              style={{
                marginLeft: windowWidth / 2 - 190,
                width: 80,
                height: 80,
                resizeMode: 'contain',
                bottom: 10,
              }}
            />
          </Divider1>
          <Divider2>
            <Image
              source={require('../icon/coin3.png')}
              style={{
                marginLeft: windowWidth / 2 - 190,
                width: 80,
                height: 80,
                resizeMode: 'contain',
                bottom: 10,
              }}
            />
          </Divider2>
          {/* <InteractionWrapper1 active>
            <Interaction1 active>
            <Image
              source={require('../icon/coin8.png')}
              style={{
                marginLeft: windowWidth / 2 - 190,
                width: 80,
                height: 40,
                resizeMode: 'contain',
                bottom: 0,
              }}
            />
            </Interaction1>
          </InteractionWrapper1> */}
          <Divider1>
            <Image
              source={require('../icon/coin4.png')}
              style={{
                marginLeft: windowWidth / 2 - 190,
                width: 120,
                height: 120,
                resizeMode: 'contain',
                bottom: 30,
              }}
            />
          </Divider1>
          <Image
            source={require('../icon/coin5.png')}
            style={{
              marginLeft: windowWidth / 2 - 410,
              width: 120,
              height: 60,
              resizeMode: 'contain',
              bottom: 4,
            }}
          />
          {/* <InteractionWrapper1 active>
            <Interaction1 active>
            </Interaction1>
          </InteractionWrapper1> */}
          <Divider1>
            <Image
              source={require('../icon/coin6.png')}
              style={{
                marginLeft: windowWidth / 2 - 190,
                width: 120,
                height: 120,
                resizeMode: 'contain',
                bottom: 30,
              }}
            />
          </Divider1>
        </Container>
      </View>
    );
  }
}

export default CoinScreen;

import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native';
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
  InteractionWrapper1,
  Interaction1,
} from '../styles/CoinStyle';
import Svg, {G, Path} from 'react-native-svg';

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
        }}>
        <InteractionWrapper>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              padding: 1,
              left: 125,
            }}>
            Purchase points
          </Text>
          <Interaction onPress={() => this.goHome()}>
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
          </Interaction>
        </InteractionWrapper>
        <Container>
          <Divider>
            <Text
              style={{
                alignSelf: 'center',
                // alignItems: 'center',
                fontSize: 12,
                paddingTop: 0,
                paddingBottom: 10,
                // left: 125,
              }}>
              Please select the point purchase amount
            </Text>
          </Divider>
          <Divider1>
            <Text style={{fontSize: 18, right: 1}}>Monthly Plan</Text>
            <Text style={{fontSize: 18, right: 1}}>Monthly Plan all</Text>
            <InteractionWrapper1 active>
              <Interaction1 active>
                <InteractionText>¥8980</InteractionText>
              </Interaction1>
            </InteractionWrapper1>
          </Divider1>
          <Divider2></Divider2>
          <Text style={{fontSize: 18, right: 125}}>Regarding call</Text>
          <Text style={{fontSize: 18, right: 131}}>Call Monthly</Text>
          <InteractionWrapper1 active>
            <Interaction1 active>
              <InteractionText>¥100</InteractionText>
            </Interaction1>
          </InteractionWrapper1>
          <Divider1></Divider1>
          <Text style={{fontSize: 18, right: 145}}>Message</Text>
          <Text style={{fontSize: 18, right: 109}}>Message Monthly</Text>
          <InteractionWrapper1 active>
            <Interaction1 active>
              <InteractionText>¥200</InteractionText>
            </Interaction1>
          </InteractionWrapper1>
          <Divider1></Divider1>
          <Text
            style={{
              alignSelf: 'center',
              // alignItems: 'center',
              fontSize: 12,
              paddingTop: 15,
              paddingBottom: 10,
              // left: 125,
            }}>
            Credit Card
          </Text>
        </Container>
      </View>
    );
  }
}

export default CoinScreen;

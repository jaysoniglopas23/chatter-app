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

function CoinScreen({navigation}) {
  return (
    <View
      style={{
        backgroundColor: '#fadfad',
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
        <Interaction onPress={() => navigation.navigate('home')}>
          <AntDesign name="arrowleft" size={30} />
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

export default CoinScreen;

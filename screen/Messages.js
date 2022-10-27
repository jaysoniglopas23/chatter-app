import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import MessagesScrean from './MessageAll';
import ReadMessages from './Readmessages';
import AddMessages from './UnReadmessages';

const Stack = createStackNavigator();

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goMessageScreen = this.goMessageScreen.bind(this);

    this.goAddMessage = this.goAddMessage.bind(this);

    this.goReadMessages = this.goReadMessages.bind(this);
  }

  goMessageScreen() {
    this.props.navigation.navigate('MessagesScrean');
  }

  goAddMessage() {
    this.props.navigation.navigate('AddMessages');
  }

  goReadMessages() {
    this.props.navigation.navigate('ReadMessages');
  }

  render() {
    return (
      <Container>
        <View
          style={{
            height: '180%',
            width: '105%',
            // borderWidth: 10,
            borderColor: '#FAEA48',
            borderBottomWidth: 0,
          }}>
          <View style={{flexDirection: 'row', left: 139}}>
            <TouchableOpacity onPress={() => this.goMessageScreen()}>
              <Text style={{paddingTop: 10, right: 95, color: 'black'}}>
                全て
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goAddMessage()}>
              <Text style={{paddingTop: 10, color: 'black'}}>既読</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goReadMessages()}>
              <Text style={{paddingTop: 10, left: 95, color: 'black'}}>
                未読
              </Text>
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
                name="MessagesScrean"
                component={MessagesScrean}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AddMessages"
                component={AddMessages}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReadMessages"
                component={ReadMessages}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </View>
        </View>
      </Container>
    );
  }
}

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '160%',
  },
});

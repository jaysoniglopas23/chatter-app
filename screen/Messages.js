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
import MessagesScrean from '../homes/Message';
import Savemessages from '../homes/Savemessages';
import Addmessages from '../homes/Addmessages';

const Stack = createStackNavigator();

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goMessageA = this.goMessageA.bind(this);

    this.goMessageB = this.goMessageB.bind(this);

    this.goMessageC = this.goMessageC.bind(this);
  }

  goMessageA() {
    this.props.navigation.navigate('MessagesScrean');
  }

  goMessageB() {
    this.props.navigation.navigate('Addmessages');
  }

  goMessageC() {
    this.props.navigation.navigate('Savemessages');
  }

  render() {
    return (
      <Container>
        <View style={{height: '180%', width: '100%'}}>
          <View style={{flexDirection: 'row', left: 103}}>
            <TouchableOpacity onPress={() => this.goMessageA()}>
              <Text style={{paddingTop: 10, right: 55}}>全て</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goMessageB()}>
              <Text style={{paddingTop: 10}}>既読</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goMessageC()}>
              <Text style={{paddingTop: 10, left: 55}}>未読</Text>
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
                name="Addmessages"
                component={Addmessages}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Savemessages"
                component={Savemessages}
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

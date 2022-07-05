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
import Tabs from '../navigation/tabs';
import Chat from './Chat';
import {Message} from 'react-native-gifted-chat';

const Messages = [
  {
    id: '1',
    userName: 'Dominador Dela cruz',
    userImg: require('../images/alex-vinogradov-BO7kc38mkGU-unsplash.jpg'),
    messageTime: '4 mins ago',
    messageText: 'Helu gudmorneng!!!',
  },
  {
    id: '2',
    userName: 'Bj Cablao',
    userImg: require('../images/alp-duran-pVHRC3e9_XM-unsplash.jpg'),
    messageTime: '2 hours ago',
    messageText: 'Gart Gart Gart',
  },
  {
    id: '3',
    userName: 'Toper Fantastic',
    userImg: require('../images/dave-hoefler-gqLJxCHQs5w-unsplash.jpg'),
    messageTime: '1 hours ago',
    messageText: 'More More More',
  },
  {
    id: '4',
    userName: 'Mimi yuuh',
    userImg: require('../images/daniel-j-schwarz-REjuIrs2YaM-unsplash.jpg'),
    messageTime: '1 day ago',
    messageText: 'owwwsshhhii!!!.',
  },
  {
    id: '5',
    userName: 'Fly hight Butter fly',
    userImg: require('../images/nicola-pavan-Q4VZGRZiPfk-unsplash.jpg'),
    messageTime: '2 days ago',
    messageText: 'On The way',
  },
];

class Savemessages extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goChat = this.goChat.bind(this);
  }

  goChat() {
    this.props.navigation.navigate('Chat');
  }
  render() {
    return (
      <Container>
        <FlatList
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card
              style={{paddingTop: 10}}
              onPress={() =>
                this.goChat({
                  userName: item.userName,
                })
              }>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
  }
}

export default Savemessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

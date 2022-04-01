import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Card,
  Card1,
  UserInfo,
  UserInfo1,
  UserImgWrapper,
  UserImg,
  UserImg1,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  MessageText1,
  TextSection,
  PostsImg,
  UserIcon,
} from '../styles/FeedStyles';
import Tabs from '../navigation/tabs';
import Chat from '../screen/Chat';
import {Message} from 'react-native-gifted-chat';

const Messages = [
  {
    id: '1',
    userName: 'Dominador Dela cruz',
    userImg: require('../images/alex-vinogradov-BO7kc38mkGU-unsplash.jpg'),
    messageTime: '4 mins ago',
    messageText: 'Helu gudmorneng!!!',
    userIcon: require('../icon/icons8-thumbs-up-30.png'),
  },
  {
    id: '2',
    userName: 'Bj Cablao',
    userImg: require('../images/alp-duran-pVHRC3e9_XM-unsplash.jpg'),
    messageTime: '2 hours ago',
    messageText: 'Gart Gart Gart',
    userIcon: require('../icon/icons8-thumbs-up-30.png'),
  },
  {
    id: '3',
    userName: 'Toper Fantastic',
    userImg: require('../images/dave-hoefler-gqLJxCHQs5w-unsplash.jpg'),
    messageTime: '1 hours ago',
    messageText: 'More More More',
    userIcon: require('../icon/icons8-thumbs-up-30.png'),
  },
  {
    id: '4',
    userName: 'Mimi yuuh',
    userImg: require('../images/daniel-j-schwarz-REjuIrs2YaM-unsplash.jpg'),
    messageTime: '1 day ago',
    messageText: 'owwwsshhhii!!!.',
    userIcon: require('../icon/icons8-thumbs-up-30.png'),
  },
  {
    id: '5',
    userName: 'Fly hight Butter fly',
    userImg: require('../images/nicola-pavan-Q4VZGRZiPfk-unsplash.jpg'),
    messageTime: '2 days ago',
    messageText: 'On The way',
    userIcon: require('../icon/icons8-thumbs-up-30.png'),
  },
];

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fulldata: [],
      loading: false,
      error: null,
      query: '',
    };

    this.goChat = this.goChat.bind(this);
  }

  goChat() {
    let item = this;

    this.props.navigation.navigate('User');
  }

  render() {
    return (
      <Container>
        <View
          style={{
            borderWidth: 1,
            width: 290,
            top: 10,
            height: 35,
            right: 40,
            borderRadius: 1,
            borderColor: '#cdd5d5',
          }}>
          <TextInput />
        </View>
        <TouchableOpacity
          style={{
            borderRadius: 3,
            backgroundColor: '#E8EAE6',
            width: 60,
            height: 35,
            left: 160,
            bottom: 25,
          }}>
          <Text style={{flex: 1, top: 5, left: 6}}>Search</Text>
        </TouchableOpacity>
        <FlatList
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card>
              <UserInfo>
                <UserImgWrapper onPress={() => this.goChat()}>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                  <UserImg1 source={item.userImg} />
                </TextSection>
              </UserInfo>
              <UserInfo1>
                <MessageText1>お気に入り (2)</MessageText1>
                <UserIcon source={item.userIcon} />
              </UserInfo1>
            </Card>
          )}
        />
      </Container>
    );
  }
}

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

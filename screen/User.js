import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';

const User = ({navigation}) => {
  const [dataList, setProfile] = useState([]);

  useEffect(() => {
    setProfile([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tab')}
        style={{
          backgroundColor: '#ECECEC',
          marginHorizontal: 170,
          height: 31,
          right: 170,
          marginBottom: 30,
          flexDirection: 'row',
          width: 70,
          borderRadius: 2,
          top: 10,
        }}>
        <Image
          source={require('../icon/arrow.png')}
          style={{height: 20, top: 5}}
        />
      </TouchableOpacity>
      <View
        style={{
          bottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#FF5733 ',
        }}
      />
      <FlatList
        data={dataList}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Avatar
            size="small"
            title="LW"
            source={require('../images/image.jpg')}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            style={{width: 90, height: 90, paddingTop: 1, left: 20}}
          />
        )}
      />

      <View
        style={{
          top: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#FF5733 ',
        }}
      />

      <View
        style={{
          top: 35,
          height: 90,
          borderWidth: 1,
          borderRadius: 5,
          // borderBottomColor: '#FF5733 ',
        }}
      />
      <Text
        style={{
          color: 'black',
          opacity: 0.8,
          fontSize: 11,
          fontFamily: 'SemiBold',
          bottom: 63,
          backgroundColor: '#fff',
          right: 170,
          marginHorizontal: 175,
        }}>
        Introduction
      </Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, {useState, useEffect, useCallback, Component} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';
import Svg, {G, Path} from 'react-native-svg';

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      details: '',
    };
  }

  componentDidMount() {
    let self = this;

    self.setState({}, () => {
      global.socket.on('emit-user-details', function (ret) {
        global.socket.off('emit-user-details');
        console.log(ret);
        self.setState({
          id: ret.id,
          details: ret,
          profile_image: ret.profile_image,
          profile_image_dir: ret.profile_image_dir,
          nickname: ret.nickname,
          email: ret.email,
          introduction: ret.introduction,
          character: ret.character,
          hobbie: ret.hobbie,
          school: ret.school,
          bloodtype: ret.bloodtype,
        });
      });

      let params = {};

      params['id'] = global.user_id;
      params['about'] = this.state.about;
      params['firstname'] = this.state.firstname;
      params['lastname'] = this.state.lastname;
      params['age'] = this.state.age;
      params['about'] = this.state.about;
      params['job'] = this.state.job;
      params['company'] = this.state.company;
      params['school'] = this.state.school;
      params['gender'] = this.state.gender;
      params['gender_pref'] = this.state.gender_pref;
      params['distance_threshold'] = 0;
      params['nickname'] = this.state.nickname;
      params['smoking'] = this.state.gender;
      params['drinking'] = this.state.drinking;
      params['marrried'] = this.state.marrried;
      params['presence_of_children'] = this.state.presence_of_children;
      params['like_children_or_not'] = this.state.like_children_or_not;
      params['marriage_desire'] = this.state.marriage_desire;
      params['presence_of_pet'] = this.state.presence_of_pet;
      params['holiday'] = this.state.holiday;
      params['hobbie'] = this.state.hobbie;
      params['bloodtype'] = this.state.bloodtype;
      params['email'] = this.state.email;
      params['name'] = this.state.name;
      params['introduction'] = this.state.introduction;
      params['character'] = this.state.character;
      params['location'] = this.state.location;
      params['points'] = this.state.points;
      params['mail_count'] = this.state.mail_count;
      params['call_minutes'] = this.state.call_minutes;
      params['pkuser'] = this.state.pkuser;

      global.socket.emit('on-user-details', params);
    });
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <Image
          source={{
            uri:
              URL_TEMP +
              '/' +
              this.state.profile_image_dir +
              '/' +
              this.state.profile_image,
          }}
          style={styles.Image}
        />
        <View>
          <ScrollView style={styles.scrollview}>
            <View style={styles.view}>
              <Text style={styles.label}>Nickname</Text>
              <Text style={styles.text}>{this.state.nickname}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.email}>Email</Text>
              <Text style={styles.text}>{this.state.email}</Text>
            </View>
            <View style={styles.view1}>
              <Text style={styles.introduction}>Introduction</Text>
              <Text style={styles.text}>{this.state.introduction}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label}>Area live</Text>
              <Text style={styles.text}>{this.state.nickname}</Text>
            </View>
            <View style={styles.view1}>
              <Text style={styles.label}>Character</Text>
              <Text style={styles.text}>{this.state.character}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label}>Hobbie</Text>
              <Text style={styles.text}>{this.state.hobbie}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.introduction}>Appointment</Text>
              <Text style={styles.text}></Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label}>Society</Text>
              <Text style={styles.text}></Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label}>School</Text>
              <Text style={styles.text}>{this.state.school}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.label}>Bloodtype</Text>
              <Text style={styles.text}>{this.state.bloodtype}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.Mview}>
          <TouchableOpacity style={styles.button}>
            <Svg
              style={{width: 16, height: 16, left: 10}}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <Path
                fill="grey"
                d="M492.6 226.6L44.6 34.59C40.54 32.85 36.26 31.1 32.02 31.1c-8.623 0-17.1 3.499-23.3 10.05C-.4983 51.81-2.623 66.3 3.377 78.31L96 256l-92.62 177.7c-6 12.02-3.875 26.5 5.344 36.27c6.188 6.547 14.66 10.05 23.28 10.05c4.25 0 8.531-.8438 12.59-2.594L492.6 285.4c11.78-5.031 19.41-16.61 19.41-29.41C511.1 243.2 504.4 231.6 492.6 226.6zM31.98 64.03C31.99 64.01 31.96 64.04 31.98 64.03L442.7 240H123.7L31.98 64.03zM31.75 448.5L123.7 272h318.1L31.75 448.5z"
              />
            </Svg>
            <Text style={styles.Mtxt}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Mview: {
  //   borderWidth: 1,
  //   borderColor: '#cdd5d5',
  //   backgroundColor: 'black',
  //   top: 50,
  // },

  Mtxt: {
    bottom: 1,
    left: 20,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    top: 50,
    marginHorizontal: 150,
  },

  scrollview: {
    top: 30,
    left: 15,
    height: 450,
  },

  view: {
    top: 10,
    borderWidth: 1,
    borderColor: '#cdd5d5',
    height: 50,
    marginHorizontal: 22,
    right: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  view1: {
    top: 10,
    borderWidth: 1,
    borderColor: '#cdd5d5',
    height: 100,
    marginHorizontal: 22,
    right: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  label: {
    bottom: 11,
    right: 142,
    backgroundColor: '#fff',
    marginHorizontal: 147,
  },

  email: {
    bottom: 11,
    right: 155,
    backgroundColor: '#fff',
    marginHorizontal: 162,
  },

  introduction: {
    bottom: 11,
    right: 135,
    backgroundColor: '#fff',
    marginHorizontal: 142,
  },

  text: {
    bottom: 5,
    left: 11,
  },

  Image: {
    top: 10,
    width: 100,
    height: 100,
    borderRadius: 1,
    left: 15,
    borderWidth: 1,
  },
});

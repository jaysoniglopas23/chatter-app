import React, {Component} from 'react';
import {
  TextInput,
  Text,
  Dimensions,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {ListItem, Avatar} from 'react-native-elements';
import {getUsers, contains} from '../styles/index';
import UserPost from '../styles/UserPost';
import {width} from 'cli';

const numColumns = 3;
const DeviceWidth = Dimensions.get('window').width;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      data: [],

      fullData: [],

      error: null,

      name: '',

      userid: '',

      start: '0',

      users: '',

      path: '',

      image: '',
    };

    this.goCall = this.goCall.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  goCall(id) {
    this.props.navigation.navigate('User');

    let self = this;

    this.setState(
      {},

      () => {
        global.socket.on('emit-users-for-search', function (ret) {
          global.socket.off('emit-users-for-search');
          // JSON.stringify(ret);
          // console.log(ret);

          self.setState({
            callRefreshed: true,
            refresh: 1,

            name: ret.name,
            image: ret.image,
            path: ret.path,
            users: ret.users,
            id: ret.id,
          });

          // console.log(id);
        });
        let params = {};

        params['start'] = 0;
        params['size'] = 15;
        params['filter_type'] = '0';
        params['order'] = '0';
        params['name'] = this.state.name;
        params['userid'] = this.state.userid;
        params['id'] = id;

        global.user_id = id;

        global.socket.emit('on-users-for-search', params);
        console.log(params);
      },
    );
  }

  getUsers() {
    this.makeRemoteRequest();

    let self = this;

    this.setState(
      {
        saving: true,
      },

      () => {
        global.socket.on('emit-users-for-search', function (ret) {
          global.socket.off('emit-users-for-search');
          // JSON.stringify(ret);
          // console.log(ret.users);

          self.setState({
            name: ret.name,
            image: ret.image,
            path: ret.path,
            users: ret.users,
          });

          // console.log(ret.name);
        });
        let params = {};

        params['start'] = this.state.start;
        params['size'] = '1000';
        params['filter_type'] = '0';
        params['order'] = '0';
        params['name'] = this.state.name;
        params['userid'] = this.state.userid;

        global.socket.emit('on-users-for-search', params);
        // console.log(params);
      },
    );
    // this.props.navigationRef.current?.navigate('Dashboard');
  }

  makeRemoteRequest = _.debounce(() => {
    this.setState({loading: true});
    getUsers(20, this.state.query)
      .then(data => {
        this.setState({
          loading: false,
          data: [],
          fullData: [],
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }, 250);

  handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const users = _.filter(this.state.users, users => {
      return contains(users, formattedQuery);
    });
    this.setState({users, query: text}, () => this.makeRemoteRequest());
  };

  formatData = (users, numColumns) => {
    const totalRows = Math.floor(users.length / numColumns);
    let totalLastRows = ret.length - totalRows * numColumns;

    while (totalRows !== 0 && totalLastRows !== numColumns) {
      users.push({key: 'blank', empty: true});
      totalLastRows++;
    }

    return users;
  };

  _renderItem = ({item, index}) => {
    let {itemStyle, itemInvisible, textStyle, numColumns} = styles;

    if (item.empty) {
      return <View style={(itemStyle, itemInvisible)}></View>;
    }

    return (
      <TouchableOpacity style={itemStyle} onPress={() => this.goCall(item.id)}>
        <Text style={textStyle}>{item.name}</Text>
        <Image
          style={styles.iconRight}
          source={{uri: URL_TEMP + '/' + item.path + '/' + item.image}}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          flex: 1,
          // borderWidth: 10,
          borderColor: '#FAEA48',
          borderBottomWidth: 0,
        }}>
        <View style={{flexDirection: 'column', bottom: 70}}>
          <Image
            style={{
              resizeMode: 'contain',
              width: 25,
              height: 22,
              left: 10,
              top: 89,
              left: 345,
              color: 'black',
            }}
            source={require('../icon/filter.png')}
          />
          <Image
            style={{
              resizeMode: 'contain',
              width: 25,
              height: 20,
              left: 10,
              top: 67,
              left: 315,
              color: 'black',
            }}
            source={require('../icon/bars.png')}
          />
          <Image
            style={{
              resizeMode: 'contain',
              width: 25,
              height: 25,
              left: 10,
              top: 45,
              left: 280,
              color: 'black',
            }}
            source={require('../icon/Asset45.png')}
          />
          <TextInput
            style={{
              backgroundColor: '#fff',
              fontSize: 10,
              height: 36,
              top: 15,
              borderWidth: 1,
              borderColor: 'black',
              width: 120,
              left: 160,
              color:"black"
            }}
            onChangeText={this.handleSearch}
            value={this.state.query}
          />
          <Image
            style={{
              resizeMode: 'contain',
              width: 25,
              height: 25,
              left: 10,
              bottom: 17,
              color: 'black',
            }}
            source={require('../icon/Asset6.png')}
          />
          <Text
            style={{fontWeight: 'bold', color: 'black', bottom: 40, left: 40}}>
            プロフィール検索
          </Text>
          <Text
            style={{
              fontSize: 10,
              marginHorizontal: 165,
              bottom: 68,
              left: 1,
              backgroundColor: '#fff',
              color: 'black',
            }}>
            プロフィール検索
          </Text>
        </View>
        <View style={{bottom: 80}}>
          <FlatList
            data={this.state.users}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
          />
        </View>
        {/* <View style={{flexDirection: 'row', top: 50}}>
          <Text style={{alignSelf: 'center', left: 190}}>1/2</Text>

          <View style={{left: 308, marginTop: 10, width: 70}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'tranparent',
                marginHorizontal: 170,
                height: 50,
                right: 167,
                top: 10,
              }}>
              <Image
                source={require('../icon/forward.png')}
                style={{height: 30}}
              />
            </TouchableOpacity>
          </View>
          <View style={{right: 80, marginTop: 9, width: 70}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'tranparent',
                marginHorizontal: 170,
                height: 50,
                right: 167,
                top: 10,
              }}>
              <Image
                source={require('../icon/arrow.png')}
                style={{height: 30}}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 10,
    paddingTop: 0,
  },
  avatar: {
    paddingTop: 10,
    width: 130,
    height: 130,
    marginBottom: 50,
    marginLeft: 20,
  },
  logo: {
    width: 66,
    height: 58,
  },
  iconRight: {
    paddingTop: 10,
    width: 65,
    height: 66,
    marginBottom: 30,
    marginLeft: 0,
  },
  button: {
    backgroundColor: 'blue',
    padding: 18,
    width: '46%',
    height: 60,
  },
  input: {
    alignItems: 'center',
    height: 35,
    margin: 0,
    borderWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    left: 22,
    borderColor: '#cdd5d5',
  },
  itemStyle: {
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    flex: 1,
    marginHorizontal: 2,
    marginVertical: 2,
    borderWidth: 18,
    borderColor: '#fff',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: 'black',
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'white',
    padding: 1,
    fontSize: 10,
  },
});

/* <TouchableOpacity onPress={() => console.log('werk!')}>
<Image
  style={{height: 20, width: 20, right: 360, top: 3}}
  source={require('../icon/icons8-bulleted-list-50.png')}
/>
</TouchableOpacity>
<TouchableOpacity onPress={() => console.log('werk!')}>
<Image
  style={{height: 20, width: 20, right: 340, top: 3}}
  source={require('../icon/icons8-squared-menu-50.png')}
/>
</TouchableOpacity>
<TouchableOpacity onPress={() => console.log('werk!')}>
<Image
  style={{height: 23, width: 23, right: 43, top: 3}}
  source={require('../icon/icons8-scroll-down-50.png')}
/>
</TouchableOpacity> */

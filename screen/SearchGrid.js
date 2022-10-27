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
  Animated,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {ListItem, Avatar} from 'react-native-elements';
import {getUsers, contains} from '../styles/index';
import UserPost from '../styles/UserPost';

const numColumns = 1;
const DeviceWidth = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

export default class SearchGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: true,

      refresh: 0,

      loading: false,

      params: {},

      data: [],

      fullData: [],

      error: null,

      name: '',

      userid: '',

      // start: '0',

      users: [],

      path: '',

      image: '',

      loadingTop: new Animated.Value(-500),

      loadingBottom: new Animated.Value(windowHeight),

      tableTop: new Animated.Value(windowHeight / 10),

      callRefreshed: true,
    };

    this.goCall = this.goCall.bind(this);

    this.refreshTimeline = this.refreshTimeline.bind(this);

    this.goingToTop = false;
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    this.makeRemoteRequest();

    this.refreshTimeline();

    let self = this;

    this.setState(
      {},

      () => {
        global.socket.on('emit-users-for-search', function (ret) {
          global.socket.off('emit-users-for-search');
          // alert(JSON.stringify(ret));
          // console.log(ret);

          self.setState({
            callRefreshed: true,
            refresh: 1,

            name: ret.name,
            image: ret.image,
            path: ret.path,
            users: ret.users,
            id: ret.id,
            drop_calls: ret.drop_calls,
          });

          // console.log(id);
        });
        let params = {};

        params['start'] = 20;
        params['size'] = 100;
        params['filter_type'] = '0';
        params['order'] = '0';
        params['name'] = this.state.name;
        params['userid'] = this.state.userid;
        params['id'] = id;
        global.socket.emit('on-users-for-search', params);
        // console.log(params);
      },
    );
    // this.props.navigationRef.current?.navigate('Dashboard');
  }

  goCall(id) {
    this.props.navigation.push('UserCanSearch');

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

        params['start'] = 20;
        params['size'] = 1000;
        params['filter_type'] = '0';
        params['order'] = '0';
        params['name'] = this.state.name;
        params['userid'] = this.state.userid;
        params['id'] = id;

        global.otherid = id;

        global.socket.emit('on-users-for-search', params);
        console.log(params);
      },
    );
  }

  refreshTimeline() {
    let self = this;

    /*Animated.timing(
         this.state.loadingBottom,
         {
           toValue: windowHeight,
           duration: 500,
            useNativeDriver: true
         }
      ).start();*/

    let params = self.state.params;

    params['size'] = params['size'] + 9;

    // console.log(params);

    self.setState(
      {
        params: params,
      },
      () => {
        global.socket.on('emit-users-for-search', function (ret) {
          global.socket.off('emit-users-for-search');
          // console.log(ret1);
          for (var i = 0; i < ret.length; i++) {
            self.setState(prevState => ({
              users: [...prevState.users, ret[i]],
            }));
          }

          self.setState(
            {
              callRefreshed: true,
              refresh: 1,
            },
            () => {
              Animated.timing(self.state.loadingBottom, {
                toValue: windowHeight,
                duration: 500,
                useNativeDriver: true,
              }).start();

              Animated.timing(self.state.loadingTop, {
                toValue: -500,
                duration: 500,
                useNativeDriver: true,
              }).start();

              console.log('Refresh timeline done');
            },
          );
        });

        params['size'] = 1000;
        params['filter_type'] = '0';
        params['order'] = '0';
        params['name'] = this.state.name;
        params['userid'] = this.state.userid;
        params['start'] = 20;

        global.socket.emit('on-users-for-search', self.state.params);
      },
    );
  }

  pushTableUp() {
    let self = this;

    this.setState({scrollUpDown: 0}, () => {
      Animated.timing(self.state.tableTop, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  }

  pushTableDown() {
    let self = this;

    this.setState({scrollUpDown: 1}, () => {
      Animated.timing(self.state.tableTop, {
        toValue: windowHeight / 10,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  }

  onEndReached() {
    let self = this;

    if (!this.state.topReached) {
      Animated.timing(this.state.loadingBottom, {
        toValue: windowHeight - 115,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {});
    }
  }

  handleScrollView(event) {
    let self = this;

    var currentStart = event.nativeEvent.contentOffset.y;
    var direction = currentStart > this.start ? 'down' : 'up';
    this.start = currentStart;

    if (currentStart <= 0) {
      if (this.state.scrollUpDown != 1) {
        this.pushTableDown();
      }
    } else {
      if (direction == 'down') {
        if (this.state.scrollUpDown != 0) {
          this.pushTableUp();
        }
      } else if (direction == 'up') {
        if (this.state.scrollUpDown != 1) {
          this.pushTableDown();
        }
      }
    }

    if (
      this.state.callRefreshed &&
      direction == 'up' &&
      !this.state.goingToTop &&
      currentStart <= -100
    ) {
      Animated.timing(self.state.loadingTop, {
        toValue: 110,
        duration: 100,
        useNativeDriver: true,
      }).start();

      this.setState(
        {
          callRefreshed: false,
        },
        () => {
          self.refreshTimeline();
        },
      );
    }

    if (
      this.state.callRefreshed &&
      direction == 'down' &&
      !this.state.goingToTop
    ) {
      console.log('Refresh timeline');

      this.setState(
        {
          callRefreshed: false,
        },
        () => {
          self.refreshTimeline();
        },
      );
    }
  }

  goToSearch() {
    this.props.navigation.push('Search');
  }

  makeRemoteRequest = _.debounce(() => {
    this.setState({loading: true});

    getUsers(100, this.state.query)
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
    let totalLastRows = users.length - totalRows * numColumns;

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

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={{}}>
        <ActivityIndicator animating size="large" />
      </View>
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
        <View
          style={{
            flexDirection: 'column',
            bottom: 70,
            width: windowWidth - 10,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: windowWidth / 2 - 200,
              top: 88,
              alignSelf: 'center',
              marginLeft: 330,
            }}>
            <Image
              style={{
                resizeMode: 'contain',
                width: 25,
                height: 22,
                color: 'black',
              }}
              source={require('../icon/filter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.goToSearch()}
            style={{
              width: windowWidth / 2 - 200,
              top: 65,
              alignSelf: 'center',
              left: 137,
            }}>
            <Image
              style={{
                resizeMode: 'contain',
                width: 25,
                height: 20,
                color: 'black',
              }}
              source={require('../icon/bars.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: windowWidth / 2 - 200,
              top: 45,
              alignSelf: 'center',
              left: 110,
            }}>
            <Image
              style={{
                resizeMode: 'contain',
                width: 25,
                height: 25,
                color: 'black',
              }}
              source={require('../icon/Asset45.png')}
            />
          </TouchableOpacity>
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
              color: 'black',
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
              fontSize: 9,
              width: windowWidth / 2 - 120,
              bottom: 68,
              left: windowWidth / 2.4,
              backgroundColor: '#fff',
              color: 'black',
            }}>
            プロフィール検索
          </Text>
        </View>
        <View style={{bottom: 90}}>
          <FlatList
            data={this.state.users}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={item => item.id}
            numColumns={numColumns}
            onScroll={event => this.handleScrollView(event)}
            scrollEnabled={this.state.scrollEnabled}
            extraData={this.state.refresh}
            initialNumToRender={100}
            ListFooterComponent={this.renderFooter}
          />
        </View>
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
  iconCanCall: {
    marginTop: 40,
    resizeMode: 'contain',
    width: 15,
    height: 15,
    marginBottom: 0,
    marginRight: 300,
    tintColor: '#3EEE91',
  },
  iconCantCall: {
    marginTop: 20,
    resizeMode: 'contain',
    width: 15,
    height: 15,
    marginBottom: 10,
    marginLeft: 65,
    tintColor: 'red',
  },
  iconRight: {
    paddingTop: 0,
    width: 100,
    height: 100,
    marginBottom: 40,
    marginRight: 180,
    top: 20,
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
    height: windowHeight / 4,
    flex: 1,
    width: '100%',
    marginHorizontal: 2,
    marginVertical: 2,
    borderWidth: 18,
    borderColor: '#fff',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: 'gray',
    position: 'absolute',
    right: windowWidth / 8,
    bottom: 60,
    // backgroundColor: 'white',
    padding: 1,
    fontSize: 30,
    marginLeft: 200,
    textAlign: 'center',
  },
});

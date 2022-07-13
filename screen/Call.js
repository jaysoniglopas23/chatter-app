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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {ListItem, Avatar} from 'react-native-elements';
import {getUsers, contains} from '../styles/index';
import UserPost from '../styles/UserPost';

const numColumns = 3;
const DeviceWidth = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const URL_TEMP = 'http://18.181.88.243:8081/Temp';

export default class Call extends Component {
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
    this.makeRemoteRequest();

    this.refreshTimeline();

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
        params['size'] = '1000';
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

  // getTimeline() {
  //   let self = this;

  //   let params = {};

  //   for (var i = 0; i < global.searchFields.length; i++) {
  //     if (global.searchFields[i].value == '0-0') {
  //       params[global.searchFields[i].db_name] = '0';
  //     } else {
  //       params[global.searchFields[i].db_name] = global.searchFields[i].value;
  //     }

  //     if (params[global.searchFields[i].db_name] != 0) {
  //       this.setState({
  //         isSearch: true,
  //       });
  //     }
  //   }

  //   params['start'] = this.state.start;
  //   params['size'] = 15;
  //   params['filter_type'] = '1';
  //   params['order'] = '0';
  //   params['name'] = this.state.name;
  //   params['userid'] = this.state.userid;
  //   params['offset'] = '0';

  //   global.socket.on('emit-users-for-search', function (ret) {
  //     global.socket.off('emit-users-for-search');

  //     self.setState(
  //       {
  //         timelineRefreshed: false,
  //         loadingOpacity: 0,
  //         tableOpacity: 1,
  //       },
  //       () => {
  //         if (ret.length == 0 && !self.state.topReached) {
  //           self.setState({
  //             noDataFoundWindowOpacity: 1,
  //           });
  //         } else {
  //           self.setState(
  //             {
  //               noDataFoundWindowOpacity: 0,
  //             },
  //             () => {
  //               self.setState(
  //                 {
  //                   timelineData: ret,
  //                   timelineRefreshed: true,
  //                   topReached: false,
  //                 },
  //                 () => {
  //                   /*if(global.user_id != ''){

  //               self.getCoin();

  //             }*/

  //                   Animated.timing(self.state.loadingTop, {
  //                     toValue: -500,
  //                     duration: 100,
  //                     useNativeDriver: true,
  //                   }).start();

  //                   /*setTimeout(function(){
  //               self.refreshTimeline();
  //             }, 2000);*/
  //                 },
  //               );
  //             },
  //           );
  //         }
  //       },
  //     );
  //   });

  //   this.setState(
  //     {
  //       params: params,
  //     },
  //     () => {
  //       global.socket.emit('on-users-for-search', params);
  //     },
  //   );
  // }

  // gotoTop() {
  //   let self = this;

  //   this.goingToTop = true;

  //   this.flatListRef.scrollToOffset({animated: true, offset: 0});

  //   Animated.timing(this.state.loadingBottom, {
  //     toValue: windowHeight,
  //     duration: 1,
  //     useNativeDriver: true,
  //   }).start(function () {
  //     Animated.timing(self.state.loadingTop, {
  //       toValue: 110,
  //       duration: 100,
  //       useNativeDriver: true,
  //     }).start();

  //     //global.socket.off('timelineposts');

  //     /*self.setState({
  //       timelineData : [],
  //       noDataFoundWindowOpacity : 0
  //     }, () => {

  //       self.getTimeline();

  //     });*/

  //     let y = setInterval(function () {
  //       if (self.state.timelineRefreshed) {
  //         self.goingToTop = false;

  //         console.log('timelinerefresh loop');

  //         clearInterval(y);

  //         self.setState(
  //           {
  //             users: [],
  //             noDataFoundWindowOpacity: 0,
  //           },
  //           () => {
  //             self.getTimeline();
  //           },
  //         );
  //       }
  //     }, 500);
  //   });
  // }

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

    params['start'] = params['start'] + 9;

    // console.log(params);

    self.setState(
      {
        params: params,
      },
      () => {
        global.socket.on('emit-users-for-search', function (ret1) {
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

        params['size'] = 15;
        params['filter_type'] = '0';
        params['order'] = '0';
        params['name'] = this.state.name;
        params['userid'] = this.state.userid;
        params['start'] = 0;

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

  formatData = (data, numColumns) => {
    const totalRows = Math.floor(data.length / numColumns);
    let totalLastRows = data.length - totalRows * numColumns;

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
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            width: 270,
            height: 41,
            top: 12,
            left: 70,
            borderColor: '#cdd5d5',
          }}>
          <TextInput
            style={{backgroundColor: '#fff', fontSize: 10}}
            onChangeText={this.handleSearch}
            value={this.state.query}
          />
        </View>
        <View style={{top: 40}}>
          <FlatList
            data={this.state.users}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={item => item.id}
            numColumns={numColumns}
            onScroll={event => this.handleScrollView(event)}
            scrollEnabled={this.state.scrollEnabled}
            extraData={this.state.refresh}
            initialNumToRender={15}
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
    backgroundColor: 'grey',
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
    color:'black',
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'white',
    padding: 1,
    fontSize: 10,
  },
});

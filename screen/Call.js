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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const dataList = [
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
  {
    id: '6',
    userName: 'Dominador Dela cruz',
    userImg: require('../images/alex-vinogradov-BO7kc38mkGU-unsplash.jpg'),
    messageTime: '4 mins ago',
    messageText: 'Helu gudmorneng!!!',
  },
  {
    id: '7',
    userName: 'Bj Cablao',
    userImg: require('../images/alp-duran-pVHRC3e9_XM-unsplash.jpg'),
    messageTime: '2 hours ago',
    messageText: 'Gart Gart Gart',
  },
  {
    id: '8',
    userName: 'Toper Fantastic',
    userImg: require('../images/dave-hoefler-gqLJxCHQs5w-unsplash.jpg'),
    messageTime: '1 hours ago',
    messageText: 'More More More',
  },
  {
    id: '49',
    userName: 'Mimi yuuh',
    userImg: require('../images/daniel-j-schwarz-REjuIrs2YaM-unsplash.jpg'),
    messageTime: '1 day ago',
    messageText: 'owwwsshhhii!!!.',
  },
];
const numColumns = 3;
const DeviceWidth = Dimensions.get('window').width;

export default class Call extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goCall = this.goCall.bind(this);
  }

  goCall() {
    this.props.navigation.navigate('User');
  }

  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRows = dataList.length - totalRows * numColumns;

    while (totalRows !== 0 && totalLastRows !== numColumns) {
      dataList.push({key: 'blank', empty: true});
      totalLastRows++;
    }

    return dataList;
  };

  _renderItem = ({item, index}) => {
    let {itemStyle, itemInvisible, textStyle} = styles;

    if (item.empty) {
      return <View style={(itemStyle, itemInvisible)}></View>;
    }

    return (
      <TouchableOpacity style={itemStyle} onPress={() => this.goCall()}>
        <Text style={textStyle}>{item.userName}</Text>
        <Image style={styles.iconRight} source={item.userImg} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              top: 15,
              right: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextInput style={styles.input} />
              <Text
                style={{
                  bottom: 44,
                  right: 133,
                  fontSize: 10,
                  backgroundColor: '#fff',
                  marginHorizontal: 160,
                }}>
                パスワード
              </Text>
            </View>
          </View>
        </View>

        <View>
          <FlatList
            data={this.formatData(dataList, numColumns)}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
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
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'white',
    padding: 1,
    fontSize: 10,
  },
});

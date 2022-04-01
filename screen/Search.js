import {width} from 'cli';
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
  Picker,
  UserImg,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-material-dropdown';

const dataList = [
  {key: '1'},
  {key: '2'},
  {key: '3'},
  {key: '4'},
  {key: '5'},
  {key: '6'},
  {key: '7'},
  {key: '8'},
  {key: '8'},
];
const numColumns = 3;
const DeviceWidth = Dimensions.get('window').width;

export default class Search extends Component {
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
      <TouchableOpacity style={itemStyle}>
        <Text style={textStyle}>Name</Text>
        <Image
          style={styles.iconRight}
          source={require('../images/daniel-j-schwarz-REjuIrs2YaM-unsplash.jpg')}
        />
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
              marginHorizontal: 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                borderWidth: 1,
                marginTop: 0,
                paddingHorizontal: 10,
                height: 40,
                width: 250,
                bottom: 5,
                right: 7,
                borderColor: '#cdd5d5',
              }}>
              <TextInput
                style={{
                  paddingHorizontal: 1,
                }}
              />
            </View>
            <TouchableOpacity onPress={() => console.log('werk!')}>
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
            </TouchableOpacity>
          </View>
        </View>

        <View style={{top: 10}}>
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

    // marginHorizontal: 100,
  },
  avatar: {
    paddingTop: 10,
    width: 110,
    height: 110,
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
    paddingHorizontal: 120,
    left: 22,
  },
  itemStyle: {
    backgroundColor: '#add8e6',
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
  },
});

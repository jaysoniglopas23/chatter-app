import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigationRef.current?.navigate('Dashboard');
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffff', height: '100%'}}>
        <View style={{alignSelf: 'center'}}>
          <Text style={{top: 30, fontSize: 15, fontWeight: '900', right: 140}}>
            利用規約
          </Text>
        </View>

        <View style={{top: 490, backgroundColor: '#ffff', flex: 1}}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              backgroundColor: '#ECECEC',
              marginHorizontal: 170,
              height: 31,
              right: 150,
              marginBottom: 30,
              flexDirection: 'row',
              width: 70,
              borderRadius: 2,
              top: 63,
            }}>
            <Image
              source={require('../icon/arrow.png')}
              style={{height: 20, top: 5}}
            />
            <Text style={{right: 15, top: 4}}>戻る</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              marginHorizontal: 170,
              height: 31,
              left: 150,
              marginBottom: 30,
              flexDirection: 'row',
              width: 70,
              borderRadius: 2,
              top: 5,
            }}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5}}>保存</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
export default News;

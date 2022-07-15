import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Slider from '@react-native-community/slider';

class Policy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: '0',
      drop_calls: '',
    };

    this.goBack = this.goBack.bind(this);
  }

  

  goBack() {
    this.props.navigationRef.current?.navigate('News');
  }

  
  render() {
    return (
      <View style={{backgroundColor: '#ffff', height: '100%',flex:1}}>
        <View style={{top: 455}}>
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
            <Text style={{right: 15, top: 4,color:'black'}}>戻る</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.Save()}
            style={{
              backgroundColor: '#ECECEC',
              marginHorizontal: 170,
              height: 31,
              left: 130,
              marginBottom: 30,
              flexDirection: 'row',
              width: 70,
              borderRadius: 2,
              top: 0,
            }}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5,color:'black'}}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Policy;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
  
    view: {
      top: 90,
      height: 50,
      right: 370,
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
  
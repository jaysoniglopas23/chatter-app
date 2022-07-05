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

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
      toggled1: true,
      toggled2: true,
      sliderValue: '0',
    };

    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    this.props.navigation.navigate('home');
  }

  toggleSwitch = value => {
    this.setState({toggled: value});
  };

  toggleSwitch1 = value => {
    this.setState({toggled1: value});
  };

  toggleSwitch2 = value => {
    this.setState({toggled2: value});
  };

  render() {
    return (
      <View>
        {/* <View style={{left: 40, top: 30, backgroundColor: 'white'}}>
          <Text>面積距離</Text>
        </View> */}
        <View
          style={{
            alignSelf: 'center',
            top: 20,
            flexDirection: 'column',
            borderWidth: 1,
            height: 150,
            width: 350,
            borderRadius: 4,
          }}>
          <Text style={{color: '#000000', alignSelf: 'center', top: 20}}>
            km {this.state.sliderValue}
          </Text>
          <Slider
            style={{width: 200, height: 40, top: 20, left: 75}}
            minimumValue={0}
            maximumValue={500}
            step={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            // value={this.state.sliderValue}
            onValueChange={sliderValue => this.setState({sliderValue})}
          />
          <Text style={{left: 120, top: 60}}>on/off</Text>
          <Switch
            style={{right: 110, top: 40}}
            onValueChange={this.toggleSwitch2}
            value={this.state.toggled2}></Switch>
        </View>
        <View
          style={{
            left: 40,
            bottom: 140,
            backgroundColor: 'white',
            marginRight: 355,
          }}>
          <Text>面積距離</Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            top: 40,
            flexDirection: 'row',
            borderWidth: 1,
            height: 50,
            width: 350,
            borderRadius: 4,
          }}>
          <Text style={{left: 120, top: 13}}>on/off</Text>
          <Switch
            style={{left: 140}}
            onValueChange={this.toggleSwitch}
            value={this.state.toggled}></Switch>
        </View>
        <View
          style={{
            alignSelf: 'center',
            top: 60,
            flexDirection: 'row',
            borderWidth: 1,
            height: 50,
            width: 350,
            borderRadius: 4,
          }}>
          <Text style={{left: 120, top: 13}}>on/off1</Text>
          <Switch
            style={{left: 140}}
            onValueChange={this.toggleSwitch1}
            value={this.state.toggled1}></Switch>
        </View>

        <View style={{top: 350}}>
          <TouchableOpacity
            onPress={() => this.goHome()}
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
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 19,
    justifyContent: 'center',
    backgroundColor: '#ffef8a',
  },
});

export default Settings;

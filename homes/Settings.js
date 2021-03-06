import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Slider from '@react-native-community/slider';
import { getVersion } from 'react-native-device-info';
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const version = getVersion();


class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
      // toggled2: true,
      sliderValue: '0',
     
    };

    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    this.props.navigation.navigate('home');
  }

componentDidMount(){
  this.toggleSwitch2();
  this.toggleSwitch();
}
  

  // toggleSwitch2 = value2 => {
  //   this.setState({toggled2: value2});
  // };

  toggleSwitch2 = value2 => {
    let self = this;

    let notify_likes = 0;

   

    this.setState(
      {
        toggled2: value2,
      
      },

      () => {
        global.socket.on('emit-settings', function (ret) {
          global.socket.off('emit-settings');
            // console.log(ret);
          self.setState({
         notify_likes:ret.notify_likes,
          });
          // alert(self.state.notify_likes);
        

          if (self.state.notify_likes == 0) {
             self.setState({
            toggled2: false,
            });
          
          } else {
            self.setState({
              toggled2: true,
            });
           
          }

          // self.Save();
        });
        let params = {};

        params[ "notify_likes"] = notify_likes;
        params[ "notify_updates"] =this.state.notify_updates;
        global.value2 = value2;
        console.log(value2);
        global.socket.emit('on-settings', params);
      },
    );
  };

  toggleSwitch = (value) => {
    let self = this;

    let notify_updates = 0;


    this.setState(
      {
        toggled: value,
      },
     

      () => {
        global.socket.on('emit-settings', function (ret) {
          global.socket.off('emit-settings');
            console.log(ret);
          self.setState({
           notify_updates:ret.notify_updates,
          });
          // alert('sssssss');
        

          if (self.state.notify_updates == 0) {
            self.setState({
              toggled: false,
            });
          } else {
            self.setState({
              toggled: true,
            });
          }

          // self.Save();
        });
        let params = {};

        params[ "notify_updates"] =notify_updates;
        params[ "notify_likes"] = this.state.notify_likes;
        global.value = value
       
        console.log(params);
        global.socket.emit('on-settings', params);
      },
    );
  };

  Save() {
    let self = this;

    let notify_likes = 0;

    let notify_updates = 0;

    let value = global.value;

    let value2 = global.value2;

    

    this.setState(
    {
      toggled: value,
      toggled2: value2,
      saving: true,
    }, 

    () => {
      global.socket.on('emit-settings-save', function (ret) {
        global.socket.off('emit-settings-save');
       
        // self.setState({
        //  notify_likes: ret.notify_likes,
        //  notify_updates:ret.notify_updates,
        // });

        if (global.value == true) {
          self.setState({
            notify_updates : 1,
          });
          alert('1111111');
        } else {
          self.setState({
            notify_updates : 0,
          });
        }

        if (global.value2 == true) {
          self.setState({
            notify_likes : 1,
          });
          alert('wweqweqwe11');
        } else {
          self.setState({
            notify_likes : 0,
          });
        }
      });

      let params = {};

      params[ "notify_updates"] = this.state.notify_updates;
      params[ "notify_likes"] =this.state.notify_likes;
      params['distanceThreshold'] = 4;

      console.log(params);
      global.socket.emit('on-settings-save', params);
    });
  }


  render() {
    return (
      <View>
        {/* <View style={{left: 40, top: 30, backgroundColor: 'white'}}>
          <Text>????????????</Text>
        </View> */}
        {/* <View
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
          <Text>????????????</Text>
        </View> */}
        <View
          style={{
            alignSelf: 'center',
            top: 80,
            flexDirection: 'row',
            borderWidth: 1,
            height: 50,
            width: 350,
            borderRadius: 4,
          }}>
          <Text style={{left: 85, top: 13,color: 'black'}}>?????????????????????</Text>
          <Switch
            style={{left: 100}}
            onValueChange={this.toggleSwitch}
            value={this.state.toggled}></Switch>
        </View>
        <View
          style={{
            alignSelf: 'center',
            top: 100,
            flexDirection: 'row',
            borderWidth: 1,
            height: 50,
            width: 350,
            borderRadius: 4,
          }}>
          <Text style={{left: 85, top: 13,color: 'black'}}>??????????????????</Text>
          <Switch
            style={{left: 100}}
            onValueChange={this.toggleSwitch2}
            value={this.state.toggled2}></Switch>
        </View>

        <View style={{top: 520}}>
        <TouchableOpacity
          onPress={() => this.goHome()}
          style={{
            backgroundColor: '#ECECEC',
            marginHorizontal: 170,
            height: 31,
            right: 150,
            marginBottom: 30,
            flexDirection: 'row',
            width: 50,
            borderRadius: 2,
            bottom: windowHeight / 2 - 550,
          }}>
          <Svg
            style={{width: 20, height: 30}}
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="angle-left"
            class="svg-inline--fa fa-angle-left fa-w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512">
            <Path
              fill="black"
              d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></Path>
          </Svg>
          <Text style={{right: 0, top: 6, color: 'black'}}>??????</Text>
        </TouchableOpacity>
          <View  style={{
            
            alignItems:'center',
              backgroundColor: '#ECECEC',
              paddingHorizontal: 130,
              height: 31,
              left:67,
              marginBottom: 30,
              flexDirection: 'row',
              width: 70,
              borderWidth:1,
              borderRadius: 2,
              bottom: 400 ,
            }}>
          <Text style={{left: 85,position:'absolute',color:'black'}}>Version {version}</Text>
          </View>
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
              bottom: windowHeight / 2 - 425,
            }}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5,color:'black'}}>??????</Text>
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

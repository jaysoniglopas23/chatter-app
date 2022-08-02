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
import Svg, {G, Path} from 'react-native-svg';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Calls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: '0',
      drop_calls: '',
    };

    this.goBack = this.goBack.bind(this);
  }

  // toggleSwitch = value => {
  //   this.setState({toggled: value});
  // };

  componentDidMount() {
    this.toggleSwitch();
  }

  toggleSwitch = value => {
    let self = this;

    this.setState(
      {
        toggled: value,
      },

      () => {
        global.socket.on('emit-callsettings', function (ret) {
          global.socket.off('emit-callsettings');

          self.setState({
            drop_calls: ret.drop_calls,
          });
          // alert(self.state.drop_calls);

          if (self.state.drop_calls == 0) {
            self.setState({
              toggled: false,
            });
          } else {
            self.setState({
              toggled: true,
            });
          }
        });
        let params = {};

        params['drop_calls'] = this.state.drop_calls;
        params['userid'] = this.state.userid;
        console.log(params);
        global.socket.emit('on-callsettings', params);
      },
    );
  };

  goBack() {
    this.props.navigationRef.current?.navigate('Dashboard');
  }

  Save() {
    let self = this;

    this.setState({}, () => {
      global.socket.on('emit-callsettings-save', function (ret) {
        global.socket.off('emit-callsettings-save');

        // alert(JSON.stringify(ret));
        self.setState({
          intDropCalls: ret.drop_calls,
        });

        if ((toggled = false)) {
          intDropCalls = 0;
        } else {
          intDropCalls = 1;
        }
      });

      let params = {};

      params['drop_calls'] = 1;

      // console.log(params);
      global.socket.emit('on-callsettings-save', params);
    });
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffff', height: '100%', flex: 1}}>
        <View style={styles.view}>
          <Switch
            style={{left: 170, top: 24}}
            onValueChange={this.toggleSwitch}
            value={this.state.toggled}
          />
          <Text
            style={{
              left: 400,
              fontWeight: 'bold',
              color: 'black',
              fontSize: 20,
            }}>
            現在の通話設定 :
          </Text>
        </View>
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
              width: 50,
              borderRadius: 2,
              bottom: windowHeight / 2 - 540,
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
            <Text style={{right: 0, top: 6, color: 'black'}}>戻る</Text>
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
              bottom: windowHeight / 2 - 480,
            }}>
            <Image
              source={require('../icon/icons8-save-50.png')}
              style={{left: 9, top: 5, height: 20, width: 20}}
            />
            <Text style={{left: 15, top: 5, color: 'black'}}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Calls;

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

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image,Dimensions} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Picture extends Component {
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
        <View style={{alignSelf: 'center'}}></View>

        <View style={{top: 395}}>
         
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
            bottom: windowHeight / 2 - 650,
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
        </View>
      </View>
    );
  }
}
export default Picture;

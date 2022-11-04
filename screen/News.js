import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import Svg, {G, Path} from 'react-native-svg';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Policy from './Terms';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goBack = this.goBack.bind(this);

    this.goPolicy = this.goPolicy.bind(this);
  }

  goBack() {
    this.props.navigationRef.current?.navigate('Dashboard');
  }

  goPolicy() {
    this.props.navigationRef.current?.navigate('Policy');
  }

  goPrivacy() {
    this.props.navigationRef.current?.navigate('Privacy');
  }

  goSpecial() {
    this.props.navigationRef.current?.navigate('SpecialCC');
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffff', height: '100%', flex: 1}}>
        <View style={{flexDirection: 'column', left: 139, top: 100}}>
          <TouchableOpacity
            style={{
              borderColor: '#cdd5d5',
              borderWidth: 1,
              right: 135,
              width: '98%',
            }}
            onPress={() => this.goPolicy()}>
            <Text
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                left: 10,
                color: '#5B5B5B',
                top: 8,
              }}>
              利用規約
            </Text>
            <Svg
              style={{
                bottom: 15,
                marginLeft: 330,
                width: 20,
                height: 20,
              }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="paper-plane"
              class="svg-inline--fa fa-paper-plane fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <Path
                fill="black"
                d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#cdd5d5',
              borderWidth: 1,
              right: 135,
              width: '98%',
            }}
            onPress={() => this.goSpecial()}>
            <Text
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                left: 10,
                color: 'black',
                top: 8,
              }}>
              特商法
            </Text>
            <Svg
              style={{
                bottom: 15,
                marginLeft: 330,
                width: 20,
                height: 20,
              }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="paper-plane"
              class="svg-inline--fa fa-paper-plane fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <Path
                fill="black"
                d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#cdd5d5',
              borderWidth: 1,
              right: 135,
              width: '98%',
            }}
            onPress={() => this.goPrivacy()}>
            <Text
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                left: 10,
                color: 'black',
                top: 8,
              }}>
              プライバシーポリシー
            </Text>
            <Svg
              style={{
                bottom: 15,
                marginLeft: 330,
                width: 20,
                height: 20,
              }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="paper-plane"
              class="svg-inline--fa fa-paper-plane fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <Path
                fill="black"
                d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <View
          style={{
            top: windowWidth - 50,
            backgroundColor: '#ffff',
            // flex: 1,
            width: windowWidth - 25,
            // height: windowHeight / 2 - 450,
            // backgroundColor: 'black',
            alignSelf:'center'
          }}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              backgroundColor: '#ECECEC',
              height: 31,
              flexDirection: 'row',
              width: 50,
              borderRadius: 2,
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
export default News;

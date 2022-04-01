import React, {Component, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown-v2';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';

const Happy = ({navigation}) => {
  const [checked, setChecked] = React.useState('first');
  // constructor(props) {
  //   super(props);

  //   this.state = {};

  //   this.goBack = this.goBack.bind(this);
  // }

  // goBack() {
  //   this.props.navigation.navigate('Tab');
  // }

  // render() {
  let data = [{value: 'A'}, {value: 'B'}, {value: 'O'}, {value: 'AB'}];
  return (
    <View style={{backgroundColor: '#fff', height: '85%'}}>
      <ScrollView>
        <View style={{marginBottom: 50}}>
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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 35,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    bottom: 44,
                    right: 140,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 150,
                  }}>
                  ニックネーム
                </Text>
              </View>
            </View>
          </View>
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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 35,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                    height: 80,
                  }}
                />
                <Text
                  style={{
                    bottom: 88,
                    right: 129,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 143,
                    width: 75,
                  }}>
                  メールアドレス
                </Text>
              </View>
            </View>
          </View>
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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 95,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 60,
                    paddingHorizontal: 10,
                    // paddingVertical: 100,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    bottom: 103,
                    right: 147,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 160,
                  }}>
                  自己紹介
                </Text>
              </View>
            </View>
          </View>
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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 35,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    bottom: 44,
                    right: 130,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 143,
                    width: 75,
                  }}>
                  住んでいる地域
                </Text>
              </View>
            </View>
          </View>
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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 95,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 60,
                    paddingHorizontal: 10,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    bottom: 103,
                    right: 138,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 150,
                  }}>
                  キャラクター
                </Text>
              </View>
            </View>
          </View>
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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 35,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    bottom: 42,
                    right: 159,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 171,
                  }}>
                  趣味
                </Text>
              </View>
            </View>
          </View>
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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 35,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                    width: 361,
                  }}
                />
                <Text
                  style={{
                    bottom: 44,
                    right: 150,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 160,
                  }}>
                  アイテム
                </Text>
              </View>
            </View>
          </View>
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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 35,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                    width: 361,
                  }}
                />
                <Text
                  style={{
                    bottom: 44,
                    right: 150,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 160,
                  }}>
                  アイテム
                </Text>
              </View>
            </View>
          </View>

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
                <TextInput
                  style={{
                    // alignSelf: 'center',
                    height: 35,
                    margin: 0,
                    borderWidth: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                    left: 5,
                    borderColor: '#cdd5d5',
                    borderRadius: 4,
                    width: 361,
                  }}
                />
                <Text
                  style={{
                    bottom: 41,
                    right: 150,
                    fontSize: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 160,
                  }}>
                  アイテム
                </Text>
              </View>
            </View>
          </View>

          <Dropdown
            style={{
              top: 10,
              backgroundColor: 'white',
              borderWidth: 1,
              height: 40,
              width: 360,
              left: 25,
              borderRadius: 1,
              borderColor: '#cdd5d5',
              borderRadius: 4,
            }}
            label=""
            data={data}
          />
          <Text
            style={{
              bottom: 40,
              right: 160,
              fontSize: 10,
              backgroundColor: '#fff',
              marginHorizontal: 190,
            }}>
            血液型
          </Text>
          <View
            style={{
              borderWidth: 1,
              height: 90,
              borderRadius: 4,
              top: 20,
              width: 361,
              left: 25,
              borderColor: '#cdd5d5',
            }}>
            <View style={{left: 110, flexDirection: 'row', top: 30}}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={{right: 1, top: 8}}>TEXT</Text>

              <RadioButton
                label="asdas"
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text style={{right: 1, top: 8}}>TEXT</Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              height: 110,
              borderRadius: 4,
              top: 40,
              width: 358,
              left: 27,
              borderColor: '#cdd5d5',
            }}>
            <View style={{left: 70, top: 10}}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={{left: 50, bottom: 30}}>TEXT</Text>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text style={{left: 50, bottom: 30}}>TEXT</Text>
            </View>
            <View style={{left: 210, bottom: 101}}>
              <RadioButton
                value="third"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={{left: 50, bottom: 30}}>TEXT</Text>
              <RadioButton
                value="fourth"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text style={{left: 50, bottom: 30}}>TEXT</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Back Button */}
      <View style={{backgroundColor: 'white', height: 50}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={{
            backgroundColor: '#ECECEC',
            marginHorizontal: 170,
            height: 31,
            right: 150,
            marginBottom: 30,
            flexDirection: 'row',
            width: 70,
            borderRadius: 2,
            top: 5,
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
            bottom: 56,
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
};
export default Happy;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 10,
    left: 20,
  },
  avatar: {
    paddingTop: 10,
    width: 130,
    height: 130,
    marginBottom: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  iconRight: {
    marginTop: 20,
    width: 60,
    height: 60,
    marginBottom: 5,
    marginLeft: 30,
  },
});

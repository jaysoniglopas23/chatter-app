import React from 'react';
import {Image, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';

import Call from './../screen/Call';
import Post from './../screen/Post';
import Search from './../screen/Search';
import Chat from './../screen/Chat';
import Home from '../screen/Home';
import Messages from '../screen/Messages';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const CoinStack = ({navigation}) => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Coin"
//       component={CoinStatus}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="CoinScreen"
//       component={CoinScreen}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
// );

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Messages"
      component={Messages}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

// const Pages = ({navigation}) => (
//   <Stack.Navigator>
//     {/* <Stack.Screen
//         name="Search"
//         component={App}
//         options={{headerShown: false}}
//       /> */}
//     <Stack.Screen name="Rock" component={Rock} options={{headerShown: false}} />
//     <Stack.Screen
//       name="Paper"
//       component={Paper}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
// );

const Tabs = () => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator tabBarOptions={{showLabel: false}}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Dashboard.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3EEE91' : '#000000',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Call"
        component={Call}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Calls.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3EEE91' : '#000000',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={MessageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/icons8-sms-50.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3EEE91' : '#000000',
                }}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Search.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3EEE91' : '#000000',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Post.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3EEE91' : '#000000',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

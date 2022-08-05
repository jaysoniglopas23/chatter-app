import React from 'react';
import {Image, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';

import Call from './../screen/Call';
import Post from './../screen/Post';
import Search from './../screen/Search';
import Chat from '../homes/Chat';
import Home from '../screen/Home';
import Messages from '../screen/Messages';
import PhotoLibrary from '../screen/Photolibrary';
import User from '../homes/User';
import Settings from '../homes/Settings';
import Posttoboard from '../screen/Posttoboard';
import CoinScreen from '../homes/CoinScreen';
import Launcher from '../screen/launcher';
import Dashboard from '../screen/Dashboard';
import UserCanSearch from '../homes/UserCanSearch';
import Heart from '../homes/Heart';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="User"
      component={User}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

const PostStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Post"
      component={Post}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="User"
      component={User}
      options={({route}) => ({
        // title: route.params.userName,
        // headerShown: false,
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name="Posttoboard"
      component={Posttoboard}
      options={({route}) => ({
        // title: route.params.userName,
        headerShown: false,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const CallStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Call"
      component={Call}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="User"
      component={User}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

const SeachStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="UserCanSearch"
      component={UserCanSearch}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="Call"
      component={Call}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const Homestack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="home"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="photoLibrary"
      component={PhotoLibrary}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Coin"
      component={CoinScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Heart"
      component={Heart}
      options={{
        headerShown: false,
      }}
    />
        <Stack.Screen
      name="User"
      component={User}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

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
    <Tab.Navigator tabBarOptions={{showLabel: false}} screenOptions={{}}>
      <Tab.Screen
        name="home"
        component={Homestack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Asset3.png')}
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
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Asset4.png')}
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
        component={CallStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Asset5.png')}
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
        component={SeachStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Asset6.png')}
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
        component={PostStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Asset7.png')}
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

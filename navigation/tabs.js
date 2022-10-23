import React, {useState, useEffect} from 'react';
import {Image, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
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
import Login from '../screen/Login';
import SearchGrid from '../homes/SearchGrid';
<<<<<<< HEAD
import caller from './../homes/caller';
=======
import Comment from '../homes/comment';
>>>>>>> 67a4140 (Logout and Coinscreen)

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
      name="Posttoboard"
      component={Posttoboard}
      options={({route}) => ({
        // title: route.params.userName,
        headerShown: false,
        headerBackTitleVisible: false,
      })}
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
      name="Comment"
      component={Comment}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

// const getTabBarStyle = (route) => {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Call';
//   let display = (routeName === 'User') ? 'none':'flex';
//   return {display}
// }

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
        // title: route.name.User,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
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
      name="UserCanSearch"
      component={UserCanSearch}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="caller"
      component={caller}
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
      options={({route}) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="SearchGrid"
      component={SearchGrid}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarStyle: {display: 'none'},
        // title: route.params.userName,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Messages"
      component={Messages}
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

const Tabs = ({navigation}) => {
  // const goTabBarVisibility = () => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   if (routeName === 'User') {
  //     navigation.setOptions({tabBarVisible: false});
  //   } else {
  //     navigation.setOptions({tabBarVisible: true});
  //   }
  // };

  const getTabBarVisibility = () => {
    if (global.age_verified == 0) {
      return true;
    } else if (global.age_verified == 2) {
      return true;
    } else if (global.age_verified == 1) {
      return false;
    }
  };

  // const goTabBarVisibility = route => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : '';

  //   if (routeName === 'User') {
  //     return 'none';
  //   }
  //   return 'flex';
  // };

  const getTabBarCall = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Call';
    let display = routeName;
    if ((display = routeName === 'Chat')) {
      return {display: 'none'};
    } else if ((display = routeName === 'UserCanSearch')) {
      return {display: 'none'};
    } else {
      display = routeName === 'Call';
      return {display: 'flex'};
    }
  };

  const goTabBarSearch = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Search';
    let display = routeName;
    if ((display = routeName === 'Chat')) {
      return {display: 'none'};
    } else if ((display = routeName === 'UserCanSearch')) {
      return {display: 'none'};
    } else {
      display = routeName === 'Search';
      return {display: 'flex'};
    }
  };

  const goTabBarPost = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Post';
    let display = routeName;
    if ((display = routeName === 'Posttoboard')) {
      return {display: 'none'};
    } else if ((display = routeName === 'UserCanSearch')) {
      return {display: 'none'};
    }
  };

  const goTabBarChat = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Messages';
    let display = routeName;
    if ((display = routeName === 'Chat')) {
      return {display: 'none'};
    } else if ((display = routeName === 'UserCanSearch')) {
      return {display: 'none'};
    } else {
      display = routeName === 'Messages';
      return {display: 'flex'};
    }
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        // tabBarVisible: global.age_verified == 0 ? true : false,
        tabBarVisible: getTabBarVisibility(),
      }}
      screenOptions={{}}>
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
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: goTabBarChat(route),
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
        })}
      />
      <Tab.Screen
        name="Call"
        component={CallStack}
        options={({route}) => ({
          tabBarStyle: getTabBarCall(route),
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
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: goTabBarSearch(route),
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
        })}
      />
      <Tab.Screen
        name="Post"
        component={PostStack}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: goTabBarPost(route),
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
        })}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

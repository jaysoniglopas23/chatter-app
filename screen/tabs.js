import React, {useState, useEffect, Component} from 'react';
import {Image, View, Text, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
<<<<<<< Updated upstream
=======
import Svg, {
  G,
  Path,
  Stop,
  Defs,
  LinearGradient,
  Circle,
  ClipPath,
  Rect,
} from 'react-native-svg';
>>>>>>> Stashed changes

import Call from './Call';
import Post from './Post';
import Search from './Search';
import Chat from './Chat';
import Home from './Home';
import Messages from './Messages';
import PhotoLibrary from './Photolibrary';
import User from './User';
import Settings from './Settings';
import Posttoboard from './Posttoboard';
import CoinScreen from './CoinScreen';
import Launcher from './launcher';
import Dashboard from './Dashboard';
import UserCanSearch from './UserCanSearch';
import Heart from './Heart';
import Login from './Login';
import SearchGrid from './SearchGrid';

import Caller from './caller';
<<<<<<< Updated upstream

import Comment from './comment';
=======
import Callee from './callee';
import Comment from './comment';
import Happy from './Happy';
import Star from './Star';
import Pacman from './Pacman';
import Card from './Card';
import News from './News';
import Policy from './Terms';
import Privacy from './Privacy';
import SpecialCC from './SpecialCC';
import Picture from './Picture';
import Calls from './Calls';
import Register from './Register';
import Addmessages from './UnReadmessages';
import MessagesScrean from './MessageAll';
// import { Component } from 'react';
>>>>>>> Stashed changes

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
    <Stack.Screen
<<<<<<< Updated upstream
      name="caller"
=======
      name="Caller"
>>>>>>> Stashed changes
      component={Caller}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="Callee"
      component={Callee}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="unReadMessage"
      component={Addmessages}
      options={{
        tabBarStyle: {display: 'none'},
        // title: route.params.userName,
        headerShown: false,
      }}
    />
     <Stack.Screen
      name="MessagesScrean"
      component={Messages}
      options={{
        tabBarStyle: {display: 'none'},
        // title: route.params.userName,
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
    <Stack.Screen
      name="Caller"
      component={Caller}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Callee"
      component={Callee}
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
<<<<<<< Updated upstream
      name="caller"
=======
      name="Caller"
>>>>>>> Stashed changes
      component={Caller}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="Callee"
      component={Callee}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
      <Stack.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: false,
      }}
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
    <Stack.Screen
      name="Caller"
      component={Caller}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Callee"
      component={Callee}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const Homestack = ({navigation}) => (
  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      // Alert.alert('Refreshed');
      //  const Tabs();
    });
    return focusHandler;
  }, [navigation]),
  (
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
<<<<<<< Updated upstream
=======
      <Stack.Screen
        name="Happy"
        component={Happy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Star"
        component={Star}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Pacman"
        component={Pacman}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Card"
        component={Card}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Policy"
        component={Policy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpecialCC"
        component={SpecialCC}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Picture"
        component={Picture}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Calls"
        component={Calls}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
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
      name="Caller"
      component={Caller}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="Callee"
      component={Callee}
      options={({route}) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
      <Stack.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: false,
      }}
    />
>>>>>>> Stashed changes
    </Stack.Navigator>
  )
);

const Tabs = ({navigation}) => {
  const isFocused = useIsFocused();

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('didFocus', () => {
  //     // The screen is focused
  //     console.log('focused')
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe.remove();
  // }, [navigation]);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  // const goTabBarVisibility = () => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   if (routeName === 'User') {
  //     navigation.setOptions({tabBarVisible: false});
  //   } else {
  //     navigation.setOptions({tabBarVisible: true});
  //   }
  // };

<<<<<<< Updated upstream
  const getTabBarVisibility = () => {
=======
  const getTabBarVisibility = route => {

>>>>>>> Stashed changes
    if (global.age_verified == 0) {
      return true;
    } else if (global.age_verified == 2) {
      return true;
    } else if (global.age_verified == 1) {
<<<<<<< Updated upstream
      return false;
    }
  };

=======
      return {display: 'flex'};
    } 
  };


  const goTabBarHome = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'home';
    let display = routeName;
    if ((display = routeName === 'Chat')) {
      return {display: 'none'};
    } else if ((display = routeName === 'UserCanSearch')) {
      return {display: 'none'};
    } else if ((display = routeName === 'Caller')) {
      return {display: 'none'};
    } else if ((display = routeName === 'Callee')) {
      return {display: 'none'};
    } 
  };

>>>>>>> Stashed changes
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
      } else if ((display = routeName === 'Caller')) {
        return {display: 'none'};
      } else if ((display = routeName === 'Callee')) {
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
    } else if ((display = routeName === 'Caller')) {
      return {display: 'none'};
    } else if ((display = routeName === 'Callee')) {
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
    } else if ((display = routeName === 'Comment')) {
      return {display: 'none'};
    } else if ((display = routeName === 'Chat')) {
      return {display: 'none'};
    } else if ((display = routeName === 'Callee')) {
      return {display: 'none'};
    } else {
      display = routeName === 'Post';
      return {display: 'flex'};
    }
  };

  const goTabBarChat = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Messages';
    let display = routeName;
    if ((display = routeName === 'Chat')) {
      return {display: 'none'};
    } else if ((display = routeName === 'UserCanSearch')) {
      return {display: 'none'};
<<<<<<< Updated upstream
    } else if (( display = routeName === 'Messages')) {
=======
    } else if ((display = routeName === 'Caller')) {
      return {display: 'none'};
    } else if ((display = routeName === 'Callee')) {
      return {display: 'none'};
    } else {
      display = routeName === 'Messages';
>>>>>>> Stashed changes
      return {display: 'flex'};
    }  else {
      display = routeName === 'caller';
      return {display: 'none'};
    }
  };

  return (
    <Tab.Navigator
<<<<<<< Updated upstream
      tabBarOptions={{
        showLabel: false,
        // tabBarVisible: global.age_verified == 0 ? true : false,
        tabBarVisible: getTabBarVisibility(),
      }}
      screenOptions={{}}>
=======
      // tabBarOptions={{
      //   showLabel: false,
      //   tabBarVisible: getTabBarVisibility(),
      //   tabStyle: {
      //     backgroundColor: 'red',
      //     // borderRadius: 10,
      //     borderTopLeftRadius: 20,
      //     borderTopRightRadius: 0,
      //   },

      // }}

      screenOptions={{
        tabBarShowLabel: false,
        tabBarVisible: getTabBarVisibility(),
        tabBarStyle: {
          backgroundColor: 'white',
          // borderRadius: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
>>>>>>> Stashed changes
      <Tab.Screen
        name="home"
        component={Homestack}
        options={{
          headerShown: false,
<<<<<<< Updated upstream
=======
          tabBarStyle: goTabBarHome(route),
>>>>>>> Stashed changes
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('../icon/Asset3.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3EEE91' : '#5B5B5B',
                }}
              />
            </View>
          ),
        }}
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
                  tintColor: focused ? '#3EEE91' : '#5B5B5B',
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
                  tintColor: focused ? '#3EEE91' :'#5B5B5B',
                }}
              />
            </View>
          ),
        })}
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
                  tintColor: focused ? '#3EEE91' : '#5B5B5B',
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
                  tintColor: focused ? '#3EEE91' : '#5B5B5B',
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

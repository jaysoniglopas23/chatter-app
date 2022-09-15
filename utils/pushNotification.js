// import messaging, {firebase} from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export async function onDisplayRemoteNotification() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Not Authorization status', authStatus);
//     getFcmToken();
//   }
// }

// const getFcmToken = async () => {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');

//   console.log('old Fcm Token:', fcmToken);
//   if (!fcmToken) {
//     try {
     
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         console.log('new Generated Fcm Token', fcmToken);
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage extends Component {
  static retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@User');

      let jsonValue = value != null ? JSON.parse(value) : null;

      return jsonValue;
    } catch (error) {
      console.log(error);
    }
  };

  static storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => {
          AsyncStorage.setItem('@User', jsonValue);
        });
    } catch (e) {
      console.log(error);
    }
  };
}

export default Storage;

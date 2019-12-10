import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { clear } from 'sisteransi';

export default {
  async setItem(key, value) {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error(`AsyncStorage#setItem error:${error.message}`);
    }
  },
  async getItem(key) {
    return AsyncStorage.getItem(key)
      .then((result) => {
        if (result) {
          //   try {
          //     // eslint-disable-next-line no-param-reassign
          //     result = JSON.parse(result);
          //   } catch (e) {
          //     throw new Error(`AsyncStorage#getItem error deserializing JSON for key: ${key}`, e.message);
          //   }
        }
        return result;
      });
  },
  async removeItem(key) {
    return AsyncStorage.removeItem(key);
  },

  async multiGet(keyArray){
    const result = await AsyncStorage.multiGet(keyArray)
    const asyncStorageValues = result.reduce((map, obj) => {
      map[obj[0]] = obj[1]
      return map
    }, {})

    return asyncStorageValues;
  },

  logCurrentStorage() {
      AsyncStorage.getAllKeys().then((keyArray) => {
        AsyncStorage.multiGet(keyArray).then((keyValArray) => {
          let myStorage: any = {};
          for (let keyVal of keyValArray) {
            myStorage[keyVal[0]] = keyVal[1]
          }
          Reactotron.log(myStorage);
        })
      });
  },

  async clear() {
    return await AsyncStorage.clear();
  }

};

import AsyncStorage from '@react-native-community/async-storage';

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
};

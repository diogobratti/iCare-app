// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron, { trackGlobalErrors, asyncStorage } from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage
  .configure() // controls connection & communication settings
  // .use(asyncStorage()) // <--- here we go!
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

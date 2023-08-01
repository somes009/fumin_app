import {NativeModules} from 'react-native';
const {TestMoudle} = NativeModules;

export default {
  handleAd(callback) {
    TestMoudle?.fullScreenVideo?.(callback);
  },
};

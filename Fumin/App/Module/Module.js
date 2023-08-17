import {NativeModules} from 'react-native';
const {TestMoudle} = NativeModules;

export default {
  handleAd(type, sn) {
    TestMoudle?.fullScreenVideo?.(type, sn);
  },
  destoryVideo() {
    TestMoudle?.destoryVideo?.();
  },
};

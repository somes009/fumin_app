import {NativeModules, Image} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';
const {fullScreenVideo} = NativeModules;
import Images from '../Images';
import Utils from '../Utils';
import * as WeChat from 'react-native-wechat-lib';

export default {
  handleAd(callback) {
    fullScreenVideo?.(callback);
  },
};

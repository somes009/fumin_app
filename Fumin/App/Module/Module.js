import {NativeModules, Image} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';
const {fullScreenVideo} = NativeModules;
import * as QQAPI from 'react-native-qq-lib';
import Images from '../Images';
import Utils from '../Utils';
import * as WeChat from 'react-native-wechat-lib';

export default {
  handleAd() {
    fullScreenVideo?.();
  },
};

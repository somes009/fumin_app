import {Platform, Dimensions} from 'react-native';
import Toast from 'react-native-root-toast';
import CacheStore from '../Common/CacheStore';
import EventBus, {EventBusName} from '../Api/EventBus';
import {ApiPostJson} from '../Api/RequestTool';
import _ from 'lodash';
import Clipboard from '@react-native-community/clipboard';

let Utils = {};

//判断是否安卓
Utils.isAndroid = Platform.OS === 'android';

//检查手机号格式
Utils.checkPhone = (phone) => {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return false;
  }
  return true;
};

//获取手机屏幕尺寸
Utils.getScreenSize = () => {
  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  if (width > height) {
    let num = height;
    height = width;
    width = num;
  }
  return {
    width,
    height,
    scale: Dimensions.get('window').scale,
  };
};

//尺寸换算
Utils.properWidth = (width) => {
  return width * (Utils.getScreenSize().width / 375);
};
//弹窗
Utils.Toast = ({
  text,
  duration,
  position,
  hideOnPress,
  containerStyle,
  onShow,
  onShown,
  onHide,
  onHidden,
  delay,
}) => {
  console.log(text);
  Toast.show(text, {
    duration: duration || Toast.durations.SHORT,
    position: position || Toast.positions.CENTER,
    shadow: false,
    animation: true,
    hideOnPress: hideOnPress || true,
    delay: delay || 0,
    containerStyle: containerStyle || {
      borderRadius: 30,
      paddingVertical: 9,
      paddingHorizontal: 16,
    },
    textStyle: {
      fontSize: 15,
      color: '#fff',
      lineHeight: 21,
    },
    onShow: onShow || (() => {}),
    onShown: onShown || (() => {}),
    onHide: onHide || (() => {}),
    onHidden: onHidden || (() => {}),
  });
};

Utils.getLocalImagePathAndroid = (item) => {
  if (Utils.isAndroid) {
    if (item?.indexOf('content://') !== -1) {
      return item;
    } else {
      return 'file://' + item;
    }
  }
  return item;
};

//退出登录
Utils.outLogin = (navigation) => {
  const path = '/app-api/member/auth/logout';
  const params = {};
  const onSuccess = () => {
    CacheStore.remove('INFO');
    CacheStore.remove('USERINFO');
    global.token = undefined;
    global.userInfo = undefined;
    global.userId = undefined;
    Utils.Toast({
      text: '退出账号成功',
    });
    EventBus.post(EventBusName.OUT_LOGIN);
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginNav'}],
    });
  };
  const onFailure = () => {};
  ApiPostJson({
    path,
    params,
    onSuccess,
    onFailure,
    needShowMsg: true,
  });
};

//接口请求拼接数组
Utils.getPageData = (originalArray, responseArray, isRefresh) => {
  let arrayTemp = _.cloneDeep(originalArray);
  if (isRefresh) {
    arrayTemp = responseArray || [];
  } else {
    arrayTemp = arrayTemp.concat(responseArray || []);
  }
  return arrayTemp;
};

Utils.copyText = (text) => {
  Clipboard.setString(text);
  Utils.Toast({
    text: '已复制到剪贴板',
  });
}

export default Utils;

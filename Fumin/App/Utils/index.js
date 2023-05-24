import {Platform, Dimensions} from 'react-native';
import Toast from 'react-native-root-toast';
import CacheStore from '../Common/CacheStore';
import EventBus, {EventBusName} from '../Api/EventBus';
import { ApiPostJson } from '../Api/RequestTool';
let U = {};

//判断是否安卓
U.isAndroid = Platform.OS === 'android';

//检查手机号格式
U.checkPhone = (phone) => {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return false;
  }
  return true;
};

//获取手机屏幕尺寸
U.getScreenSize = () => {
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
U.properWidth = (width) => {
  return width * (U.getScreenSize().width / 375);
};
//弹窗
U.Toast = ({
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

U.getLocalImagePathAndroid = (item) => {
  if (U.isAndroid) {
    if (item?.indexOf('content://') !== -1) {
      return item;
    } else {
      return 'file://' + item;
    }
  }
  return item;
};

//退出登录
U.outLogin = (navigation) => {
  CacheStore.remove('INFO');
  CacheStore.remove('USERINFO');
  global.token = undefined;
  global.userInfo = undefined;
  global.userId = undefined;
  U.Toast({
    text: '退出账号成功',
  });
  EventBus.post(EventBusName.OUT_LOGIN);
  const path = '/app-api/member/auth/logout';
  const params = {};
  const onSuccess = () => {};
  const onFailure = () => {};
  ApiPostJson({
    path,
    params,
    onSuccess,
    onFailure,
    needShowMsg: true,
  });
  navigation.reset({
    index: 0,
    routes: [{name: 'LoginNav'}],
  });
};

export default U;

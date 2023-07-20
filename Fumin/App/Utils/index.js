import {Platform, Dimensions} from 'react-native';
import Toast from 'react-native-root-toast';
import CacheStore from '../Common/CacheStore';
import EventBus, {EventBusName} from '../Api/EventBus';
import {ApiPostJson} from '../Api/RequestTool';
import _ from 'lodash';
import Clipboard from '@react-native-community/clipboard';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImg} from './AliyunTools';

let Utils = {};

Utils.requestPay = (params, callback) => {
  const path = '/app-api/pay/order/submitPayOrderApp';
  // const params = {
  //   spuId: id,
  //   count: buyCount,
  //   fromCart: false,
  // };
  const onSuccess = (res) => {
    callback(res);
  };

  ApiPostJson({path, params, onSuccess});
};

Utils.getImageOssProcess = ({imageUrl, fill, h, w}) => {
  if (!imageUrl) {
    return '';
  }
  if (imageUrl.indexOf('fumin') === -1) {
    return imageUrl;
  }
  const fillNew = !fill ? '' : `,m_${fill}`;
  let height = '';
  let width = '';
  if (!h && !w) {
    height = `,h_${375}`;
    width = `,w_${375}`;
  } else {
    height = !h ? '' : `,h_${h}`;
    width = !w ? '' : `,w_${w}`;
  }
  return `${imageUrl}?x-oss-process=image/resize${fillNew}${height}${width}`;
};

//获取本地缓存
Utils.getCacheStore = ({storeName}) => {
  return CacheStore.get(storeName);
};
//创建/更新本地缓存
Utils.setCacheStore = ({storeName, data}) => {
  CacheStore.set(storeName, data);
};
//删除本地缓存
Utils.delCacheStore = ({storeName}) => {
  CacheStore.remove(storeName);
};
//判断是否安卓
Utils.isAndroid = Platform.OS === 'android';

//检查手机号格式
Utils.checkPhone = (phone) => {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return false;
  }
  return true;
};

//上传图片
Utils.upLoadImg = (success, fail) => {
  const option = {
    mediaType: 'photo',
  };
  const callback = ({assets: [{uri}]}) => {
    if (uri) {
      uploadImg(uri, (uri) => {
        success?.(uri);
      });
    } else {
      fail?.();
      Utils.Toast({text: '获取图片失败'});
    }
  };
  launchImageLibrary(option, callback);
};

Utils.formatNumberToBai = (num) => {
  if (num > 100) {
    let hundreds = Math.floor(num / 100) * 100;
    return hundreds.toString() + '+';
  } else {
    return num.toString();
  }
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
};

export default Utils;

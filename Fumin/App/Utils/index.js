import {Platform, Dimensions} from 'react-native';
import Toast from 'react-native-root-toast';
import CacheStore from '../Common/CacheStore';
import EventBus, {EventBusName} from '../Api/EventBus';
import {ApiPostJson} from '../Api/RequestTool';
import _ from 'lodash';
import Clipboard from '@react-native-community/clipboard';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImg} from '../Common/AliyunTools';

let Utils = {};

Utils.isValidIdNumber = (idNumber) => {
  // 验证身份证格式，18位数字或17位数字加一位字母X
  const pattern = /^(\d{17}|\d{18}|(\d{17}|\d{18})[xX])$/;
  if (!pattern.test(idNumber)) {
    return false;
  }

  // 验证身份证校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idNumber.charAt(i)) * weights[i];
  }
  const checkCode = checkCodes[sum % 11];
  if (checkCode !== idNumber.charAt(17).toUpperCase()) {
    return false;
  }

  return true;
};

Utils.isValidUrl = (url) => {
  // 使用正则表达式检查链接格式是否正确
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // 协议
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // 域名
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // IP
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // 端口和路径
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // 查询字符串
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // 锚点
  if (url?.indexOf?.('http') !== -1 && !!url) {
    return url;
  }
  return 'https://gats-test.oss-cn-beijing.aliyuncs.com/acd4dcf52725a05ae6d8c2a3c3d59a2c1d9a5c356ff3b2792387b96172baa2f5.png';
};

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
Utils.upLoadImg = (successCallback, fail) => {
  const option = {
    mediaType: 'photo',
    quality: 0.3,
  };
  const callback = ({assets: [{uri}]}) => {
  // const callback = (res) => {
    // console.log(res);
    if (uri) {
      uploadImg(uri, (url) => {
        successCallback(url);
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
  // if (Utils.isAndroid) {
  //   if (item?.indexOf('content://') !== -1) {
  //     return item;
  //   } else {
  //     return 'file:///' + item;
  //   }
  // }
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

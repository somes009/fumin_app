import {BASE_URL, APP_VERSION} from '../Common/Contant';
import {Platform} from 'react-native';
import CacheStore from '../Common/CacheStore';
import {create} from 'apisauce';
import JSONBigInt from 'json-bigint';
import Utils from '../Utils';
import moment from 'moment';
// import Storage from '../Storage/Storage';
const isAndroid = Platform.OS === 'android';
// Storage.load({
//   key: 'token',
// }).then((res) => {
//   global.token = res.token;
// });
// Storage.load({
//   key: 'userId',
// }).then((res) => {
//   global.userId = res.userId;
// });
const U = {};

export const ApiGet = ({
  path,
  params,
  onSuccess,
  onFailure,
  callback,
  needShowMsg,
  unLog,
}) => {
  return CacheStore.get('INFO').then((info) => {
    if (!global.token || !global.userId) {
      if (!info) {
        global.token = undefined;
        global.userId = undefined;
      } else {
        global.token = info.token;
        global.userId = info.userId;
      }
    }
    return ApiGetInner(
      path,
      params,
      onSuccess,
      onFailure,
      callback,
      needShowMsg,
      unLog,
    );
  });
  // return Module.getInfo().then((info) => {
  //   // global.token = info.token;
  //   // global.userId = info.userId;
  //   return ApiGetInner(path, params, onSuccess, onFailure, callback);
  // });
};

export const ApiGetInner = (
  path,
  params,
  onSuccess,
  onFailure,
  callback,
  needShowMsg,
  unLog,
) => {
  const paramWithToken = {
    token: global.token,
    ...params,
  };
  var fetchOptions = {
    method: 'Get',
    headers: {
      Accept: 'application/json',
      //表单
      'Content-Type': 'application/x-www-form-pathencoded',
      'User-Agent': !isAndroid ? 'MindTripiOS' : 'MindTripAndroid',
      version: APP_VERSION,
    },
  };
  if (__DEV__ && !unLog) {
    console.log('我是接口地址', BASE_URL + path);
    console.log('我是接口传参', paramWithToken);
  }
  fetch(BASE_URL + path + '?' + strDicToString(paramWithToken), fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      callback?.(JSONBigInt.parse(responseText));
      checkResponse(
        JSONBigInt.parse(responseText),
        onSuccess,
        onFailure,
        callback,
        path,
        needShowMsg,
        unLog,
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const ApiPost = (
  path,
  params,
  onSuccess,
  onFailure,
  callback,
  needShowMsg,
  unLog,
) => {
  return CacheStore.get('INFO').then((info) => {
    if (!global.token || !global.userId) {
      if (!info) {
        global.token = undefined;
        global.userId = undefined;
      } else {
        global.token = info.token;
        global.userId = info.userId;
      }
    }
    return ApiPostInner(
      path,
      params,
      onSuccess,
      onFailure,
      callback,
      needShowMsg,
      unLog,
    );
  });
};

export const ApiPostInner = (
  path,
  params,
  onSuccess,
  onFailure,
  callback,
  needShowMsg,
  unLog,
) => {
  const paramWithToken = {
    token: global.token,
    ...params,
  };
  var fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //表单
      'Content-Type': 'application/x-www-form-pathencoded',
      'User-Agent': !isAndroid ? 'MindTripiOS' : 'MindTripAndroid',
      version: APP_VERSION,
    },
    body: paramWithToken,
  };
  if (__DEV__ && !unLog) {
    console.log('我是接口地址', BASE_URL + path);
    console.log('我是接口传参', paramWithToken);
  }
  fetch(BASE_URL + path + '?' + strDicToString(paramWithToken), fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      callback?.(JSONBigInt.parse(responseText));
      checkResponse(
        JSONBigInt.parse(responseText),
        onSuccess,
        onFailure,
        needShowMsg,
        unLog,
        path,
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const ApiPostJson = ({
  path: path,
  params,
  onSuccess,
  onFailure,
  callback,
  needShowMsg = true,
  unLog,
}) => {
  return CacheStore.get('INFO').then((info) => {
    if (!global.token || !global.userId) {
      if (!info) {
        global.token = undefined;
        global.userId = undefined;
      } else {
        global.token = info.token;
        global.userId = info.userId;
      }
    }
    return ApiPostJsonInner(
      path,
      params,
      onSuccess,
      onFailure,
      callback,
      needShowMsg,
      unLog,
    );
  });
};

export const ApiPostJsonInner = (
  path,
  params,
  onSuccess,
  onFailure,
  callback,
  needShowMsg,
  unLog,
) => {
  const paramWithToken = {
    token: global.token,
    ...params,
  };
  const onlyToken = {
    token: global.token,
  };
  var fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //json形式
      'Content-Type': 'application/json',
      'tenant-id': 1,
      Authorization: global.token,
    },
    body: JSON.stringify(paramWithToken),
  };
  if (__DEV__ && !unLog) {
    console.log('我是接口地址', BASE_URL + path);
    console.log('我是接口传参', paramWithToken);
  }
  fetch(BASE_URL + path + '?' + strDicToString(onlyToken), fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
      callback?.(JSONBigInt.parse(responseText));
      checkResponse(
        JSONBigInt.parse(responseText),
        onSuccess,
        onFailure,
        needShowMsg,
        unLog,
        path,
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const ApipostForm = (path, params, onSuccess, onFailure, callback) => {
  const paramWithToken = {
    token: global.token,
    ...params,
  };
  var fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //表单
      'Content-Type': 'application/x-www-form-pathencoded',
      'User-Agent': !isAndroid ? 'MindTripiOS' : 'MindTripAndroid',
      version: APP_VERSION,
    },
    body: 'data=' + paramWithToken + '',
  };

  fetch(BASE_URL + path, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      if (callback) {
        callback(JSONBigInt.parse(responseText));
      }
      checkResponse(JSONBigInt.parse(responseText), onSuccess, onFailure, path);
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkResponse = (
  response,
  onSuccess,
  onFailure,
  needShowMsg,
  unLog,
  path,
) => {
  if (isJsonString(response) && response?.code === 0) {
    onSuccess?.(response?.data);
  } else if (response?.status === 101) {
    // 未绑定手机号
  } else if (response?.status === 403) {
    // Token无效!
  } else if (response?.status === 102) {
    // 需要强制更新
    onFailure?.(response);
    needShowMsg && Utils.Toast({text: response?.msg || '系统繁忙，请稍后再试'});
  } else {
    onFailure?.(response);
    needShowMsg && Utils.Toast({text: response?.msg || '系统繁忙，请稍后再试'});
  }
  if (__DEV__ && !unLog) {
    console.log('我是接口response path=', path, JSON.stringify(response));
  }
};

const strDicToString = (data) => {
  let result = '';
  let arr = [];
  for (let [k, v] of Object.entries(data)) {
    let str = k + '=' + v;
    arr.push(str);
  }
  for (var i = 0; i < arr.length; i++) {
    if (i === arr.length - 1) {
      result += arr[i];
    } else {
      result += arr[i] + '&';
    }
  }
  return result;
};

const isJsonString = (str) => {
  try {
    if (typeof JSONBigInt.parse(str) === 'object') {
      return true;
    }
  } catch (e) {
    return true;
  }
};
//据时间多少天
export function getDistanceSpecifiedTime(dateTime) {
  // 指定日期和时间
  var EndTime = new Date(dateTime);
  // 当前系统时间
  var NowTime = new Date(
    Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime()),
  );
  var t = EndTime.getTime() - NowTime.getTime();
  var d = Math.floor(t / 1000 / 60 / 60 / 24);
  // var h = Math.floor((t / 1000 / 60 / 60) % 24);
  // var m = Math.floor((t / 1000 / 60) % 60);
  // var s = Math.floor((t / 1000) % 60);
  return -d;
}

export function ApiBuryingPoint(params) {
  const paramWithToken = {
    token: global.token,
    ...params,
  };
  const api = create({
    basepath: BASE_URL,
    headers: {
      Accept: 'application/json',
      //表单
      'Content-Type': 'application/json',
      'User-Agent': !isAndroid ? 'MindTripiOS' : 'MindTripAndroid',
      version: APP_VERSION,
    },
    timeout: 30000,
  }); // 30 seconds

  const path = '/sys/appburyingpoint/auth/addLog';
  // console.log('我是接口地址', BASE_URL + path);
  // console.log('我是接口传参', paramWithToken);

  api
    .post(
      BASE_URL + path + '?' + strDicToString(paramWithToken),
      paramWithToken,
    )
    .then((response) => response)
    .then((res) => {
      // console.log('Bury Point -----> ', res);
    });
}

export function ApiBuryingPointMindTrip(params) {
  const paramWithToken = {
    token: global.token,
    ...params,
  };
  const api = create({
    basepath: BASE_URL,
    headers: {
      Accept: 'application/json',
      //表单
      'Content-Type': 'application/json',
      'User-Agent': !isAndroid ? 'MindTripiOS' : 'MindTripAndroid',
      version: APP_VERSION,
    },
    timeout: 30000,
  }); // 30 seconds

  const path = '/sys/appmaidianlog/auth/insertMaiDianLog/';
  console.log('我是接口地址', BASE_URL + path);
  console.log('我是接口传参', paramWithToken);

  api
    .post(
      BASE_URL + path + '?' + strDicToString({token: global.token}),
      paramWithToken,
    )
    .then((response) => response)
    .then((res) => {
      console.log('MindTrip Bury Point -----> ', res);
    });
}

export function ApiHelperState(params) {
  const paramWithToken = {
    token: global.token,
    ...params,
  };
  const api = create({
    basepath: BASE_URL,
    headers: {
      Accept: 'application/json',
      //表单
      'Content-Type': 'application/json',
      'User-Agent': !isAndroid ? 'MindTripiOS' : 'MindTripAndroid',
      version: APP_VERSION,
    },
    timeout: 30000,
  }); // 30 seconds

  const path = '/v1/user/detail/auth/checkUserOtoOnlion';
  console.log('我是接口地址', BASE_URL + path);
  console.log('我是接口传参', paramWithToken);

  api
    .get(path + '?' + strDicToString(paramWithToken), paramWithToken)
    .then((response) => response)
    .then((res) => console.log('Helper State -----> ', res));
}
export function ApiAddChatList(params) {
  const paramWithToken = {
    token: global.token,
    ...params,
  };
  const api = create({
    basepath: BASE_URL,
    headers: {
      Accept: 'application/json',
      //表单
      'Content-Type': 'application/json',
      'User-Agent': !isAndroid ? 'MindTripiOS' : 'MindTripAndroid',
      version: APP_VERSION,
    },
    timeout: 30000,
  }); // 30 seconds

  const path = '/user/chatrecord/auth/insertForApp';
  console.log('我是接口地址', BASE_URL + path);
  console.log('我是接口传参', paramWithToken);

  api
    .post(path + '?' + strDicToString(paramWithToken), paramWithToken)
    .then((response) => response)
    .then((res) => console.log('Bury Point -----> ', res));
}

export function ApiErrorPost(params) {
  const appVersion = `应用版本：${Device.getReadableVersion() || ''}`;
  const devicePlatform = `：${Device.getSystemVersion()}`;
  const brand = `：${Device.getBrand()}`;
  const deviceNumber = `：${Device.getModel()}`;
  const buildNumber = `：${Device.getBuildNumber()}`;
  const buildId = `：${Device.getBundleId()}`;
  const SystemName = `：${Device.getSystemName()}`;
  const Version = `：${Device.getVersion()}`;

  // const appVersion = '';
  // const devicePlatform = '';
  // const deviceNumber = '';
  const exceptionDate = `：${moment().format('YYYY-MM-DD HH:mm:ss')}\n`;

  const paramWithType = {
    msgtype: 'markdown',
    markdown: {
      // content: '峰仔又崩了，大壮也裂开了',
      // ...params,
      // version: APP_VERSION,
      content:
        'App崩溃应用版本:<font color="warning">' +
        appVersion +
        '</font>，请相关同事注意。\n>JS API版本：<font color="comment">' +
        APP_VERSION +
        '</font>\n>message：<font color="comment">' +
        params?.name +
        '</font>\n>message：<font color="comment">' +
        params?.message +
        '</font>\n>用户UserId：<font color="comment">' +
        global.userId +
        '</font>\n>所在Navigator信息：<font color="comment">' +
        global.pageInfo +
        '</font>\n>手机系统<font color="comment">' +
        devicePlatform +
        '</font>\n>手机品牌<font color="comment">' +
        brand +
        '</font>\n>手机型号<font color="comment">' +
        deviceNumber +
        '</font>\n>buildId<font color="comment">' +
        buildId +
        '</font>\n>SystemName<font color="comment">' +
        SystemName +
        '</font>\n>Version<font color="comment">' +
        Version +
        '</font>\n>buildNumber<font color="comment">' +
        buildNumber +
        '</font>\n>崩溃时间<font color="comment">' +
        exceptionDate +
        '</font>\n>备注:<font color="comment">谁的bug赶紧主动买水</font>',
    },
  };
  const api = create({
    basepath: 'https://qyapi.weixin.qq.com/',
    headers: {
      Accept: 'application/json',
      //表单
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  }); // 30 seconds

  const path = '/cgi-bin/webhook/send';
  console.log('我是接口传参', paramWithType);
  api
    .post(
      // path + '?' + 'key=ee1f028f-b909-4f70-8f69-18ee86885cc7',
      'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=ee1f028f-b909-4f70-8f69-18ee86885cc7',
      paramWithType,
    )
    .then((response) => response)
    .then((res) => console.log('Error Log -----> ', res));
}

U.ApiGet = ApiGet;
U.ApipostForm = ApipostForm;
U.ApiPostJson = ApiPostJson;
U.ApiBuryingPoint = ApiBuryingPoint;
U.ApiHelperState = ApiHelperState;
U.ApiErrorPost = ApiErrorPost;

export default U;

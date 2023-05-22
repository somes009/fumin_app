// var React = require('react-native');
import {observable, action, autorun} from 'mobx';
import Resolution from '../Common/Resolution';

export const AppStore = observable({
  /* 一些观察的状态 */
  androidScreenHeight: 0,
  iosScreenHeight: Resolution?.get?.().height,
  isTabFocused: false, // tab是否focus
  shouldAMMapShort: false, // AMMap ICon 变小
  needOrientation: false, // 是否需要转屏幕
  fromHuanxinInfo: {},
  toHuanxinInfo: {},
  currentUser: {},
  currentHelpHallTiezi: {},
  isDarkMode: false,
  RealmDBS: {},
  msgData: {},
  needSecureCode: true,
  isHarmonyOs: false,
});

// setInterval(
//   action(function tick() {
//     SingleManager.testName = SingleManager.testName + 1;
//   }),
//   1000,
// );

autorun(function () {
  console.log('autoRun AMShowStore', AppStore.androidScreenHeight);
});

export const setTabFocused = action((data) => {
  AppStore.isTabFocused = data;
});

export const setAndroidScreenHeight = action((data) => {
  AppStore.androidScreenHeight = data;
});

export const setIsDarkMode = action((data) => {
  AppStore.isDarkMode = data;
});

// class SingleManager {
//   // @observable data = {};
//   data = observable({});
//   // @observable values = {
//   //   data: {},
//   //   progress: 0,
//   //   tabHeight: 0,
//   //   paused: false,
//   //   nowTime: 0,
//   //   isShow: 0,
//   // };

//   // @action getData(参数) {
//   //   console.log(参数);
//   // }
//   setData = action((data) => {
//     this.data = data;
//   });
// }

export default AppStore;

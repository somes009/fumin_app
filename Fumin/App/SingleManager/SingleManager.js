// var React = require('react-native');
import {observable, action, autorun} from 'mobx';
export const SingleManager = observable({
  /* 一些观察的状态 */
  data: {},
  progress: 0,
  tabHeight: 0,
  paused: false,
  nowTime: 0,
  isShow: 0,
  testMsg: 'hello',
  currentTime: 0,
  uri: '',
  height: 0,
  move: 0,
  screenHeight: 666,
  magicPic: '',
  dshAudioDate: {},
  dshCurrentTime: 0,
  dshPaused: true,
  // testName: 0,
});

export const setCurrentTime = action((currentTime) => {
  SingleManager.currentTime = currentTime;
});

autorun(function () {
  console.log('autoRun SingleManager', SingleManager.data);
});

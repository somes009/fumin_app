import {observable} from 'mobx';
export const SingleManager = observable({
  /* 一些观察的状态 */
  data: {},
  progress: 0,
  tabHeight: null,
  paused: false,
  nowTime: 0,
  isShow: 0,
});

import {DeviceEventEmitter} from 'react-native';

/**
 * 通知事件[名称]统一配置
 * (⚠️需要添加注释说明)
 */
export const EventBusName = {
  ON_LOGIN: 'on_login',
  CHANGE_USER_TYPE: 'change_user_type',
};
export default class EventBus {
  /**
   * 绑定
   * @param {*} eventName 事件名称
   * @param {*} callback 接收事件后的处理回调
   * @memberof EventEmit
   */
  static bind(eventName, callback) {
    return DeviceEventEmitter.addListener(eventName, callback);
  }

  /**
   * 解绑
   * @param {*} eventObj 事件对象
   * @memberof EventEmit
   */
  static unBind(eventObj) {
    eventObj && eventObj.remove();
  }

  /**
   * 绑定
   * @param {*} eventName 事件名称
   * @param {*} callback 接收事件后的处理回调
   * @memberof EventEmit
   */
  static bindList(eventNames, callback) {
    return eventNames?.map((eventName) =>
      DeviceEventEmitter.addListener(eventName, callback),
    );
  }

  /**
   * 解绑
   * @param {*} eventObj 事件对象
   * @memberof EventEmit
   */
  static unBindList(eventObjs) {
    eventObjs?.map((eventObj) => eventObj?.remove());
  }

  /**
   * 发送通知
   * @param {*} eventName
   * @param {*} params
   * @memberof EventBus
   */
  static post(eventName, params) {
    DeviceEventEmitter.emit(eventName, params);
  }
}

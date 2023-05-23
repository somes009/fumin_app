import {NativeModules, Image} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';
const {XXYJRCTManager} = NativeModules;
import * as QQAPI from 'react-native-qq-lib';
import Images from '../Images';
import Utils from '../Utils';
import * as WeChat from 'react-native-wechat-lib';

export default {
  clearAppBadge() {
    if (!Utils.isAndroid) {
      XXYJRCTManager?.clearAppBadge?.();
    }
  },
  CalmDismiss(isDismiss) {
    XXYJRCTManager?.CalmDismiss?.(isDismiss);
  },
  InitAppAndroid() {
    if (Utils.isAndroid) {
      XXYJRCTManager?.InitAppAndroid?.();
    }
  },
  NativeLogout(params) {
    XXYJRCTManager?.NativeLogout?.(params);
  },
  shareToWechat(params) {
    Utils.isAndroid && QQAPI.init();
    if (params.type === '3') {
      QQAPI.shareToQQ({
        type: 'news',
        title: params?.title,
        description: params?.desc,
        webpageUrl: params?.url,
        // imageUrl: Image.resolveAssetSource(Images.shareLogo).uri,
        imageUrl:
          params?.imageUrl ||
          (Utils.isAndroid
            ? 'https://mindtrip.oss-cn-beijing.aliyuncs.com/others/hgc/shareLogo.png'
            : Image.resolveAssetSource(Images.shareLogo).uri),
      });
    } else if (params.type === '4') {
      QQAPI.shareToQzone({
        type: 'news',
        title: params?.title,
        description: params?.desc,
        webpageUrl: params?.url,
        imageUrl:
          params?.imageUrl ||
          (Utils.isAndroid
            ? 'https://mindtrip.oss-cn-beijing.aliyuncs.com/others/hgc/shareLogo.png'
            : Image.resolveAssetSource(Images.shareLogo).uri),
      });
    } else if (params.type === '1') {
      try {
        WeChat.shareWebpage({
          title: params?.title,
          description: params?.desc,
          webpageUrl: params?.url,
          thumbImageUrl:
            params.imageUrl || Image.resolveAssetSource(Images.shareLogo).uri,
          scene: 0,
        });

        // let result = WeChat.shareToSession({
        //   type: 'news',
        //   title: params?.title,
        //   description: params?.desc,
        //   webpageUrl: params?.url,
        //   thumbImage: Image.resolveAssetSource(Images.shareLogo).uri,
        // });
        // console.log('share text message to time line successful:', result);
      } catch (e) {
        if (e instanceof WeChat.WechatError) {
          console.error(e.stack);
        } else {
          throw e;
        }
      }
    } else if (params.type === '2') {
      try {
        WeChat.shareWebpage({
          type: 'news',
          title: params?.title,
          description: params?.desc,
          webpageUrl: params?.url,
          thumbImageUrl:
            params.imageUrl || Image.resolveAssetSource(Images.shareLogo).uri,
          scene: 1,
        });
        // let result = WeChat.shareToTimeline({
        //   type: 'news',
        //   title: params?.title,
        //   description: params?.desc,
        //   webpageUrl: params?.url,
        //   thumbImage: Image.resolveAssetSource(Images.shareLogo).uri,
        // });
        // console.log('share text message to time line successful:', result);
      } catch (e) {
        if (e instanceof WeChat.WechatError) {
          console.error(e.stack);
        } else {
          throw e;
        }
      }
    } else {
      XXYJRCTManager?.NativeShareToWechat?.(params);
    }
  },
  openVC(params) {
    XXYJRCTManager?.openVC?.(params);
  },
  closeVC(params) {
    XXYJRCTManager?.closeVC?.(params);
  },
  showToast(message) {
    // XXYJRCTManager?.showToast?.(message);
    Toast.message(message);
  },
  constant: XXYJRCTManager,
  // token: XXYJRCTManager?.token,

  async getInfo() {
    return await XXYJRCTManager?.getInfo?.();
  },
  // 隐藏TabBar
  hideTabbar(params) {
    XXYJRCTManager?.hideTabbar?.(params);
  },
  // 显示TabBar
  showTabbar(params) {
    XXYJRCTManager?.showTabbar?.(params);
  },
  // 打开iOS系统侧滑
  EnableIOSinteractivePop(params) {
    XXYJRCTManager?.EnableIOSinteractivePop?.(params);
  },
  // 关闭iOS系统侧滑
  DisableIOSinteractivePop(params) {
    XXYJRCTManager?.DisableIOSinteractivePop?.(params);
  },

  // 刷新互助大厅
  RefreshHelpHallList(seekHelpId, isHug) {
    XXYJRCTManager?.RefreshHelpHallList?.({seekHelpId, isHug});
  },

  // 隐藏TabBar
  playerPlay(params) {
    XXYJRCTManager?.playerPlay?.(params);
  },
  // 显示TabBar
  playerPause(params) {
    XXYJRCTManager?.playerPause?.(params);
  },
  getPay(params, callback) {
    XXYJRCTManager?.getPay?.(params, callback);
  },
  getPayAli(params, callback) {
    XXYJRCTManager?.getPayAli?.(params, callback);
  },

  getChatListWithCB(callback) {
    XXYJRCTManager?.getChatListWithCB?.(callback);
  },

  deleteChatConversation(conversationId) {
    XXYJRCTManager?.deleteChatConversation?.(conversationId);
  },

  AppleBay(params) {
    XXYJRCTManager?.AppleBay?.(params);
  },
  getHuanXinInfo() {
    XXYJRCTManager?.getHuanXinInfo?.();
  },

  weixinloginAction() {
    XXYJRCTManager?.weixinloginAction?.();
  },
  qqloginAction() {
    XXYJRCTManager?.qqloginAction?.();
  },
  appleloginAction() {
    XXYJRCTManager?.appleloginAction?.();
  },
  setToken(token) {
    XXYJRCTManager?.setToken?.(token);
  },
  setUserId(userId) {
    XXYJRCTManager?.setUserId?.(userId);
  },
  setAvatar(avatar) {
    XXYJRCTManager?.setAvatar?.(avatar);
  },
  initHuanxinUserInfo(params) {
    XXYJRCTManager?.initHuanxinUserInfo?.(params);
  },
  updateLockedScreenMusic(params) {
    XXYJRCTManager?.updateLockedScreenMusic?.(params);
  },
  AppleMusicControl() {
    XXYJRCTManager?.AppleMusicControl?.();
  },
  SetPushAlias(userId) {
    if (userId) {
      XXYJRCTManager?.SetPushAlias?.(userId + '');
    }
  },
  deletePushAlias() {
    XXYJRCTManager?.deletePushAlias?.();
  },
  SetUpAppleLogin() {
    XXYJRCTManager?.SetUpAppleLogin?.();
  },
  getCoversationListWithConversationId(conversationId, msgId, callback) {
    XXYJRCTManager?.getCoversationListWithConversationId?.(
      conversationId,
      msgId,
      callback,
    );
  },
  sendTextMsg(msg, toId) {
    XXYJRCTManager?.sendTextMsg?.(msg, toId);
  },
  sendVoiceMsg(path, toId, duration) {
    XXYJRCTManager?.sendVoiceMsg?.(path, toId, duration);
  },
  sendCallWithType(type, conversationId) {
    XXYJRCTManager?.sendCallWithType?.(type, conversationId);
  },
  sendImageMsg(msg, toId) {
    XXYJRCTManager?.sendImageMsg?.(Utils.getLocalImagePathAndroid(msg), toId);
    // XXYJRCTManager?.sendImageMsg?.(msg, toId);
  },
  setupAndroidListener() {
    XXYJRCTManager?.setupAndroidListener();
  },
  setHuanxinCallUserConfigWithNickname(nickName, avatar, hxId) {
    XXYJRCTManager?.setHuanxinCallUserConfigWithNickname(
      nickName,
      avatar,
      hxId,
    );
  },
  wxLoginNew(code) {
    XXYJRCTManager?.wxLoginNew(code);
  },
  isHarmonyOs(callback) {
    // if (isAndroid) {
    //   XXYJRCTManager?.isHarmonyOs(callback);
    // }
  },
};

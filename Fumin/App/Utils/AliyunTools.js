/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/**
 * 阿里云OSS工具类
 * @export
 * @class AliyunTools
 */
import uuid from 'uuid';
import moment from 'moment';
import AliyunOSS from 'aliyun-oss-react-native';
import {ModalIndicator} from 'teaset';
import _ from 'lodash';
import Utils from '.';
import {Platform} from 'react-native';
const isAndroid = Platform.OS === 'android';
const BUCKET_NAME = 'Fumin';
const END_POINT = 'oss-cn-beijing.aliyuncs.com';
const OBJECT_KEY = 'xinxie2.0';
const OBJECT_KEY_AMSHOW = 'amshowApp';

export default class AliyunTools {
  // 文件链接地址
  // static FILE_URL = `https://gats-test.oss-cn-beijing.aliyuncs.com/${OBJECT_KEY}/`;

  /**
   * 初始化SDK
   * @static
   * @param {*} [config={}]
   * @memberof AliyunTools
   */
  static init(debug, config = {}) {
    debug && AliyunOSS.enableDevMode();
    const configuration = {
      maxRetryCount: 3,
      timeoutIntervalForRequest: 30,
      timeoutIntervalForResource: 24 * 60 * 60,
    };
    // AliyunOSS.initWithServerSTS(
    //   'https://genebox.cn/token',
    //   END_POINT,
    //   configuration,
    // );
    AliyunOSS.initWithPlainTextAccessKey(
      'LTAI5tHY1pnbRd6iJ47s22aM',
      'qxSipWzOct4AWRwWwH58AfHqG2zqVL',
      END_POINT,
      configuration,
    );
  }

  /**
   * 上传文件
   * @static
   * @param {*} objectkey 文件名
   * @param {*} filePath 文件路径 file:///
   * @param {*} uploadProgress 上传进度回调
   * @memberof AliyunTools
   */
  static uploadWithKey(filePath, uploadProgress, fileType, objectkey) {
    const tempObject = objectkey || OBJECT_KEY;
    const FILE_URL = `https://gats-test.oss-cn-beijing.aliyuncs.com/${tempObject}/`;

    AliyunOSS.addEventListener('uploadProgress', (p) => {
      uploadProgress && uploadProgress(p.currentSize / p.totalSize);
    });
    // 监听上传事件和上传进度
    return new Promise((resolve, reject) => {
      const filename = `${moment().format('YYYYMM')}/${uuid()}${
        fileType || '.jpg'
      }`;
      // const filename = `${uuid()}${fileType || '.jpg'}`;
      AliyunOSS.asyncUpload(
        BUCKET_NAME,
        `${objectkey || OBJECT_KEY}/${filename}`,
        filePath,
      )
        .then((res) => {
          resolve(FILE_URL + filename);
          AliyunOSS.removeEventListener('uploadProgress');
        })
        .catch((error) => {
          reject(error);
          // 移除上传进度监听
          AliyunOSS.removeEventListener('uploadProgress');
        });
    });
  }

  /**
   * 上传文件
   * @static
   * @param {*} objectkey 文件名
   * @param {*} filePath 文件路径 file:///
   * @param {*} uploadProgress 上传进度回调
   * @memberof AliyunTools
   */
  static upload(filePath, uploadProgress, fileType, objectKey) {
    const tempObject = objectKey || OBJECT_KEY;
    const FILE_URL = `https://gats-test.oss-cn-beijing.aliyuncs.com/${tempObject}/`;
    const funcProgress = (progress) => {
      uploadProgress && uploadProgress(progress);
    };
    console.log('上传传参', filePath);
    // _.throttle(funcProgress, 1000);
    AliyunOSS.addEventListener(
      'uploadProgress',
      _.throttle((p) => {
        funcProgress(p.currentSize / p.totalSize);
      }, 1000),
    );
    // 监听上传事件和上传进度
    return new Promise((resolve, reject) => {
      const filename = `${moment().format('YYYYMM')}/${uuid()}${
        fileType || '.jpg'
      }`;
      // const filename = `${uuid()}${fileType || '.jpg'}`;
      AliyunOSS.asyncUpload(BUCKET_NAME, `${tempObject}/${filename}`, filePath)
        .then((res) => {
          resolve(FILE_URL + filename);
          AliyunOSS.removeEventListener('uploadProgress');
          console.log('aliyunoss res', res?.httpResponseHeaderFields);
        })
        .catch((error) => {
          reject(error);
          // 移除上传进度监听
          AliyunOSS.removeEventListener('uploadProgress');
          console.log('aliyunoss error', error);
        });
    });
  }
  static FuminUpload(filePath, uploadProgress, fileType, objectKey) {
    const tempObject = objectKey || 'mindtrip';
    const FILE_URL = `https://gats-test.oss-cn-beijing.aliyuncs.com/${tempObject}/`;
    const funcProgress = (progress) => {
      uploadProgress && uploadProgress(progress);
    };
    console.log('上传传参', filePath);
    // _.throttle(funcProgress, 1000);
    AliyunOSS.addEventListener(
      'uploadProgress',
      _.throttle((p) => {
        funcProgress(p.currentSize / p.totalSize);
      }, 1000),
    );
    // 监听上传事件和上传进度
    return new Promise((resolve, reject) => {
      const filename = `${moment().format('YYYYMM')}/${uuid()}${
        fileType || '.jpg'
      }`;
      // const filename = `${uuid()}${fileType || '.jpg'}`;
      // AliyunOSS.asyncUpload(BUCKET_NAME, `${tempObject}/${filename}`, filePath)
      AliyunOSS.asyncUpload(BUCKET_NAME, `${tempObject}/${filename}`, filePath)
        .then((res) => {
          resolve(FILE_URL + filename);
          AliyunOSS.removeEventListener('uploadProgress');
          console.log('aliyunoss res', res?.httpResponseHeaderFields);
        })
        .catch((error) => {
          reject(error);
          // 移除上传进度监听
          AliyunOSS.removeEventListener('uploadProgress');
          console.log('aliyunoss error', error);
        });
    });
  }

  /**
   * 多文件上传
   * @static
   * @memberof AliyunTools
   * TODO 多任务上传进度监听
   */
  static multipleUpload = (filePaths) => {
    if (!Array.isArray(filePaths)) {
      return;
    }
    const uploadTask = [];
    for (let i = 0; i < filePaths.length; i++) {
      uploadTask.push(AliyunTools.upload(filePaths[i]));
    }
    return Promise.all(uploadTask);
  };
}

export const uploadImg = (img, successCB) => {
  console.log('img', Utils.getLocalImagePathAndroid(img));
  ModalIndicator.show('正在上传图片, 请稍后...');
  AliyunTools.FuminUpload(Utils.getLocalImagePathAndroid(img))
    .then((uri) => {
      ModalIndicator.hide();
      console.log('aliyun oss upload', uri);
      successCB?.(uri);
    })
    .catch(() => {
      ModalIndicator.hide();
    });
};
export const uploadVoice = (voice, successCB) => {
  console.log('img', Utils.getLocalImagePathAndroid(voice));
  ModalIndicator.show('正在上传图片, 请稍后...');
  AliyunTools.FuminUpload(
    Utils.getLocalImagePathAndroid(voice),
    () => {},
    '.aac',
  )
    .then((uri) => {
      ModalIndicator.hide();
      console.log('aliyun oss upload', uri);
      successCB?.(uri);
    })
    .catch(() => {
      ModalIndicator.hide();
    });
};
export const uploadXinxieImg = (img, successCB) => {
  console.log('img', Utils.getLocalImagePathAndroid(img));
  ModalIndicator.show('正在上传图片, 请稍后...');
  AliyunTools.upload(
    Utils.getLocalImagePathAndroid(img),
    '',
    '.png',
    OBJECT_KEY,
  )
    .then((uri) => {
      ModalIndicator.hide();
      console.log('aliyun oss upload', uri);
      successCB?.(uri);
    })
    .catch(() => {
      ModalIndicator.hide();
    });
};
export const uploadAMShowVideo = (img, successCB, progress, failureCB) => {
  console.log('img', img);

  if (!img) {
    // Toast('用户取消');
    return;
  }
  // ModalIndicator.show('正在上传视频, 请稍后...');
  AliyunTools.upload(img, progress, '.mp4', OBJECT_KEY_AMSHOW)
    .then((uri) => {
      // ModalIndicator.hide();
      console.log('aliyun oss upload', uri);
      successCB?.(uri);
    })
    .catch(() => {
      // ModalIndicator.hide();
      // Toast('上传视频失败');
      failureCB?.();
    });
};

export const uploadAMShowImg = (img, successCB, progress) => {
  console.log('img', img);
  if (!img) {
    // Toast('用户取消');
    return;
  }
  AliyunTools.upload(img, progress, undefined, OBJECT_KEY_AMSHOW)
    .then((uri) => {
      console.log('aliyun oss upload', uri);
      successCB?.(uri);
    })
    .catch(() => {
      // Toast('上传图片失败');
    });
};

export const uploadArrayImgs = (imgs, successCB) => {
  console.log('img', imgs);
  ModalIndicator.show('正在上传图片, 请稍后...');
  AliyunTools.multipleUpload(imgs)
    .then((uri) => {
      ModalIndicator.hide();
      console.log('uploadArrayImgs', uri);
      successCB?.(uri);
    })
    .catch(() => {
      ModalIndicator.hide();
      // Toast('上传图片失败');
    });
};

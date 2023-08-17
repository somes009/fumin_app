/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import FMHeader from '../../Base/Widget/FMHeader';
import FMImage from '../../Base/Widget/FMImage';
import {ApiPostJson} from '../../../Api/RequestTool';
import * as WeChat from 'react-native-wechat-lib';

export default class MinebindInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheSize: '',
    };
  }

  componentDidMount() {}
  getData = () => {
    let {id} = this.state;
    const path = '/app-api/member/user/checkBindOpenId';
    const params = {};
    const onSuccess = (res) => {
      this.setState({
        // data: res,
      });
    };
    const onFailure = () => {};
    ApiPostJson({path, params, onSuccess, onFailure});
  };
  WeChatLogin() {
    WeChat.sendAuthRequest('snsapi_userinfo', 'ares')
      .then((data) => {
        console.log('授权成功', data);
        // this.getAccessToken(
        //   APP_ID,
        //   APP_SECRET,
        //   data.code,
        //   successCallback,
        //   errorCallback,
        // );
      })
      .catch((err) => {
        console.log('授权失败', err);
        // errorCallback(err);
      });
  }
  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {cacheSize} = this.state;
    const list = [
      {
        name: '提现到微信',
        fun: () => {
          this.WeChatLogin();
        },
      },
      {
        name: '提现到支付宝',
        fun: () => {
          navigation.navigate('LoginNav', {screen: 'LoginYinsiPage'});
        },
      },
    ];
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title="绑定账号"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.box}>
          {list.map((item, index) => {
            return (
              <TouchableOpacity
                style={[styles.item, index === 3 ? {} : {borderBottomWidth: 1}]}
                key={index}
                onPress={item.fun}
                activeOpacity={1}>
                <Text style={styles.name}>{item.name}</Text>
                <FMImage style={styles.toRight} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
  },
  box: {
    width: 340,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17,
    borderBottomColor: '#E9E9E9',
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
  },
  toRight: {
    width: 7,
    height: 11,
  },
  outLoginButton: {
    position: 'absolute',
    width: 177,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 57,
    backgroundColor: '#F2F3F4',
    borderRadius: 25,
  },
  outLoginText: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#747989',
  },
});

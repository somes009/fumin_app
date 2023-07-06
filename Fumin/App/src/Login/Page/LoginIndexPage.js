/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Platform,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import Images from '../../../Images';
import {ApiPostJson} from '../../../Api/RequestTool';
import CacheStore, {CacheStoreName} from '../../../Common/CacheStore';
import XXYJImage from '../../Base/Widget/XXYJImage';
import {ScrollView} from 'react-native-gesture-handler';
import Utils from '../../../Utils';
import XXYJButton from '../../Base/Widget/XXYJButton';
import XXYJTextinput from '../../Base/Widget/XXYJTextinput';
import EventBus, {EventBusName} from '../../../Api/EventBus';
const isAndroid = Platform.OS === 'android';
export default class LoginIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMustPopup: false,
      code: '',
      value: '',
      password: '',
      sec: 60,
      isSend: false,
      canLogin: false,
      type: 1, //1验证码登陆;2密码登录
      isSel: false,
    };
  }
  componentDidMount() {
    global.phone = '';
    CacheStore.get(CacheStoreName.ProtocolUserCheck).then((data) => {
      if (!data) {
        this.refPop.openModal();
      }
    });
    Utils.getCacheStore({storeName: 'lastPhone'}).then((data) => {
      if (data) {
        this.setState({
          value: data,
        });
      }
    });
  }
  componentWillUnmount() {
    clearInterval(this.timerSend);
  }
  // shouldComponentUpdate(np, ns) {
  //   if (np.isFocused !== this.props.isFocused && np.isFocused) {
  //     CacheStore.get(CacheStoreName.ProtocolUserCheck).then((data) => {
  //       if (!data) {
  //         this.refPop.openModal();
  //       }
  //     });
  //     return true;
  //   }
  //   return true;
  // }

  handleUserCommitProtocol = () => {
    CacheStore.set(CacheStoreName.ProtocolUserCheck, true);
    this.refPop.closeModal();
    this.setState({
      showMustPopup: false,
    });
    // 安卓启动友盟等第三方sdk
  };

  handleUserRefused = () => {
    Utils.Toast({text: '您需要同意后才可以继续使用\n亲鹿鹿提供的服务'});
    if (Utils.isAndroid) {
      this.refPop?.closeModal();
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.refPop?.openModal();
        BackHandler.exitApp();
      }, 1000);
    }
  };
  renderCodeInput = () => {
    const {code, isSend, sec} = this.state;
    return (
      <XXYJTextinput
        keyboardType="numeric"
        placeholder="请输入验证码"
        maxLength={4}
        value={code}
        onChangeText={(text) => {
          this.setState(
            {
              code: text,
            },
            this.check,
          );
        }}
        isNumber
        textStyle={styles.input}
        needBorder
        placeholderStyle={styles.placeholderStyle}
        rightComponent={
          <XXYJButton
            text={isSend ? sec + 's' : '发送'}
            textStyle={styles.send}
            containerStyle={styles.sendBox}
            onPress={this.handleSend}
            unNeomorph={true}
            unTouch={isSend}
          />
        }
      />
    );
  };
  renderPasswordInput = () => {
    const {password} = this.state;
    return (
      <XXYJTextinput
        placeholder="请输入密码"
        maxLength={20}
        value={password}
        onChangeText={(text) => {
          this.setState(
            {
              password: text,
            },
            this.check,
          );
        }}
        isNumber
        textStyle={styles.input}
        needBorder
        placeholderStyle={styles.placeholderStyle}
      />
    );
  };
  renderInput = () => {
    const {value, type} = this.state;
    return (
      <View style={styles.in}>
        <XXYJTextinput
          keyboardType="numeric"
          placeholder="请输入手机号"
          maxLength={11}
          value={value}
          onChangeText={(text) => {
            this.setState(
              {
                value: text,
              },
              this.check,
            );
          }}
          isNumber
          leftComponent={
            <>
              <Text style={styles.jia}>+</Text>
              <Text style={styles.phone}>86</Text>
            </>
          }
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          needBorder
        />
        {type === 1 ? this.renderCodeInput() : this.renderPasswordInput()}
      </View>
    );
  };
  handleSend = () => {
    const reg =
      /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    const {value} = this.state;
    if (!value.match(reg)) {
      Utils.Toast({
        text: '请输入正确的手机号',
      });
      return;
    }
    this.setState({
      isSend: true,
    });
    this.sendCode();
  };
  sendCode = () => {
    const {value} = this.state;
    const path = '/app-api/member/auth/send-sms-code';
    const params = {
      mobile: value,
      scene: 1,
    };
    const onSuccess = () => {};
    const onFailure = () => {};
    ApiPostJson({
      path,
      params,
      onSuccess,
      onFailure,
      needShowMsg: true,
    });
    this.timerSend = setInterval(() => {
      const {sec} = this.state;
      if (sec === 0) {
        this.setState({
          isSend: false,
          sec: 60,
        });
        clearInterval(this.timerSend);
        return;
      }
      this.setState({
        sec: sec - 1,
      });
    }, 1000);
  };
  check = () => {
    const {value, code, type, password, isSel} = this.state;
    if (
      value.length === 11 &&
      ((type === 1 && code.length === 4) ||
        (type === 2 && password.length >= 6)) &&
      isSel
    ) {
      this.setState({
        canLogin: true,
      });
    } else {
      this.setState({
        canLogin: false,
      });
    }
  };
  handleLogin = () => {
    const {value, code, isSel, type, password} = this.state;
    const {navigation} = this.props;
    if (!isSel) {
      Utils.Toast({
        text: '请先阅读并同意《用户协议》和《隐私政策》',
      });
    }
    const path =
      type === 1
        ? '/app-api/member/auth/sms-login' //验证码登陆
        : '/app-api/member/auth/login'; //密码登录
    let params = {
      mobile: value,
      code,
      password,
    };
    const onSuccess = (res) => {
      Utils.setCacheStore({storeName: 'lastPhone', data: value});
      global.userId = res.userId;
      global.token = res.accessToken;
      EventBus.post(EventBusName.ON_LOGIN);
      CacheStore.set('INFO', {
        token: res.accessToken + '',
        userId: res.userId + '',
        refreshToken: res.refreshToken + '',
        userNickName: res.userNickName + '',
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeTabs'}],
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
  renderLogin = () => {
    const {canLogin} = this.state;
    return (
      <XXYJButton
        darkShadowColor="#99C6BB"
        text="登录"
        textStyle={styles.loginText}
        containerStyle={styles.buttonShadow}
        onPress={this.handleLogin}
        unTouch={!canLogin}
      />
    );
  };
  renderTop = () => {
    return (
      <View style={styles.topBox}>
        <View style={styles.top}>
          <Text style={styles.title}>您好，请登录！</Text>
        </View>
      </View>
    );
  };
  renderChangeType = () => {
    const {type} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.types}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginSignInPage');
          }}
          activeOpacity={0.6}>
          <Text style={styles.signText}>账号注册</Text>
        </TouchableOpacity>
        <Text style={styles.typeLine}>|</Text>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              type: type === 1 ? 2 : 1,
            });
          }}
          activeOpacity={0.6}>
          <Text style={styles.typeText}>
            {type === 1 ? '密码' : '验证码'}登录
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderLoginBottom = () => {
    const {isSel} = this.state;
    return (
      <View style={styles.loginBottom}>
        <TouchableOpacity
          style={styles.loginBottomIn}
          onPress={() => {
            this.setState(
              {
                isSel: !isSel,
              },
              this.check,
            );
          }}
          activeOpacity={1}>
          <View style={styles.selBox}>
            {isSel && <View style={styles.isSelCri} />}
          </View>
          <Text style={styles.loginBottomText}>
            同意《用户协议》和《隐私政策》
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          {this.renderTop()}
          {this.renderInput()}
          {this.renderLogin()}
          {this.renderChangeType()}
        </ScrollView>
        {this.renderLoginBottom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 25,
  },
  loginBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: 325.5,
    height: 51,
    borderRadius: 25.5,
    backgroundColor: '#EFF3F6',
    padding: 8,
  },
  input: {
    fontSize: 21,
    padding: 0,
    paddingHorizontal: 4.5,
    fontFamily: 'DIN Alternate',
    fontWeight: '500',
  },
  button: {
    width: 326,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  topBox: {
    marginTop: 84,
    paddingHorizontal: 25,
    width: '100%',
  },
  top: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 25,
    lineHeight: 35,
    marginRight: 6,
    color: '#000',
  },
  desc: {
    marginTop: 7,
    fontSize: 17,
    lineHeight: 30,
    marginBottom: 35,
    color: '#000',
  },
  jia: {
    fontSize: 19,
    fontFamily: 'PingFangSC-Light',
    color: '#000',
    marginTop: -2.5,
  },
  phone: {
    fontFamily: 'DIN Alternate',
    fontWeight: '500',
    fontSize: 21,
    marginLeft: 3,
    color: '#000',
  },
  sendBox: {
    width: 73,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25.5,
    backgroundColor: '#EBB657',
  },
  send: {
    fontSize: 16,
    color: '#fff',
  },
  buttonShadow: {
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 18,
    borderRadius: 13,
    width: 326,
    height: 44,
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 56,
    backgroundColor: '#000',
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    width: (326 / 375) * 100 + '%',
    paddingHorizontal: 6.5,
    marginTop: 60,
  },
  footerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 11,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#E8ECEF',
  },
  otherTitle: {
    fontSize: 14,
    lineHeight: 24,
    color: '#eee',
    fontFamily: 'PingFangSC-Light',
    marginHorizontal: 18,
  },
  otherList: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 9.5,
  },
  icon: {
    width: 60,
    height: 60.5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'PingFangSC-Light',
  },
  ssBox: {
    alignItems: 'center',
    marginTop: 21,
  },
  shenshu: {
    fontSize: 15,
    lineHeight: 21,
    color: '#EBB657',
  },
  in: {
    width: '100%',
    paddingHorizontal: 25,
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  typeLine: {
    marginLeft: 3,
    marginRight: 3,
  },
  loginBottom: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    width: '100%',
  },
  loginBottomIn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isSelCri: {
    width: 9,
    height: 9,
    backgroundColor: 'orange',
  },
});

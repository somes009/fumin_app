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
import {ApiPostJson} from '../../../Api/RequestTool';
import CacheStore, {CacheStoreName} from '../../../Common/CacheStore';
import {ScrollView} from 'react-native-gesture-handler';
import Utils from '../../../Utils';
import FMButton from '../../Base/Widget/FMButton';
import FMTextinput from '../../Base/Widget/FMTextinput';
import MustPopup from '../../Base/Widget/MustPopup';
import EventBus, {EventBusName} from '../../../Api/EventBus';
import FMHeader from '../../Base/Widget/FMHeader';
import Images from '../../../Images';
const isAndroid = Platform.OS === 'android';
export default class LoginFindMmPage extends Component {
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
      password2: '',
    };
  }
  componentDidMount() {}

  renderCodeInput = () => {
    const {code, isSend, sec} = this.state;
    return (
      <FMTextinput
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
          <FMButton
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
  renderInput = () => {
    const {value, type} = this.state;
    return (
      <View style={styles.in}>
        <FMTextinput
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
        {this.renderCodeInput()}
        {this.renderPasswordInput()}
        {this.renderPasswordInput2()}
      </View>
    );
  };
  renderPasswordInput = () => {
    const {password} = this.state;
    return (
      <FMTextinput
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
  renderPasswordInput2 = () => {
    const {password2} = this.state;
    return (
      <FMTextinput
        placeholder="请确认密码"
        maxLength={20}
        value={password2}
        secureTextEntry
        onChangeText={(text) => {
          this.setState(
            {
              password2: text,
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
      scene: 3,
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
        (type === 2 && password.length >= 6))
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
    const path = '/app-api/member/auth/reset-password';
    let params = {
      mobile: value,
      code,
      password,
    };
    const onSuccess = (res) => {
      navigation.goBack();
      Utils.Toast({text: '重置成功'});
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
  checkInfo = () => {
    const {value, code, type, password, password2} = this.state;
    if (!Utils.checkPhone(value)) {
      Utils.Toast({text: '请输入正确的手机号'});
    } else if (type === 1 && code.length < 4) {
      Utils.Toast({text: '请输入4位数的验证码'});
    } else if (type === 2 && !this.checkPassword(password)) {
      Utils.Toast({
        text: '密码必须是6-20个英文字母、数字或符号(除空格)，且字母、数字和标点符号至少包含两种',
      });
    } else if (password2 !== password) {
      Utils.Toast({
        text: '两次输入的密码不一致',
      });
    }
  };
  renderLogin = () => {
    const {canLogin} = this.state;
    return (
      <FMButton
        darkShadowColor="#99C6BB"
        text="确认"
        textStyle={styles.loginText}
        containerStyle={styles.buttonShadow}
        onPress={this.handleLogin}
        unTouch={!canLogin}
        unPress={this.checkInfo}
      />
    );
  };
  renderTop = () => {
    return (
      <View style={styles.topBox}>
        <View style={styles.top}>
          <Text style={styles.title}>您好，请验证手机号！</Text>
        </View>
      </View>
    );
  };

  render() {
    const {safeAreaInsets, navigation} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          {this.renderTop()}
          {this.renderInput()}
          {this.renderLogin()}
        </ScrollView>
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
    borderRadius: 7,
    borderWidth: 1,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isSelBox: {
    width: 14,
    marginRight: 5,
    height: 14,
  },
  isSelCri: {
    width: 9,
    height: 9,
    backgroundColor: 'orange',
  },
});

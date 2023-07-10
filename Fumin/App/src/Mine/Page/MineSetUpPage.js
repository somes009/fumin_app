/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import XXYJHeader from '../../Base/Widget/XXYJHeader';
import XXYJImage from '../../Base/Widget/XXYJImage';
import * as CacheManager from 'react-native-http-cache';

export default class MineSetUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheSize: '',
    };
  }

  componentDidMount() {
    this.getCache();
  }
  //获取缓存
  getCache = () => {
    CacheManager.getCacheSize().then(
      (res) => {
        let cacheSize = Math.round((res / 1024 / 1024) * 100) / 100 + 'M';
        this.setState({
          cacheSize,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };
  //清除缓存
  clearCache = () => {
    CacheManager.clearCache();
    Utils.Toast({text: '已清除缓存'});
    this.setState({
      cacheSize: '0M',
    });
  };

  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {cacheSize} = this.state;
    const list = [
      {
        name: '收货地址',
        fun: () => {
          navigation.navigate('MinePlaceListPage');
        },
      },
      // {
      //   name: '修改密码',
      //   fun: () => {},
      // },
      // {
      //   name: '帮助中心',
      //   fun: () => {},
      // },
      {
        name: '清除缓存' + cacheSize,
        fun: this.clearCache,
      },
    ];
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title="设置"
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
                <XXYJImage style={styles.toRight} />
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={Utils.outLogin.bind(this, navigation)}
          style={styles.outLoginButton}>
          <Text style={styles.outLoginText}>退出登录</Text>
        </TouchableOpacity>
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

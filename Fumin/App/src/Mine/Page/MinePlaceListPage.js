/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import XXYJHeader from '../../Base/Widget/XXYJHeader';
import MinePlaceListItem from '../Widget/MinePlaceListItem';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';

export default class MinePlaceListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.backHandler = navigation.addListener('focus', () => {
      // 在这里编写页面成为焦点页面时需要执行的操作
      console.log('页面成为焦点页面');
      this.getList();
    });
    this.getList();
  }
  getList = () => {
    const path = '/app-api/member/address/list';
    const params = {
      // objType: 1,
    };
    const onSuccess = (res) => {
      console.log(res);
      this.setState({
        list: res || [],
      });
    };
    ApiGet({
      path,
      params,
      onSuccess,
    });
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {list} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title="收货地址"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <FlatList
          data={list}
          renderItem={({item, index}) => {
            return (
              <MinePlaceListItem
                navigation={navigation}
                item={item}
                key={index}
              />
            );
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MineCreatePlacePage');
          }}
          activeOpacity={1}
          style={styles.addBtn}>
          <Text style={styles.addText}>添加新的地址</Text>
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
  addBtn: {
    width: 343,
    height: 47,
    borderRadius: 9,
    position: 'absolute',
    bottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9B00',
  },
  addText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
});

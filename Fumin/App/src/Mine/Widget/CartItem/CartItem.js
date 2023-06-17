//单个商品坑位
//doc组件生命周期： http://reactjs.cn/react/docs/working-with-the-browser.html#component-lifecycle

'use strict';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import XXYJImage from '../../../Base/Widget/XXYJImage';
import Fonts from '../../../../Common/Fonts';

// 组件样式
var styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unSelCri: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#6D7278',
    marginRight: 10,
  },
  img: {
    width: 73,
    height: 73,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  infoBox: {
    marginLeft: 10,
    height: 73,
    width: 155,
  },
  name: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  size: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
    marginTop: 5,
  },
  price: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#FF9B00',
    marginTop: 8,
  },
  delBox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF9B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delText: {
    fontSize: 15,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
});

export default class GoodItem extends React.Component {
  _onPressButton() {
    if (this.props.item) {
    }
  }
  render() {
    const {item, handleSel} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.leftBox}>
          <TouchableOpacity activeOpacity={1} style={styles.unSelCri} />
          <XXYJImage style={styles.img} />
          <View style={styles.infoBox}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <Text style={styles.size}>规格</Text>
            <Text style={styles.price}>¥888</Text>
          </View>
        </View>
        {/* <TouchableOpacity activeOpacity={1} style={styles.delBox}>
          <Text style={styles.delText}>-</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

/* eslint-disable react-native/no-inline-styles */
//单个商品坑位
//doc组件生命周期： http://reactjs.cn/react/docs/working-with-the-browser.html#component-lifecycle

'use strict';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FMImage from '../../../Base/Widget/FMImage';
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
    const {item, handleSel, handleDel, type, selDelList, handleSelDel} =
      this.props;
    const isSel = type ? selDelList.includes(item.cartId) : item.isSelected;
    return (
      <View style={styles.container}>
        <View style={styles.leftBox}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.unSelCri,
              {
                backgroundColor: isSel ? '#FF9B00' : '#fff',
              },
            ]}
            onPress={
              type
                ? handleSelDel?.bind(this, item.cartId)
                : handleSel?.bind(this, item.cartId, 1)
            }
          />
          <FMImage style={styles.img} />
          <View style={styles.infoBox}>
            <Text numberOfLines={1} style={styles.name}>
              {item.spuName}
            </Text>
            <Text style={styles.size}>x{item.count}</Text>
            <Text style={styles.price}>¥{item.amount}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleDel.bind(this, [item.cartId])}
          activeOpacity={1}
          style={styles.delBox}>
          <Text style={styles.delText}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

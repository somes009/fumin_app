import React, {Component} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FMImage from '../../Base/Widget/FMImage';
import Fonts from '../../../Common/Fonts';
import Utils from '../../../Utils';
const ShopDetailItem = ({item, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      key={item.spuId}
      style={[styles.item, style]}>
      <FMImage source={{uri: item?.picUrl}} style={styles.img} />
      <View style={styles.itemBottom}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>¥{item.amount}</Text>
          <Text style={styles.count}>
            {Utils.formatNumberToBai(item.buyCount)}人付款
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ShopDetailItem;

const styles = StyleSheet.create({
  item: {
    width: Utils.properWidth(167),
    height: 233,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: 167,
    backgroundColor: '#eee',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemBottom: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 14,
    paddingTop: 11,
    paddingBottom: 8,
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: Fonts.DIN_Alternate,
    color: '#000',
  },
  count: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
});

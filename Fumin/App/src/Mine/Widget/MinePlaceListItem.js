/* eslint-disable radix */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import XXYJImage from '../../Base/Widget/XXYJImage';
import Fonts from '../../../Common/Fonts';
const MinePlaceListItem = () => {
  return (
    <View style={styles.item}>
      <View style={styles.leftBox}>
        <XXYJImage style={styles.img} />
        <View style={styles.infoBox}>
          <View style={styles.infoTop}>
            <Text style={styles.name}>李晓丹</Text>
            <Text style={styles.phone}>1567898765</Text>
          </View>
          <Text style={styles.place}>
            河北省 石家庄市 长安区 胜利北街道义南路菜鸟驿站
          </Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={1}>
        <XXYJImage style={styles.changeIcon} />
      </TouchableOpacity>
    </View>
  );
};
export default MinePlaceListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    width: '100%',
    marginTop: 10,
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 43,
    height: 43,
    backgroundColor: '#d8d8d8',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 22,
    marginRight: 16,
  },
  infoTop: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  phone: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
    marginLeft: 13,
  },
  place: {
    width: 238,
    marginTop: 2,
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  changeIcon: {
    width: 15,
    height: 15,
    backgroundColor: '#eee',
    paddingLeft: 20,
    paddingVertical: 10,
  },
});

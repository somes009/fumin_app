/* eslint-disable radix */
//课程item
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import XXYJImage from '../../Base/Widget/XXYJImage';
import Fonts from '../../../Common/Fonts';
const MineFansItem = () => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.item}>
      <XXYJImage style={styles.img} />
      <View style={styles.rightBox}>
        <Text style={styles.name}>胖胖哥暖暖种草</Text>
        <View style={styles.rightBottom}>
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>今日是否释放奖励：已释放</Text>
            <Text style={styles.bottomText}>贡献度：30</Text>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>今日是否释放奖励：已释放</Text>
            <Text style={styles.bottomText}>贡献度：30</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MineFansItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  img: {
    width: 67,
    height: 67,
    borderRadius: 34,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  rightBox: {
    justifyContent: 'space-between',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    paddingVertical: 15,
    flex: 1,
    height: 97,
  },
  bottomView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomText: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
});

/* eslint-disable radix */
//课程item
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import XXYJImage from '../../Base/Widget/XXYJImage';
import Fonts from '../../../Common/Fonts';
const MineOrderScoreItem = () => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.item}>
      <View style={styles.top}>
        <Text style={styles.name}>订单值</Text>
        <Text style={styles.score}>+122</Text>
      </View>
      <Text style={styles.time}>发放时间：2023-04-03 05:06:28</Text>
    </TouchableOpacity>
  );
};
export default MineOrderScoreItem;

const styles = StyleSheet.create({
  item: {
    width: 340,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 9,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  score: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#FF9B00',
  },
  time: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#6D7278',
    marginTop: 7,
  },
});

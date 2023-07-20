/* eslint-disable radix */
//课程item
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FMImage from '../../Base/Widget/FMImage';
import Fonts from '../../../Common/Fonts';
const MineShopItem = () => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.item}>
      <FMImage style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.name}>若溪润儿童用品企业店</Text>
        <Text style={styles.phone}>134****7654</Text>
      </View>
    </TouchableOpacity>
  );
};
export default MineShopItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 35,
    width: '100%',
  },
  img: {
    width: 67,
    height: 67,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  phone: {
    marginTop: 4,
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#00B935',
  },
});

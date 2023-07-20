import React, {Component} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FMImage from '../../Base/Widget/FMImage';
import Fonts from '../../../Common/Fonts';
import CommonButtonsPopUp from '../../Base/Widget/CommonButtonsPopUp';
const ShProductItem = ({item, onPress, navigation}) => {
  let refPop = {};
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.item}>
      <FMImage source={{uri: item?.picUrls?.[0]}} style={styles.img} />
      <View style={styles.rightBox}>
        <View style={styles.rightTop}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              refPop.openModal({
                title: '',
                list: [
                  {
                    text: '编辑',
                    fun: () => {
                      navigation.navigate('ShProductNav', {
                        screen: 'ShProductAddPage',
                        params: {
                          id: item.spuId,
                        },
                      });
                      refPop.closeModal();
                    },
                  },
                  {
                    text: '下架',
                    fun: () => {
                      refPop.closeModal();
                    },
                  },
                ],
              });
            }}
            activeOpacity={1}
            style={styles.cris}>
            <View style={styles.cri} />
            <View style={styles.cri} />
            <View style={styles.cri} />
          </TouchableOpacity>
        </View>
        <View style={styles.rightBottom}>
          <Text style={styles.bottomText}>库存：{item.buyCount}</Text>
          <Text style={styles.bottomText}>现金</Text>
        </View>
      </View>
      <CommonButtonsPopUp ref={(ref) => (refPop = ref)} />
    </TouchableOpacity>
  );
};
export default ShProductItem;

const styles = StyleSheet.create({
  item: {
    width: 343,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 14,
    padding: 10,
    flexDirection: 'row',
  },
  img: {
    width: 83,
    height: 83,
    borderRadius: 9,
    backgroundColor: '#eee',
  },
  rightBox: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  rightTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    width: 172,
  },
  cris: {
    flexDirection: 'row',
  },
  cri: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#6D7278',
    margin: 1.5,
  },
  rightBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
});

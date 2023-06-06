import React, {Component} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import XXYJImage from '../../Base/Widget/XXYJImage';
import Fonts from '../../../Common/Fonts';
const IndexRenderItem = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.item}>
      <XXYJImage style={styles.img} />
      <View style={styles.rightBox}>
        <Text style={styles.name} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.bottomBox}>
          <View style={styles.placeBox}>
            <XXYJImage style={styles.placeIcon} />
            <Text style={styles.placeText}>佛山游乐园</Text>
          </View>
          <Text style={styles.distance}>0.3km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default IndexRenderItem;

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
    marginTop: 11,
    padding: 10,
    flexDirection: 'row',
  },
  img: {
    width: 83,
    height: 83,
    borderRadius: 5,
    backgroundColor: '#d8d8d8',
    marginRight: 10,
  },
  rightBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  bottomBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeIcon: {
    width: 11,
    height: 15,
    backgroundColor: '#eee',
  },
  placeText: {
    fontSize: 14,
    lineHeight: 19,
    marginLeft: 4,
    color: '#6D7278',
    fontFamily: Fonts.PingFangSC_Regular,
  },
  distance: {
    fontSize: 14,
    lineHeight: 19,
    color: '#6D7278',
    fontFamily: Fonts.PingFangSC_Regular,
  },
});

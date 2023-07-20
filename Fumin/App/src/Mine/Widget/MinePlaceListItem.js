/* eslint-disable radix */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FMImage from '../../Base/Widget/FMImage';
import Fonts from '../../../Common/Fonts';
const MinePlaceListItem = ({item, navigation, onPress, key}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress(item);
          return;
        }
        navigation.navigate('MineCreatePlacePage', {
          id: item.id,
        });
      }}
      key={key}
      activeOpacity={1}
      style={styles.item}>
      <View style={styles.leftBox}>
        <FMImage style={styles.img} />
        <View style={styles.infoBox}>
          <View style={styles.infoTop}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.mobile}</Text>
          </View>
          <Text style={styles.place}>{item.detailAddress}</Text>
        </View>
      </View>
      <FMImage style={styles.changeIcon} />
    </TouchableOpacity>
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

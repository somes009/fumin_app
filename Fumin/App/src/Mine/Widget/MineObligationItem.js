/* eslint-disable radix */
//待付款
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import XXYJImage from '../../Base/Widget/XXYJImage';
import XXYJListSelPop from '../../Base/Widget/XXYJListSelPop';
import Fonts from '../../../Common/Fonts';
import Utils from '../../../Utils';
const MineObligationItem = ({onPress, item}) => {
  let refCancel = {};
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.item}>
      <View style={styles.titleBox}>
        <TouchableOpacity activeOpacity={1} style={styles.shopNameBox}>
          <Text style={styles.shopName}>{item?.pmName}</Text>
          <XXYJImage source={{uri: item?.spuLogo}} style={styles.toRight} />
        </TouchableOpacity>
        <Text style={styles.state}>等待买家付款</Text>
      </View>
      <View style={styles.infoBox}>
        <XXYJImage style={styles.img} />
        <View style={styles.infoRight}>
          <View style={styles.righrTop}>
            <Text numberOfLines={2} style={styles.productName}>
              {item?.spuName}
            </Text>
            <Text style={styles.price}>￥{item?.spuPrice / 100}</Text>
          </View>
          <Text style={styles.size}>x1</Text>
        </View>
      </View>
      <View style={styles.warpBox}>
        <Text style={styles.warpText1}>付款后</Text>
        <Text style={styles.warpText2}>**天内发货</Text>
      </View>
      <Text style={styles.needPrice}>需付款：￥{item?.spuPrice / 100}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            refCancel.openModal();
          }}
          activeOpacity={1}
          style={styles.button}>
          <Text style={styles.buttonText}>取消订单</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.button}>
          <Text style={styles.buttonText}>修改地址</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.button}>
          <Text style={styles.buttonText}>继续付款</Text>
        </TouchableOpacity>
      </View>
      <XXYJListSelPop
        ref={(ref) => (refCancel = ref)}
        title="取消订单"
        smlTitle="请选择取消订单原因"
        list={[
          {
            id: 1,
            name: '价格有点贵',
          },
          {
            id: 2,
            name: '余额不足',
          },
          {
            id: 3,
            name: '收货地址拍错',
          },
          {
            id: 4,
            name: '规格/款式/数量拍错',
          },
          {
            id: 5,
            name: '暂时不需要了',
          },
          {
            id: 6,
            name: '其他',
          },
        ]}
        handle={(id) => {
          console.log(id);
        }}
      />
    </TouchableOpacity>
  );
};
export default MineObligationItem;

const styles = StyleSheet.create({
  item: {
    width: Utils.properWidth(356),
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
    marginTop: 11,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shopNameBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  shopName: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  toRight: {
    width: 7,
    height: 11,
    marginLeft: 3,
    backgroundColor: '#eee',
  },
  state: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#FF9B00',
  },
  infoBox: {
    flexDirection: 'row',
    marginTop: 13,
  },
  img: {
    width: Utils.properWidth(73),
    height: Utils.properWidth(73),
    backgroundColor: '#eee',
    borderRadius: Utils.properWidth(10),
  },
  infoRight: {
    marginLeft: Utils.properWidth(11),
    flex: 1,
  },
  righrTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    width: Utils.properWidth(180),
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 15,
    lineHeight: 21,
    color: '#000',
  },
  price: {
    fontFamily: Fonts.PingFangSC_Medium,
    fontSize: 15,
    lineHeight: 21,
    color: '#000',
  },
  size: {
    width: '100%',
    textAlign: 'right',
    marginTop: 10,
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 15,
    lineHeight: 21,
    color: '#000',
  },
  warpBox: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F1F1F1',
    marginTop: 19,
    alignItems: 'center',
    paddingLeft: 17,
  },
  warpText1: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 15,
    lineHeight: 21,
    color: '#000',
  },
  warpText2: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 14,
    lineHeight: 21,
    color: '#6D7278',
    marginLeft: 10,
  },
  needPrice: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 15,
    lineHeight: 21,
    color: '#000',
    width: '100%',
    textAlign: 'right',
    marginTop: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 17,
  },
  button: {
    marginLeft: 15,
    width: 79,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#979797',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
});

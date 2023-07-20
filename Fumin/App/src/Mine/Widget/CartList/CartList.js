/* eslint-disable react-native/no-inline-styles */
//商品列表

'use strict';

import React, {Component} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import CartItem from '../CartItem/CartItem';
import FMImage from '../../../Base/Widget/FMImage';
import Fonts from '../../../../Common/Fonts';
import Images from '../../../../Images';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// 组件样式
var styles = StyleSheet.create({
  listView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  nullCartTips: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    width: 356,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 9,
    marginTop: 16,
  },
  boxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 13,
  },
  unSelCri: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#6D7278',
    marginRight: 10,
  },
  isSelCri: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 10,
    backgroundColor: '#FF9B00',
  },
  goShopBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  toRight: {
    width: 7,
    height: 11,
    marginLeft: 1,
  },
});

class CartList extends React.Component {
  constructor(props) {
    super(props);
  }
  _keyExtractor = (item, index) => {
    return typeof item.id === 'number' ? String(item.id) : item.id;
  };

  //渲染列表
  renderListView() {
    const {cartList, type, handleSel, handleDel, selDelList, handleSelDel} =
      this.props;
    let nullList = (
      <View style={styles.nullCartTips}>
        <Text>当前购物车为空</Text>
      </View>
    );
    return (
      <AnimatedFlatList
        data={cartList}
        renderItem={({item, index}) => {
          let isSel = true;
          if (type) {
            for (let i in item.spuList) {
              if (!selDelList.includes(item.spuList[i].cartId)) {
                isSel = false;
                break;
              }
            }
          } else {
            for (let i in item.spuList) {
              if (!item.spuList[i].isSelected) {
                isSel = false;
                break;
              }
            }
          }
          return (
            <View key={index} style={styles.box}>
              <View style={styles.boxTop}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={isSel ? styles.isSelCri : styles.unSelCri}
                  onPress={handleSel.bind(this, item.pmId, 2)}
                />
                <TouchableOpacity activeOpacity={1} style={styles.goShopBox}>
                  <Text style={styles.title}>{item.pmName}</Text>
                  <FMImage
                    source={Images.toRightGray}
                    style={styles.toRight}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.list}>
                {item?.spuList?.map((data, i) => {
                  return (
                    <CartItem
                      handleSel={handleSel}
                      handleDel={handleDel}
                      item={data}
                      key={i}
                      selDelList={selDelList}
                      type={type}
                      handleSelDel={handleSelDel}
                    />
                  );
                })}
              </View>
            </View>
          );
        }}
        style={styles.listView}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 50}}
        ListEmptyComponent={nullList}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  //渲染每一行
  renderItem({item}) {
    return <CartItem item={item} />;
  }
  render() {
    return this.renderListView();
  }
}

export default CartList;

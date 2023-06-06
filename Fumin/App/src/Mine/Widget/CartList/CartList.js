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
import XXYJImage from '../../../Base/Widget/XXYJImage';
import Fonts from '../../../../Common/Fonts';
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
    backgroundColor: '#eee',
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
    const {cartList} = this.props;
    console.log(cartList);
    let nullList = (
      <View style={styles.nullCartTips}>
        <Text>当前购物车为空</Text>
      </View>
    );
    return (
      <AnimatedFlatList
        data={cartList}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.box}>
              <View style={styles.boxTop}>
                <TouchableOpacity activeOpacity={1} style={styles.unSelCri} />
                <TouchableOpacity activeOpacity={1} style={styles.goShopBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <XXYJImage style={styles.toRight} />
                </TouchableOpacity>
              </View>
              <View style={styles.list}>
                {item.list.map((data, i) => {
                  return <CartItem item={data} key={i} />;
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

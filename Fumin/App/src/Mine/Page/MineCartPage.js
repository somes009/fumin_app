import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CartList from '../Widget/CartList/CartList';
import XXYJHeader from '../../Base/Widget/XXYJHeader';
import XXYJBanner from '../../Base/Widget/XXYJBanner';
import Fonts from '../../../Common/Fonts';
import XXYJButton from '../../Base/Widget/XXYJButton';
// 组件样式
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  BottomBox: {
    position: 'absolute',
    width: '100%',
    height: 44,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 22,
    paddingRight: 18,
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
    backgroundColor: '#fff',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unSelAll: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#6D7278',
  },
  isSelAll: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF9B00',
  },
  selAllText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
    marginLeft: 7,
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Light,
    color: '#000',
  },
  price: {
    fontSize: 19,
    lineHeight: 22,
    fontFamily: Fonts.DIN_Alternate,
    color: '#FF9B00',
    marginRight: 14,
  },
  buyButton: {
    width: 97,
    height: 31,
    borderRadius: 23,
    backgroundColor: '#FF9B00',
  },
  buyBtnText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
});
class MineCartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 143,
      type: 0, // 0非管理；1管理
      isSelAll: 0,
      price: 0,
      list: [
        {
          title: 'shibook旗舰店',
          list: [
            {
              name: '2023盒装高档91件套取',
            },
            {
              name: '2023盒装高档91件套取',
            },
          ],
        },
        {
          title: 'shibook旗舰店',
          list: [
            {
              name: '2023盒装高档91件套取',
            },
          ],
        },
        {
          title: 'shibook旗舰店',
          list: [
            {
              name: '2023盒装高档91件套取',
            },
          ],
        },
        {
          title: 'shibook旗舰店',
          list: [
            {
              name: '2023盒装高档91件套取',
            },
            {
              name: '2023盒装高档91件套取',
            },
            {
              name: '2023盒装高档91件套取',
            },
          ],
        },
      ],
    };
  }

  handleBuy = () => {};

  handleSelAll = () => {
    const {isSelAll} = this.state;
    this.setState({
      isSelAll: !isSelAll,
    });
  };

  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {count, price, isSelAll, list} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title={`购物车（${count}）`}
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <CartList cartList={list} />
        <View style={styles.BottomBox}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.handleSelAll}
            style={styles.bottomLeft}>
            {isSelAll ? (
              <View style={styles.isSelAll} />
            ) : (
              <View style={styles.unSelAll} />
            )}
            <Text style={styles.selAllText}>全选</Text>
          </TouchableOpacity>
          <View style={styles.bottomRight}>
            <Text style={styles.priceTitle}>合计：</Text>
            <Text style={styles.price}>¥{price}</Text>
            <XXYJButton
              darkShadowColor="#99C6BB"
              text="结算"
              textStyle={styles.buyBtnText}
              containerStyle={styles.buyButton}
              onPress={this.handleBuy}
              unTouch={!price}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default MineCartPage;

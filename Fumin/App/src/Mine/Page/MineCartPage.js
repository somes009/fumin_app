/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CartList from '../Widget/CartList/CartList';
import FMHeader from '../../Base/Widget/FMHeader';
import FMBanner from '../../Base/Widget/FMBanner';
import Fonts from '../../../Common/Fonts';
import FMButton from '../../Base/Widget/FMButton';
import {ApiPostJson} from '../../../Api/RequestTool';
import Utils from '../../../Utils';
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
  setBox: {
    position: 'absolute',
    right: 23,
  },
  setText: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.PingFangSC_Regular,
  },
});
class MineCartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      type: 0, // 0非管理；1管理
      isSelAll: 0,
      price: 0,
      selPayList: [],
      selDelList: [],
      list: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const path = '/app-api/trade/cart/myCartList';
    const params = {
      // objType: 1,
    };
    const onSuccess = (res) => {
      let count = 0;
      const list = res.list || [];
      for (let i in list) {
        for (let j in list[i].spuList) {
          count++;
        }
      }
      this.setState({
        data: res,
        price: res.allAmount,
        list: res.list,
        count: count || 0,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  selItem = (id, type) => {
    const {selPayList} = this.state;
    const path = '/app-api/trade/cart/updateCartSelected';
    const params = {
      id,
      type,
    };
    const onSuccess = (res) => {
      this.getData();
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };

  handleBuy = () => {};

  handleDel = (ids) => {
    const {selPayList} = this.state;
    const path = '/app-api/trade/cart/deleteMyCartCount';
    const params = {
      ids,
    };
    const onSuccess = (res) => {
      Utils.Toast({text: '删除成功'});
      this.getData();
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };

  handleSelAll = () => {
    const {isSelAll} = this.state;
    const path = '/app-api/trade/cart/updateCartSelected';
    const params = {
      type: 3,
    };
    const onSuccess = (res) => {
      this.setState({
        isSelAll: !isSelAll,
      });
      this.getData();
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };

  handleSelDel = (id) => {
    const {selDelList} = this.state;
    const list = [...selDelList];
    console.log(list, list.includes(id), id);
    if (list.includes(id)) {
      list.splice(list.indexOf(id), 1);
    } else {
      list.push(id);
    }
    this.setState({
      selDelList: list,
    });
  };

  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {count, price, isSelAll, list, type, selDelList, selPayList} =
      this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title={`购物车（${count}）`}
          onLeftPress={() => {
            navigation.goBack();
          }}
          rightChildren={
            <TouchableOpacity
              style={styles.setBox}
              activeOpacity={1}
              onPress={() => {
                if (type) {
                  this.setState({
                    selDelList: [],
                  });
                }
                this.setState({
                  type: type ? 0 : 1,
                });
              }}>
              <Text
                style={[
                  styles.setText,
                  {
                    color: type ? '#FF9B00' : '#000',
                  },
                ]}>
                {!!type && '退出'}管理
              </Text>
            </TouchableOpacity>
          }
        />
        <CartList
          selList={type ? selDelList : selPayList}
          type={type}
          cartList={list}
          handleSel={this.selItem}
          handleDel={this.handleDel}
          selDelList={selDelList}
          handleSelDel={this.handleSelDel}
        />
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
            {!type && (
              <>
                <Text style={styles.priceTitle}>合计：</Text>
                <Text style={styles.price}>¥{price / 100}</Text>
              </>
            )}
            <FMButton
              darkShadowColor="#99C6BB"
              text={type ? '删除' : '结算'}
              textStyle={styles.buyBtnText}
              containerStyle={styles.buyButton}
              onPress={
                type ? this.handleDel.bind(this, selDelList) : this.handleBuy
              }
              unTouch={!price}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default MineCartPage;

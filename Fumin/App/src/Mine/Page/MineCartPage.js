/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CartList from '../Widget/CartList/CartList';
import FMHeader from '../../Base/Widget/FMHeader';
import FMSelPayWayPopUp from '../../Base/Widget/FMSelPayWayPopUp';
import Fonts from '../../../Common/Fonts';
import FMButton from '../../Base/Widget/FMButton';
import {ApiPostJson} from '../../../Api/RequestTool';
import Utils from '../../../Utils';
import Alipay from '@uiw/react-native-alipay';
import * as WeChat from 'react-native-wechat-lib';
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
      payType: 0,
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
  handleAliPay = (payInfo, callback) => {
    async function aliPay(aliCB) {
      // 支付宝端支付
      // payInfo 是后台拼接好的支付参数
      // return_url=
      const resule = await Alipay.alipay(payInfo);
      // const resule = await Alipay.alipay('alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021001166608171&biz_content=%7B%22body%22%3A%22%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85%22%2C%22out_trade_no%22%3A%2220210207153414T99T2%22%2C%22passback_params%22%3A%220%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E5%95%86%E5%93%81%E5%90%8D%E7%A7%B0%22%2C%22total_amount%22%3A%2218.0%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fpsptest.alsome.net.cn%2Fv1%2Falipay%2Fnotifyalipay&sign_type=RSA2&timestamp=2021-06-03+15%3A57%3A51&version=1.0&sign=Y07UGOyjpJHJQXh2IYrGF6ztuF5eXx1i3nGYSCYQYP%2B0GImwsxBSpsEoFQcmhFfA8VlWA2EXNc%2F5ZH%2FyQWUaG21W6ibdWWhU9rE%2BF3gvmRZchWh87TDaQexc%2FIZ46SuY%2FWGKXteBxjaeOygaXIt4kSUj%2B4GKAb7r10xDmyGdNK5ojBnuzyoeelojPv95m9iLIH0BA9olC%2FUnqqA9wstZJXcdLhMGC6wtfMIIHbCnjyebn%2BPOgYsGX0Dk6Y%2BJDuwAm9U6lbxPVK6IKO2VGU3IN6hfFHcCzJck1pkw0zf8Oc2LHQmTBaYhLbaXzVU%2BY95i61MwLuCL3mDQen76usY6%2Bw%3D%3D');
      console.log('alipay:resule-->>>', resule);
      aliCB(resule);
    }
    aliPay(callback);
  };
  handleBuy = () => {
    const {navigation} = this.props;
    const {payType} = this.state;
    const path = '/app-api/trade/order/createOrder';
    const params = {
      fromCart: true,
    };
    const onSuccess = (res) => {
      Utils.requestPay(
        {id: res.orderId, channelCode: payType ? 'wx_app' : 'alipay_app'},
        (resData) => {
          if (payType) {
            const data = resData.jsonBean.data;
            WeChat.pay({
              partnerId: data.partnerId,
              prepayId: data.prepayId,
              nonceStr: data.nonceStr,
              timeStamp: data.timestamp,
              package: data.packageVal,
              sign: data.sign,
            })
              .then((requestJson) => {
                console.log(requestJson);
                //支付成功回调
                if (requestJson.errCode == '0') {
                  //回调成功处理
                  Utils.Toast({text: '支付成功'});
                  navigation.navigate('MineNav', {
                    screen: 'MineOrderDetailPage',
                    params: {
                      id: res.orderId,
                    },
                  });
                  this.getData?.();
                  // this.getData();
                  this.getData();
                }
              })
              .catch((_err) => {
                Utils.Toast({text: '支付失败'});
                this.getData();
              });
          } else {
            const callback = (_respont) => {
              if (res.resultStatus === '9000') {
                Utils.Toast({text: '支付成功'});
                navigation.navigate('MineNav', {
                  screen: 'MineOrderDetailPage',
                  params: {
                    id: res.orderId,
                  },
                });
                this.getData();
                // getData?.();
              } else {
                Utils.Toast({text: '支付失败'});
              }
              console.log(res);
            };
            this.handleAliPay(resData?.jsonbean?.data, callback);
          }
        },
      );
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };

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
                type
                  ? this.handleDel.bind(this, selDelList)
                  : this?.refSelPay?.openModal
              }
              unTouch={!price}
            />
          </View>
        </View>
        <FMSelPayWayPopUp
          handleBuy={this.handleBuy}
          ref={(ref) => (this.refSelPay = ref)}
          price={price / 100}
        />
      </View>
    );
  }
}

export default MineCartPage;

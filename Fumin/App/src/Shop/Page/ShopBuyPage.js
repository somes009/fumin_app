import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FMHeader from '../../Base/Widget/FMHeader';
import FMAnimatableTabView from '../../Base/Widget/FMAnimatableTabView';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import FMImage from '../../Base/Widget/FMImage';
import {ApiPostJson} from '../../../Api/RequestTool';
import WeChat from 'react-native-wechat-lib';
export default class ShopBuyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: props.route?.params.orderId,
    };
    this.tagList = [{name: '商家邮寄'}, {name: '到店自取'}];
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const {orderId, status} = this.state;
    const path = '/app-api/trade/order/selectMyOrderDetail';
    const params = {
      id: orderId,
      status: 0,
    };
    const onSuccess = (res) => {
      this.setState({
        data: res.orderInfo,
        show: true,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  createOrder = (payType) => {
    let {orderId, buyCount} = this.state;
    const {navigation} = this.props;
    Utils.requestPay(
      {id: orderId, channelCode: payType ? 'wx_app' : 'alipay_app'},
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
                navigation.replace('MineNav', {
                  screen: 'MineOrderDetailPage',
                  params: {
                    id: orderId,
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
              navigation.replace('MineNav', {
                screen: 'MineOrderDetailPage',
                params: {
                  id: orderId,
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

  renderList = (item, index) => {
    return (
      <View
        key={index}
        style={{
          width: Utils.getScreenSize().width,
        }}>
        {index === 0 && this.renderSjyj()}
      </View>
    );
  };
  renderSjyj = () => {
    return (
      <View style={styles.main}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerIn}>
          <View style={{alignItems: 'center', width: '100%'}}>
            <View style={styles.placeBox}>
              <View style={styles.placeBoxTop}>
                <Text style={styles.userInfo}>王旭 16789856460</Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.changePlaceBox}>
                  <Text style={styles.changePlaceText}>修改</Text>
                </TouchableOpacity>
              </View>
              <Text numberOfLines={1} style={styles.placeText}>
                北京市 西城区 西直门外大街137号
              </Text>
            </View>
            <View style={styles.orderInfoBox}>
              <Text style={styles.shopName}>若溪润儿童用品企业店</Text>
              <View style={styles.orderInfoTopBox}>
                <FMImage style={styles.orderImg} />
                <View style={styles.orderInfo}>
                  <View style={styles.infoTopBox}>
                    <View style={styles.infoTop}>
                      <Text numberOfLines={1} style={styles.orderName}>
                        2023年新款儿童储2023年新款儿童储蓄
                      </Text>
                      <Text style={styles.orderPrice}>¥60</Text>
                    </View>
                    <View style={[styles.infoTop, {marginTop: 5}]}>
                      <Text style={styles.orderDesc}>【王子蓝】180*205</Text>
                      <Text style={styles.orderSize}>x1</Text>
                    </View>
                  </View>
                  <Text style={styles.orderSendTime}>付款后，**小时内发货</Text>
                </View>
              </View>
              <View style={styles.infoBottomBox}>
                <View style={styles.infoBottomItem}>
                  <Text style={styles.bottomTitle}>商品总价</Text>
                  <Text style={styles.bottomText}>¥60</Text>
                </View>
                <View style={styles.infoBottomItem}>
                  <Text style={styles.bottomTitle}>需付款</Text>
                  <Text style={styles.bottomText}>¥50</Text>
                </View>
                <View style={styles.infoBottomItem}>
                  <Text style={styles.bottomTitle}>订单编号</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[
                        styles.bottomText,
                        {
                          fontFamily: Fonts.PingFangSC_Regular,
                          color: '#6D7278',
                        },
                      ]}>
                      1663737887778887644
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Utils.copyText('1663737887778887644');
                      }}
                      activeOpacity={1}>
                      <Text style={styles.copyText}>复制</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.infoBottomItem}>
                  <Text style={styles.bottomTitle}>创建时间</Text>
                  <Text
                    style={[
                      styles.bottomText,
                      {fontFamily: Fonts.PingFangSC_Regular},
                    ]}>
                    2023-05-15 00:28:34
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title=""
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <FMAnimatableTabView
          tabItemStyle={{width: Utils.getScreenSize().width / 2}}
          lineStyle={styles.tabLine}
          tabList={this.tagList}
          data={this.tagList}
          unScroll
          renderItem={this.renderList}
          activeTextStyle={{
            color: '#FF9B00',
          }}
        />
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={1} style={styles.addBtn}>
            <Text style={styles.addBtnText}>加入购物车</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.buyBtn}>
            <Text style={styles.buyBtnText}>立即购买</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
  },
  tabLine: {
    width: 63,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF9B00',
  },
  main: {
    flex: 1,
  },
  containerIn: {
    paddingBottom: 100,
    width: '100%',
  },
  placeBox: {
    width: 343,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 12,
    padding: 16,
    paddingLeft: 14,
    justifyContent: 'space-between',
  },
  placeBoxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  changePlaceBox: {
    width: 47,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePlaceText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  placeText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
    marginTop: 8,
  },
  orderInfoBox: {
    width: 343,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 12,
    padding: 16,
    paddingLeft: 14,
    paddingBottom: 24,
  },
  shopName: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  orderInfoTopBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  orderImg: {
    width: 83,
    height: 83,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  orderInfo: {
    marginLeft: 14,
    height: 83,
    justifyContent: 'space-between',
    flex: 1,
  },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderName: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
    width: 163,
  },
  orderPrice: {
    fontSize: 16,
    fontFamily: Fonts.DIN_Alternate,
    color: '#000',
  },
  orderDesc: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  orderSize: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  orderSendTime: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  infoBottomBox: {
    marginTop: 16,
  },
  infoBottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 19,
  },
  bottomTitle: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  bottomText: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.DIN_Alternate,
    color: '#000',
  },
  copyText: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
    paddingLeft: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingRight: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
  },
  buyBtn: {
    width: 95,
    height: 33,
    borderRadius: 8,
    backgroundColor: '#FF9B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
  addBtn: {
    width: 95,
    height: 33,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF9B00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addBtnText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#FF9B00',
  },
});

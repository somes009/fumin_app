/* eslint-disable radix */
//待付款
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FMImage from '../../Base/Widget/FMImage';
import FMListSelPop from '../../Base/Widget/FMListSelPop';
import Fonts from '../../../Common/Fonts';
import Utils from '../../../Utils';
import {ApiPostJson} from '../../../Api/RequestTool';
import FMSelPayWayPopUp from '../../Base/Widget/FMSelPayWayPopUp';
import Images from '../../../Images';
import Alipay from '@uiw/react-native-alipay';
import * as WeChat from 'react-native-wechat-lib';
const MineObligationItem = ({onPress, item, navigation, handleRef}) => {
  const [payType, setPayType] = useState(0);
  let refCancel = {};
  let refSelPay = {};
  const handleAliPay = (payInfo, callback) => {
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
  const createOrder = (payType) => {
    Utils.requestPay(
      {id: item.orderId, channelCode: payType ? 'wx_app' : 'alipay_app'},
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
                // this.getData();
              }
            })
            .catch((_err) => {
              Utils.Toast({text: '支付失败'});
            });
        } else {
          const callback = (_respont) => {
            if (_respont.resultStatus === '9000') {
              Utils.Toast({text: '支付成功'});
              handleRef?.();
              // getData?.();
            } else {
              Utils.Toast({text: '支付失败'});
            }
            console.log(_respont);
          };
          handleAliPay(resData?.jsonbean?.data, callback);
        }
      },
    );
  };
  const handleBuy = () => {
    const callback = (res) => {
      if (res.resultStatus === '9000') {
        Utils.Toast({text: '支付成功'});
        // getData?.();
        handleRef?.();
      } else {
        Utils.Toast({text: '支付失败'});
      }
      console.log(res);
    };
    this.handleAliPay(
      'alipay_root_cert_sn=687b59193f3f462dd5336e5abf83c5d8_02941eef3187dddf3d3b83462e1dfcf6&alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_cert_sn=129d4d2ebf3c2883f9064c0a397080aa&app_id=2021003199665941&biz_content=%7B%22out_trade_no%22%3A%2220230627171438808291%22%2C%22passback_params%22%3A%221%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E6%B5%8B%E8%AF%95%E5%A4%9A%E5%9B%BE%E7%89%87%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%221231%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fndstest.mindtrip.com%2Fpay%2Fv2%2Falipay%2Fnotifyalipay&sign=cmRGTH2amAAN1ikKPfoPRhHkznCU5SuVhZ0alyl86LwofFrfo1VdybI%2BFQVmDGe0%2F36zrdd0UhEDktR2pQn2BRtw2yWKAJukcPGRy5wafEB%2BrLgknmAuZsNSl%2BH1Fh2EAidHZvn63OgTqk5qGtB8psRIzyPz1YqZfl3FGTha1n%2B9sfoqeJKYIoxEjDAy9xS%2FozWwlOwl09TOlRRt75ErT0BnN8rfxyRG6BZVWrqDzk2P7SF7jpkii3jYrXlUkOeF6J9XvmmGBYjl6DZmLOvAWH4OA1O9pqdVWDNDv%2F0vwZgfRuI%2FUcLedTOge%2B6PU%2FdXOmZvLtcC%2BAQc%2FAMCyv5KuQ%3D%3D&sign_type=RSA2&timestamp=2023-06-27+17%3A14%3A38&version=1.0',
      callback,
    );
  };
  let price = 0;
  for( let i in item.orderItemVos) {
    price += item.orderItemVos[i].spuPrice;
  }
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.item}>
      <View style={styles.titleBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('IndexNav', {
              screen: 'ShopDetailPage',
              params: {
                shopId: item.pmId,
              },
            });
          }}
          activeOpacity={1}
          style={styles.shopNameBox}>
          <Text style={styles.shopName}>{item?.pmName}</Text>
          <FMImage source={Images.toRightGray} style={styles.toRight} />
        </TouchableOpacity>
        <Text style={styles.state}>等待买家付款</Text>
      </View>
      {item?.orderItemVos?.map((data, i) => {
        return (
          <View key={i}>
            <View style={styles.infoBox}>
              <FMImage source={{uri: data?.spuLogo}} style={styles.img} />
              <View style={styles.infoRight}>
                <View style={styles.righrTop}>
                  <Text numberOfLines={2} style={styles.productName}>
                    {data?.spuName}
                  </Text>
                  <Text style={styles.price}>￥{data?.spuPrice / 100}</Text>
                </View>
                <Text style={styles.size}>x1</Text>
              </View>
            </View>
            <View style={styles.warpBox}>
              <Text style={styles.warpText1}>付款后</Text>
              <Text style={styles.warpText2}>**天内发货</Text>
            </View>
          </View>
        );
      })}
      <Text style={styles.needPrice}>需付款：￥{price / 100}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            refCancel.openModal();
          }}
          activeOpacity={1}
          style={styles.button}>
          <Text style={styles.buttonText}>取消订单</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MineNav', {
              screen: 'MinePlaceListPage',
              params: {
                changePlace: (placeData) => {
                  const path = '/app-api/trade/order/updateOrderAddresses';
                  const params = {
                    orderId: item.orderId,
                    adressId: placeData.id,
                  };
                  const onSuccess = (res) => {
                    Utils.Toast({text: '修改成功'});
                    handleRef?.();
                  };
                  ApiPostJson({
                    path,
                    params,
                    onSuccess,
                  });
                },
                type: 2,
              },
            });
          }}
          activeOpacity={1}
          style={styles.button}>
          <Text style={styles.buttonText}>修改地址</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            refSelPay.openModal();
          }}
          activeOpacity={1}
          style={styles.button}>
          <Text style={styles.buttonText}>继续付款</Text>
        </TouchableOpacity>
      </View>
      <FMListSelPop
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
          const path = '/app-api/trade/order/cancelOrderForAPP';
          const params = {
            orderId: item.orderId,
          };
          const onSuccess = (res) => {
            Utils.Toast({text: '取消成功'});
            handleRef?.();
          };
          ApiPostJson({
            path,
            params,
            onSuccess,
          });
        }}
      />
      <FMSelPayWayPopUp
        handleBuy={createOrder}
        ref={(ref) => (refSelPay = ref)}
        price={price / 100}
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

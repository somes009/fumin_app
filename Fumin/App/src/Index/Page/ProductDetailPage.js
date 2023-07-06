/* eslint-disable react-native/no-inline-styles */
//课程详情页
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Images from '../../../Images';
import {ApiPostJson} from '../../../Api/RequestTool';
import Utils from '../../../Utils';
import XXYJHeader from '../../Base/Widget/XXYJHeader';
import Fonts from '../../../Common/Fonts';
import XXYJImage from '../../Base/Widget/XXYJImage';
import XXYJSelPayWayPopUp from '../../Base/Widget/XXYJSelPayWayPopUp';
import SelProductPopUp from '../../Base/Widget/SelProductPopUp';
import ProductDetailItem from '../Widget/ProductDetailItem';
import Alipay from '@uiw/react-native-alipay';

export default class ShopDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      lookList: [],
      sortType: 0,
      id: props.route.params.id,
    };
    this.webViewHeight = 1;
  }
  componentDidMount() {
    this.getData();
  }
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
  getData = () => {
    let {id} = this.state;
    const path = '/app-api/product/merchant/auth/getProductMerchantSpuDetail';
    const params = {
      id,
    };
    const onSuccess = (res) => {
      this.setState({
        data: res,
        lookList: res.lookList,
      });
    };
    const onFailure = () => {};
    ApiPostJson({path, params, onSuccess, onFailure});
  };

  handleBuy = () => {
    const callback = (res) => {
      if (res.resultStatus === '9000') {
        Utils.Toast({text: '支付成功'});
        // getData?.();
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
  renderPlaceBox = () => {
    const {data} = this.state;
    return (
      <View style={styles.placeBox}>
        <View style={styles.leftBox}>
          <View style={styles.leftTop}>
            <Text style={styles.city}>{data.address}</Text>
            <Text style={styles.kuaidi}>快递：免运费</Text>
          </View>
          <Text style={styles.toText}>配送至：北京海淀区马家堡</Text>
        </View>
        <XXYJImage style={styles.toRight} />
      </View>
    );
  };

  addCart = () => {
    const {id} = this.state;
    const path = '/app-api/trade/cart/addMyCart';
    const params = {
      id,
    };
    const onSuccess = (res) => {
      Utils.Toast({text: '添加成功'});
    };
    const onFailure = () => {};
    ApiPostJson({path, params, onSuccess, onFailure});
  };
  render() {
    const {safeAreaInsets, navigation, isFocused} = this.props;
    const {data, lookList} = this.state;

    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJImage style={styles.topImg} />
        <XXYJHeader
          safeAreaInsets={safeAreaInsets}
          title={''}
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.mainBox}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.containerIn}>
            <View
              style={{
                alignItems: 'center',
                minHeight: Utils.getScreenSize().height,
              }}>
              <View style={styles.main}>
                <Text style={styles.price}>¥{(data.amount || 0) / 100}</Text>
                <Text style={styles.name}>{data.name}</Text>
                {this.renderPlaceBox()}
                <XXYJImage style={styles.descImg} />
                <Text style={styles.lookTitle}>看了又看</Text>
                <View style={styles.list}>
                  {lookList.map((item, index) => {
                    return (
                      <ProductDetailItem
                        key={index}
                        item={item}
                        navigation={navigation}
                        onPress={() => {
                          this.setState(
                            {
                              id: item.spuId,
                            },
                            this.getData,
                          );
                        }}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomBox}>
          <TouchableOpacity
            onPress={this.addCart}
            activeOpacity={1}
            style={styles.addBtn}>
            <Text style={styles.addText}>加入购物车</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.refSelProduct.openModal();
            }}
            activeOpacity={1}
            style={styles.buyBtn}>
            <Text style={styles.buyText}>立即购买</Text>
          </TouchableOpacity>
        </View>
        <XXYJSelPayWayPopUp
          handlePay={this.handleBuy}
          ref={(ref) => (this.refSelPay = ref)}
        />
        <SelProductPopUp
          handleBuy={() => {
            this.refSelProduct.closeModal();
            setTimeout(() => {
              this.refSelPay.openModal();
            }, 300);
          }}
          ref={(ref) => (this.refSelProduct = ref)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // paddingHorizontal: 12.5,
    flex: 1,
    backgroundColor: '#eee',
    position: 'relative',
  },
  containerIn: {
    width: Utils.getScreenSize().width,
    paddingTop: 250,
  },
  mainBox: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: 'hidden',
    paddingBottom: 100,
  },
  main: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  topImg: {
    width: '100%',
    position: 'absolute',
    height: 375,
    top: 0,
    backgroundColor: '#eee',
  },
  price: {
    fontSize: 25,
    lineHeight: 29,
    fontFamily: Fonts.DIN_Alternate,
    color: '#FF9B00',
    width: '100%',
  },
  name: {
    marginTop: 14,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  placeBox: {
    width: 340,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftTop: {
    flexDirection: 'row',
  },
  city: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  kuaidi: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
    marginLeft: 30,
  },
  toText: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  toRight: {
    width: 7,
    height: 13,
    backgroundColor: '#eee',
  },
  descImg: {
    marginTop: 10,
    width: 340,
    height: 526,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  lookTitle: {
    marginTop: 17,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 3,
  },
  bottomBox: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
    paddingRight: 16,
  },
  buyBtn: {
    width: 95,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#FF9B00',
    marginLeft: 16,
  },
  buyText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
  addBtn: {
    width: 95,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#FF9B00',
    borderWidth: 1,
  },
  addText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#FF9B00',
  },
});

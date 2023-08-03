/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import FMHeader from '../../Base/Widget/FMHeader';
import MineFansItem from '../Widget/MineFansItem';
import FMFlatList from '../../Base/Widget/FMFlatList';
import FMImage from '../../Base/Widget/FMImage';
import Images from '../../../Images';
import {ApiPostJson} from '../../../Api/RequestTool';

export default class MineOrderDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route?.params.id,
      status: props.route?.params.status,
      data: {},
      show: false,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {id, status} = this.state;
    const path = '/app-api/trade/order/selectMyOrderDetail';
    const params = {
      id,
      status,
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
  renderInfo = () => {
    const {data} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.infoTopBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('IndexNav', {
              screen: 'ShopDetailPage',
              params: {
                shopId: data.pmId,
              },
            });
          }}
          activeOpacity={1}
          style={styles.pmNameBox}>
          <Text style={styles.pmName}>{data.pmName}</Text>
          <FMImage source={Images.toRightGray} style={styles.toRight} />
        </TouchableOpacity>
        <View style={styles.infoBottom}>
          <View style={styles.infoBottomLeft}>
            <FMImage style={styles.spuPic} />
            <Text numberOfLines={2} style={styles.spuName}>
              {data.spuName}
            </Text>
          </View>
          <View style={styles.infoBottomRight}>
            <Text style={styles.price}>￥{data.orderPrice}</Text>
            <Text style={styles.num}>x{data.productCount}</Text>
          </View>
        </View>
      </View>
    );
  };
  addCart = () => {
    const {data} = this.state;
    const path = '/app-api/trade/cart/addMyCart';
    const params = {
      id: data.spuId,
    };
    const onSuccess = (_res) => {
      Utils.Toast({text: '添加成功'});
    };
    const onFailure = () => {};
    ApiPostJson({path, params, onSuccess, onFailure});
  };
  renderMainButton = () => {
    const {data} = this.state;
    return (
      <View style={styles.mainButtons}>
        {/* <TouchableOpacity style={styles.mainButton} activeOpacity={1}>
          <Text style={styles.buttonText}>申请售后</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.mainButton, {marginLeft: 15}]}
          onPress={this.addCart}
          activeOpacity={1}>
          <Text style={styles.buttonText}>加入购物车</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderInfoBottom = () => {
    const {data} = this.state;
    return (
      <View style={styles.priceBox}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>商品总价</Text>
          <Text style={styles.priceText}>¥{data.orderPrice}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>消耗红包金</Text>
          <Text style={styles.priceText}>-{data.hbj}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>实付款</Text>
          <Text style={styles.priceText}>¥{data.payPrice}</Text>
        </View>
        <View style={[styles.infoBox, {alignItems: 'flex-start'}]}>
          <Text style={styles.infoTitle}>收货信息</Text>
          <Text style={[styles.infoText, {width: 200}]}>
            {data.receiverName}，{data.receiverMobile}，
            {data.receiverDetailAddress}
          </Text>
        </View>
        <View style={[styles.infoBox]}>
          <Text style={styles.infoTitle}>订单编号</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.infoText}>{data.orderNo} | </Text>
            <TouchableOpacity
              onPress={() => {
                Utils.copyText(data.orderNo);
              }}
              activeOpacity={1}>
              <Text
                style={[
                  styles.infoText,
                  {
                    color: '#000',
                    fontSize: Utils.properWidth(15),
                    lineHeight: Utils.properWidth(21),
                  },
                ]}>
                复制
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.infoBox]}>
          <Text style={styles.infoTitle}>支付宝交易号</Text>
          <Text style={[styles.infoText]}>{data.receiverAreaId}</Text>
        </View>
        <View style={[styles.infoBox]}>
          <Text style={styles.infoTitle}>创建时间</Text>
          <Text style={[styles.infoText]}>{data.createTime}</Text>
        </View>
        {!!data.payTime && (
          <View style={[styles.infoBox]}>
            <Text style={styles.infoTitle}>付款时间</Text>
            <Text style={[styles.infoText]}>{data.payTime}</Text>
          </View>
        )}
        {!!data.deliveryTime && (
          <View style={[styles.infoBox]}>
            <Text style={styles.infoTitle}>发货时间</Text>
            <Text style={[styles.infoText]}>{data.deliveryTime}</Text>
          </View>
        )}
        {!!data.finishTime && (
          <View style={[styles.infoBox]}>
            <Text style={styles.infoTitle}>成交时间</Text>
            <Text style={[styles.infoText]}>{data.finishTime}</Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {data, show} = this.state;
    // if (!show) {
    //   return <View />;
    // }
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title="交易成功"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerIn}>
          <View
            style={{
              alignItems: 'center',
              paddingBottom: 22,
              width: Utils.getScreenSize().width,
            }}>
            <View style={styles.main}>
              {this.renderInfo()}
              {this.renderMainButton()}
              {this.renderInfoBottom()}
            </View>
          </View>
        </ScrollView>
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
  list: {
    width: '100%',
    marginTop: 30,
  },
  main: {
    width: Utils.properWidth(356),
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 13,
    paddingTop: 16,
    paddingBottom: 22,
  },
  pmNameBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pmName: {
    fontSize: Utils.properWidth(16),
    lineHeight: Utils.properWidth(22),
    fontFamily: Fonts.PingFangSC_Medium,
  },
  toRight: {
    marginLeft: 3,
    width: 7,
    height: 13,
  },
  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  infoBottomLeft: {
    flexDirection: 'row',
  },
  spuPic: {
    width: Utils.properWidth(73),
    height: Utils.properWidth(73),
    borderRadius: Utils.properWidth(10),
    backgroundColor: '#eee',
  },
  spuName: {
    marginLeft: 11,
    fontSize: Utils.properWidth(15),
    lineHeight: Utils.properWidth(21),
    fontFamily: Fonts.PingFangSC_Regular,
    width: Utils.properWidth(155),
  },
  infoBottomRight: {
    alignItems: 'flex-end',
  },
  price: {
    fontFamily: Fonts.DIN_Alternate,
    fontSize: Utils.properWidth(15),
    lineHeight: Utils.properWidth(17),
  },
  num: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: Utils.properWidth(15),
    lineHeight: Utils.properWidth(21),
    marginTop: 13,
  },
  mainButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 3,
  },
  mainButton: {
    paddingHorizontal: Utils.properWidth(10),
    paddingVertical: Utils.properWidth(5),
    borderRadius: Utils.properWidth(15),
    borderWidth: 1,
    borderColor: '#979797',
  },
  buttonText: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: Utils.properWidth(15),
    lineHeight: Utils.properWidth(21),
  },
  infoBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  infoTitle: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: Utils.properWidth(15),
    lineHeight: Utils.properWidth(21),
  },
  priceText: {
    fontFamily: Fonts.DIN_Alternate,
    fontSize: Utils.properWidth(15),
    lineHeight: Utils.properWidth(21),
  },
  infoText: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: Utils.properWidth(13),
    lineHeight: Utils.properWidth(17),
    color: '#6D7278',
  },
});

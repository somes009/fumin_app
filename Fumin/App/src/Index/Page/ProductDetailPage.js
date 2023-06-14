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
        <XXYJSelPayWayPopUp ref={(ref) => (this.refSelPay = ref)} />
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

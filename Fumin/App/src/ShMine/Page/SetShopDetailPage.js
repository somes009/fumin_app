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
import FMHeader from '../../Base/Widget/FMHeader';
import Fonts from '../../../Common/Fonts';
import FMImage from '../../Base/Widget/FMImage';
import ShopDetailItem from '../Widget/ShopDetailItem';
import FMFlatList from '../../Base/Widget/FMFlatList';
export default class SetShopDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sortType: 0,
      id: props.route.params.shopId || 1,
    };
    this.webViewHeight = 1;
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    let {id} = this.state;
    const path = '/app-api/product/merchant/auth/getProductMerchantDetail';
    const params = {
      id,
    };
    const onSuccess = (res) => {
      this.setState({
        data: res.info,
      });
    };
    const onFailure = () => {};
    ApiPostJson({path, params, onSuccess, onFailure});
  };
  renderInfo = () => {
    const {data} = this.state;
    return (
      <View style={styles.infoBox}>
        <FMImage source={{uri: data.logo}} style={styles.img} />
        <View style={styles.infoRight}>
          <Text style={styles.title}>{data.name}</Text>
          <Text numberOfLines={2} style={styles.desc}>
            门店简介：{data.description}
          </Text>
        </View>
      </View>
    );
  };

  renderTab = () => {
    const {sortType} = this.state;
    const list = ['综合', '销量', '价格'];
    return (
      <View style={styles.sortList}>
        {list.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  sortType: index,
                });
              }}
              activeOpacity={1}
              key={index}>
              <Text
                style={[
                  styles.sortText,
                  {color: sortType === index ? '#FF9B00' : '#000'},
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  render() {
    const {safeAreaInsets, navigation, isFocused} = this.props;
    const {data, id} = this.state;

    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMImage source={{uri: data.bgImg}} style={styles.topImg} />
        <FMHeader
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
                {this.renderInfo()}
                {this.renderTab()}
                <FMFlatList
                  ref={(ref) => (this.refCourse = ref)}
                  isApiPostJson
                  style={{flex: 1, width: Utils.getScreenSize().width}}
                  requestPath="/app-api/product/merchant/auth/selectProductMerchantSpuList"
                  requestParams={{
                    id,
                  }}
                  keyExtractor={(item) => item?.id}
                  numColumns={2}
                  renderItem={({item, index}) => {
                    return (
                      <ShopDetailItem
                        key={index + 'item'}
                        item={item}
                        style={{
                          marginLeft: index % 2 ? Utils.properWidth(8) : 0,
                        }}
                        onPress={() => {
                          navigation.navigate('ProductDetailPage', {
                            id: item.spuId,
                          });
                        }}
                      />
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 20,
                    // paddingHorizontal: Utils.properWidth(16),
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
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
    paddingTop: 85,
  },
  mainBox: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: 'hidden',
  },
  main: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: Utils.properWidth(16),
    flex: 1,
    paddingBottom: 100,
  },
  topImg: {
    width: '100%',
    position: 'absolute',
    height: 155,
    top: 0,
    backgroundColor: '#eee',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 83,
    height: 83,
    borderRadius: 9,
    backgroundColor: '#eee',
  },
  infoRight: {
    width: 249,
    height: 83,
    paddingVertical: 3,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  desc: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  sortList: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: -10,
  },
  sortText: {
    margin: 10,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
  },
});

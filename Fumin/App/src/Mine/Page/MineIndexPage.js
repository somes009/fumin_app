/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import FMImage from '../../Base/Widget/FMImage';
import FMBanner from '../../Base/Widget/FMBanner';
import CommonButtonsPopUp from '../../Base/Widget/CommonButtonsPopUp';
import {ApiPostJson} from '../../../Api/RequestTool';
import Images from '../../../Images';
import {mapDispatchToProps, mapStateToProps} from '../../store/actionCreators';
import EventBus, {EventBusName} from '../../../Api/EventBus';

class MineIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showYqm: false,
      selPayList: [],
      selDelList: [],
      banners: [],
    };
    this.orderIcon = {
      0: Images.waitPayIcon,
      10: Images.waitSendIcon,
      20: Images.waitReceiveIcon,
      50: Images.waitUseIcon,
      30: Images.isEndIcon,
      60: Images.shouhouIcon,
    };
  }
  componentDidMount() {
    // console.log(this.props);
    const {navigation} = this.props;
    this.backHandler = navigation.addListener('focus', () => {
      // 在这里编写页面成为焦点页面时需要执行的操作
      console.log('页面成为焦点页面');
      this.getData();
    });
    this.getData();
    this.getBanner();
  }

  componentWillUnmount() {
    this.backHandler.remove?.();
  }

  getData = () => {
    const path = '/app-api/member/auth/myPageDetail';
    const params = {
      // objType: 1,
    };
    const onSuccess = (res) => {
      this.setState({
        data: res,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };

  getBanner = () => {
    const path = '/app-api/advertising/auth/getAdvertisingList';
    const params = {
      type: 1,
    };
    const onSuccess = (res) => {
      this.setState({
        banners: res.list,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };

  openChange = () => {
    this.refPop.openModal({
      title: '',
      list: [
        {
          text: '切换理事',
          color: '#0091FF',
          fun: () => {
            EventBus.post(EventBusName.CHANGE_USER_TYPE, {
              userType: 2,
            });
            this.refPop.closeModal();
          },
        },
        {
          text: '切换用户',
          color: '#0091FF',
          fun: () => {
            EventBus.post(EventBusName.CHANGE_USER_TYPE, {
              userType: 1,
            });
            this.refPop.closeModal();
          },
        },
      ],
    });
  };

  renderInfo = () => {
    const {navigation} = this.props;
    const {data} = this.state;
    return (
      <View style={[styles.infoBox]}>
        <View style={styles.infoBoxLeft}>
          <FMImage source={{uri: data.avatar}} style={styles.userImg} />
          <View style={styles.userinfoLeft}>
            <Text style={styles.username}>{data?.nickname || '昵称'}</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('MineNav', {
                  screen: 'MineFansPage',
                });
              }}>
              <Text style={styles.userfans}>粉丝 {data?.fsCount}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoBoxRight}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MineNav', {
                screen: 'MineCartPage',
              });
            }}
            activeOpacity={0.8}
            style={styles.changeTypeBox}>
            <FMImage style={styles.changeTypeImg} />
            <Text style={styles.changeTypeText}>购物车</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.openChange}
            activeOpacity={0.8}
            style={styles.changeTypeBox}>
            <FMImage source={{uri: Images.logo}} style={styles.changeTypeImg} />
            <Text style={styles.changeTypeText}>切换身份</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('MineNav', {
              //   screen: 'MineCartPage',
              // });
              navigation.navigate('MineNav', {
                screen: 'MineSetUpPage',
              });
            }}
            activeOpacity={0.8}
            style={styles.setUpBox}>
            <Image source={Images.mineSetIcon} style={styles.setUpImg} />
            <Text style={styles.setUpText}>设置</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  handlePressBanner = () => {};

  renderBanner = () => {
    const {banners} = this.state;
    const bannerList = [{pic: '1'}, {pic: '1'}, {pic: '1'}];
    if (!banners.length) {
      return;
    }
    return (
      <FMBanner
        style={{marginTop: 19}}
        itemWidth={343}
        height={104}
        loop
        autoplay
        autoplayInterval={5000}
        imgs={banners}
        onPress={this.handlePressBanner}
        imgName={'adImage'}
      />
    );
  };

  renderAsset = () => {
    const {navigation} = this.props;
    const {data} = this.state;
    return (
      <View style={styles.assetBox}>
        <Text style={styles.boxTitle}>我的资产</Text>
        <View style={styles.assetList}>
          {data?.myZcList?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.assetItem}
                key={index}
                onPress={() => {
                  navigation.navigate('MineNav', {
                    screen: 'MineOrderScorePage',
                    params: {
                      name: item.name,
                      type: item.type,
                    },
                  });
                }}
                activeOpacity={1}>
                <Text style={styles.assetNum}>{item.zhi}</Text>
                <View style={styles.assetBottom}>
                  <Text style={styles.assetName}>{item.name}</Text>
                  <FMImage
                    style={styles.assetToRight}
                    source={Images.toRightGray}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  renderOrder = () => {
    const {navigation} = this.props;
    const {data} = this.state;
    return (
      <View style={styles.assetBox}>
        <Text style={styles.boxTitle}>我的订单</Text>
        <View style={styles.assetList}>
          {data?.orderList?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.assetItem}
                key={index}
                onPress={() => {
                  navigation.navigate('MineNav', {
                    screen: 'MineOrderPage',
                    params: {
                      status: index + 1,
                    },
                  });
                }}
                activeOpacity={1}>
                <FMImage
                  source={this.orderIcon[item.type]}
                  style={styles.orderImg}
                />
                <View style={styles.assetBottom}>
                  <Text style={styles.assetName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  renderMineBottom = () => {
    const {navigation} = this.props;
    const list = [
      {
        name: '我的邀请码',
        fun: () => {
          this.setState({
            showYqm: true,
          });
        },
      },
      {
        name: '我的商家',
        fun: () => {
          navigation.navigate('MineNav', {
            screen: 'MineShopPage',
          });
        },
      },
      {
        name: '申请理事',
        fun: () => {
          navigation.navigate('MineNav', {
            screen: 'MineApplyLSPage',
          });
        },
      },
      {
        name: '申请经理',
        fun: () => {
          navigation.navigate('MineNav', {
            screen: 'MineApplyJLPage',
          });
        },
      },
      // {
      //   name: '我要开店',
      //   fun: () => {},
      // },
      // {
      //   name: '我要投诉',
      //   fun: () => {},
      // },
    ];
    return (
      <View style={styles.bottomBox}>
        {list.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={item.fun}
              style={styles.bottomItem}>
              <View
                style={[
                  styles.bottomItemIn,
                  index === 5
                    ? {}
                    : {
                        borderBottomWidth: 1,
                      },
                ]}>
                <Text style={styles.bottomName}>{item.name}</Text>
                <FMImage
                  style={styles.bottomToRight}
                  source={Images.toRightOrange}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderYqm = () => {
    const {data} = this.state;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.setState({
            showYqm: false,
          });
        }}
        style={styles.mark}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={styles.yqmBox}>
          <Text style={styles.yqmText}>
            邀请码：<Text style={{color: '#FF9B00'}}>{data.inviteCode}</Text>
          </Text>
          <TouchableOpacity
            onPress={Utils.copyText.bind(this, data.inviteCode)}
            activeOpacity={1}>
            <Text style={styles.copyText}>复制</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {showYqm} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerIn}>
          <View
            style={{
              alignItems: 'center',
            }}>
            {this.renderInfo()}
            {this.renderBanner()}
            {this.renderAsset()}
            {this.renderOrder()}
            {this.renderMineBottom()}
          </View>
        </ScrollView>
        {showYqm && this.renderYqm()}
        <CommonButtonsPopUp ref={(ref) => (this.refPop = ref)} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MineIndexPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
  },
  containerIn: {
    paddingBottom: 100,
    width: 375,
  },
  infoBox: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 33,
  },
  infoBoxLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImg: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  userinfoLeft: {
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: Fonts.PingFangSC_Medium,
  },
  userfans: {
    fontSize: 13,
    lineHeight: 17,
    marginTop: 5,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#6D7278',
  },
  infoBoxRight: {
    flexDirection: 'row',
  },
  changeTypeBox: {
    alignItems: 'center',
  },
  changeTypeImg: {
    width: 23,
    height: 22,
  },
  changeTypeText: {
    marginTop: 5,
  },
  setUpBox: {
    alignItems: 'center',
    marginLeft: 15,
  },
  setUpImg: {
    width: 23,
    height: 22,
  },
  setUpText: {
    marginTop: 5,
  },
  assetBox: {
    width: 340,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  assetList: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  assetItem: {
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  assetNum: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.DIN_Alternate,
    fontWeight: 'bold',
    color: '#000000',
  },
  assetBottom: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  assetName: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  assetToRight: {
    width: 5,
    height: 9,
    marginLeft: 3,
  },
  orderImg: {
    width: 21,
    height: 21,
  },
  bottomBox: {
    width: 340,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 14,
  },
  bottomItemIn: {
    width: '100%',
    borderBottomColor: '#E9E9E9',
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomName: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
  },
  bottomToRight: {
    width: 7,
    height: 11,
  },
  mark: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  yqmBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 289,
    height: 55,
  },
  yqmText: {
    fontSize: 18,
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
  },
  copyText: {
    margin: 7,
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
});

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
import XXYJImage from '../../Base/Widget/XXYJImage';
import XXYJBanner from '../../Base/Widget/XXYJBanner';
import CommonButtonsPopUp from '../../Base/Widget/CommonButtonsPopUp';
import {ApiPostJson} from '../../../Api/RequestTool';
import Images from '../../../Images';
import {mapDispatchToProps, mapStateToProps} from '../../store/actionCreators';
import EventBus, {EventBusName} from '../../../Api/EventBus';

class ShMineIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showYqm: false,
      selPayList: [],
      selDelList: [],
      banners: [],
    };
  }
  componentDidMount() {
    // console.log(this.props);
    this.getData();
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

  renderInfo = () => {
    const {navigation} = this.props;
    const {data} = this.state;
    return (
      <View style={[styles.infoBox]}>
        <View style={styles.infoBoxLeft}>
          <XXYJImage source={{uri: data.avatar}} style={styles.userImg} />
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
            onPress={this.openChange}
            activeOpacity={0.8}
            style={styles.changeTypeBox}>
            <XXYJImage style={styles.changeTypeImg} />
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
  renderMineBottom = () => {
    const {navigation} = this.props;
    const list = [
      {
        name: '门店信息管理',
        fun: () => {
          navigation.navigate('ShShopNav', {
            screen: 'SetShopDetailPage',
          });
        },
      },
      {
        name: '资产管理',
        fun: () => {
          navigation.navigate('SetShopNav', {
            screen: 'SetShopDetailPage',
          });
        },
      },
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
                <XXYJImage
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
            {this.renderMineBottom()}
          </View>
        </ScrollView>
        <CommonButtonsPopUp ref={(ref) => (this.refPop = ref)} />
      </View>
    );
  }
}

export default ShMineIndexPage;

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
    backgroundColor: '#eee',
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
});

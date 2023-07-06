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
import XXYJHeader from '../../Base/Widget/XXYJHeader';
import MineFansItem from '../Widget/MineFansItem';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';
import XXYJImage from '../../Base/Widget/XXYJImage';
import Images from '../../../Images';

export default class MineOrderDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderInfo = () => {
    return (
      <View style={styles.infoBox}>
        <TouchableOpacity activeOpacity={1} style={styles.pmNameBox}>
          <Text style={styles.pmName}>shibook旗舰店</Text>
          <XXYJImage source={Images.toRightGray} style={styles.toRight} />
        </TouchableOpacity>
        <View style={styles.infoBottom}>
          <View style={styles.infoBottomLeft}>
            <XXYJImage style={styles.spuPic} />
            <Text numberOfLines={2} style={styles.spuName}>
              2023盒装高档91件套取
            </Text>
          </View>
          <View style={styles.infoBottomRight}>
            <Text style={styles.price}>￥1199.00</Text>
            <Text style={styles.num}>x1</Text>
          </View>
        </View>
      </View>
    );
  };

  renderMainButton = () => {
    return (
      <View style={styles.mainButtons}>
        <TouchableOpacity style={styles.mainButton} activeOpacity={1}>
          <Text style={styles.buttonText}>申请售后</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainButton, {marginLeft: 15}]}
          activeOpacity={1}>
          <Text style={styles.buttonText}>加入购物车</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
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
});

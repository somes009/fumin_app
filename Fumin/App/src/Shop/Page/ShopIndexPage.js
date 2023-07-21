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
import FMAnimatableTabView from '../../Base/Widget/FMAnimatableTabView';
import FMBanner from '../../Base/Widget/FMBanner';
import ShopIndexList from '../Widget/ShopIndexList';

export default class MineOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.tagList = [{name: '红包抵现'}, {name: '福豆商城'}];
  }

  renderList = (item, index) => {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View
        key={index}
        style={{
          width: Utils.getScreenSize().width,
          alignItems: 'center',
        }}>
        <ShopIndexList index={index} navigation={navigation} />
      </View>
    );
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
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
    height: 4,
    borderRadius: 4,
    backgroundColor: '#FF9B00',
  },
  searchBox: {
    width: 343,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F1F1',
    marginTop: 36,
    justifyContent: 'center',
    paddingLeft: 19,
  },
  searchText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
});

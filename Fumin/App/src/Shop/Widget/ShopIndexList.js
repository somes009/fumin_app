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
import XXYJAnimatableTabView from '../../Base/Widget/XXYJAnimatableTabView';
import XXYJBanner from '../../Base/Widget/XXYJBanner';
import ShopIndexItem from './ShopIndexItem';

export default class MineOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selTab: 0,
    };
  }

  renderBanner = () => {
    const bannerList = [{pic: '1'}, {pic: '1'}, {pic: '1'}];
    return (
      <XXYJBanner
        style={{marginTop: 19}}
        itemWidth={343}
        height={104}
        loop
        autoplay
        autoplayInterval={5000}
        imgs={bannerList}
        onPress={this.handlePressBanner}
        itemStyle={{
          backgroundColor: '#eee',
        }}
      />
    );
  };

  renderSearch = () => {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.searchBox}>
        <Text style={styles.searchText}>搜索</Text>
      </TouchableOpacity>
    );
  };

  renderTab = () => {
    const {selTab} = this.state;
    const list = ['全部', '食品', '办公', '服饰', '家纺'];
    return (
      <View style={styles.tabList}>
        {list.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  selTab: index,
                });
              }}
              activeOpacity={1}
              key={index}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color: selTab === index ? '#000' : '#6D7278',
                    fontFamily:
                      selTab === index
                        ? Fonts.PingFangSC_Medium
                        : Fonts.PingFangSC_Regular,
                  },
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
    const {navigation} = this.props;
    return (
      <View style={[styles.container]}>
        {this.renderBanner()}
        {this.renderSearch()}
        {this.renderTab()}
        <View style={styles.list}>
          <ShopIndexItem
            onPress={() => {
              navigation.navigate('IndexNav', {
                screen: 'ProductDetailPage',
                params: {id: 1},
              });
            }}
          />
          <ShopIndexItem
            onPress={() => {
              navigation.navigate('IndexNav', {
                screen: 'ProductDetailPage',
                params: {id: 1},
              });
            }}
          />
          <ShopIndexItem
            onPress={() => {
              navigation.navigate('IndexNav', {
                screen: 'ProductDetailPage',
                params: {id: 1},
              });
            }}
          />
          <ShopIndexItem
            onPress={() => {
              navigation.navigate('IndexNav', {
                screen: 'ProductDetailPage',
                params: {id: 1},
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchBox: {
    width: Utils.properWidth(343),
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
  tabList: {
    flexDirection: 'row',
    width: Utils.properWidth(343),
    marginTop: 12,
    marginLeft: -8,
    // paddingLeft: 16,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    margin: 8,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingHorizontal: 16,
  },
});

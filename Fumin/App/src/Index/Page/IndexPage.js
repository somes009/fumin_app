/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';
import IndexRenderItem from '../Widget/IndexRenderItem';
import XXYJImage from '../../Base/Widget/XXYJImage';
import Fonts from '../../../Common/Fonts';
import XXYJBanner from '../../Base/Widget/XXYJBanner';
import Geo from '../../../Api/Geo';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';
export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const res = Geo.getCityByLocation();
    console.log('xxcxcxcxcxcxcxcxcxx', res);
    this.getPlace();
  }
  getPlace = () => {
    const path = '/app-api/system/area/auth/tree';
    // const path = '/admin-api/system/area/get-by-ip';
    const params = {
      // objType: 1,
    };
    const onSuccess = (res) => {
      this.setState({
        data: res,
      });
    };
    ApiGet({
      path,
      params,
      onSuccess,
    });
  };
  renderItem = (item, index) => {
    const {navigation} = this.props;
    return (
      <IndexRenderItem
        key={index}
        onPress={() => {
          navigation.navigate('IndexNav', {
            screen: 'ShopDetailPage',
          });
        }}
        item={{
          title:
            '门店1门店1门店1门店1门店1门店1门店1门店1门店1门店1门店1门店1门店1门店1门店1门店1门店1',
        }}
      />
    );
  };

  renderTop = () => {
    return (
      <View style={styles.topBox}>
        <TouchableOpacity style={styles.placeBox} activeOpacity={1}>
          <XXYJImage style={styles.placeIcon} />
          <Text style={styles.placeText}>佛山</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.searchBox}>
          <Text style={styles.searchText}>搜索</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        {this.renderTop()}
        {this.renderBanner()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  topBox: {
    marginTop: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  placeIcon: {
    width: 16,
    height: 21,
    backgroundColor: '#eee',
    marginRight: 5,
  },
  placeText: {
    fontSize: 13,
    lineHeight: 17,
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
  },
  searchBox: {
    flex: 1,
    paddingLeft: 13,
    height: 36,
    backgroundColor: '#F1F1F1',
    borderRadius: 18,
    justifyContent: 'center',
  },
  searchText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#6D7278',
    fontFamily: Fonts.PingFangSC_Regular,
  },
});

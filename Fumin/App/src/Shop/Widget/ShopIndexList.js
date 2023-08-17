/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import FMHeader from '../../Base/Widget/FMHeader';
import FMAnimatableTabView from '../../Base/Widget/FMAnimatableTabView';
import FMBanner from '../../Base/Widget/FMBanner';
import ShopIndexItem from './ShopIndexItem';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';
import FMFlatList from '../../Base/Widget/FMFlatList';

export default class MineOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selTab: 0,
      banners: [],
      tabList: [],
      categoryId: 0,
    };
  }
  componentDidMount() {
    this.getBanner();
    this.getTab();
  }
  getTab = () => {
    const path = '/app-api/product/category/selectEnableCategoryList';
    const params = {
      // objType: 1,
    };
    const onSuccess = (res) => {
      this.setState({
        tabList: res.list,
        categoryId: res.list[0]?.id,
      });
    };
    ApiGet({
      path,
      params,
      onSuccess,
    });
  };

  getBanner = () => {
    const path = '/app-api/advertising/auth/getAdvertisingList';
    const params = {
      type: 3,
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
        imgName={'adImage'}
        onPress={this.handlePressBanner}
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
    const {selTab, tabList, categoryId} = this.state;
    const list = ['全部', '食品', '办公', '服饰', '家纺'];
    return (
      <View style={styles.tabList}>
        <FlatList
          data={tabList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const isSel = item.id === categoryId;
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      categoryId: item.id,
                    },
                    this.refList.handleRefresh,
                  );
                }}
                activeOpacity={1}
                key={index}>
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isSel ? '#000' : '#6D7278',
                      fontFamily: isSel
                        ? Fonts.PingFangSC_Medium
                        : Fonts.PingFangSC_Regular,
                    },
                  ]}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  render() {
    const {navigation, index} = this.props;
    const {categoryId, tabList} = this.state;
    return (
      <View style={[styles.container]}>
        {this.renderBanner()}
        {this.renderSearch()}
        {this.renderTab()}
        <View style={styles.list}>
          {!!tabList.length && (
            <FMFlatList
              ref={(ref) => (this.refList = ref)}
              isApiPostJson
              style={{flex: 1, width: Utils.getScreenSize().width}}
              requestPath="/app-api/product/merchant/auth/queryProductSpuPage"
              requestParams={{
                type: index + 2,
                categoryId,
              }}
              keyExtractor={(item, i) => i}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <ShopIndexItem
                    // key={index + 'item'}
                    item={item}
                    style={{
                      marginLeft: index % 2 ? Utils.properWidth(10) : 0,
                    }}
                    onPress={() => {
                      // navigation.navigate('ProductDetailPage', {
                      //   id: item.spuId,
                      // });
                      navigation.navigate('IndexNav', {
                        screen: 'ProductDetailPage',
                        params: {id: item.spuId},
                      });
                    }}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 250,
              }}
            />
          )}
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

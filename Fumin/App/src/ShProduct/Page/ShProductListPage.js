/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';
import XXYJImage from '../../Base/Widget/XXYJImage';
import Fonts from '../../../Common/Fonts';
import XXYJBanner from '../../Base/Widget/XXYJBanner';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';
import Utils from '../../../Utils';
import ShProductItem from '../Widget/ShProductItem';
import XXYJButton from '../../Base/Widget/XXYJButton';
export default class ShProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  renderItem = ({item, index}) => {
    const {navigation} = this.props;
    return <ShProductItem navigation={navigation} item={item} key={index} />;
  };

  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        {/* {this.renderItem({item: {}, index: 1})} */}
        <XXYJFlatList
          ref={(ref) => (this.refCourse = ref)}
          isApiPostJson
          style={{flex: 1}}
          // isApiPostJson={false}
          //  responseKey={'history'}
          requestPath="/app-api/product/merchant/auth/selectProductMerchantSpuList"
          requestParams={{
            id: 1,
            // latitude: '39.983424',
            // longitude: '116.322987',
          }}
          keyExtractor={(item) => item?.id}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />
        <XXYJButton
          text="添加商品"
          textStyle={styles.add}
          containerStyle={styles.addBox}
          onPress={() => {
            navigation.navigate('ShProductNav', {
              screen: 'ShProductAddPage',
            });
          }}
          unNeomorph={true}
        />
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
  addBox: {
    position: 'absolute',
    bottom: 63,
    width: 343,
    height: 47,
    backgroundColor: '#FF9B00',
    borderRadius: 9,
  },
  add: {
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
    fontFamily: Fonts.PingFangSC_Regular,
  },
});

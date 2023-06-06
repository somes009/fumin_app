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
import MinePlaceListItem from '../Widget/MinePlaceListItem';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';

export default class MinePlaceListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    const path = '/app-api/member/address/list';
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
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title="收货地址"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <MinePlaceListItem />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MineCreatePlacePage');
          }}
          activeOpacity={1}
          style={styles.addBtn}>
          <Text style={styles.addText}>添加新的地址</Text>
        </TouchableOpacity>
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
  addBtn: {
    width: 343,
    height: 47,
    borderRadius: 9,
    position: 'absolute',
    bottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9B00',
  },
  addText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
});

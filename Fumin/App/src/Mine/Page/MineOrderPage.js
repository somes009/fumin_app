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

export default class MineOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.tagList = [
      {name: '全部'},
      {name: '待付款'},
      {name: '待发货'},
      {name: '已完成'},
      {name: '待使用'},
    ];
  }
  
  renderList = (item, index) => {
    return(
      <View key={index}  style={{
        width: Utils.getScreenSize().width,
      }}></View>
    )
  }
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title="我的订单"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <XXYJAnimatableTabView
          tabItemStyle={{width: Utils.getScreenSize().width / 5}}
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
    width: 29,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FF9B00',
  },
});

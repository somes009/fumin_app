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
// import XXYJAnimatableTabView from '../../Base/Widget/XXYJMyTabView';
import XXYJAnimatableTabView from '../../Base/Widget/XXYJAnimatableTabView';
import MineObligationItem from '../Widget/MineObligationItem';
import MineWaitSendItem from '../Widget/MineWaitSendItem';
import MineIsEndItem from '../Widget/MineIsEndItem';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';

export default class MineOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.route?.params?.status || 0,
    };
    this.tagList = [
      {name: '全部'},
      {name: '待付款'},
      {name: '待发货'},
      {name: '已完成'},
      {name: '待使用'},
    ];
  }

  renderList = (item, index) => {
    const {navigation} = this.props;
    return (
      <View
        key={index}
        style={{
          width: Utils.getScreenSize().width,
          alignItems: 'center',
        }}>
        {index === 0 && (
          <>
            <MineObligationItem
              onPress={() => {
                navigation.navigate('MineOrderDetailPage');
              }}
            />
            <MineWaitSendItem />
            <MineIsEndItem />
          </>
        )}
        {index === 1 && (
          <XXYJFlatList
            ref={(ref) => (this.refCourse = ref)}
            isApiPostJson
            style={{flex: 1}}
            //  responseKey={'history'}
            requestPath="/app-api/trade/order/selectMyorderList"
            requestParams={{
              status: 10,
            }}
            keyExtractor={(item) => item?.id}
            renderItem={({item}) => {
              return <MineObligationItem item={item} />;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        )}
        {index === 2 && <MineWaitSendItem />}
        {index === 3 && (
          <MineIsEndItem
            onPress={() => {
              navigation.navigate('MineOrderDetailPage');
            }}
          />
        )}
      </View>
    );
  };
  render() {
    const {navigation, safeAreaInsets, route} = this.props;
    const {status} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title={'我的订单'}
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <XXYJAnimatableTabView
          tabItemStyle={{width: Utils.getScreenSize().width / 5}}
          lineStyle={styles.tabLine}
          tabList={this.tagList}
          data={this.tagList}
          // unScroll
          firstTag={status}
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

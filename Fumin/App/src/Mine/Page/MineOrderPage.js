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
// import FMAnimatableTabView from '../../Base/Widget/FMMyTabView';
import FMAnimatableTabView from '../../Base/Widget/FMAnimatableTabView';
import MineObligationItem from '../Widget/MineObligationItem';
import MineWaitSendItem from '../Widget/MineWaitSendItem';
import MineIsEndItem from '../Widget/MineIsEndItem';
import FMFlatList from '../../Base/Widget/FMFlatList';
import {ApiPostJson} from '../../../Api/RequestTool';

export default class MineOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.route?.params?.status || 0,
      tagList: [],
      selList: [],
    };
    this.tagList = [
      {name: '全部'},
      {name: '待付款'},
      {name: '待发货'},
      {name: '已完成'},
      {name: '待使用'},
    ];
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const path = '/app-api/member/auth/myPageDetail';
    const params = {
      // objType: 1,
    };
    const onSuccess = (res) => {
      this.setState({
        tagList: res.orderList,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };

  renderList = (item, index) => {
    const {navigation} = this.props;
    const {selList} = this.state;
    return (
      <View
        key={index}
        style={{
          width: Utils.getScreenSize().width,
          alignItems: 'center',
        }}>
        <FMFlatList
          ref={(ref) => (this.refOrder1 = ref)}
          isApiPostJson
          style={{flex: 1}}
          //  responseKey={'history'}
          requestPath="/app-api/trade/order/selectMyorderList"
          requestParams={{
            status: item.type,
          }}
          keyExtractor={(item) => item?.id}
          renderItem={({item}) => {
            const isSel = selList.indexOf(item.orderId) !== -1;
            return (
              <MineObligationItem
                isSel={isSel}
                handleSel={() => {
                  if (isSel) {
                    this.setState({
                      selList: selList.filter((data) => data !== item.orderId),
                    });
                  } else {
                    this.setState({
                      selList: [...selList, item.orderId],
                    });
                  }
                }}
                onPress={() => {
                  navigation.navigate('MineOrderDetailPage', {
                    id: item.orderId,
                    status: 0,
                  });
                }}
                handleRef={() => {
                  this.refOrder1.handleRefresh();
                }}
                navigation={navigation}
                item={item}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
        {!index && (
          <View style={styles.bottomBox}>
            <TouchableOpacity
              style={styles.buyBtn}
              activeOpacity={1}
              onPress={() => {}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  textAlign: 'center',
                }}>
                合并付款
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  render() {
    const {navigation, safeAreaInsets, route} = this.props;
    const {status, tagList} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title={'我的订单'}
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        {!!tagList.length && (
          <FMAnimatableTabView
            tabItemStyle={{
              width: Utils.getScreenSize().width / (tagList?.length || 1),
            }}
            lineStyle={styles.tabLine}
            tabList={tagList}
            data={tagList}
            // unScroll
            firstTag={status}
            renderItem={this.renderList}
            activeTextStyle={{
              color: '#FF9B00',
            }}
          />
        )}
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
  bottomBox: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    height: Utils.properWidth(44),
    borderTopColor: '#E9E9E9',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtn: {
    width: Utils.properWidth(343),
    height: Utils.properWidth(31),
    borderRadius: Utils.properWidth(23),
    backgroundColor: '#FF9B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

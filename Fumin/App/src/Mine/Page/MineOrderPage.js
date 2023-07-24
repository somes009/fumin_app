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
    return (
      <View
        key={index}
        style={{
          width: Utils.getScreenSize().width,
          alignItems: 'center',
        }}>
        {/* {index === 0 && (
          <>
            <FMFlatList
              ref={(ref) => (this.refCourse = ref)}
              isApiPostJson
              style={{flex: 1}}
              //  responseKey={'history'}
              requestPath="/app-api/trade/order/selectMyorderList"
              requestParams={
                {
                  // status: 0,
                }
              }
              keyExtractor={(item) => item?.id}
              renderItem={({item}) => {
                return (
                  <MineObligationItem
                    onPress={() => {
                      navigation.navigate('MineOrderDetailPage', {
                        id: item.orderId,
                      });
                    }}
                    item={item}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
            />
          </>
        )} */}
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
            return (
              <MineObligationItem
                onPress={() => {
                  navigation.navigate('MineOrderDetailPage', {
                    id: item.childOrderId,
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

        {/* {index === 2 && (
          <FMFlatList
            ref={(ref) => (this.refCourse = ref)}
            isApiPostJson
            style={{flex: 1}}
            //  responseKey={'history'}
            requestPath="/app-api/trade/order/selectMyorderList"
            requestParams={{
              status: item.type,
            }}
            keyExtractor={(item) => item?.id}
            renderItem={({item}) => {
              return <MineWaitSendItem item={item} />;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        )}
        {index === 3 && (
          <FMFlatList
            ref={(ref) => (this.refCourse = ref)}
            isApiPostJson
            style={{flex: 1}}
            //  responseKey={'history'}
            requestPath="/app-api/trade/order/selectMyorderList"
            requestParams={{
              status: item.type,
            }}
            keyExtractor={(item) => item?.id}
            renderItem={({item}) => {
              return (
                <MineIsEndItem
                  item={item}
                  onPress={() => {
                    navigation.navigate('MineOrderDetailPage');
                  }}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        )} */}
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
});

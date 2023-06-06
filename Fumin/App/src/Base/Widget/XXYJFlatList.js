/* eslmixed-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {FlatList, Text, StyleSheet, View, Platform} from 'react-native';
import {ApiGet, ApiPost, ApiPostJson} from '../../../Api/RequestTool';
import Utils from '../../../Utils';
import EventBus, {EventBusName} from '../../../Api/EventBus';
// import {RefreshAnimateHeader} from 'react-native-smart-refresh';
// import NoDataPage from '../../Common/Page/NodataPage';
// import NoNetwork from '../../Common/Page/NoNetwork';
import _ from 'lodash';
import XXYJImage from './XXYJImage';
import Images from '../../../Images';
const isAndroid = Platform.OS === 'android';
class XXYJFlatList extends Component {
  constructor(props) {
    super(props);
    this.pageSize = props.pageSize || 10;
    this.pageNo = 1;
    this.state = {
      refreshing: false,
      arrayDataSource: [],
      isEnd: false,
      isIndex: false,
      show: false,
      networkState: true,
    };
    this.isRefresh = false;
  }
  handleRef = () => {
    this.setState(
      {
        isIndex: true,
      },
      () => {
        this.timeOut = setTimeout(() => {
          clearTimeout(this.timeOut);
          this.setState({
            isIndex: false,
          });
        }, 1000);
      },
    );
  };
  componentWillUnmount() {
    // if (this.props.formName) {
    //   this.realm.close();
    // }
    EventBus.unBind(this.flatlistRef);
    EventBus.unBind(this.networkStateChange);
    if (
      this.props.requestPath === '/huzhu/post/seek/help/auth/queryFxHomePage' ||
      this.props.requestPath ===
        '/user/user/sys/message/auth/selectListPageForApp'
    ) {
      EventBus.unBind(this.tieziZan);
      EventBus.unBind(this.tieziCollect);
    }
  }
  componentDidMount() {
    // console.log(formName);
    // this.getRealm();
    // this.getRealm();
    // setTimeout(() => {
    this.requestForList();
    // }, 1000);
    this.flatlistRef = EventBus.bind(EventBusName.FLAT_LIST_REF, () => {
      this.handleRefresh();
    });
    this.networkStateChange = EventBus.bind(
      EventBusName.NETWORK_STATE_CHANGE,
      () => {
        this.setState({
          networkState: global.networkState,
        });
      },
    );
    if (
      this.props.requestPath === '/huzhu/post/seek/help/auth/queryFxHomePage' ||
      this.props.requestPath ===
        '/user/user/sys/message/auth/selectListPageForApp'
    ) {
      this.tieziZan = EventBus.bind(EventBusName.TIEZI_ZAN, this.handleZan);
      this.tieziCollect = EventBus.bind(
        EventBusName.TIEZI_COLLECT,
        this.handleCollect,
      );
    }
  }
  handleCollect = (params) => {
    const {arrayDataSource} = this.state;
    let arr = _.clone(arrayDataSource);
    for (let i in arr) {
      if (arr[i].id === params.id) {
        arr[i].isCollect = !arr[i].isCollect;
        return;
      }
    }
    this.setState({arrayDataSource: arr});
  };
  handleZan = (params) => {
    const {arrayDataSource} = this.state;
    const {requestPath} = this.props;
    let arr = _.clone(arrayDataSource);
    for (let i in arr) {
      const id = arr[i].id;
      if (id === params.id) {
        arr[i].zanCount = arr[i].isZan
          ? arr[i].zanCount - 1 < 0
            ? 0
            : arr[i].zanCount - 1
          : arr[i].zanCount + 1;
        arr[i].isZan = !arr[i].isZan;
        return;
      }
    }
    this.setState({arrayDataSource: arr});
  };
  clearData = () => {
    this.setState({
      arrayDataSource: [],
    });
  };
  addFirstItemInArray = (item, index = 0) => {
    const {arrayDataSource} = this.state;
    let arr = [...arrayDataSource];
    arr.splice(index, 0, item);
    this.setState({
      arrayDataSource: arr,
    });
  };
  delectItemInArray = (index) => {
    const {arrayDataSource} = this.state;
    let arr = [...arrayDataSource];
    arr.splice(index, 1);
    console.log('xxxxxx', arr);
    this.setState({
      arrayDataSource: arr,
    });
  };
  requestForList = () => {
    // return;
    const {
      requestPath,
      requestParams,
      responseKey,
      isApiGet,
      dontNeedResponseKey,
      isApiPostJson,
      noWarnPop,
      mockData,
      needMockData,
      handleRefresh,
      differenceArray,
    } = this.props;
    const key = responseKey || 'list';

    if (needMockData) {
      this.setState({
        arrayDataSource: mockData,
      });
      return;
    }

    const params = {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      ...requestParams,
    };
    const path = requestPath || '';
    const onSuccess = (responseData) => {
      handleRefresh?.();
      let list = dontNeedResponseKey
        ? responseData || []
        : responseData?.[key] || [];
      list = [...list];
      // if (this.pageNo === 1) {
      //   this.createRealm(list);
      // }
      if (list.length < this.pageSize) {
        this.setState({isEnd: true});
      }
      let {arrayDataSource} = this.state;
      if (this.pageNo === 1) {
        arrayDataSource = [];
      }
      let arrayTemp = Utils.getPageData(arrayDataSource, list, this.isRefresh);
      if (differenceArray?.length > 0) {
        arrayTemp = _.differenceBy(arrayTemp, differenceArray, 'id');
      }

      this.setState({
        arrayDataSource:
          this.props.needFirst && arrayTemp.length === 0
            ? ['', ...arrayTemp]
            : arrayTemp,
        refreshing: false,
        show: true,
      });
    };
    const onFailure = (responseMsg) => {
      this.setState({
        refreshing: false,
        arrayDataSource: [],
      });
    };

    let ApiMethod = isApiGet ? ApiGet : ApiPost;
    ApiMethod = isApiPostJson ? ApiPostJson : ApiMethod;
    ApiMethod({
      path,
      params,
      onSuccess,
      onFailure,
      callback: () => {},
      needShowMsg: !noWarnPop,
    });
  };

  handleRefresh = () => {
    this.setState({
      refreshing: true,
      isEnd: false,
    });
    this.pageNo = 1;
    this.isRefresh = true;
    // request
    this.requestForList();
  };
  handleAddMore = () => {
    const {isEnd, refreshing} = this.state;
    if (isEnd || refreshing) {
      return;
    }
    this.pageNo += 1;
    this.isRefresh = false;
    // request
    this.requestForList();
  };

  checkIsHelpOver = () => {
    const {arrayDataSource} = this.state;
    if (arrayDataSource.length < this.pageSize * this.pageNo) {
      return true;
    }
    return false;
  };

  renderFooter = () => {
    const {arrayDataSource, isEnd} = this.state;
    const {renderFooter} = this.props;
    let footer = '上拉加载更多';
    if (arrayDataSource.length === 0) {
      footer = '暂无数据';
    } else if (isEnd) {
      footer = (
        <XXYJImage
          source={Images.mindDetilLogo}
          style={{
            width: Utils.properWidth(80),
            height: Utils.properWidth(21),
          }}
        />
      );
    }
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.textFooter}>{footer}</Text>
        {renderFooter?.()}
      </View>
    );
  };

  render() {
    const {
      renderItem,
      style,
      ListEmptyComponent,
      ListHeaderComponent,
      numColumns,
      noFooter,
      showFooterNum,
      contentContainerStyle,
      onScrollEndDrag,
      onScrollBeginDrag,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScroll,
      getRef,
      removeClippedSubviews,
      keyExtractor,
      initialNumToRender,
      onViewableItemsChanged,
    } = this.props;
    const {refreshing, arrayDataSource, networkState} = this.state;
    const num = showFooterNum || 3;
    return (
      <>
        <FlatList
          // refreshControl={
          //   <RefreshAnimateHeader
          //     LottieViewStyle={{
          //       height: 80,
          //       width: 80,
          //       marginTop: isAndroid ? 20 : 10,
          //     }}
          //     refreshing={this.state.refreshing}
          //     onRefresh={this.handleRefresh}
          //     source={require('../../AlsoMeTab/Navigator/animations/loading/loadingAlsoMe.json')}
          //     SmartRefreshImageAssetsFolder={'images'}
          //     SmartRefreshSpeed={1}
          //   />
          // }
          ref={getRef}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          initialNumToRender={initialNumToRender || 5}
          removeClippedSubviews={removeClippedSubviews}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScroll={onScroll}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          contentContainerStyle={
            arrayDataSource.length
              ? [contentContainerStyle, {flexGrow: 1}]
              : [{flexGrow: 1}, contentContainerStyle]
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <>
                {renderItem.call(this, {
                  item,
                  index,
                  list: arrayDataSource,
                })}
              </>
            );
          }}
          data={arrayDataSource || []}
          keyExtractor={
            keyExtractor ||
            ((item, index) => {
              return index + Utils.keyExtractor();
            })
            // : (item, index) => {
            //     return index + Utils.keyExtractor();
            //   }
          }
          onRefresh={this.handleRefresh}
          onEndReached={_.throttle(this.handleAddMore, 3000)}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          ListFooterComponentStyle={
            arrayDataSource.length ? {flex: 1, justifyContent: 'flex-end'} : {}
          }
          ListFooterComponent={
            !noFooter ? (
              arrayDataSource.length >= num ? (
                this.renderFooter()
              ) : (
                <View />
              )
            ) : (
              <View />
            )
          }
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={
            this.state.show ? ListEmptyComponent || <View /> : null
          }
          style={style}
          numColumns={numColumns || 1}
        />
      </>
    );
  }
}
const con = ({
  renderItem,
  style,
  ListEmptyComponent,
  ListHeaderComponent,
  numColumns,
  noFooter,
  showFooterNum,
  contentContainerStyle,
  onScrollEndDrag,
  onScrollBeginDrag,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScroll,
  getRef,
  removeClippedSubviews,
  keyExtractor,
  initialNumToRender,
  renderFooter,
  handleRefresh,
  requestPath,
  requestParams,
  responseKey,
  isApiGet,
  dontNeedResponseKey,
  isApiPostJson,
  noWarnPop,
  pageSize,
  mockData,
  needMockData,
}) => {
  return (
    <XXYJFlatList
      renderItem={renderItem}
      style={style}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      numColumns={numColumns}
      noFooter={noFooter}
      showFooterNum={showFooterNum}
      contentContainerStyle={contentContainerStyle}
      onScrollEndDrag={onScrollEndDrag}
      onScrollBeginDrag={onScrollBeginDrag}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScroll={onScroll}
      getRef={getRef}
      removeClippedSubviews={removeClippedSubviews}
      keyExtractor={keyExtractor}
      initialNumToRender={initialNumToRender}
      renderFooter={renderFooter}
      handleRefresh={handleRefresh}
      requestPath={requestPath}
      requestParams={requestParams}
      responseKey={responseKey}
      isApiGet={isApiGet}
      dontNeedResponseKey={dontNeedResponseKey}
      isApiPostJson={isApiPostJson}
      noWarnPop={noWarnPop}
      pageSize={pageSize}
      mockData={mockData}
      needMockData={needMockData}
    />
  );
};
export default XXYJFlatList;
const styles = StyleSheet.create({
  textFooter: {
    marginVertical: 20,
    alignSelf: 'center',
    // color: Colors.green,
    // fontFamily: Fonts.PingFangSC_Light,
  },
});

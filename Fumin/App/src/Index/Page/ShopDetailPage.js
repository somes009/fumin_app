/* eslint-disable react-native/no-inline-styles */
//课程详情页
import React, {Component} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Images from '../../../Images';
import {ApiPostJson} from '../../../Api/RequestTool';
// import { ScrollView } from 'react-native-gesture-handler';
const isAndroid = Platform.OS === 'android';
import Utils from '../../../Utils';
import XXYJTabView from '../../Base/Widget/XXYJTabView';
import XXYJHeader from '../../Base/Widget/XXYJHeader';
import Fonts from '../../../Common/Fonts';
import _ from 'lodash';
import XXYJImage from '../../Base/Widget/XXYJImage';
export default class ShopDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerHeight: 0,
      isBuy: 0, //是否购买（1是0否）
      price: 0,
      data: {},
      chapterList: [],
      open: 0,
      textInput: '',
      inputHeight: 0,
      payType: 0,
      // id: props.route.params.courseId,
      shitingId: 0,
      intrationlist: [],
      hasShiting: false,
      isCollect: 0,
      webViewHeight: 1,
      showInfo: true,
    };
    this.webViewHeight = 1;
  }
  componentDidMount() {
    // this.queryAll();
  }
  queryList = () => {
    this.refFlat?.queryList?.();
  };
  //查询课程所有信息信息
  queryAll = () => {
    let id = this.props.route.params.courseId;
    const path = '/video/course/manager/auth/queryCourseDetailDetail';
    const params = {
      id: id,
    };
    const onSuccess = (responseData) => {
      this.setState({
        data: responseData.courseDetail,
        isBuy: responseData.courseDetail.isBuy,
        isCollect: responseData.courseDetail.isCollection,
        price: responseData.courseDetail.price,
        chapterList: responseData.courseDetail.chapterList,
        intrationlist: responseData.courseDetail.intrationlist,
        hasShiting:
          responseData.courseDetail.chapterList?.filter?.(
            (item) => item?.isShiting === 1,
          )?.length > 0,
      });
    };
    const onFailure = () => {};
    ApiPostJson({path, params, onSuccess, onFailure});
  };

  // 详情的title
  detailTitle = () => {
    const {isCollect, id, data, chapterList} = this.state;
    const {safeAreaInsets} = this.props;
    return (
      <CourseDetailHeader
        isCollect={isCollect}
        id={id}
        data={data}
        ref={(ref) => (this.refHeader = ref)}
        chapterList={chapterList}
        queryList={this.queryList}
        safeAreaInsets={safeAreaInsets}
      />
    );
  };
  //切换tab
  detailTab = () => {
    const {data, isCollect, id} = this.state;
    const {safeAreaInsets} = this.props;

    return (
      <View style={{flex: 1, zIndex: 30, position: 'relative'}}>
        <XXYJTabView
          tabsContainerStyle={{
            marginRight: 40,
            marginLeft: 20,
          }}
          tabList={['课程简介', '章节目录', '留言']}
          tabbarStyle={{
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
          }}
          lineStyle={{backgroundColor: '#FF9B00', width: 27, height: 3.5}}
          safeAreaInsets={safeAreaInsets}
          activeTextStyle={{
            color: '#FF9B00',
            fontSize: 17,
            fontFamily: Fonts.PingFangSC_Medium,
          }}
          inactiveTextStyle={{
            color: '#666666',
            fontSize: 17,
            fontFamily: Fonts.PingFangSC_Regular,
          }}
          renderHeader={<View style={{height: 237}} />}
          onChangeTab={(item) => {
            this.index = item.curIndex;
            this.refFooter?.handleRefresh(item.curIndex);
          }}
          renderList={[
            <View style={{width: Utils.getScreenSize().width, height: 500}} />,
            <View style={{width: Utils.getScreenSize().width, height: 500}} />,
            <View style={{width: Utils.getScreenSize().width, height: 500}} />,
          ]}
        />
      </View>
    );
  };

  renderHeader = () => {
    const {isBuy, data, id} = this.state;
    const {safeAreaInsets} = this.props;
    return <>{this.detailTitle()}</>;
  };

  render() {
    const {safeAreaInsets, navigation, isFocused} = this.props;
    const {data} = this.state;

    return (
      <View style={[styles.container]}>
        <View style={styles.topBackground}>
          <XXYJImage
            resizeMode="cover"
            source={{uri: data.bgPic}}
            style={[
              styles.blurBgPic,
              {
                height: 2 * safeAreaInsets.top + 300,
              },
            ]}
          />
        </View>
        <View
          style={{
            paddingTop: safeAreaInsets.top || global.headerTop,
            zIndex: 40,
          }}>
          <XXYJHeader
            safeAreaInsets={safeAreaInsets}
            title={data.courseName}
            headerStyle={{zIndex: 30}}
            titleStyle={styles.headertitleStyle}
            leftBtnStyle={styles.hearderBackBtn}
            rightBtnStyle={styles.hearderBackBtn}
            onLeftPress={() => {
              navigation.goBack();
            }}
            leftImage={Images.toLeftWhite}
            rightImage={{uri: Images.newCommonShare}}
            rightImageStyle={{width: 20, height: 20}}
            onRightPress={this.handleShare}
          />
        </View>
        <View style={[styles.topBox, {top: safeAreaInsets.top + 44}]}>
          {/* {this.renderHeader()} */}
        </View>
        {this.detailTab()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBox: {
    position: 'absolute',
    width: '100%',
  },
  container: {
    width: '100%',
    // paddingHorizontal: 12.5,
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  hearderBackBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(36, 36, 36, 0.40)',
  },
  headertitleStyle: {
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#fff',
  },
  topBackground: {
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 0,
  },
  blurBgPic: {
    width: '100%',
    height: '100%',
  },
  absolute: {
    // width: '100%',
    // height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  blurView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
  },
  collectBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectImg: {
    width: 23,
    height: 21.36,
  },
  neomorph: {
    shadowOffset: {width: isAndroid ? 1 : 0, height: isAndroid ? 1 : 0},
    shadowRadius: 6,
    borderRadius: 17.5,
    width: 35,
    height: 35,
    shadowOpacity: 0.5,
    backgroundColor: '#F7F7F7',
    top: 20,
    elevation: 10,
    shadowColor: '#CCD6D4',
    position: 'absolute',
  },
  leftBtn: {
    left: 12.5,
  },
  in: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImg: {
    width: 7,
    height: 12.84,
  },
  detailTitles: {
    width: Utils.properWidth(358),
    height: Utils.properWidth(268.74),
    marginTop: 5.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  price: {
    fontSize: 25,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 35,
  },
  vipTishi: {
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 21,
    fontFamily: Fonts.PingFangSCRegular,
  },
  comIngVip: {
    width: 73,
    height: 30,
    borderRadius: 16,
    backgroundColor: '#FF9B00',
    borderWidth: 0.5,
    borderColor: '#979797',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comBtn: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 20,
    fontFamily: Fonts.PingFangSCRegular,
  },

  payBox: {
    width: 358,
    height: 70,
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 8.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payStyle: {
    width: 155,
    height: 36,
    // marginTop: 10,
    // marginBottom: 30,
    // marginLeft: 35,
    // marginRight: 35,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  payText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'PingFangSC-Light',
    fontWeight: '300',
  },

  viewLinearFooter: {
    width: 250,
    height: 34,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#F6F3FF',
    borderWidth: 0.5,
    borderColor: '#E0D6FF',
    overflow: 'hidden',
  },
  textMsg: {
    color: '#000',
    fontSize: 15,
    marginLeft: 14,
    // marginTop: -2,
    // paddingHorizontal: 14,
    // backgroundColor: 'red',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  footerLeft: {
    width: 75,
  },
  footerRight: {
    width: 242,
  },
});

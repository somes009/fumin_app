/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import {ApiPostJson} from '../../../Api/RequestTool';
export default class TaskIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.backHandler = navigation.addListener('focus', () => {
      // 在这里编写页面成为焦点页面时需要执行的操作
      console.log('页面成为焦点页面');
      this.getData();
    });
    this.getData();
  }
  componentWillUnmount() {
    this.backHandler.remove?.();
  }
  getData = () => {
    const path = '/app-api/advertising/auth/selectMyQuest';
    const params = {};
    const onSuccess = (res) => {
      this.setState({
        data: res.info,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  shifang = (type) => {
    const path = '/app-api/advertising/auth/userMissionRewardRelease';
    const params = {type, txType: 1};
    const onSuccess = (res) => {
      this.getData();
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  renderCanTouch = (text, onPress) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.canTouchBtn}
        onPress={onPress}>
        <Text style={styles.canTouchText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  renderUnTouch = (text, onPress) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.unTouchBtn}
        onPress={onPress}>
        <Text style={styles.unTouchText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  goSeeButton = (onPress) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.goSeeBox}
        onPress={onPress}>
        <Text style={styles.goSeeBtnText}>去观看</Text>
      </TouchableOpacity>
    );
  };
  isEndButton = (onPress) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.isEndBox}
        onPress={onPress}>
        <Text style={styles.isEndBtnText}>已完成</Text>
      </TouchableOpacity>
    );
  };
  renderBox = ({topNum, numTitle, needLook, isLook, continuous, type}) => {
    const {navigation} = this.props;
    const isEnd = needLook <= isLook;
    const canSF = needLook === isLook;
    return (
      <View style={styles.taskBox}>
        <View style={styles.topBox}>
          <View style={styles.topLeft}>
            <Text style={styles.topNum}>{topNum}</Text>
            <Text style={styles.numTitle}>{numTitle}</Text>
          </View>
          {canSF && needLook > 0
            ? this.renderCanTouch('释放奖励', this.shifang.bind(this, type))
            : this.renderUnTouch('释放奖励', () => {})}
        </View>
        <View style={styles.bottomBox}>
          <View style={styles.bottomTop}>
            <Text style={styles.goSeeText}>
              去观看{needLook}条广告（{isLook}/{needLook}）
            </Text>
            {isEnd
              ? this.isEndButton()
              : this.goSeeButton(() => {
                  navigation.navigate('TaskNav', {
                    screen: 'TaskListPage',
                    params: {
                      type,
                    },
                  });
                })}
          </View>
          <Text style={styles.dayText}>已连续释放{continuous}天</Text>
        </View>
      </View>
    );
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {data} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerIn}>
          <View
            style={{
              alignItems: 'center',
            }}>
            {this.renderBox({
              topNum: data.orderNum,
              numTitle: '订单值',
              needLook: data.onAdCount,
              isLook: data.onLookAdCount,
              continuous: data.onReleaseDay,
              type: 1,
            })}
            {this.renderBox({
              topNum: data.degreeContribution,
              numTitle: '贡献度',
              needLook: data.dcAdCount,
              isLook: data.dcLookAdCount,
              continuous: data.dcReleaseDay,
              type: 2,
            })}
            {this.renderBox({
              topNum: data.redEnvelope,
              numTitle: '红包',
              needLook: data.reAdCount,
              isLook: data.reLookAdCount,
              continuous: data.reReleaseDay,
              type: 3,
            })}
            {this.renderBox({
              topNum: data.balance,
              numTitle: '金额',
              isLook: data.blookAdCount,
              continuous: data.breleaseDay,
              type: 4,
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerIn: {
    paddingBottom: 100,
    width: Utils.getScreenSize().width,
    paddingTop: 24,
  },
  taskBox: {
    width: 343,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  topBox: {
    paddingBottom: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  topNum: {
    fontSize: 22,
    lineHeight: 25,
    fontFamily: Fonts.DIN_Alternate,
    color: '#000',
  },
  numTitle: {
    marginTop: 1,
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  canTouchBtn: {
    width: 95,
    height: 33,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9B00',
  },
  canTouchText: {
    fontSize: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
  unTouchBtn: {
    width: 95,
    height: 33,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E9E9',
  },
  unTouchText: {
    fontSize: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  bottomBox: {
    paddingTop: 15,
    alignItems: 'flex-end',
  },
  bottomTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  goSeeText: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  goSeeBox: {
    width: 59,
    height: 26,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF9B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goSeeBtnText: {
    fontSize: 15,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#FF9B00',
  },
  isEndBox: {
    width: 59,
    height: 26,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  isEndBtnText: {
    fontSize: 15,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  dayText: {
    marginTop: 11,
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
});

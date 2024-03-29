/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import FMHeader from '../../Base/Widget/FMHeader';
import {ApiPostJson} from '../../../Api/RequestTool';
import Module from '../../../Module/Module';
export default class TaskListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.route?.params?.type,
      list: [],
    };
    this.canCallBack = true;
  }
  componentDidMount() {
    this.getList();
    DeviceEventEmitter.addListener('showFinish', (msg) => {
      if (!this.canCallBack) {
        return;
      }
      const data = msg.split('=');
      this.handleAdCallBack(data[0], data[1]);
    });
    // console.log(Module.handleAd);
  }
  componentWillUnmount() {
    Module.destoryVideo?.();
    DeviceEventEmitter.removeAllListeners('showFinish');
  }

  getList = () => {
    const {type} = this.state;
    const path = '/app-api/advertising/auth/getAdListDetailByType';
    const params = {type};
    const onSuccess = (res) => {
      this.setState({
        list: res.list,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  handleAdCallBack = (type, sn) => {
    this.canCallBack = false;
    const path = '/app-api/advertising/auth/addAdvertisingClick';
    const params = {type, sn};
    const onSuccess = (res) => {
      this.getList();
      this.canCallBack = true;
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
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

  renderItem = (item, index) => {
    const {type} = this.state;
    return (
      <View key={index} style={styles.item}>
        <Text style={styles.itemText}>{item.content}</Text>
        {item.status
          ? this.isEndButton()
          : this.goSeeButton(Module.handleAd.bind(this, type, item.sn))}
      </View>
    );
  };

  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {list} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerIn}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <FMHeader
              title=""
              onLeftPress={() => {
                navigation.goBack();
              }}
            />
            <View style={styles.list}>{list.map(this.renderItem)}</View>
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
  },
  list: {
    width: 340,
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 17,
    paddingTop: 8,
    paddingBottom: 29,
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 21,
  },
  itemText: {
    fontSize: 15,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
});

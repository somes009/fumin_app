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
import XXYJTextInput from '../../Base/Widget/XXYJTextinput';
import MinePlaceListItem from '../Widget/MinePlaceListItem';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';

export default class MineCreatePlacePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      place1: '',
      place2: '',
    };
  }
  componentDidMount() {}
  renderPhone = () => {
    const {phone} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}>手机号</Text>
        <XXYJTextInput
          placeholder="请输入收货人"
          maxLength={11}
          value={phone}
          onChangeText={(text) => {
            this.setState({
              phone: text,
            });
          }}
          isNumber
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
        />
      </View>
    );
  };
  renderName = () => {
    const {name} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}>收货人</Text>
        <XXYJTextInput
          placeholder="请输入收货人"
          maxLength={11}
          value={name}
          onChangeText={(text) => {
            this.setState({
              name: text,
            });
          }}
          isNumber
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
        />
      </View>
    );
  };
  renderPlace1 = () => {
    const {place1} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}>所在地区</Text>
        <XXYJTextInput
          placeholder="请输入所在地区"
          maxLength={11}
          value={place1}
          onChangeText={(text) => {
            this.setState({
              place1: text,
            });
          }}
          isNumber
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
        />
      </View>
    );
  };
  renderPlace2 = () => {
    const {place2} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}>所在地区</Text>
        <XXYJTextInput
          placeholder="请输入所在地区"
          maxLength={11}
          value={place2}
          onChangeText={(text) => {
            this.setState({
              place2: text,
            });
          }}
          isNumber
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
        />
      </View>
    );
  };
  handleCreate = () => {
    const {name, phone, place1, place2} = this.state;
    const path = '/app-api/member/address/create';
    const params = {
      name,
      mobile: phone,
    };
    const onSuccess = (res) => {
      this.setState({
        data: res,
      });
    };
    ApiPostJson({
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
          title="新增收货地址"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.infoList}>
          {this.renderName()}
          {this.renderPhone()}
          {this.renderPlace1()}
          {this.renderPlace2()}
        </View>
        <TouchableOpacity
          onPress={this.handleCreate}
          activeOpacity={1}
          style={styles.addBtn}>
          <Text style={styles.addText}>完成</Text>
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
  infoList: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 23,
  },
  infoBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    // lineHeight: 22,
  },
  input: {
    fontSize: 14,
    padding: 0,
    paddingHorizontal: 4.5,
    fontFamily: Fonts.PingFangSC_Regular,
    lineHeight: 19,
  },
  containerStyle: {
    width: 249,
    height: 31,
    borderRadius: 5,
    marginTop: 0,
    backgroundColor: '#E9E9E9',
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

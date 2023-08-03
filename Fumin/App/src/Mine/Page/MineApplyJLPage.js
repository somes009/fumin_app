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
import FMTextInput from '../../Base/Widget/FMTextinput';
import {ApiGet, ApiPostJson, ApiPut} from '../../../Api/RequestTool';

export default class MineApplyJLPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      number: '',
      canTou: false,
    };
  }
  handleCreate = () => {
    const {name, phone, number} = this.state;
    const {navigation} = this.props;
    const path = '/app-api/member/usertypeapplyrecord/auth/applyUserType';
    const params = {
      type: 3,
      name,
      phone,
      idNumber: number,
    };
    const onSuccess = (res) => {
      Utils.Toast({
        text: '申请成功',
      });
      navigation.goBack();
    };
    const onFailure = () => {};
    ApiPostJson({
      path,
      params,
      onSuccess,
      onFailure,
    });
  };
  checkInfo = () => {
    const {name, phone, number} = this.state;
    if (!name.length) {
      Utils.Toast({text: '请输入姓名'});
    } else if (!Utils.checkPhone(phone)) {
      Utils.Toast({text: '请输入正确的手机号'});
    } else if (!Utils.isValidIdNumber(number)) {
      Utils.Toast({
        text: '请输入正确的身份证号',
      });
    }
  };
  check = () => {
    const {name, phone, number} = this.state;
    if (
      !!name.length &&
      Utils.checkPhone(phone) &&
      Utils.isValidIdNumber(number)
    ) {
      this.setState({
        canTou: true,
      });
    } else {
      this.setState({
        canTou: false,
      });
    }
  };
  renderPhone = () => {
    const {phone} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}>手机号</Text>
        <FMTextInput
          placeholder="请输入手机号"
          maxLength={11}
          value={phone}
          onChangeText={(text) => {
            this.setState(
              {
                phone: text,
              },
              this.check,
            );
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
        <Text style={styles.title}>姓名</Text>
        <FMTextInput
          placeholder="请输入姓名"
          maxLength={11}
          value={name}
          onChangeText={(text) => {
            this.setState(
              {
                name: text,
              },
              this.check,
            );
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
  renderNumber = () => {
    const {number} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}> 身份证号</Text>
        <FMTextInput
          placeholder="请输入身份证号"
          value={number}
          onChangeText={(text) => {
            this.setState(
              {
                number: text,
              },
              this.check,
            );
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
  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {canTou} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title="申请经理"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.infoList}>
          {this.renderName()}
          {this.renderPhone()}
          {this.renderNumber()}
        </View>
        <TouchableOpacity
          onPress={canTou ? this.handleCreate : this.checkInfo}
          activeOpacity={1}
          style={styles.addBtn}>
          <Text style={styles.addText}>立即申请</Text>
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
  loginBottom: {
    marginTop: 30,
    alignItems: 'flex-end',
    width: '100%',
  },
  loginBottomIn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isSelCri: {
    width: 9,
    height: 9,
    backgroundColor: 'orange',
  },
});

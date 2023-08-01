/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import FMHeader from '../../Base/Widget/FMHeader';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import FMImage from '../../Base/Widget/FMImage';
import FMBanner from '../../Base/Widget/FMBanner';
import CommonButtonsPopUp from '../../Base/Widget/CommonButtonsPopUp';
import {ApiPostJson} from '../../../Api/RequestTool';
import Images from '../../../Images';
import {mapDispatchToProps, mapStateToProps} from '../../store/actionCreators';
import EventBus, {EventBusName} from '../../../Api/EventBus';

class ShMineAssetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    // console.log(this.props);
    this.getData();
  }

  getData = () => {
    const path = '/app-api/member/auth/myPageDetail';
    const params = {
      // objType: 1,
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
        <FMHeader
          safeAreaInsets={safeAreaInsets}
          title={'资产管理'}
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.main}>
        <View style={styles.box}>
          <Text style={styles.price}>¥879.00</Text>
          <Text style={styles.text}>当前筛选收入</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.price}>100</Text>
          <Text style={styles.text}>当前筛选收入订单数</Text>
        </View>
        </View>
      </View>
    );
  }
}

export default ShMineAssetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
  },
  main: {
    flexDirection: 'row',
    marginTop: 35,
  },
  box: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontFamily: Fonts.DIN_Alternate,
    fontSize: 31,
    lineHeight: 36,
  },
  text: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 10,
    color: '#6D7278',
  },
});

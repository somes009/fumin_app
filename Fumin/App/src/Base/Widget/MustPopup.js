/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Images from '../../../Images';
import FMPopUp from './FMPopUp';
import FMButton from './FMButton';
import FMImage from './FMImage';
import Fonts from '../../../Common/Fonts';
// import SelTimePage from './SelTimePage';
const SCREEN_SCALE = Dimensions.get('window').width / 375;
const screenScale = (param) => param * SCREEN_SCALE;
export default class MustPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isForce: '',
      content: '',
      version: '',
    };
    this.refPop = {};
  }
  upLoad = () => {
    this.closeModal();
  };
  getView = () => {
    const {onCommit, onRefused} = this.props;
    return (
      <View style={{width: 292, alignItems: 'center'}}>
        <View style={styles.topBox}>
          <View style={{marginTop: screenScale(11)}}>
            <Text style={styles.title}>协议与政策</Text>
          </View>
          <FMImage style={styles.titleImg} source={Images.TipsImg} />
        </View>
        <Text style={[styles.desc, {width: '100%'}]}>
          感谢您信任并使用福民平台，在您使用福民平台服务前，请认真阅读
        </Text>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.closeModal();
              const {safeAreaInsets, navigation} = this.props;
              navigation.navigate('LoginYinsiPage');
            }}>
            <Text style={[styles.desc, {color: '#FF9B00'}]}>《用户协议》</Text>
          </TouchableOpacity>
          <Text style={[styles.desc]}>和</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.closeModal();
              const {safeAreaInsets, navigation} = this.props;
              navigation.navigate('LoginYinsiPage');
            }}>
            <Text style={[styles.desc, {color: '#FF9B00'}]}>《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.desc}>
          的全部内容，以了解用户权利义务和个人信息处理规则。
        </Text>
        <FMButton
          text="同 意"
          onPress={onCommit}
          containerStyle={styles.neomorph}
          textStyle={{color: '#fff'}}
          unNeomorph
        />
        <TouchableOpacity activeOpacity={1} onPress={onRefused}>
          <Text style={styles.bottom}>暂不使用</Text>
        </TouchableOpacity>
      </View>
    );
  };
  openModal = () => {
    this.refPop.handleShow();
  };

  closeModal = () => {
    this.refPop.handleClose();
  };

  render() {
    return (
      <FMPopUp
        children={this.getView()}
        containerStyles={{alignItems: 'center'}}
        refPop={this.refPop}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: screenScale(17),
    lineHeight: screenScale(24),
    color: '#000',
  },
  desc: {
    fontSize: screenScale(15),
    lineHeight: screenScale(25),
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
    textAlign: 'left',
  },
  neomorph: {
    shadowOffset: {width: 0, height: screenScale(5)},
    shadowRadius: 18,
    borderRadius: 13,
    width: 209,
    height: 44,
    marginTop: 19.5,
    backgroundColor: '#FF9B00',
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleImg: {
    width: screenScale(50),
    height: screenScale(50),
  },
  bottom: {
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.47,
    fontFamily: Fonts.PingFangSC_Regular,
    marginTop: 14.5,
  },
});

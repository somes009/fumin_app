/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const SCREEN_SCALE = Dimensions.get('window').width / 375;
const screenScale = (param) => param * SCREEN_SCALE;
import Modal from 'react-native-modal';
import Fonts from '../../../Common/Fonts';
export default class DownManagerPop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      list: [],
      cancleColor: '',
    };
  }
  renderPopSelect = () => {
    const {title, list, cancleColor} = this.state;
    return (
      <>
        <View style={styles.greyBacStyle}>
          {!!title && (
            <View
              style={{
                borderStyle: 'solid',
                borderBottomWidth: 0.5,
                borderBottomColor: '#CBCBCB',
              }}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )}
          {list?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={item?.fun}
                activeOpacity={1}
                style={[
                  styles.zanStyle,
                  {
                    borderBottomColor: '#E9E9E9',
                  },
                ]}>
                <Text style={[styles.orangeText]}>{item?.text}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={this.closeModal}
            activeOpacity={1}
            style={styles.whiteBacStyle}>
            <Text style={[styles.blueCancleText]}>取消</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  openModal = ({title, list, cancleColor}) => {
    this.setState({
      visible: true,
      title,
      list,
      cancleColor,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Modal
        isVisible={this.state.visible}
        backdropOpacity={0.2}
        style={styles.bigBox}
        onBackButtonPress={() => {
          this.setState({visible: false});
        }}
        onBackdropPress={() => this.setState({visible: false})}>
        <View style={styles.in}>{this.renderPopSelect()}</View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  zanStyle: {
    height: screenScale(47),
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    width: '100%',
  },
  viewOverlay: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  greyBacStyle: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  whiteBacStyle: {
    height: screenScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueText: {
    fontSize: screenScale(17),
    color: '#0091FF',
    alignSelf: 'center',
    lineHeight: screenScale(24),
  },
  blueFuZhiText: {
    fontSize: screenScale(17),
    color: '#0091FF',
    alignSelf: 'center',
    lineHeight: screenScale(24),
  },
  blueCancleText: {
    fontSize: screenScale(18),
    alignSelf: 'center',
    lineHeight: screenScale(60),
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#FF9B00',
    // fontWeight: 'bold',
  },
  orangeText: {
    fontSize: screenScale(18),
    alignSelf: 'center',
    marginVertical: screenScale(15),
    lineHeight: screenScale(25),
    fontFamily: Fonts.PingFangSC_Regular,
  },
  lineBacStyle: {
    height: screenScale(1),
    backgroundColor: '#CBCBCB',
  },
  titleText: {
    color: '#747989',
    fontSize: screenScale(18),
    alignSelf: 'center',
    marginVertical: screenScale(15),
    lineHeight: screenScale(25),
    fontFamily: Fonts.PingFangSC_Regular,
  },
  hengimg: {
    backgroundColor: '#CBCBCB',
    height: screenScale(0.5),
  },
  in: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: screenScale(5.5),
    width: '100%',
    alignItems: 'center',
  },
  bigBox: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

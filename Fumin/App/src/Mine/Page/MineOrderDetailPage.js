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
import MineFansItem from '../Widget/MineFansItem';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';

export default class MineOrderDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title="交易成功"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
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
  list: {
    width: '100%',
    marginTop: 30,
  },
  name: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
});

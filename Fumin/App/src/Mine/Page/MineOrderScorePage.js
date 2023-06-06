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
import MineOrderScoreItem from '../Widget/MineOrderScoreItem';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';

export default class MineOrderScorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 1638,
    };
  }

  renderTop = () => {
    const {score} = this.state;
    return (
      <View style={styles.topBox}>
        <Text style={styles.topTitle}>总订单值</Text>
        <Text style={styles.topScore}>{score}</Text>
      </View>
    );
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title="我的订单值"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        {this.renderTop()}
        <Text style={styles.listTitle}>账户明细</Text>
        <XXYJFlatList
          ref={(ref) => (this.refCourse = ref)}
          isApiPostJson
          style={{flex: 1}}
          //  responseKey={'history'}
          requestPath="/app-api/member/userinviterecord/auth/myInviteCode"
          requestParams={{}}
          keyExtractor={(item) => item?.id}
          renderItem={({item}) => {
            return <MineOrderScoreItem item={item} />;
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
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
    marginTop: 4,
    alignItems: 'center',
  },
  topBox: {
    marginTop: 23,
    alignItems: 'center',
  },
  topTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  topScore: {
    marginTop: 11,
    fontSize: 63,
    lineHeight: 73,
    fontFamily: Fonts.DIN_Alternate,
    color: '#FF9B00',
  },
  listTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
    marginTop: 19,
    paddingLeft: 33,
    width: '100%',
  },
});

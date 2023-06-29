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
import MineShopItem from '../Widget/MineShopItem';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';

export default class MineShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title="我的商家"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <XXYJFlatList
          ref={(ref) => (this.refCourse = ref)}
          isApiPostJson
          style={{flex: 1}}
          //  responseKey={'history'}
          requestPath="/app-api/member/userinviterecord/auth/myInviteCode"
          requestParams={{}}
          keyExtractor={(item) => item?.id}
          renderItem={({item}) => {
            return <MineShopItem item={item} />;
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
    marginTop: 30,
  },
  name: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
});

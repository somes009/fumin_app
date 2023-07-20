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
import MineFansItem from '../Widget/MineFansItem';
import FMFlatList from '../../Base/Widget/FMFlatList';

export default class MineFansPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title="粉丝"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <FMFlatList
          ref={(ref) => (this.refCourse = ref)}
          isApiPostJson
          style={{flex: 1}}
          //  responseKey={'history'}
          requestPath="/app-api/member/userinviterecord/auth/myInviteCode"
          requestParams={{}}
          keyExtractor={(item) => item?.id}
          renderItem={({item}) => {
            return <MineFansItem item={item} />;
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

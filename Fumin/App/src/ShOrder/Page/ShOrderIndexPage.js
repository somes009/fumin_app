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
import FMAnimatableTabView from '../../Base/Widget/FMAnimatableTabView';
// import MineObligationItem from '../Widget/MineObligationItem';
// import MineWaitSendItem from '../Widget/MineWaitSendItem';
// import MineIsEndItem from '../Widget/MineIsEndItem';

export default class ShOrderIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.tagList = [
      {name: '全部'},
      {name: '待发货'},
      {name: '待付款'},
      {name: '已完成'},
      {name: '售后中'},
      {name: '待核销'},
    ];
  }

  renderList = (item, index) => {
    const {navigation} = this.props;
    return (
      <View
        key={index}
        style={{
          width: Utils.getScreenSize().width,
          alignItems: 'center',
        }}>
        {/* {index === 0 && (
          <>
            <MineObligationItem
              onPress={() => {
                navigation.navigate('MineOrderDetailPage');
              }}
            />
            <MineWaitSendItem />
            <MineIsEndItem />
          </>
        )}
        {index === 1 && <MineObligationItem />}
        {index === 2 && <MineWaitSendItem />}
        {index === 3 && <MineIsEndItem />} */}
      </View>
    );
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMAnimatableTabView
          tabItemStyle={{width: Utils.getScreenSize().width / 6}}
          lineStyle={styles.tabLine}
          tabList={this.tagList}
          data={this.tagList}
          // unScroll
          renderItem={this.renderList}
          activeTextStyle={{
            color: '#FF9B00',
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
  tabLine: {
    width: 29,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FF9B00',
  },
});

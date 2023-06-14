/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, Platform, ScrollView} from 'react-native';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
const isAndroid = Platform.OS === 'android';
// import ScrollableTabViewxxx from 'react-native-scrollable-tab-view';
import {HPageViewHoc, TabView, Tabbar} from 'react-native-head-tab-view';
const HScrollView = HPageViewHoc(ScrollView);

export default class XXYJTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerHeight: 0,
    };
  }

  layoutHeader = (e) => {
    console.log('layout Header', e);
    this.setState({
      headerHeight: e?.layout?.height,
    });
  };

  renderHeader = () => {
    const {renderHeader} = this.props;
    return (
      <View onLayout={({nativeEvent: e}) => this.layoutHeader(e)}>
        {renderHeader || <View />}
      </View>
    );
  };

  _renderScene = (sceneProps) => {
    const {renderList, containerComponent} = this.props;
    const {index} = sceneProps;
    return (
      <HScrollView showsVerticalScrollIndicator={false} {...sceneProps}>
        {renderList?.[index] || <View />}
        {containerComponent}
      </HScrollView>
    );
  };

  renderTopView = () => {
    const {headerHeight} = this.state;
    const {
      tabList,
      activeTextStyle,
      inactiveTextStyle,
      tabViewStyle,
      onChangeTab,
      tabbarStyle,
      unHeader,
      renderTabBar,
      getRef,
      locked,
      averageTab = true,
      renderTabItem,
      activeItemStyle,
      inactiveItemStyle,
      lineStyle,
      tabsContainerStyle,
      underTabComponent,
      onTabViewScroll,
      underlineStyle,
      unTabList,
    } = this.props;
    const noHeader = unHeader && !isAndroid;
    return (
      <TabView
        tabbarStyle={tabbarStyle}
        onTabViewScroll={onTabViewScroll}
        underLineStyle={underlineStyle || {backgroundColor: '#FF9B00'}}
        underTabComponent={underTabComponent}
        locked={locked}
        averageTab={averageTab}
        tabsContainerStyle={tabsContainerStyle}
        ref={getRef}
        showsVerticalScrollIndicator={false}
        tabs={tabList}
        activeItemStyle={activeItemStyle}
        inactiveItemStyle={inactiveItemStyle}
        lineStyle={lineStyle}
        renderTabBar={renderTabBar}
        renderTabItem={renderTabItem}
        activeTextStyle={
          activeTextStyle || {
            color: '#FF9B00',
            fontSize: 15,
            fontWeight: '300',
            fontFamily: 'PingFangSC-Light',
          }
        }
        inactiveTextStyle={
          inactiveTextStyle || {
            color: '#979797',
            fontSize: 15,
            fontWeight: '300',
            fontFamily: 'PingFangSC-Light',
          }
        }
        style={tabViewStyle}
        renderScene={this._renderScene}
        makeHeaderHeight={() => {
          return noHeader && headerHeight ? 0 : headerHeight;
        }}
        renderScrollHeader={noHeader ? null : () => this.renderHeader()}
        onChangeTab={(change) => {
          onChangeTab?.(change);
        }}
      />
    );
  };
  render() {
    return this.renderTopView();
  }
}

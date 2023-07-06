import React, {Component} from 'react';

import {FlatList, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Utils from '../../../Utils';
import XXYJSwiper from '../../Base/Widget/XXYJSwiper';
class XXYJMyTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selTab: 0,
    };
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      clearTimeout(this.timer);
      const {firstTag} = this.props;
      if (firstTag) {
        this.changeTab(firstTag);
        this.refSwiper.scrollTo({
          x: firstTag * Utils.getScreenSize().width,
        });
      }
    }, 100);
  }
  renderTags = () => {
    const {selTab} = this.state;
    const {
      tabList,
      tabContainerStyle,
      activeTextStyle,
      inactiveTextStyle,
      inactiveTabStyle,
      activeTabStyle,
      firstTag,
    } = this.props;
    return (
      <View style={[{flexDirection: 'row'}]}>
        <FlatList
          ref={(ref) => (this.refList = ref)}
          data={tabList}
          horizontal
          contentContainerStyle={tabContainerStyle}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={selTab === index ? activeTabStyle : inactiveTabStyle}
                onPress={() => {
                  this.changeTab(index);
                  this.refSwiper.scrollTo({
                    x: index * Utils.getScreenSize().width,
                  });
                }}>
                <Text
                  style={
                    selTab === index
                      ? [styles.tagItem, activeTextStyle]
                      : [styles.selTagItem, inactiveTextStyle]
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };
  changeTab = (index) => {
    const {onScrollEnd, frontNum = 1} = this.props;
    this.setState(
      {
        selTab: index,
      },
      () => {
        this.refList.scrollToIndex({
          index: index - frontNum < 0 ? 0 : index - frontNum,
        });
      },
    );
    onScrollEnd?.(index);
  };
  render() {
    const {selTab} = this.state;
    const {renderItem, data, containerStyle, swiperStyle, unScroll, frontNum} =
      this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderTags()}
        <XXYJSwiper
          refSwiper={(ref) => {
            this.refSwiper = ref;
          }}
          style={swiperStyle}
          index={selTab}
          onScrollEnd={(index) => {
            this.changeTab(index);
          }}
          data={data}
          renderItem={renderItem}
          unScroll={unScroll}
          frontNum={frontNum}
        />
      </View>
    );
  }
}

const component = ({
  tabList,
  tabContainerStyle,
  activeTextStyle,
  activeTabStyle,
  inactiveTextStyle,
  inactiveTabStyle,
  renderItem,
  data,
  containerStyle,
  swiperStyle,
  onScrollEnd,
  unScroll,
  firstTag,
  frontNum,
}) => {
  return (
    <XXYJMyTabView
      tabList={tabList}
      tabContainerStyle={tabContainerStyle}
      activeTextStyle={activeTextStyle}
      inactiveTextStyle={inactiveTextStyle}
      renderItem={renderItem}
      data={data}
      firstTag={firstTag}
      containerStyle={containerStyle}
      swiperStyle={swiperStyle}
      onScrollEnd={onScrollEnd}
      unScroll={unScroll}
      frontNum={frontNum}
      activeTabStyle={activeTabStyle}
      inactiveTabStyle={inactiveTabStyle}
    />
  );
};
export default component;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tagItem: {
    // paddingHorizontal: 6,
    // paddingVertical: 1,
    // borderRadius: 6,
    // height: 22,
    // marginLeft: 10,
    // marginTop: 20,
    // backgroundColor: '#f2f233',
  },
  selTagItem: {
    // paddingHorizontal: 6,
    // paddingVertical: 1,
    // borderRadius: 6,
    // height: 22,
    // marginLeft: 10,
    // marginTop: 20,
    // backgroundColor: '#eee',
  },
  tag: {
    color: '#000',
  },
});

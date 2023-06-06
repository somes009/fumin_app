/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import Colors from '../../../Common/Colors';
import Utils from '../../../Utils';
import XXYJSwiper from './XXYJSwiper';
import Fonts from '../../../Common/Fonts';
class XXYJAnimatableTabView extends Component {
  constructor(props) {
    super(props);
    this.offest =
      (props?.tabItemStyle?.width - props?.lineStyle?.width) / 2 || 29;
    this.state = {
      selTab: props.selTab || 0,
      isScroll: false,
      offest: this.offest || 29,
      animateScrollX: new Animated.Value(0),
    };
    this.tabWidth =
      props?.tabList?.length * (props?.tabItemStyle?.width || 100);
    this.screenWidth =
      props?.tabList?.length *
      (props?.containerStyle?.width || Utils.getScreenSize().width);
  }

  componentDidMount() {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      this.handleScrollToTab();
    }, 300);
  }

  handleScrollToTab = () => {
    const {selTab} = this.state;
    this?.refSwiper?.scrollTo?.({
      x: selTab * Utils.getScreenSize().width,
    });
    this.changeTab(selTab);
  };

  renderTags = () => {
    const {selTab, isScroll} = this.state;
    const {
      tabList,
      tabLeft,
      tabStyle,
      tabItemStyle,
      lineStyle,
      tabTextStyle,
      inactiveTextStyle,
      activeTextStyle,
      tabRight,
      tabUnScroll,
      innerStyle,
      noTabLine,
    } = this.props;
    const tempX = this.state.animateScrollX.interpolate({
      inputRange: [0, this.screenWidth],
      outputRange: [this.offest, this.tabWidth + this.offest],
      extrapolate: 'clamp',
    });
    console.log(tempX, this.offest);
    const Cuttom = tabUnScroll ? View : ScrollView;
    return (
      <View style={[{flexDirection: 'row', alignItems: 'center'}, tabStyle]}>
        {tabLeft?.(selTab)}
        <View>
          <Cuttom
            horizontal
            bounces={false}
            ref={(ref) => (this.refList = ref)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexDirection: 'column', ...innerStyle}}>
            <View
              style={tabUnScroll ? styles.unScroll : {flexDirection: 'row'}}>
              {tabList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index + ''}
                    activeOpacity={1}
                    onPress={() => {
                      this.changeTab(index);
                      this?.refSwiper?.scrollTo?.({
                        x:
                          index *
                          (this.props.containerStyle?.width ||
                            Utils.getScreenSize().width),
                      });
                    }}
                    style={[styles.tagItem, tabItemStyle]}>
                    {!!item.name && (
                      <Text
                        style={[
                          selTab === index && !isScroll
                            ? {...styles.selTag, ...activeTextStyle}
                            : {...styles.tag, ...inactiveTextStyle},
                          tabTextStyle,
                        ]}>
                        {item.name}
                      </Text>
                    )}
                    {selTab === index ? item.activeTab : item.inactiveTab}
                  </TouchableOpacity>
                );
              })}
            </View>
            {!noTabLine && (
              <Animated.View
                style={[styles.line, lineStyle, {marginLeft: tempX}]}
              />
            )}
          </Cuttom>
        </View>
        {tabRight}
      </View>
    );
  };
  changeTab = (index) => {
    const {onScrollEnd, frontNum = 1} = this.props;
    this.setState({
      selTab: index,
      isScroll: false,
    });
    this?.refList?.scrollTo?.({
      x: (index - 1 > 0 ? index - 1 : 0) * this.tabWidth,
    });
    onScrollEnd?.(index);
  };
  render() {
    const {selTab} = this.state;
    const {
      renderItem,
      data,
      containerStyle,
      swiperStyle,
      unScroll,
      frontNum,
      smallTab,
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderTags()}
        {smallTab?.(selTab)}
        <XXYJSwiper
          refSwiper={(ref) => {
            this.refSwiper = ref;
          }}
          style={swiperStyle}
          index={selTab}
          onScrollEnd={(index) => {
            this.changeTab(index);
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: this.state.animateScrollX},
                },
              },
            ],
            {
              useNativeDriver: false,
              listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.x;
              },
            },
          )}
          onScrollStart={() => {
            this.setState({
              isScroll: true,
            });
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
  inactiveTextStyle,
  renderItem,
  data,
  containerStyle,
  swiperStyle,
  onScrollEnd,
  unScroll,
  frontNum,
  smallTab,
  tabLeft,
  tabStyle,
  tabWidth,
  lineWidth,
  tabItemStyle,
  lineStyle,
  tabTextStyle,
  tabRight,
  tabUnScroll,
  selTab,
  innerStyle,
  noTabLine,
}) => {
  return (
    <XXYJAnimatableTabView
      tabList={tabList}
      tabContainerStyle={tabContainerStyle}
      activeTextStyle={activeTextStyle}
      inactiveTextStyle={inactiveTextStyle}
      renderItem={renderItem}
      data={data}
      containerStyle={containerStyle}
      swiperStyle={swiperStyle}
      onScrollEnd={onScrollEnd}
      unScroll={unScroll}
      frontNum={frontNum}
      smallTab={smallTab}
      tabLeft={tabLeft}
      tabStyle={tabStyle}
      tabWidth={tabWidth}
      lineWidth={lineWidth}
      lineStyle={lineStyle}
      tabItemStyle={tabItemStyle}
      tabTextStyle={tabTextStyle}
      tabRight={tabRight}
      tabUnScroll={tabUnScroll}
      selTab={selTab}
      innerStyle={innerStyle}
      noTabLine={noTabLine}
    />
  );
};
export default component;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tagItem: {
    borderRadius: 6,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unScroll: {
    flexDirection: 'row',
  },
  tag: {
    color: '#979797',
    fontSize: Utils.properWidth(16),
    lineHeight: Utils.properWidth(22),
  },
  selTag: {
    color: '#000',
    fontSize: Utils.properWidth(16),
    lineHeight: Utils.properWidth(22),
  },
  line: {
    width: 39,
    height: 4,
    borderRadius: 15,
    backgroundColor: '#000',
  },
});

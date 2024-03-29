/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Utils from '../../Utils/index';
import Images from '../../Images';
import _ from 'lodash';
import {BOTTOM_TAB_HEIGHT} from '../../Common/Contant';
import * as Animatable from 'react-native-animatable';
const isAndroid = Platform.OS === 'android';
import AppStore from '../../Store/AppStore';
import Fonts from '../../Common/Fonts';
import FMImage from '../Base/Widget/FMImage';
export default class MyTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selTab: 0,
      msgCount: 0,
    };
    this.arrayTabJson = [
      Images.indexIsIselIcon,
      Images.shopIsSelIcon,
      Images.taskIsSelIcon,
      Images.mineIsSelIcon,
    ];
    this.arrayTabJsonW = [
      Images.indexUnSelIcon,
      Images.shopUnSelIcon,
      Images.taskUnSelIcon,
      Images.mineUnSelIcon,
    ];

    // this.arrayTabText = ['附近', '商城', '我的'];
    this.arrayTabText = ['附近', '商城', '任务', '我的'];
    this.refAnimationArray = [];

    this.arrayColors = [
      ['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.6)'],
      ['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0)'],
      ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    ];
    this.AMShowSlideIndex = 0;
    _.throttle(this.handleOnPress, 1000);
  }

  componentDidMount() {}

  shouldComponentUpdate(np, ns) {
    if (np.state.index !== this.props.state.index) {
      return isAndroid ? true : true;
    }
    return true;
  }

  isTabInAMShowTuijie = (state) => {
    return this.AMShowSlideIndex === 0 && state.index === 1;
  };

  handleOnPress = (index, route, isFocused) => {
    console.log(route);
    const {navigation} = this.props;
    if (index === 1) {
      AppStore.shouldAMMapShort = true;
    } else {
      AppStore.shouldAMMapShort = false;
    }
    this.setState({
      selTab: index,
    });
    const timerPress = setTimeout(() => {
      clearTimeout(timerPress);
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    }, 0);
  };

  render() {
    if (AppStore.isTabFocused) {
      !isAndroid &&
        this.refAminate?.transitionTo({
          bottom: 0,
        });
    } else {
      !isAndroid &&
        this.refAminate?.transitionTo({
          bottom: -BOTTOM_TAB_HEIGHT,
        });
    }
    const {state, descriptors, navigation, safeAreaInsets} = this.props;

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    const MyView = !isAndroid ? Animatable.View : View;
    const {selTab, msgCount} = this.state;
    return (
      <MyView
        animation={'fadeInUp'}
        ref={(ref) => (this.refAminate = ref)}
        style={[styles.tabBox]}>
        <View
          style={styles.container}
          source={Images.tabBack}
          resizeMode="contain">
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const isFocused = state.index === index;
            const onPress = () => this.handleOnPress(index, route, isFocused);
            _.throttle(onPress, 1000);
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            return (
              <TouchableOpacity
                activeOpacity={1}
                accessibilityRole="button"
                testID={options.tabBarTestID}
                onPress={_.throttle(
                  () => this.handleOnPress(index, route, isFocused),
                  1000,
                )}
                onLongPress={onLongPress}
                style={{
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    styles.imgBox,
                    {
                      backgroundColor: isFocused ? '#FF9B00' : '#fff',
                    },
                  ]}>
                  <FMImage
                    resizeMode="contain"
                    source={
                      isFocused
                        ? this.arrayTabJson?.[index]
                        : this.arrayTabJsonW?.[index]
                    }
                    style={[isFocused ? styles.isSel : styles.viewLottieLoop]}
                  />
                </View>
                <Text
                  style={[
                    styles.tabText,
                    {color: isFocused ? '#FF9B00' : '#000000'},
                  ]}>
                  {this.arrayTabText?.[index]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  viewLottieLoop: {
    width: Utils.properWidth(21),
    height: Utils.properWidth(21),
  },
  isSel: {
    width: Utils.properWidth(17),
    height: Utils.properWidth(17),
  },
  imgBox: {
    width: Utils.properWidth(23),
    height: Utils.properWidth(23),
    borderRadius: Utils.properWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dian: {
    position: 'absolute',
    width: Utils.properWidth(6),
    height: Utils.properWidth(6),
    borderRadius: Utils.properWidth(3),
    backgroundColor: '#F53B00',
    right: 1,
    bottom: 2,
  },
  superContainer: {
    width: '100%',
    height: BOTTOM_TAB_HEIGHT,
    bottom: 0,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  container: {
    flexDirection: 'row',
    height: BOTTOM_TAB_HEIGHT,
    width: '100%',
    paddingTop: Utils.properWidth(5),
    justifyContent: 'space-between',
    paddingHorizontal: Utils.properWidth(30),
    borderTopColor: '#E9E9E9',
    borderTopWidth: 1,
    // borderRadius: 31,
    overflow: 'hidden',
    // backgroundColor: 'rgba(247, 247, 247, 0.8)',
  },
  tabText: {
    fontSize: Utils.properWidth(10),
    lineHeight: Utils.properWidth(15),
    marginTop: 3,
  },
  tabBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    // paddingBottom: Utils.properWidth(30),
    backgroundColor: '#fff',
  },
  absolute: {
    height: '100%',
    width: Utils.properWidth(292),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 31,
    backgroundColor: 'rgba(149, 187, 203, 0.2)',
  },
});

// export default MyTabBar;

/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Utils from '../../../Utils';

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FMImage from './FMImage';

export default class FMBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }
  get pagination() {
    const {activeSlide} = this.state;
    const {imgs, pagColor, dotContainerStyle} = this.props;
    return (
      <Pagination
        dotsLength={imgs.length || 1}
        activeDotIndex={activeSlide}
        containerStyle={{...styles.pags, ...dotContainerStyle}}
        dotStyle={{
          width: 5,
          height: 5,
          borderRadius: 3,
          backgroundColor: pagColor || '#fff',
          opacity: 0.6,
        }}
        inactiveDotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          // marginHorizontal: 2.725,
          backgroundColor: pagColor || '#fff',
          opacity: 1,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
      />
    );
  }

  renderPag = () => {
    const {activeSlide} = this.state;
    const {imgs, dotContainerStyle} = this.props;
    return (
      <View style={[styles.pags, dotContainerStyle]}>
        {imgs?.map((item, index) => {
          return (
            <View
              style={[
                styles.pag,
                {
                  opacity: activeSlide === index ? 1 : 0.6,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };
  render() {
    const {
      imgs,
      style,
      itemWidth,
      height,
      autoplayInterval,
      autoplay,
      onPress,
      noradius,
      sliderWidth,
      inactiveSlideScale,
      loop,
      onChange,
      itemStyle,
    } = this.props;

    const customSliderWidth = sliderWidth || Utils.properWidth(375);
    const customItemWidth = itemWidth || Utils.properWidth(348);
    return (
      <View style={{...styles.banner, height, ...style}}>
        <Carousel
          data={imgs}
          sliderWidth={customSliderWidth}
          itemWidth={itemWidth || Utils.properWidth(348)}
          // itemWidth={Utils.properWidth(375)}
          inactiveSlideScale={inactiveSlideScale || 1}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={itemStyle}
                onPress={() => onPress?.({item, index})}>
                {!!item?.pic && (
                  <FMImage
                    // resizeMode="cover"
                    source={{uri: item.pic}}
                    isUri
                    style={{
                      ...styles.swiper,
                      // width: customSliderWidth,
                      height,
                      borderRadius: noradius ? 0 : 25,
                      marginHorizontal:
                        (customSliderWidth - customItemWidth) / 2,
                    }}
                    key={index}
                  />
                )}
              </TouchableOpacity>
            );
          }}
          loop={loop}
          autoplay={autoplay}
          autoplayInterval={autoplayInterval}
          onSnapToItem={(index) => {
            onChange?.(index);
            this.setState({activeSlide: index});
          }}
        />
        {/* {this.pagination} */}
        {imgs?.length > 1 && this.renderPag()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    // width: '100%',
    height: 139,
    // backgroundColor: Colors.purple,
  },
  banner: {
    height: 139,
    position: 'relative',
    alignItems: 'center',
  },
  pags: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6.5,
    height: 11,
    paddingHorizontal: 10,
    bottom: 6.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pag: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
});

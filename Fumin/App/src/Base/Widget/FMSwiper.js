import React from 'react';
import {Platform} from 'react-native';
import {ScrollView} from 'react-native';
import Utils from '../../../Utils';
const isAndroid = Platform.OS === 'android';
const FMSwiper = ({
  data,
  renderItem,
  onScrollEnd,
  style,
  contentContainerStyle,
  refSwiper,
  index,
  unScroll,
  onScrollStart,
  onScroll,
}) => {
  let i = index;
  return (
    <ScrollView
      ref={refSwiper}
      bounces={false}
      scrollEventThrottle={16}
      onMomentumScrollEnd={({nativeEvent}) => {
        if (isAndroid && onScrollEnd) {
          i = Math.round(
            nativeEvent.contentOffset.x / Utils.getScreenSize().width,
          );
          onScrollEnd(i);
        }
      }}
      onScrollBeginDrag={onScrollStart}
      onScroll={onScroll}
      onScrollEndDrag={({nativeEvent}) => {
        if (!isAndroid && onScrollEnd) {
          i = Math.round(
            nativeEvent.targetContentOffset.x / Utils.getScreenSize().width,
          );
          onScrollEnd(i);
        }
      }}
      style={style}
      contentContainerStyle={contentContainerStyle}
      pagingEnabled
      scrollEnabled={!unScroll}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {data?.map(renderItem)}
    </ScrollView>
  );
};

export default FMSwiper;

import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  // Text,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import Images from '../../../Images';
import XXYJImage from '../../Base/Widget/XXYJImage';
import {Neomorph} from 'react-native-neomorph-shadows';
import Utils from '../../../Utils';
const isAndroid = Platform.OS === 'android';
class XXYJHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      onLeftPress,
      title,
      leftText,
      leftTextStyle,
      headerStyle,
      titleStyle,
      rightChildren,
      leftBtnStyle,
    } = this.props;
    const Cutton = isAndroid ? Neomorph : View;
    return (
      <View style={[styles.header, headerStyle]}>
        <View
          style={[styles.neomorph, styles.leftBtn, leftBtnStyle]}>
          <TouchableOpacity
            style={styles.in}
            activeOpacity={1}
            onPress={onLeftPress}>
            {!leftText && (
              <XXYJImage source={Images.backBlack} style={styles.backImg} />
            )}
            {!!leftText && (
              <Text
                numberOfLines={1}
                style={[styles.leftTextStyle, leftTextStyle]}>
                {leftText}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <Text numberOfLines={1} style={[styles.title, titleStyle]}>
          {title}
        </Text>
        {rightChildren}
      </View>
    );
  }
}
const con = ({
  onLeftPress,
  title,
  leftText,
  leftTextStyle,
  rightText,
  rightTextStyle,
  onRightPress,
  rightImage,
  headerStyle,
  rightBtnStyle,
  userInfo,
  titleStyle,
  rightImageStyle,
  leftTitle,
  leftTitleStyle,
  needRightCollect,
  isCollect,
  rightChildren,
  needRightUnCollectImage,
  haveRight,
}) => {
  return (
    <XXYJHeader
      onLeftPress={onLeftPress}
      title={title}
      leftText={leftText}
      leftTextStyle={leftTextStyle}
      rightText={rightText}
      rightTextStyle={rightTextStyle}
      rightImage={rightImage}
      onRightPress={onRightPress}
      headerStyle={headerStyle}
      rightBtnStyle={rightBtnStyle}
      userInfo={userInfo}
      titleStyle={titleStyle}
      rightImageStyle={rightImageStyle}
      leftTitle={leftTitle}
      leftTitleStyle={leftTitleStyle}
      needRightCollect={needRightCollect}
      isCollect={isCollect}
      rightChildren={rightChildren}
      haveRight={haveRight}
      needRightUnCollectImage={needRightUnCollectImage}
    />
  );
};
export default con;

const styles = StyleSheet.create({
  header: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  neomorph: {
    borderRadius: 17.5,
    width: 35,
    height: 35,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  leftBtn: {
    left: 12.5,
  },
  rightBtn: {
    right: 12.5,
  },
  backImg: {
    width: 7,
    height: 13,
  },
  in: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    color: '#000',
    maxWidth: Utils.properWidth(220),
  },
  leftTextStyle: {
    fontSize: 12,
    color: '#000',
  },
  userInfo: {
    position: 'absolute',
    left: 62.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftTitle: {
    position: 'absolute',
    left: 62.5,
    fontSize: 19,
    lineHeight: 26.5,
    letterSpacing: 0.5,
  },
  userImg: {
    width: 23,
    height: 23,
  },
  picBox: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  username: {
    color: '#000',
    fontSize: 16,
    marginLeft: 8,
  },
  type: {
    color: '#000',
    fontSize: 14,
    marginLeft: 8,
  },
  collect: {
    width: 20,
    height: 24,
    margin: 6,
  },
});

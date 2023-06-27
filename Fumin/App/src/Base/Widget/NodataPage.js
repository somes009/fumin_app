import React, {Component} from 'react';

import {
  View,
  Text,
} from 'react-native';
import Utils from '../../../Utils';
import Images from '../../../Images';
import XXYJImage from '../../Base/Widget/XXYJImage';
export default class TribeIndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {text, style, image, imageStyle} = this.props;
    return (
      <View
        style={[
          {
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 40,
          },
          style,
        ]}>
        <XXYJImage
          source={image || Images.noData}
          style={[
            {
              width: Utils.properWidth(225.5),
              height: Utils.properWidth(199.5),
              marginTop: Utils.properWidth(-30),
            },
            imageStyle,
          ]}
        />
        <Text
          style={{
            color: '#000',
            fontSize: 17,
            lineHeight: 26,
            letterSpacing: 0.5,
            marginTop: Utils.properWidth(20),
            fontFamily: 'PingFangSC-Light',
          }}>
          {text || '暂无数据'}
        </Text>
      </View>
    );
  }
}

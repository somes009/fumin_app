/* eslint-disable radix */
import React, {Component} from 'react';

import {View, Image} from 'react-native';
import Utils from '../../../Utils';
import FMImage from './FMImage';

export default class RenderImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imw: props.customImageWidth,
      imh: 200,
      canShow: false,
      customImageWidth: props.customImageWidth || 344,
    };
    this.height = 0;
    this.width = props.customImageWidth;
  }
  render() {
    const {item, noSmall, style, unUri} = this.props;
    const {imw, imh, canShow, customImageWidth} = this.state;
    Image.getSize(item.pic, (width, height) => {
      console.log('item.pic', item.pic);
      console.log('xxxxx', width, height);
      this.height = height;
      this.width = width;
      const getWidth = parseInt(
        width / 2 < customImageWidth ? customImageWidth : width / 2,
      );
      const getHeigth = parseInt(
        (height / 2) * ((customImageWidth * 2) / width),
      );
      if (
        (getWidth === parseInt(imw) && getHeigth === parseInt(imh)) ||
        this.state.canShow
      ) {
        if (!this.state.canShow) {
          this.setState({canShow: true});
        }
      } else {
        // console.log('width-------------------------');
        console.log('height', height);
        this.setState({
          imw: getWidth,
          imh: getHeigth,
        });
      }
    });

    const heightImage = this.height * (customImageWidth / this.width);
    console.log('heightImage', this.width, heightImage, this.height);
    const uri = noSmall
      ? item?.pic
      : Utils.getImageOssProcess({imageUrl: item.pic, w: 750});
    return canShow ? (
      // <TouchableOpacity
      //   activeOpacity={1}
      //   onPress={() => {
      //     this.handleOpenPhotoWall([{url: item.uri, props: {}}], 0);
      //     // Utils.openBrowser(item.uri);
      //   }}>
      <FMImage
        source={
          unUri
            ? uri
            : {
                uri,
              }
        }
        style={[{width: customImageWidth, height: heightImage}, style]}
        resizeMode="contain"
        isUri
      />
    ) : (
      <View />
    );
    // </TouchableOpacity>
  }
}

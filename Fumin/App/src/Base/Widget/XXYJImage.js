import React from 'react';
import FastImage from 'react-native-fast-image';

import {Image} from 'react-native';
const XXYJImage = ({source, style, isUri, resizeMode, getRef, onLoadEnd}) => {
  const uri = isUri ? source?.uri : source;
  let Cuttom = uri ? FastImage : Image;
  if ((uri + '').indexOf('http') === -1 && isUri) {
    Cuttom = Image;
  }
  return (
    <Cuttom
      ref={getRef}
      source={source}
      resizeMode={resizeMode}
      style={style}
      onLoadEnd={onLoadEnd}
    />
  );
};
export default XXYJImage;

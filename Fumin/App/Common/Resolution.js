import {Dimensions} from 'react-native';
import {DESIGN_WIDTH, DESIGN_HEIGHT} from './Contant';

const designSize = {width: DESIGN_WIDTH, height: DESIGN_HEIGHT};
export default class Resolution {
  static get() {
    const {width, height} = Dimensions.get('window');
    const scale = width / designSize.width;

    return {
      width: designSize.width,
      height: height / scale,
      originWidth: width,
      originHeight: height,
      scale: scale,
    };
  }

  static getScreen() {
    const {width, height} = Dimensions.get('screen');
    const scale = width / designSize.width;
    return {
      width: designSize.width,
      height: (height - 16) / scale,
      scale: scale,
    };
  }

  static getAbsoluteValue(value) {
    return value * Resolution.get().scale;
  }
}

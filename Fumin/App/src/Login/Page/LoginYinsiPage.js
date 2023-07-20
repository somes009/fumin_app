/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Platform,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {ApiPostJson} from '../../../Api/RequestTool';
import CacheStore, {CacheStoreName} from '../../../Common/CacheStore';
import {ScrollView} from 'react-native-gesture-handler';
import Utils from '../../../Utils';
import FMHeader from '../../Base/Widget/FMHeader';
import RenderImage from '../../Base/Widget/RenderImage';
import EventBus, {EventBusName} from '../../../Api/EventBus';
import Images from '../../../Images';
import FMImage from '../../Base/Widget/FMImage';
const isAndroid = Platform.OS === 'android';
export default class LoginYinsiPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {safeAreaInsets, navigation} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <FMHeader
            onLeftPress={() => {
              navigation.goBack();
            }}
          />
          <FMImage source={Images.yinsi1} style={styles.img} />
          <FMImage source={Images.yinsi2} style={styles.img} />
          <FMImage source={Images.yinsi3} style={styles.img} />
          {/* <RenderImage
            item={{pic: Images.yinsi1}}
            unUri
            noSmall
            customImageWidth={Utils.properWidth(375)}
          />
          <RenderImage
            item={{pic: Images.yinsi2}}
            unUri
            noSmall
            customImageWidth={Utils.properWidth(375)}
          />
          <RenderImage
            item={{pic: Images.yinsi3}}
            unUri
            noSmall
            customImageWidth={Utils.properWidth(375)}
          /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 25,
  },
  img: {
    width: Utils.getScreenSize().width * 1.4,
    height: Utils.properWidth(530) * 1.4,
  },
});

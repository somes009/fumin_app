/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import FMFlatList from '../../Base/Widget/FMFlatList';
import IndexRenderItem from '../Widget/IndexRenderItem';
import FMImage from '../../Base/Widget/FMImage';
import Fonts from '../../../Common/Fonts';
import FMBanner from '../../Base/Widget/FMBanner';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';
import Geolocation from 'react-native-geolocation-service';
import Utils from '../../../Utils';
import Images from '../../../Images';
export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      banners: [],
    };
  }
  componentDidMount() {
    this.requestLocationPermission();
    this.getBanner();
  }
  getBanner = () => {
    const path = '/app-api/advertising/auth/getAdvertisingList';
    const params = {
      type: 2,
    };
    const onSuccess = (res) => {
      this.setState({
        banners: res.list,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  requestLocationPermission = () => {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    this.getLocation();
    console.log(PermissionsAndroid.RESULTS.GRANTED);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  };
  getLocation = () => {
    const config = {
      enableHighAccuracy: false,
      timeout: 2000,
      maximumAge: 3600000,
    };

    Geolocation.getCurrentPosition(
      (info) => {
        console.log('info', info);
        // const {latitude, longitude} = info.coords;
        global.coords = info.coords;
        this.setState(
          {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          },
          this.refList.handleRefresh,
        );
      },
      (error) => {
        this.getLocation();
        console.log('ERROR', error);
      },
      config,
    );
  };
  renderItem = ({item, index}) => {
    const {navigation} = this.props;
    return (
      <IndexRenderItem
        key={index}
        onPress={() => {
          navigation.navigate('IndexNav', {
            screen: 'ShopDetailPage',
            params: {
              shopId: item.id,
            },
          });
        }}
        item={item}
      />
    );
  };

  renderTop = () => {
    return (
      <View style={styles.topBox}>
        <TouchableOpacity style={styles.placeBox} activeOpacity={1}>
          <FMImage source={{uri: Images.logo}} style={styles.placeIcon} />
          <Text style={styles.placeText}>北京</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.searchBox}>
          <Text style={styles.searchText}>搜索</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderBanner = () => {
    const {banners} = this.state;
    if (!banners.length) {
      return;
    }
    return (
      <FMBanner
        style={{marginTop: 19}}
        itemWidth={343}
        height={104}
        loop
        autoplay
        autoplayInterval={5000}
        imgs={banners}
        imgName={'adImage'}
        onPress={this.handlePressBanner}
      />
    );
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {latitude, longitude} = this.state;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        {this.renderTop()}
        {this.renderBanner()}
        <FMFlatList
          ref={(ref) => (this.refList = ref)}
          isApiPostJson
          style={{flex: 1, width: Utils.getScreenSize().width}}
          // isApiPostJson={false}
          //  responseKey={'history'}
          requestPath="/app-api/product/merchant/auth/selectNearbyBusiness"
          requestParams={
            {
              // latitude,
              // longitude,
            }
          }
          handleRefresh={() => {
            // this.getLocation();
          }}
          keyExtractor={(item) => item?.id}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
            alignItems: 'center',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  topBox: {
    marginTop: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  placeIcon: {
    width: 16,
    height: 21,
    marginRight: 5,
  },
  placeText: {
    fontSize: 13,
    lineHeight: 17,
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
  },
  searchBox: {
    flex: 1,
    paddingLeft: 13,
    height: 36,
    backgroundColor: '#F1F1F1',
    borderRadius: 18,
    justifyContent: 'center',
  },
  searchText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#6D7278',
    fontFamily: Fonts.PingFangSC_Regular,
  },
});

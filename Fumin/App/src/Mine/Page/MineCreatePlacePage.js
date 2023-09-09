/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Utils from '../../../Utils';
import Fonts from '../../../Common/Fonts';
import FMHeader from '../../Base/Widget/FMHeader';
import FMTextInput from '../../Base/Widget/FMTextinput';
import PlacePicker from '../Widget/PlacePicker/index';
import {ApiGet, ApiPostJson, ApiPut} from '../../../Api/RequestTool';

export default class MineCreatePlacePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route?.params?.id,
      name: '',
      phone: '',
      place1: '',
      place2: '',
      placeList: [],
      cityList: [],
      quList: [],
      placeId: 0,
      cityId: 0,
      quId: 0,
      defaulted: false,
      show: false,
    };
  }
  componentDidMount() {
    this.getPlace();
  }
  getPlace = () => {
    const path = '/app-api/system/area/auth/tree';
    // const path = '/admin-api/system/area/get-by-ip';
    const params = {
      // objType: 1,
    };
    const onSuccess = (res) => {
      let list = [...res];
      list.unshift({
        name: '无',
        id: null,
        children: [],
      });
      console.log(list);
      this.setState(
        {
          placeList: list,
        },
        this.getData,
      );
    };
    const onFailure = (err) => {};
    ApiGet({
      path,
      params,
      onSuccess,
      onFailure,
    });
  };
  getData = () => {
    const {id, placeList} = this.state;
    if (!id) {
      this.setState({
        show: true,
      });
      return;
    }
    const path = '/app-api/member/address/get';
    // const path = '/admin-api/system/area/get-by-ip';
    const params = {
      id,
    };
    const onSuccess = (res) => {
      console.log(res);
      this.setState({
        name: res.name,
        phone: res.mobile,
        place2: res.detailAddress,
        quId: res.areaId,
        defaulted: res.defaulted,
      });
      for (var i = 0; i < placeList.length; i++) {
        const cityList = placeList[i].children;
        // 遍历第二维
        for (var j = 0; j < cityList.length; j++) {
          const quList = cityList?.[j]?.children;
          // 遍历第三维
          for (var k = 0; k < quList.length; k++) {
            // 如果找到目标元素，返回它的索引
            if (quList[k].id === res.areaId) {
              this.setState({
                placeId: placeList[i].id,
                cityId: cityList?.[j].id,
                cityList,
                quId: res.areaId,
                quList,
                show: true,
              });
              return;
            }
          }
        }
      }
    };
    const onFailure = (err) => {};
    ApiGet({
      path,
      params,
      onSuccess,
      onFailure,
    });
  };
  renderPhone = () => {
    const {phone} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}>手机号</Text>
        <FMTextInput
          keyboardType="numeric"
          placeholder="请输入收货人手机号"
          maxLength={11}
          value={phone}
          onChangeText={(text) => {
            this.setState({
              phone: text,
            });
          }}
          isNumber
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
        />
      </View>
    );
  };
  renderName = () => {
    const {name} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}>收货人</Text>
        <FMTextInput
          placeholder="请输入收货人姓名"
          maxLength={11}
          value={name}
          onChangeText={(text) => {
            this.setState({
              name: text,
            });
          }}
          isNumber
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
        />
      </View>
    );
  };
  renderPlace1 = () => {
    const {placeList, cityList, quList, placeId, cityId, quId} = this.state;
    return (
      <View style={[styles.infoBox, {alignItems: 'flex-start'}]}>
        <Text style={styles.title}>所在地区</Text>
        {!!placeList.length && (
          <PlacePicker
            onLocationChange={(type, id) => {
              if (type === 1) {
                for (let i in placeList) {
                  if (placeList[i].id === id) {
                    this.setState({
                      placeId: id,
                      cityList: placeList[i].children,
                      quList: [],
                    });
                  }
                }
              } else if (type === 2) {
                for (let i in cityList) {
                  if (cityList[i].id === id) {
                    this.setState({
                      cityId: id,
                      quList: cityList[i].children,
                    });
                  }
                }
              } else {
                this.setState({
                  quId: id,
                });
              }
            }}
            provinces={placeList}
            cities={cityList}
            districts={quList}
            placeId={placeId}
            cityId={cityId}
            quId={quId}
          />
        )}
      </View>
    );
  };
  renderPlace2 = () => {
    const {place2} = this.state;
    return (
      <View style={styles.infoBox}>
        <Text style={styles.title}>详细地址</Text>
        <FMTextInput
          placeholder="请输入详细地址"
          maxLength={11}
          value={place2}
          onChangeText={(text) => {
            this.setState({
              place2: text,
            });
          }}
          isNumber
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
        />
      </View>
    );
  };
  handleCreate = () => {
    const {name, phone, defaulted, place2, quId, id} = this.state;
    const API = id ? ApiPut : ApiPostJson;
    const path = id
      ? '/app-api/member/address/update'
      : '/app-api/member/address/create';
    const params = {
      name,
      mobile: phone,
      areaId: quId,
      detailAddress: place2,
      defaulted,
      postCode: 258000,
      id,
    };
    const onSuccess = (res) => {
      const {navigation} = this.props;
      navigation.goBack();
    };
    API({
      path,
      params,
      onSuccess,
    });
  };
  renderBottom = () => {
    const {defaulted} = this.state;
    return (
      <View style={styles.loginBottom}>
        <TouchableOpacity
          style={styles.loginBottomIn}
          onPress={() => {
            this.setState(
              {
                defaulted: !defaulted,
              },
              this.check,
            );
          }}
          activeOpacity={1}>
          <View style={styles.selBox}>
            {defaulted && <View style={styles.isSelCri} />}
          </View>
          <Text style={styles.loginBottomText}>设为默认</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    const {show} = this.state;
    if (!show) {
      return <View />;
    }
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title="新增收货地址"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.infoList}>
          {this.renderName()}
          {this.renderPhone()}
          {this.renderPlace1()}
          {this.renderPlace2()}
          {this.renderBottom()}
        </View>
        <TouchableOpacity
          onPress={this.handleCreate}
          activeOpacity={1}
          style={styles.addBtn}>
          <Text style={styles.addText}>完成</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
  },
  infoList: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 23,
  },
  infoBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    // lineHeight: 22,
  },
  input: {
    fontSize: 14,
    fontFamily: Fonts.PingFangSC_Regular,
    lineHeight: 19,
    padding: 0,
    paddingHorizontal: 4.5,
  },
  containerStyle: {
    width: 249,
    height: 31,
    borderRadius: 5,
    marginTop: 0,
    backgroundColor: '#E9E9E9',
  },
  addBtn: {
    width: 343,
    height: 47,
    borderRadius: 9,
    position: 'absolute',
    bottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9B00',
  },
  addText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
  loginBottom: {
    marginTop: 30,
    alignItems: 'flex-end',
    width: '100%',
  },
  loginBottomIn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isSelCri: {
    width: 9,
    height: 9,
    backgroundColor: 'orange',
  },
});

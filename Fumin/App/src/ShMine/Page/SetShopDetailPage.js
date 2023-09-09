/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import FMImage from '../../Base/Widget/FMImage';
import Fonts from '../../../Common/Fonts';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';
import Utils from '../../../Utils';
import FMHeader from '../../Base/Widget/FMHeader';
import FMTextInput from '../../Base/Widget/FMTextinput';
import CommonButtonsPopUp from '../../Base/Widget/CommonButtonsPopUp';
import _ from 'lodash';
import Images from '../../../Images';
import FMButton from '../../Base/Widget/FMButton';
export default class SetShopDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route?.params?.id,
      name: '',
      phone: '',
      yewu: '',
      imgList: [],
      classify: 0,
      payType: 0,
      expenseType: 0,
      count: '',
      place: '',
      picList: [],
      categoryId: 0,
    };
  }

  async requestCarmeraPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      // 返回值为一个 object，key 为各权限名称，值为PermissionsAndroid.RESULTS
      const allPermissionsGranted = Object.values(granted).every(
        (result) => result === PermissionsAndroid.RESULTS.GRANTED,
      );
      if (allPermissionsGranted) {
      }
    } catch (err) {}
  }
  componentDidMount() {
    this.requestCarmeraPermission();
    const {id} = this.state;
    if (id) {
      this.getData();
    }
  }
  getData = () => {
    const {id} = this.state;
    const path = '/app-api/product/merchant/auth/getProductMerchantSpuDetail';
    const params = {
      id,
      // objType: 1,
    };
    const onSuccess = (res) => {
      this.setState({
        data: res,
        name: res.name,
        price: res.amount + '',
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  create = () => {
    const {name, payType, expenseType, count, price, imgList} = this.state;
    const path = '/app-api/product/spu/addSpuForAPP';
    const params = {
      name,
      picUrls: imgList,
      categoryId: 10,
      buyMode: payType + 1,
      consumeMode: expenseType + 1,
      totalStock: count,
      marketPrice: price * 100,
      status: 1,
    };
    const onSuccess = (res) => {
      this.setState({
        data: res,
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  openChange = () => {
    const {tabList} = this.state;
    let list = [];
    for (let i in tabList) {
      list.push({
        text: tabList[i].name,
        color: '#0091FF',
        fun: () => {
          this.setState({
            categoryId: tabList[i].id,
          });
          this.refPop.closeModal();
        },
      });
    }
    this.refPop.openModal({
      title: '',
      list,
    });
  };
  renderName = () => {
    const {name} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>门店名称</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <FMTextInput
          placeholder="请输入门店名称"
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
  renderPhone = () => {
    const {phone} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>手机号码</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <FMTextInput
          keyboardType="numeric"
          placeholder="请输入手机号码"
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
  renderPlace = () => {
    const {place} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>门店地址</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <FMTextInput
          placeholder="请输入门店地址"
          value={place}
          onChangeText={(text) => {
            this.setState({
              place: text,
            });
          }}
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
        />
      </View>
    );
  };
  renderImg = () => {
    const {imgList} = this.state;
    return (
      <View style={styles.renderImg}>
        <View
          style={[
            styles.infoBox,
            {flexDirection: 'column', alignItems: 'flex-start'},
          ]}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>营业执照</Text>
            <Text style={styles.xing}>*</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {imgList?.map((item, index) => {
              return (
                <FMImage
                  source={{uri: item}}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              );
            })}
            <TouchableOpacity
              activeOpacity={1}
              style={{width: 100, height: 100, backgroundColor: 'red'}}
              onPress={this.handleOpenImageLibrary.bind(this, {})}
            />
          </View>
        </View>
      </View>
    );
  };
  renderPic = () => {
    const {picList} = this.state;
    return (
      <View style={styles.renderImg}>
        <View
          style={[
            styles.infoBox,
            {flexDirection: 'column', alignItems: 'flex-start'},
          ]}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>门头照</Text>
            <Text style={styles.xing}>*</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {picList?.map((item, index) => {
              return (
                <FMImage
                  source={{uri: item}}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              );
            })}
            <TouchableOpacity
              activeOpacity={1}
              style={{width: 100, height: 100, backgroundColor: 'red'}}
              onPress={this.handleOpenPicLibrary.bind(this, {})}
            />
          </View>
        </View>
      </View>
    );
  };
  renderClassify = () => {
    const {categoryId, tabList} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>商品分类</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.openChange}
          style={styles.classifyBox}>
          <Text style={styles.classify}>
            {tabList.map((item, index) => {
              if (item.id === categoryId) {
                return item.name;
              }
            })}
          </Text>
          <FMImage source={Images.toBottomBlack} style={styles.toBottomBlack} />
        </TouchableOpacity>
      </View>
    );
  };
  renderCount = () => {
    const {count} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>营业执照号</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <FMTextInput
          placeholder="请输入营业执照号"
          value={count}
          onChangeText={(text) => {
            this.setState({
              count: text,
            });
          }}
          isNumber
          textStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.containerStyle}
          needBorder
          keyboardType={'numeric'}
        />
      </View>
    );
  };
  renderYewu = () => {
    const {yewu} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>主营业务</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <FMTextInput
          placeholder="请输入主营业务"
          value={yewu}
          onChangeText={(text) => {
            this.setState({
              yewu: text,
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
  handleOpenImageLibrary = ({index}) => {
    // console.log('index', index);
    const option = {
      mediaType: 'photo',
    };
    Utils.upLoadImg((uri) => {
      const {imgList} = this.state;
      let arr = _.cloneDeep(imgList);
      if (typeof index === 'number') {
        arr.splice(index, 1, uri);
      } else {
        arr.push(uri);
      }
      console.log(arr);
      this.setState({
        imgList: arr,
      });
      // this.refChangePic.closeModal();
    });
  };
  handleOpenPicLibrary = ({index}) => {
    // console.log('index', index);
    const option = {
      mediaType: 'photo',
    };
    Utils.upLoadImg((uri) => {
      const {picList} = this.state;
      let arr = _.cloneDeep(picList);
      if (typeof index === 'number') {
        arr.splice(index, 1, uri);
      } else {
        arr.push(uri);
      }
      this.setState({
        picList: arr,
      });
      // this.refChangePic.closeModal();
    });
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <FMHeader
          title="更改门店信息"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        {this.renderName()}
        {this.renderPhone()}
        {this.renderPlace()}
        {this.renderYewu()}
        {this.renderCount()}
        {this.renderImg()}
        {this.renderPic()}
        <FMButton
          text="提交"
          textStyle={styles.add}
          containerStyle={styles.addBox}
          onPress={this.create}
          unNeomorph={true}
        />
        <CommonButtonsPopUp ref={(ref) => (this.refPop = ref)} />
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
  infoBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 17,
  },
  titleBox: {
    flexDirection: 'row',
    height: 22,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    lineHeight: 22,
  },
  input: {
    fontSize: 14,
    padding: 0,
    paddingHorizontal: 4.5,
    fontFamily: Fonts.PingFangSC_Regular,
    lineHeight: 19,
  },
  containerStyle: {
    width: 258,
    height: 30,
    borderRadius: 5,
    marginTop: 0,
    backgroundColor: '#E9E9E9',
  },
  xing: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#FA6400',
    marginBottom: 5,
  },
  renderImg: {
    width: '100%',
  },
  classifyBox: {
    width: 258,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#E9E9E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 8,
  },
  classify: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  toBottomBlack: {
    width: 11,
    height: 6,
  },
  listBox: {
    width: 247,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selBox: {
    // width: 13,
    // height: 13,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#6D7278',
    marginRight: 7,
    padding: 2,
  },
  listText: {
    fontSize: 14,
    fontFamily: Fonts.PingFangSC_Regular,
    lineHeight: 19,
  },
  isSel: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  addBox: {
    position: 'absolute',
    bottom: 30,
    width: 343,
    height: 47,
    backgroundColor: '#FF9B00',
    borderRadius: 9,
  },
  add: {
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
    fontFamily: Fonts.PingFangSC_Regular,
  },
});

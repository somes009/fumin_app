/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';
import XXYJImage from '../../Base/Widget/XXYJImage';
import Fonts from '../../../Common/Fonts';
import XXYJBanner from '../../Base/Widget/XXYJBanner';
import {ApiGet, ApiPostJson} from '../../../Api/RequestTool';
import Utils from '../../../Utils';
import XXYJHeader from '../../Base/Widget/XXYJHeader';
import XXYJTextInput from '../../Base/Widget/XXYJTextinput';
import _ from 'lodash';
import Images from '../../../Images';
import XXYJButton from '../../Base/Widget/XXYJButton';
export default class ShProductAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route?.params?.id,
      name: '',
      type: '',
      imgList: [],
      classify: 0,
      payType: 0,
      expenseType: 0,
      count: '',
      price: '',
    };
  }
  componentDidMount() {
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
        price: res.amount / 100 + '',
      });
    };
    ApiPostJson({
      path,
      params,
      onSuccess,
    });
  };
  renderName = () => {
    const {name} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>商品名称</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <XXYJTextInput
          placeholder="请输入商品名称"
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
  renderType = () => {
    const {type} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>规格型号</Text>
        </View>
        <XXYJTextInput
          placeholder="请输入规格型号"
          maxLength={11}
          value={type}
          onChangeText={(text) => {
            this.setState({
              type: text,
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
    Utils.upLoadImg((uri) => {
      console.log(uri);
      const {imgList} = this.state;
      let arr = _.cloneDeep(imgList);
      if (typeof index === 'number') {
        arr.splice(index, 1, uri);
      } else {
        arr.push(uri);
      }
      this.setState({
        list: arr,
      });
      // this.refChangePic.closeModal();
    });
  };
  renderImg = () => {
    return (
      <View style={styles.renderImg}>
        <View style={styles.infoBox}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>商品图片</Text>
            <Text style={styles.xing}>*</Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={{width: 100, height: 100, backgroundColor: 'red'}}
            onPress={this.handleOpenImageLibrary.bind(this, {})}
          />
        </View>
      </View>
    );
  };
  renderClassify = () => {
    const {classify} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>商品分类</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <TouchableOpacity style={styles.classifyBox}>
          <Text style={styles.classify}>食品</Text>
          <XXYJImage
            source={Images.toBottomBlack}
            style={styles.toBottomBlack}
          />
        </TouchableOpacity>
      </View>
    );
  };
  renderPayType = () => {
    const {payType} = this.state;
    const list = ['现金', '现金 + 红包金', '福豆'];
    return (
      <View style={[styles.infoBox, {paddingVertical: 5}]}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>购买方式</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <View style={styles.listBox}>
          {list.map((item, index) => {
            const isSel = payType === index;
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.selItem}
                onPress={() => {
                  this.setState({
                    payType: index,
                  });
                }}>
                <View style={styles.selBox}>
                  <View
                    style={[
                      styles.isSel,
                      {
                        backgroundColor: isSel ? '#FF9B00' : '#fff',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.listText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  renderCount = () => {
    const {count} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>库存数量</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <XXYJTextInput
          placeholder="请输入库存数量"
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
  renderExpenseType = () => {
    const {expenseType} = this.state;
    const list = ['到店自提', '邮寄', '用户自选'];
    return (
      <View style={[styles.infoBox, {paddingVertical: 5}]}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>消费方式</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <View style={styles.listBox}>
          {list.map((item, index) => {
            const isSel = expenseType === index;
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.selItem}
                onPress={() => {
                  this.setState({
                    expenseType: index,
                  });
                }}>
                <View style={styles.selBox}>
                  <View
                    style={[
                      styles.isSel,
                      {
                        backgroundColor: isSel ? '#FF9B00' : '#fff',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.listText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  renderPrice = () => {
    const {price} = this.state;
    return (
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>销售价</Text>
          <Text style={styles.xing}>*</Text>
        </View>
        <XXYJTextInput
          placeholder="请输入销售价"
          value={price}
          onChangeText={(text) => {
            this.setState({
              price: text,
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
      const {list} = this.state;
      let arr = _.cloneDeep(list);
      if (typeof index === 'number') {
        arr.splice(index, 1, uri);
      } else {
        arr.push(uri);
      }

      this.setState({
        list: arr,
      });
      // this.refChangePic.closeModal();
    });
  };
  render() {
    const {navigation, safeAreaInsets} = this.props;
    return (
      <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
        <XXYJHeader
          title="填写信息"
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        {this.renderName()}
        {this.renderType()}
        {this.renderImg()}
        {this.renderClassify()}
        {this.renderPayType()}
        {this.renderCount()}
        {this.renderExpenseType()}
        {this.renderPrice()}
        <XXYJButton
          text="完成"
          textStyle={styles.add}
          containerStyle={styles.addBox}
          onPress={() => {
            navigation.navigate('ShProductNav', {
              screen: 'ShProductAddPage',
            });
          }}
          unNeomorph={true}
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

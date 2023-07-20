import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
// import Colors from '../../../Common/Colors';
import Utils from '../../../Utils';
import Images from '../../../Images';
const isAndroid = Platform.OS === 'android';
import FMActionSheet from './FMActionSheet';
import FMButton from './FMButton';
import Fonts from '../../../Common/Fonts';
import FMImage from './FMImage';

export default class FMSelPayWayPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handlePay: () => {},
      count: '1',
      price: '',
      amount: '',
      type: 0,
    };
    this.refAndroid = {};
  }
  openModal = () => {
    // this.setState({handlePay, selType, price});
    isAndroid ? this.refAndroid.handleShow() : this.refIos.handleShow();
  };

  closeModal = () => {
    isAndroid ? this.refAndroid.handleClose() : this.refIos.handleClose();
  };

  renderPlaceBox = () => {
    const {place, handlePlace} = this.props;
    console.log(place);
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.closeModal();
          handlePlace();
        }}
        style={styles.placeBox}>
        <View style={styles.leftBox}>
          <Text style={styles.namePhone}>
            {place.name} {place.mobile}
          </Text>
          <Text style={styles.place}>{place.detailAddress}</Text>
        </View>
        <FMImage source={Images.toRightGray} style={styles.toRight} />
      </TouchableOpacity>
    );
  };

  renderCount = () => {
    const {buyCount, changeCount} = this.props;
    return (
      <View style={styles.countBox}>
        <Text style={styles.countTitle}>数量</Text>
        <View style={styles.changeCount}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (buyCount > 1) {
                changeCount(+buyCount - 1 + '');
                // this.setState({
                //   count: +buyCount - 1 + '',
                // });
              }
            }}
            style={styles.minusBox}>
            <Text style={styles.minusText}>-</Text>
          </TouchableOpacity>
          {/* <View style={styles.countIn}> */}
          <TextInput
            keyboardType="numeric"
            style={styles.countInput}
            value={buyCount}
            onChangeText={(text) => {
              changeCount(text);
              // this.setState({
              //   count: text,
              // });
            }}
          />
          {/* </View> */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              changeCount(+buyCount + 1 + '');
              // this.setState({
              //   count: +count + 1 + '',
              // });
            }}
            style={styles.addBox}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderRemark = () => {
    return (
      <View style={styles.countBox}>
        <Text style={styles.countTitle}>订单备注</Text>
        <TouchableOpacity
          activeOpacity={1}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.remark}>无备注</Text>
          <FMImage source={Images.toRightGray} style={styles.remarkToRight} />
        </TouchableOpacity>
      </View>
    );
  };

  renderContent = () => {
    const {handleBuy, data, buyCount} = this.props;
    return (
      <View style={styles.popUp}>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <FMImage style={styles.img} />
            <Text style={styles.price}>¥{data.amount / 100}</Text>
          </View>
          {this.renderPlaceBox()}
          {this.renderClassifyBox()}
          {this.renderCount()}
          {this.renderRemark()}
          <TouchableOpacity
            onPress={() => {
              handleBuy?.(+buyCount);
            }}
            activeOpacity={1}
            style={styles.buyBtn}>
            <Text style={styles.buyText}>立即支付</Text>
            <Text style={styles.buyPrice}>
              ¥{(data.amount / 100) * +buyCount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderClassifyBox = () => {
    const {type} = this.state;
    const list = ['白色', '粉色', '蓝色', '绿色'];
    return (
      <View style={styles.flBox}>
        <Text style={styles.flTitle}>分类</Text>
        <View style={styles.flList}>
          {list.map((item, index) => {
            const isSel = type === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.setState({
                    type: index,
                  });
                }}
                style={[
                  styles.flItem,
                  {backgroundColor: isSel ? '#FF9B00' : '#E9E9E9'},
                ]}
                activeOpacity={1}>
                <Text
                  style={[styles.flText, {color: isSel ? '#fff' : '#6D7278'}]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    return (
      <FMActionSheet
        ref={(ref) => (this.refIos = ref)}
        refPop={this.refAndroid}
        children={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  popUp: {
    width: '100%',
  },
  topBox: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  infoBox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width: 83,
    height: 83,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  price: {
    fontSize: 31,
    lineHeight: 36,
    marginLeft: 16,
    fontFamily: Fonts.DIN_Alternate,
    color: '#FF9B00',
  },
  placeBox: {
    width: Utils.properWidth(343),
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    shadowColor: '#70738F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  namePhone: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  place: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#6D7278',
    marginTop: 8,
  },
  toRight: {
    width: 7,
    height: 13,
  },
  flBox: {
    marginTop: 15,
    width: '100%',
  },
  flTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
    width: '100%',
  },
  flList: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  flItem: {
    width: 42,
    height: 23,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  flText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.PingFangSC_Regular,
  },
  countBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
  },
  countTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.PingFangSC_Medium,
    color: '#000',
  },
  changeCount: {
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6D7278',
    flexDirection: 'row',
  },
  minusBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 17,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#6D7278',
  },
  addBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 17,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#6D7278',
  },
  minusText: {
    fontSize: 15,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#979797',
  },
  addText: {
    fontSize: 15,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
  },
  countInput: {
    minWidth: 29,
    textAlign: 'center',
    padding: 0,
    paddingHorizontal: 3,
    fontSize: 15,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#000',
    height: 18,
  },
  remark: {
    fontSize: 14,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#6D7278',
  },
  remarkToRight: {
    width: 7,
    height: 13,
    marginLeft: 8,
  },
  buyBtn: {
    width: 343,
    height: 33,
    borderRadius: 8,
    backgroundColor: '#FF9B00',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 122,
    flexDirection: 'row',
  },
  buyText: {
    fontSize: 16,
    fontFamily: Fonts.PingFangSC_Regular,
    color: '#fff',
  },
  buyPrice: {
    fontSize: 21,
    fontFamily: Fonts.DIN_Alternate,
    color: '#fff',
    marginLeft: 3,
    marginBottom: 1,
  },
});

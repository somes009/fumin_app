import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
// import Colors from '../../../Common/Colors';
import Utils from '../../../Utils';
import Images from '../../../Images';
const isAndroid = Platform.OS === 'android';
import FMActionSheet from './FMActionSheet';
import FMButton from './FMButton';
import Fonts from '../../../Common/Fonts';
import FMImage from './FMImage';

const SCREEN_SCALE = Dimensions.get('window').width / 375;
const screenScale = (param) => param * SCREEN_SCALE;
export default class FMSelPayWayPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handlePay: () => {},
      selType: '',
      price: '',
      amount: '',
      type: 0,
    };
    this.refAndroid = {};
  }
  openModal = () => {
    isAndroid ? this.refAndroid.handleShow() : this.refIos.handleShow();
  };

  closeModal = () => {
    isAndroid ? this.refAndroid.handleClose() : this.refIos.handleClose();
  };
  renderContent = () => {
    const {type, selType} = this.state;
    const {price} = this.props;
    const list = [
      {
        text: '支付宝',
        img: Images.zhifubaoImg,
      },
      {
        text: '微信',
        img: Images.weChatImg,
      },
    ];
    return (
      <View style={styles.popUp}>
        <View style={styles.topBox}>
          <Text style={styles.title}>交易方式</Text>
          <View style={styles.list}>
            {list.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    this.setState({type: index});
                    // selType?.(index ? 1 : 2);
                  }}
                  activeOpacity={1}>
                  <View style={styles.left}>
                    <FMImage style={styles.img} source={item.img} />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                  {type === index ? (
                    <View style={styles.greenCri}>
                      <FMImage
                        source={Images.isRightWhite}
                        style={styles.isRight}
                      />
                    </View>
                  ) : (
                    <View style={styles.cri} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.bottom}>
            <View style={styles.bottomLeft}>
              <Text style={styles.heji}>合计：</Text>
              <Text style={styles.payText}>
                <Text style={styles.payImg}>¥</Text>
                {price}
              </Text>
            </View>
            <FMButton
              text="确认交易"
              containerStyle={styles.patBtn}
              textStyle={{fontSize: 17}}
              onPress={this.props.handleBuy.bind(this, type)}
            />
          </View>
        </View>
      </View>
    );
  };
  render() {
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
  viewOverlay: {
    width: screenScale(375),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  close: {
    width: screenScale(44),
    height: screenScale(6),
    marginTop: screenScale(15.5),
  },
  popUp: {
    width: '100%',
  },
  topBox: {
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenScale(338),
    alignItems: 'center',
    marginTop: screenScale(26),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: screenScale(30),
    height: screenScale(30),
  },
  text: {
    fontSize: screenScale(17),
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
    marginLeft: screenScale(7),
    letterSpacing: 0.47,
  },
  selImg: {
    width: screenScale(18),
    height: screenScale(18),
  },
  cri: {
    width: screenScale(18),
    height: screenScale(18),
    borderRadius: screenScale(9),
    backgroundColor: '#F7F7F7',
    borderWidth: 0.5,
    borderColor: '#EAEBEE',
  },
  greenCri: {
    width: screenScale(18),
    height: screenScale(18),
    borderRadius: screenScale(9),
    backgroundColor: '#FF9B00',
    alignItems: 'center',
  },
  isRight: {
    width: 13.32,
    height: 12.71,
    marginTop: 2.5,
  },
  bottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: screenScale(73),
    alignItems: 'center',
    marginBottom: screenScale(24.5),
    paddingHorizontal: 18,
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heji: {
    fontSize: screenScale(15),
    lineHeight: screenScale(21),
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
    fontWeight: '300',
  },
  payText: {
    color: '#FF9B00',
    fontSize: screenScale(20),
    // lineHeight: screenScale(20),
    fontFamily: Fonts.DIN_Alternate,
  },
  payImg: {
    fontSize: screenScale(14),
  },
  youhui: {
    fontSize: screenScale(16),
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
    marginLeft: screenScale(-4.5),
  },
  patBtn: {
    width: screenScale(73),
    height: screenScale(30),
    borderRadius: 21.5,
  },
  leftText: {
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.47,
    color: '#000',
    fontFamily: Fonts.PingFangSC_Light,
  },
  jianBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toRight: {
    width: 8,
    height: 13.5,
    marginLeft: 5.5,
  },
  title: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: '#000',
    fontFamily: Fonts.PingFangSC_Regular,
  },
});

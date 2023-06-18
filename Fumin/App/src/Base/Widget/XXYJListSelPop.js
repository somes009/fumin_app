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
import XXYJActionSheet from './XXYJActionSheet';
import XXYJButton from './XXYJButton';
import Fonts from '../../../Common/Fonts';
import XXYJImage from './XXYJImage';

export default class XXYJListSelPop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handlePay: () => {},
      selId: '',
    };
    this.refAndroid = {};
  }
  // componentDidMount() {
  //   this.openModal();
  // }
  openModal = () => {
    isAndroid ? this.refAndroid.handleShow() : this.refIos.handleShow();
  };

  closeModal = () => {
    isAndroid ? this.refAndroid.handleClose() : this.refIos.handleClose();
  };

  renderItem = (item, index) => {
    const {selId} = this.state;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            selId: item.id,
          });
        }}
        style={styles.item}
        key={item.id}
        activeOpacity={1}>
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={selId === item.id ? styles.isSel : styles.selCri} />
      </TouchableOpacity>
    );
  };

  renderContent = () => {
    const {title, smlTitle, list, handle} = this.props;
    const {selId} = this.state;
    return (
      <View style={styles.popUp}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.smlTitle}>{smlTitle}</Text>
        <View style={styles.list}>{list.map(this.renderItem)}</View>
        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.button, styles.left]}>
            <Text style={styles.buttonText}>暂不取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.closeModal();
              handle?.(selId);
            }}
            activeOpacity={1}
            style={[styles.button, styles.right]}>
            <Text style={styles.buttonText}>确定取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    return (
      <XXYJActionSheet
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
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 16,
    lineHeight: 22,
  },
  smlTitle: {
    width: '100%',
    paddingLeft: 24,
    marginTop: 22,
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 15,
    lineHeight: 21,
    color: '#6D7278',
  },
  list: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 9.5,
  },
  item: {
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 9.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 15,
    lineHeight: 21,
    color: '#000',
  },
  selCri: {
    width: 17,
    height: 17,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#979797',
  },
  isSel: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#FF9B00',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 7.5,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: '50%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    backgroundColor: '#6D7278',
  },
  right: {
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: '#FF9B00',
  },
  buttonText: {
    fontFamily: Fonts.PingFangSC_Regular,
    fontSize: 16,
    color: '#fff',
  },
});

import React, {Component} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
const isAndroid = Platform.OS === 'android';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {Actionsheet, useDisclose} from 'native-base';
// import Colors from '../../../Common/Colors';
import Modal from 'react-native-modal';
class IosXXYJPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      bottom: 0,
    };
  }
  handleShow = () => {
    this.setState({
      visible: true,
    });
  };
  handleClose = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.setState({
            bottom: 0,
          });
        }, 500);
      },
    );
  };
  iosPop = () => {
    const {bottom} = this.state;
    const {children, closeOffset} = this.props;
    return (
      <Modal
        isVisible={this.state.visible}
        backdropOpacity={0.2}
        style={styles.bigBox}
        onBackButtonPress={() => {
          this.setState({visible: false});
        }}
        onBackdropPress={() => this.setState({visible: false})}>
        <View
          style={[
            styles.container,
            {
              marginBottom: bottom,
            },
          ]}>
          <PanGestureHandler
            onHandlerStateChange={({nativeEvent}) => {
              switch (nativeEvent.state) {
                case State.UNDETERMINED:
                  console.log('等待手势');
                  break;
                case State.BEGAN:
                  console.log('手势开始');
                  break;
                case State.CANCELLED:
                  console.log('手势取消');
                  break;
                case State.ACTIVE:
                  console.log('手势活跃');
                  break;
                case State.END:
                  const offset = closeOffset || -150;
                  if (this.state.bottom < offset) {
                    this.handleClose();
                  } else {
                    this.setState({
                      bottom: 0,
                    });
                  }
                  console.log('手势结束');
                  break;
                case State.FAILED:
                  console.log('失败');
                  break;
                default:
                  console.log('其他');
                  break;
              }
            }}
            onGestureEvent={({nativeEvent}) => {
              this.x = nativeEvent.translationX;
              this.y = nativeEvent.translationY;
              this.setState({
                bottom:
                  -nativeEvent.translationY > 0 ? 0 : -nativeEvent.translationY,
              });
            }}>
            <View style={styles.topBox}>
              <View style={styles.line} />
            </View>
          </PanGestureHandler>
          {children}
        </View>
      </Modal>
    );
  };
  render() {
    return <>{this.iosPop()}</>;
  }
}
const AndroidXXYJPopUp = ({refPop, children}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const handleShow = () => {
    onOpen();
  };
  const handleClose = () => {
    onClose();
  };
  refPop.handleShow = handleShow;
  refPop.handleClose = handleClose;
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>{children}</Actionsheet.Content>
    </Actionsheet>
  );
};
export default isAndroid ? AndroidXXYJPopUp : IosXXYJPopUp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  line: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e9e9e9',
    marginBottom: 6,
  },
  topBox: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBox: {
    margin: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

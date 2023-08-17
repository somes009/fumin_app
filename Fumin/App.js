import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {createStore, applyMiddleware} from 'redux';
// import 'react-native-reanimated';
import AliyunTools from './App/Common/AliyunTools';
import {RootSiblingParent} from 'react-native-root-siblings';
import {NativeBaseProvider} from 'native-base';
import TabNavigator from './App/src/FuMinNavigator/TabNavigator';
import SHNavigator from './App/src/SHNavigator/TabNavigator';
import Utils from './App/Utils';
import AppStore from './App/Store/AppStore';
import CacheStore from './App/Common/CacheStore';
import {Provider} from 'react-redux';
import store from './App/src/store';
import EventBus, {EventBusName} from './App/Api/EventBus';
import * as WeChat from 'react-native-wechat-lib';
AliyunTools.init(false);
// import thunk from 'redux-thunk';
// import rootReducer from './App/reducers';
// import {getAllProducts} from './actions';

// const middleware = [thunk];
// const store = createStore(rootReducer, applyMiddleware(...middleware));

// store.dispatch(getAllProducts());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isStart: true,
      userType: 1,
    };
  }
  componentDidMount() {
    EventBus.bind(EventBusName.CHANGE_USER_TYPE, ({userType}) => {
      this.setState({
        userType,
      });
    });
    WeChat.registerApp('wx4da22a07da9d5a7a', '');
    CacheStore.get('INFO').then((info) => {
      if (!info) {
        this.setState({
          show: true,
        });
        return;
      }
      console.log('用户信息:', info.token, info.userId);
      global.token = info.token;
      global.userId = info.userId;

      //强制退出登录
      // CacheStore.remove('INFO');
      // global.token = undefined;
      // global.userId = undefined;
      this.setState({
        show: true,
      });
    });
    this.startTimeout = setTimeout(() => {
      clearTimeout(this.startTimeout);
      this.setState({
        isStart: false,
      });
    }, 3000);
  }
  layoutHeader = (e) => {
    console.log('layout Header', this.state.screenHeight);

    console.log('new layout Height', e?.layout?.height);
    if (this.state.appHeight === 0) {
      this.setState({
        appHeight: e?.layout?.height,
        gotHeight: true,
        screenHeight: Utils.isAndroid
          ? AppStore.androidScreenHeight ||
            e?.layout?.height / Utils.getScreenSize().scale
          : Utils.getScreenSize().height,
      });
    }
  };

  renderStartPage = () => {
    return (
      <View style={styles.startBox}>
        <Text>开屏页</Text>
      </View>
    );
  };

  render() {
    const {show, isStart, userType} = this.state;
    const Nav = userType === 1 ? TabNavigator : SHNavigator;
    let content = <Nav initialRouteName={'HomeTabs'} />;
    content = global.token ? content : <Nav initialRouteName={'LoginNav'} />;
    // if (isStart) {
    //   return this.renderStartPage();
    // }
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <NativeBaseProvider>
            <View style={styles.contain}>
              {show && (
                <>
                  <View
                    onLayout={({nativeEvent: e}) => this?.layoutHeader(e)}
                    style={styles.containIn}>
                    {content}
                  </View>
                </>
              )}
            </View>
          </NativeBaseProvider>
        </RootSiblingParent>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  contain: {width: '100%', flex: 1, backgroundColor: '#fff'},
  containIn: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  startBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

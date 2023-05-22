import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {RootSiblingParent} from 'react-native-root-siblings';
import {NativeBaseProvider} from 'native-base';
import TabNavigator from './App/src/FuMinNavigator/TabNavigator';
import Utils from './App/Utils';
import AppStore from './App/Store/AppStore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
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
  render() {
    const {show} = this.state;
    let content = <TabNavigator initialRouteName={'HomeTabs'} />;
    content = !global.token ? (
      content
    ) : (
      <TabNavigator initialRouteName={'LoginNav'} />
    );
    return (
      <RootSiblingParent>
        <NativeBaseProvider>
          {/* <ColorSchemeProvider> */}
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
          {/* </ColorSchemeProvider> */}
        </NativeBaseProvider>
      </RootSiblingParent>
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
});

export default App;

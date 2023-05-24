import React, {Component} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import U from '../../../Utils';
export default class MineIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    const {navigation} = this.props;
    return (
      <View style={[styles.container]}>
        <Text>我的</Text>
        <TouchableOpacity onPress={U.outLogin.bind(this, navigation)}>
          <Text
            style={{
              fontSize: 30,
            }}>
            退出登录
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

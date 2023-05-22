import React, {Component} from 'react';

import {View, StyleSheet, Text} from 'react-native';
export default class ShopIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <View style={[styles.container]}>
        <Text>商城</Text>
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

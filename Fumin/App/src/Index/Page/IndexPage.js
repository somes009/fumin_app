import React, {Component} from 'react';

import {View, StyleSheet, Text} from 'react-native';
import XXYJFlatList from '../../Base/Widget/XXYJFlatList';
import IndexRenderItem from '../Widget/IndexRenderItem';
export default class LoginIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillUnmount() {}
  shouldComponentUpdate() {}

  renderItem = (item, index) => {
    return (
      <IndexRenderItem
        item={{
          title: '门店1',
        }}
      />
    );
  };

  render() {
    return (
      <View style={[styles.container]}>
        <XXYJFlatList
          isApiPostJson
          requestPath="/video/sml/collect/auth/getMySmlCollect"
          requestParams={{}}
          renderItem={this.renderItem}
        />
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

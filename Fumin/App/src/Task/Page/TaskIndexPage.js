import React, {Component} from 'react';

import {View, StyleSheet, Text} from 'react-native';
export default class TaskIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <View style={[styles.container]}>
        <Text>任务</Text>
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

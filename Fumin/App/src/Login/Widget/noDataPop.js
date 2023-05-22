import React, {Component} from 'react';

import {View, StyleSheet, Text} from 'react-native';
import {Overlay} from 'teaset';
export default class noDataPop extends Component {
  constructor(props) {
    super(props);
  }
  deleteReplyItem = (index) => {
    const {deleteReplyItem} = this.props;
    return deleteReplyItem(index);
  };
  deleteCommentReply = () => {
    console.log('=====>444', 'gffhtfhtfhf888888888');
    this.props.handleDeleteReplyFIRST();
  };
  renderPopSelect = () => {
    const {title} = this.props;
    const titles = title.split(' ');
    return (
      <View style={styles.view}>
        {titles.map((item) => {
          return <Text style={styles.text}>{item}</Text>;
        })}
      </View>
    );
  };
  getView = () => (
    <Overlay.PopView type="zoomOut" style={styles.viewOverlay}>
      {this.renderPopSelect()}
    </Overlay.PopView>
  );
  openModal = () => {
    const guideView = this.getView();
    if (this.guideOverlay) {
      Overlay.hide(this.guideOverlay);
    }
    this.guideOverlay = Overlay.show(guideView);
  };

  closeModal = () => {
    Overlay.hide(this.guideOverlay);
  };

  render() {
    return null;
  }
}
const styles = StyleSheet.create({
  viewOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  view: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 19.5,
  },
});

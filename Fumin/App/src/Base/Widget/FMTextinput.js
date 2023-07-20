import React, {Component} from 'react';

import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
class FMTextinput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGreen: false,
    };
  }
  render() {
    const {
      containerStyle,
      leftComponent,
      rightComponent,
      textStyle,
      placeholderStyle,
      selectionColor,
      value,
      onChangeText,
      placeholder,
      isNumber,
      keyboardType,
      maxLength,
      needBorder,
      length,
      returnKeyType,
      editable,
    } = this.props;
    const {isGreen} = this.state;
    if (isNumber) {
      var holder = value.length ? '' : placeholder;
      var style = value.length ? textStyle : placeholderStyle;
    } else {
      var style = textStyle;
      var holder = placeholder;
    }
    let borderStyle = {};
    if (isGreen) {
      borderStyle = {
        // borderColor: Colors.green,
      };
    }
    return (
      <View
        style={[
          styles.inputBox,
          needBorder ? borderStyle : null,
          containerStyle,
        ]}>
        {leftComponent}
        <TextInput
          style={[styles.input, style]}
          editable={editable}
          value={value}
          selectionColor={selectionColor || '#fff'}
          keyboardType={keyboardType || 'default'}
          placeholder={holder}
          maxLength={maxLength}
          returnKeyType={returnKeyType || 'done'}
          onChangeText={onChangeText}
          placeholderTextColor="#8A8A8A"
          onFocus={() => {
            this.setState({
              isGreen: true,
            });
          }}
          onBlur={() => {
            const num = maxLength || length;
            if (value.length < num) {
              this.setState({
                isGreen: false,
              });
            }
          }}
        />
        {rightComponent}
      </View>
    );
  }
}

const con = ({
  containerStyle,
  leftComponent,
  rightComponent,
  textStyle,
  placeholderStyle,
  selectionColor,
  value,
  onChangeText,
  placeholder,
  isNumber,
  keyboardType,
  maxLength,
  needBorder,
  length,
  returnKeyType,
  editable = true,
}) => {
  return (
    <FMTextinput
      containerStyle={containerStyle}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
      textStyle={textStyle}
      placeholderStyle={placeholderStyle}
      selectionColor={selectionColor}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      isNumber={isNumber}
      keyboardType={keyboardType}
      maxLength={maxLength}
      needBorder={needBorder}
      length={length}
      returnKeyType={returnKeyType}
      editable={editable}
    />
  );
};
export default con;
const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 51,
    borderRadius: 25.5,
    backgroundColor: '#EFF3F6',
    paddingLeft: 16,
    paddingRight: 8,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0)',
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
    marginLeft: 4.5,
    marginRight: 8,
  },
});

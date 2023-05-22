import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import _ from 'lodash';
const XXYJButton = ({
  containerStyle,
  text,
  textStyle,
  onPress,
  unTouch,
  darkShadowColor,
  unNeomorph,
  children,
  inStyle,
  unPress,
}) => {
  const opacity = unTouch ? 0.5 : 1;
  const Cuttom = unNeomorph ? View : Neomorph;
  return (
    <Cuttom
      darkShadowColor={darkShadowColor || '#99C6BB'}
      style={[unNeomorph ? {} : styles.neomorph, {opacity}, containerStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={
          unTouch
            ? unPress
              ? _.throttle(unPress, 1000)
              : null
            : _.throttle(onPress, 1000)
        }
        style={[styles.in, inStyle]}>
        {children ? (
          children
        ) : (
          <Text style={[styles.text, textStyle]}>{text}</Text>
        )}
      </TouchableOpacity>
    </Cuttom>
  );
};
export default XXYJButton;

const styles = StyleSheet.create({
  in: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  neomorph: {
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 9,
    borderRadius: 13,
    width: 326,
    height: 44,
    shadowOpacity: 0.5,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    // color: Colors.white,
  },
});

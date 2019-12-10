import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = (props) => {
  const {onPress, children} = props;
  const {buttonStyle, textStyle} = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
  },

  buttonStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 38,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#007aff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingHorizontal: 10,
  },
});

export default Button;

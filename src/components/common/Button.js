import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CONSTANTS = require('../../config/constants');

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: CONSTANTS.COLOR.TRANSPARENT,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Button };

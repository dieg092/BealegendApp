import React from 'react';
import { View } from 'react-native';

const CONSTANTS = require('../../config/constants');

const Card = (props) => {
  const { containerStyle } = styles;
  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: CONSTANTS.COLOR.GREY,
    borderBottomWidth: 0,
    shadowColor: CONSTANTS.COLOR.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 10,
    padding: 10
  }
};

export { Card };

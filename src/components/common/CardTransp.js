import React from 'react';
import { View } from 'react-native';

const CONSTANTS = require('../../config/constants');

const CardTransp = (props) => {
  const { containerStyle } = styles;
  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: CONSTANTS.COLOR.TRANSPARENT,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    borderRadius: 10
  }
};

export { CardTransp };

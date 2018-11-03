import React from 'react';
import { View } from 'react-native';

const CONSTANTS = require('../../config/constants');

const CardRow = (props) => {
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15
  }
};

export { CardRow };

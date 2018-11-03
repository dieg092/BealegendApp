import React from 'react';
import { View } from 'react-native';

const CONSTANTS = require('../../config/constants');

const CardSectionRow = (props) => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative'
  }
};


export { CardSectionRow };

import React from 'react';
import { View } from 'react-native';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CONSTANTS = require('../../config/constants');

const Input = ({ label, value, onChangeText, secureTextEntry, color }) => {
  const { inputStyle } = styles;

  return (
     <View style={inputStyle}>

          <Sae
            secureTextEntry={secureTextEntry}
            label={label}
            labelStyle={{ color: color }}
            inputStyle={{ fontSize: 23 }}
            iconName={''}
            iconClass={FontAwesomeIcon}
             // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={onChangeText}
            value={value}
          />
    </View>

  );
};

const styles = {
  inputStyle: {
    backgroundColor: CONSTANTS.COLOR.TRANSPARENT,
    paddingRight: 5,
    paddingLeft: 5,
    flex: 2
  }
};

export { Input };

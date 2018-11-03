import React from 'react';
import { View } from 'react-native';
import { Sae, Hoshi  } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CONSTANTS = require('../../config/constants');

const InputBlack = ({ label, value, onChangeText, secureTextEntry, color }) => {
  const { inputStyle } = styles;

  return (
     <View style={inputStyle}>
          <Hoshi
            secureTextEntry={secureTextEntry}
            label={label}
            labelStyle={{ color: color }}
            borderColor={CONSTANTS.COLOR.PRIMARY}
            inputStyle={{ fontSize: 23, color: 'black' }}
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
    flex: 1
  }
};

export { InputBlack };

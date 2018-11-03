import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import VectorIcons from 'react-native-vector-icons/FontAwesome';

const Icon = ({ onPress, name, color, size }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} >
      <VectorIcons
        name={name}
        color={color}
        size={size}
      />
    </TouchableWithoutFeedback>
  );
};

export { Icon };

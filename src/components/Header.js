import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity } from 'react-native';

const CONSTANTS = require('../config/constants');

const Header = props => {
    const { navigate } = props.navigation;
    const { textStyle, viewStyle, icon } = styles;

    return (
        <View style={viewStyle}>
            <TouchableOpacity onPress={() => props.toggle()} style={icon}>
                <Icon
                  name={props.icon}
                  color={CONSTANTS.COLOR.WHITE}
                  size={22}
                />
            </TouchableOpacity>
            <Text style={textStyle}>{props.title}</Text>

            {props.title === 'Galería' && props.imagesSelected.length > 0 &&
              <TouchableOpacity
                onPress={() => props.deleteImages()}
                style={styles.thrash}
              >
                <Icon
                    name='trash'
                    color={CONSTANTS.COLOR.WHITE}
                    size={24}
                />
              </TouchableOpacity>
            }
        </View>
    );
};

const styles = {
  viewStyle: {
    backgroundColor: CONSTANTS.COLOR.PRIMARY,
    flexDirection: 'row',
    height: 75,
    paddingTop: 20,
    shadowColor: CONSTANTS.COLOR.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  icon: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  textStyle: {
    fontSize: 20,
    marginTop: 12,
    marginLeft: 15,
    color: CONSTANTS.COLOR.WHITE_ICE
  },
  thrash: {
    position: 'absolute',
    right: 25,
    top: 33
  }
};


export default Header;

/* eslint-disable global-require */
import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions, StatusBar } from 'react-native';


const { height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class Loading extends Component {
  render() {
    return (

        <View style={styles.container}>
          <StatusBar
             backgroundColor="transparent"
             barStyle="light-content"
             translucent
          />
          <Image
            source={require('../../assets/img/logo.png')}
            style={styles.image}
          />
          <Image
            source={require('../../assets/img/loadingRed.gif')}
            style={styles.loader}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANTS.COLOR.WHITE,
    height: height
  },
  loader: {
    position: 'absolute',
    width: 100,
    height: 100,
    bottom: 5
  },
  image: {
    width: 100,
    height: 100
  }
});

export default Loading;

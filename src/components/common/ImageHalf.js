/*eslint-disable global-require*/
import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StatusBar, BackHandler, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, registryUser, loginNavigate } from '../../actions';
import { CardTransp, CardSectionTransp, Input, Button, Spinner } from '../common';

const { width, height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class ImageHalf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: false
    };
  }

  render() {
    return (
      <View>
      {this.props.photo !== 'NaN' &&
       <View>
         <Image
           source={{ uri: this.props.photo }}
           style={!this.state.imageLoading ? {} : styles.photo}
           onLoad={() => this.setState({ imageLoading: true })}
         />
         {!this.state.imageLoading &&
           <Image
             source={require('../../assets/img/loadingRed.gif')}
             style={styles.photo}
           />
         }
       </View>
      }
      </View>
    );
  }
}

const styles = {
  photo: {
      width: null,
      resizeMode: 'stretch',
      height: width / 2.2,
      borderRadius: 10
  },
};

export default connect(null, {

})(ImageHalf);

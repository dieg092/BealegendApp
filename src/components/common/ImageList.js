/*eslint-disable global-require*/
import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const CONSTANTS = require('../../config/constants');
const { width, height } = Dimensions.get('window');

class ImageList extends Component {
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
             style={styles.photoGif}
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
    height: width / 2,
    borderRadius: 4
  },
  photoGif: {
    width: width,
    marginRight: 10,
    resizeMode: 'contain',
    backgroundColor: CONSTANTS.COLOR.WHITE,
    height: height / 4
  },
};

export default connect(null, {

})(ImageList);

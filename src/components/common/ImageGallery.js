/*eslint-disable global-require*/
import React, { Component } from 'react';
import { View, Image, Dimensions, TouchableHighlight } from 'react-native';
import { longPress, desSelectImage } from '../../actions';
import { connect } from 'react-redux';

const CONSTANTS = require('../../config/constants');
const { width, height } = Dimensions.get('window');

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: false,
      selected: false
    };
  }

  onLongPressed() {
    this.setState({ selected: !this.state.selected });
    if (this.state.selected) {
      this.props.longPress(this.props.name);
    }
  }

  onPressed() {
    if (this.props.imagesSelected.length > 0) {
      this.setState({ selected: !this.state.selected });
      if (!this.state.selected) {
        this.props.longPress(this.props.name);
      } else {
        this.props.desSelectImage(this.props.name);
      }
    }
  }

  render() {
    console.log('imagesSelected')
    console.log(this.props.imagesSelected)
    return (
      <View>
      {this.props.photo !== 'NaN' &&
       <View>
         <TouchableHighlight
           onLongPress={() => this.onLongPressed()}
           onPress={() => this.onPressed()}
           underlayColor={CONSTANTS.COLOR.TRANSPARENT}
         >
           <Image
             source={{ uri: this.props.photo }}
             style={!this.state.imageLoading ? {} : ((!this.state.selected || this.props.imagesSelected.length === 0) ? styles.photo : styles.photoSelected)}
             onLoad={() => this.setState({ imageLoading: true })}
           />
         </TouchableHighlight>
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
    height: height / 5,
    resizeMode: 'stretch',
    width: width / 3,
    borderWidth: 1,
    borderColor: CONSTANTS.COLOR.WHITE_ICE
  },
  photoSelected: {
    height: height / 5,
    resizeMode: 'stretch',
    width: width / 3,
    borderWidth: 2,
    borderColor: CONSTANTS.COLOR.PRIMARY
  },
  photoGif: {
    height: height / 5,
    resizeMode: 'contain',
    width: width / 3,
    borderWidth: 1,
    borderColor: CONSTANTS.COLOR.WHITE_ICE
  },
};

const mapStateToProps = ({ gallery }) => {
  const { deleting, imagesSelected } = gallery;

  return { deleting, imagesSelected };
};

export default connect(mapStateToProps, {
  longPress, desSelectImage
})(ImageGallery);

/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, BackHandler, Text } from 'react-native';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal from 'react-native-modal';
import firebase from '../../config/firebase';
import { nameChanged, isModalOpenGallery, modalCloseSession } from '../../actions';
import { CardSectionTransp, InputBlack, ButtonSuccess, ButtonError } from '../common';
import { SnapshotToArray } from '../../config/helpers';
import ImageGallery from '../common/ImageGallery';

const { width, height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: null,
      objImages: null
    };
  }

  componentWillMount() {
    firebase.database().ref().child('images').on('value', snapshot => {
      const images = SnapshotToArray(snapshot);
     this.setState({ objImages: images });
    });

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onNameChange(text) {
    this.props.nameChanged(text);
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  toggleModalNameExist() {
    this.props.isModalOpenGallery();
  }

  handleBackButtonClick() {
    this.props.itemSelected('Eventos');
    return true;
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        removeClippedSubviews
      >
        <Modal
          backdropColor={CONSTANTS.COLOR.BLACK}
          backdropOpacity={0.5}
          isVisible={this.props.isModalCloseSessions}
          onRequestClose={() => { this.toggleModalCloseSession(); }}
        >

          <View style={styles.modalContainerClose}>
            <Text style={styles.innerContainer}>¿Seguro que quieres cerrar sesión?</Text>

              <ButtonError onPress={() => { this.toggleModalCloseSession(); }}>
              NO
              </ButtonError>
              <ButtonSuccess
                onPress={() => {
                  this.props.modalCloseSession();
                  this.props.closeSession();
                }}
              >
              SI
              </ButtonSuccess>
          </View>
        </Modal>
        <Modal
          backdropColor={CONSTANTS.COLOR.BLACK}
          backdropOpacity={0.5}
          isVisible={this.props.isModalNameImageExist}
          onRequestClose={() => { this.toggleModalNameExist(); }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>¡Ya hay una imagen con ese nombre!</Text>
              <ButtonSuccess
                onPress={() => this.toggleModalNameExist()}
              >
              OK
              </ButtonSuccess>
          </View>
        </Modal>
        <CardSectionTransp>
           <InputBlack
             label="Nombre"
             onChangeText={this.onNameChange.bind(this)}
             value={this.props.name}
           />
         </CardSectionTransp>

         <View style={styles.gallery}>
         {this.state.objImages &&
           this.state.objImages.map((image, key) => {
              return (
                <View key={key} style={styles.imageWidth}>
                  <ImageGallery
                    photo={image.uri}
                    name={image.name}
                  />
                </View>

              );
            })
          }
        </View>
        <KeyboardSpacer />
      </ScrollView>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLOR.WHITE,
    paddingBottom: 123
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  imageWidth: {
    width: width / 3
  },
  image: {
    height: height / 5,
    resizeMode: 'contain',
    width: width / 3,
    borderWidth: 1,
    borderColor: CONSTANTS.COLOR.WHITE
  },
  modalContainer: {
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    height: height / 3.7,
    width: null,
    borderRadius: 8,
    padding: 30
  },
  modalContainerClose: {
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    height: height / 2.3,
    width: null,
    borderRadius: 8,
    padding: 30
  },
  innerContainer: {
    alignItems: 'center',
    color: CONSTANTS.COLOR.BLACK,
    fontSize: 20
  },
});

const mapStateToProps = ({ gallery, auth }) => {
  const { name, photos, isModalNameImageExist } = gallery;
  const { isModalCloseSessions } = auth;

  return { name, photos, isModalNameImageExist, isModalCloseSessions };
};

export default connect(mapStateToProps, {
  nameChanged, isModalOpenGallery, modalCloseSession
})(Gallery);

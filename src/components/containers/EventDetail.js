/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Picker, BackHandler
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import {
  eventSignin, signIn, signOut, reloadParticipants, isWinner, isNotWinner,
  reloadWinners, reloadEvent, deleteEvent, getImages, imageSelected, nickNameNecesary,
  modalCloseSession
} from '../../actions';
import { CardSectionTransp, Spinner, ButtonSuccess, ButtonPrimary, ButtonError } from '../common';
import { FormatDate, EventIsOpen } from '../../config/helpers';

const { height, width } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class EventDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signed: false,
      participants: null,
      photoSelected: null,
      isOpen: true,
      evento: null,
      modal: false,
      isModalAddVisible: false,
      isModalDeleteVisible: false,
      isModalDeleteEventVisible: false,
      winner: '',
      imageLoading: false
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    if (this.props.event_detail.photo === 'NaN') {
      this.setState({ photoSelected: '0' });
    }

    this.props.eventSignin(this.props.event_detail, this.props.user.email);
    this.props.reloadEvent(this.props.event_detail.key, this.props.user.email);
    this.props.reloadParticipants(this.props.event_detail.key);
    this.props.reloadWinners(this.props.event_detail.key);
    this.props.getImages();
    this.setState({ isOpen: EventIsOpen(this.props.event_detail.start_time) });

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onDeleteEvent(eventKey) {
    this.props.deleteEvent(eventKey);
    this.setState({ isModalDeleteEventVisible: !this.state.isModalDeleteEventVisible });
    this.props.toggle();
  }

  onImageSelected(itemValue) {
     this.setState({ photoSelected: itemValue });
     this.props.imageSelected(this.props.event_detail.key, itemValue);
  }

  onSignIn() {
    if (this.props.user && this.props.user.nickName) {
      this.props.signIn(this.props.event_detail, this.props.user.email);
    } else {
      this.props.nickNameNecesary();
    }
  }

  onSignOut() {
    this.props.signOut(this.props.event_detail, this.props.user.email);
  }

  onGoPerfil() {
    this.props.nickNameNecesary();
    this.props.itemSelected('Perfil');
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  selectedPicker() {
    if (this.state.photoSelected) {
      if (this.state.photoSelected === 'NaN') {
        return '0';
      }

      return this.state.photoSelected;
    }

    return this.props.event_detail.photo;
  }

  isWinner() {
    this.props.isWinner(this.props.event_detail.key, this.state.winner.email);
    this.setState({ isModalAddVisible: !this.state.isModalAddVisible });
  }

  isNotWinner() {
    this.props.isNotWinner(this.props.event_detail.key, this.state.winner);
    this.setState({ isModalDeleteVisible: !this.state.isModalDeleteVisible });
  }

  toggleModalAdd(participant = null) {
    if (CONSTANTS.ROLES.BOSS === this.props.user.rol || CONSTANTS.ROLES.ENVIVO === this.props.user.rol) {
      if (participant) {
          this.setState({ winner: participant });
      }

      this.setState({ isModalAddVisible: !this.state.isModalAddVisible });
    }
  }

  toggleModalDelete(participant = null) {
    if (CONSTANTS.ROLES.BOSS === this.props.user.rol || CONSTANTS.ROLES.ENVIVO === this.props.user.rol) {
      if (participant) {
        this.setState({ winner: participant });
      }

      this.setState({ isModalDeleteVisible: !this.state.isModalDeleteVisible });
    }
  }

  toggleModalDeleteEvent() {
    this.setState({ isModalDeleteEventVisible: !this.state.isModalDeleteEventVisible });
  }

  toggleModalNeedNickName() {
    this.props.nickNameNecesary();
  }

  handleBackButtonClick() {
    this.props.toggle();
    return true;
  }

  renderButton() {
    if (this.props.signed) {
      if (this.props.loading) {
        return <Spinner size="large" />;
      }
      return (
        <ButtonError onPress={() => this.onSignOut()}>
          CANCELAR INSCRIPCIÓN
        </ButtonError>
      );
    }
      if (this.props.loading) {
        return <Spinner size="large" />;
      }

    return (
      <ButtonPrimary onPress={() => this.onSignIn()}>
        ¡ME APUNTO!
      </ButtonPrimary>
    );
  }

  render() {
    return (
      <ScrollView
        removeClippedSubviews
        style={styles.scroll}
      >
        <Modal
          backdropColor={CONSTANTS.COLOR.BLACK}
          backdropOpacity={0.5}
          isVisible={this.props.isModalCloseSessions}
          onRequestClose={() => { this.toggleModalCloseSession(); }}
        >

          <View style={styles.modalContainer}>
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
          isVisible={this.state.isModalAddVisible}
          onRequestClose={() => { this.toggleModalAdd(); }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>¿Ha ganado el torneo
              <Text style={styles.textMarked2}> {this.state.winner.nickName}? </Text>
            </Text>

            <ButtonError onPress={() => this.toggleModalAdd()}>NO!</ButtonError>
            <ButtonSuccess onPress={() => this.isWinner()}>SI!</ButtonSuccess>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.isModalDeleteVisible}
          onRequestClose={() => { this.toggleModalDelete(); }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>¿Quieres quitar a
              <Text style={styles.textMarked2}> {this.state.winner.nickName}? </Text>
            </Text>

            <ButtonError onPress={() => this.toggleModalDelete()}>NO!</ButtonError>
            <ButtonSuccess onPress={() => this.isNotWinner()}>SI!</ButtonSuccess>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.isModalDeleteEventVisible}
          onRequestClose={() => { this.toggleModalDeleteEvent(); }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>¿Estás seguro de que quieres elimnar
              <Text style={styles.textMarked2}> {this.props.event_detail.name} </Text>?
            </Text>

            <ButtonError onPress={() => this.toggleModalDeleteEvent()}>¡NO!</ButtonError>
            <ButtonSuccess
              onPress={() => this.onDeleteEvent(this.props.event_detail.key)}
            >
              ¡SI!
            </ButtonSuccess>
          </View>
        </Modal>

        <Modal
          isVisible={this.props.isModalNickName}
          onRequestClose={() => { this.toggleModalNeedNickName(); }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>Necesitas un NickName para apuntarte</Text>

            <ButtonError onPress={() => this.toggleModalNeedNickName()}>CANCELAR</ButtonError>
            <ButtonSuccess
              onPress={() => this.onGoPerfil()}
            >
              ¡IR AL PERFIL!
            </ButtonSuccess>
          </View>
        </Modal>
        {this.props.evento && this.props.evento.photo !== 'NaN' ?
          <View>
           {!this.state.imageLoading &&
             <Image
               source={require('../../assets/img/loadingRed.gif')}
               style={styles.photoGif}
             />
           }
            <Image
             source={{ uri: this.props.evento.photo }}
             style={!this.state.imageLoading ? {} : styles.photo}
             onLoadEnd={() => this.setState({ imageLoading: true })}
            />
          </View>
         :
          <Image
             source={require('../../assets/img/torneo_background.png')}
             style={styles.photo}
          />
        }

        <CardSectionTransp>
          <View style={styles.containerStyle}>
            <Text style={styles.name}>
              {this.props.event_detail.name}
            </Text>
            <Text style={styles.date}>
              {this.props.event_detail.place.location.street} ({this.props.event_detail.place.location.city})
            </Text>
            <Text style={styles.date}>
              {FormatDate(this.props.event_detail.start_time, true)}
            </Text>
          </View>
        </CardSectionTransp>
        <CardSectionTransp>
          <View style={styles.containerStyle}>
            <Text style={styles.date}>
              {this.props.event_detail.description}
            </Text>
          </View>
        </CardSectionTransp>

        {this.props.photos && this.props.user && this.props.user.rol === CONSTANTS.ROLES.BOSS &&
          <View>
            <CardSectionTransp>
              <View style={styles.containerStyle}>
                <Text style={styles.name}>
                  FOTO:
                </Text>
              </View>
            </CardSectionTransp>
            <CardSectionTransp>
              <View style={styles.containerStyle}>
                <Picker
                  selectedValue={this.selectedPicker()}
                  onValueChange={(itemValue) => this.onImageSelected(itemValue)}
                >
                <Picker.Item key={-1} label='Selecciona una foto' value='NaN' />
                {this.props.photos.map((photo, key) => {
                  return (
                    <Picker.Item key={key} label={photo.name} value={photo.uri} />
                  );
                })
                }
                </Picker>
              </View>
            </CardSectionTransp>
          </View>
        }

        {this.state.isOpen && this.props.winners && !this.props.winners.length > 0 ?
          this.renderButton()
          :
          <View></View>
        }

        {this.props.winners && this.props.winners.length > 0 &&
          <View>
            <CardSectionTransp>
              <View style={styles.containerStyle}>
                <Text style={styles.name}>
                  WINNER:
                </Text>
              </View>
            </CardSectionTransp>
            <CardSectionTransp>
              <View style={styles.containerStyle}>
                {this.props.winners.map((winner, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.toggleModalDelete(winner)}>
                      <Text
                        key={key}
                        style={
                          this.props.user.email === winner.email ?
                            styles.textMarked
                          :
                            styles.date
                          }
                      >
                        {winner.nickName}
                      </Text>
                    </TouchableOpacity>
                    );
                  })
                }
              </View>
            </CardSectionTransp>
          </View>
        }
        
        {this.props.user && this.props.user.rol !== CONSTANTS.ROLES.CLIENT && this.props.participants && this.props.participants.length > 0 &&
          <View>
            <CardSectionTransp>
              <View style={styles.containerStyle}>
                <Text style={styles.name}>
                  PARTICIPANTES ({this.props.participants && this.props.participants.length}):
                </Text>
              </View>
            </CardSectionTransp>
            <CardSectionTransp>
              <View style={styles.containerStyle}>
              {this.props.participants.map((participant, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.toggleModalAdd(participant)}>
                      <Text
                        key={key}
                        style={
                          this.props.user.email === participant.email ?
                            styles.textMarked
                          :
                            styles.date
                          }
                      >
                        {participant.nickName}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              }
              </View>
            </CardSectionTransp>
          </View>
        }
        <View style={{ marginBottom: 25 }}>
          {this.props.user && this.props.user.rol === CONSTANTS.ROLES.BOSS &&
            <ButtonError onPress={() => this.toggleModalDeleteEvent()}>
              ELIMINAR EVENTO
            </ButtonError>
          }
        </View>
      </ScrollView>
   );
 }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  scroll: {
    flex: 1,
    backgroundColor: CONSTANTS.COLOR.WHITE,
  },
  photo: {
    width: width,
    resizeMode: 'stretch',
    backgroundColor: CONSTANTS.COLOR.WHITE,
    height: height / 2.8
  },
  photoGif: {
      width: width,
      resizeMode: 'contain',
      backgroundColor: CONSTANTS.COLOR.WHITE
  },
  name: {
      color: CONSTANTS.COLOR.BLACK,
      fontSize: 20
  },
  date: {
      color: CONSTANTS.COLOR.GREY_DARK,
      fontSize: 16
  },
  textMarked: {
      color: CONSTANTS.COLOR.PRIMARY,
      fontSize: 16
  },
  textMarked2: {
      color: CONSTANTS.COLOR.PRIMARY,
      fontSize: 20
  },
  modalContainer: {
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    height: height / 1.5,
    width: null,
    borderRadius: 8,
    padding: 30
  },
  innerContainer: {
    alignItems: 'center',
    color: CONSTANTS.COLOR.BLACK,
    fontSize: 20
  }
});

const mapStateToProps = ({ events, gallery, auth }) => {
  const { event_detail, signed, participants, evento, winners, loading, isModalNickName } = events;
  const { photos, photoSelected } = gallery;
  const { isModalCloseSessions } = auth;

  return { event_detail, signed, participants, evento, winners, photos, photoSelected, loading, isModalNickName, isModalCloseSessions };
};

export default connect(mapStateToProps, {
  eventSignin, signIn, signOut, reloadParticipants, isWinner, reloadWinners,
  reloadEvent, isNotWinner, deleteEvent, getImages, imageSelected, nickNameNecesary,
  modalCloseSession
})(EventDetail);

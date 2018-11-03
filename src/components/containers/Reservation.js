/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, ScrollView, Text, Image, Dimensions, BackHandler, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
  getReservations, cancelReservation, isModalVisible, modalCloseSession
} from '../../actions';
import { CardTransp, ButtonError, ButtonSuccess } from '../common';
import { FormatDateddmmYYYY, GetDateYYYYmmdd } from '../../config/helpers';

const { width, height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class Reservation extends Component {
  constructor(props) {
      super(props);
      console.ignoredYellowBox = [
      'Setting a timer'
      ];

      this.state = {
        reservatinoSelected: null
      };

      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
     this.props.getReservations(this.props.user);

     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onCancelPressed() {
    this.props.cancelReservation(this.state.reservatinoSelected);
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  toggleModal(key = null) {
    if (key) {
        this.setState({ reservatinoSelected: key });
    }
    this.props.isModalVisible();
  }

  handleBackButtonClick() {
    this.props.itemSelected('Eventos');
    return true;
  }

  renderImage(type) {
    if (type === 'ORDENADORES') {
      return require('../../assets/img/pcs.jpg');
    }
    return require('../../assets/img/mesa_juegos.jpg');
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
          isVisible={this.props.isModalCancelVisible}
          onRequestClose={() => { this.toggleModal(); }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>¿Quiéres eliminar la reserva?</Text>

            <ButtonError onPress={() => this.toggleModal()}>NO!</ButtonError>
            <ButtonSuccess onPress={() => this.onCancelPressed()}>SI!</ButtonSuccess>
          </View>
        </Modal>


        {this.props.reservations && this.props.reservations.map((reservation, key) => {
            return (
              <CardTransp key={key}>
                <Image
                   source={this.renderImage(reservation.typeSelected)}
                   style={styles.photo}
                   borderRadius={4}
                >
                {GetDateYYYYmmdd() === reservation.date &&
                  <View
                    style={styles.today}
                  >
                  </View>
                }
                  <CardTransp>
                    {reservation.personsSelected && reservation.personsSelected !== 'NaN' &&

                       <Text style={styles.text}>Personas: <Text style={styles.colorPrimary}>{reservation.personsSelected}</Text></Text>

                    }
                    <Text style={styles.text}>Fecha: <Text style={styles.colorPrimary}>{FormatDateddmmYYYY(reservation.date)}</Text> </Text>
                    <Text style={styles.text}>Hora: <Text style={styles.colorPrimary}>De {reservation.enterHourSelected}:00 a {reservation.outHourSelected}:00</Text></Text>
                    <Text style={styles.user}>Usuario: <Text style={styles.colorPrimary}>{reservation.user}</Text></Text>
                  </CardTransp>
                </Image>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.toggleModal(reservation.key)}>
                  <Text style={styles.textStyle}>
                    CANCELAR RESERVA
                  </Text>
                </TouchableOpacity>
              </CardTransp>
            );
          })
        }
        <View style={styles.marginBot}></View>
        </ScrollView>
   );
 }
}

const styles = {
  marginBot: {
    marginBottom: 25
  },
  scroll: {
    backgroundColor: CONSTANTS.COLOR.WHITE
  },
  textStyle: {
    alignSelf: 'center',
    color: CONSTANTS.COLOR.WHITE_ICE,
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    position: 'absolute',
    backgroundColor: CONSTANTS.COLOR.ERROR,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    left: 0,
    right: 0,
    bottom: 0
  },
  modalContainer: {
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    height: height / 2.3,
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
  today: {
    alignSelf: 'flex-end',
    top: 8,
    height: 20,
    width: 40,
    backgroundColor: CONSTANTS.COLOR.YELLOW,
    position: 'absolute',
    borderRadius: 50,
    elevation: 1,
    right: 8
  },
  innerContainer: {
    alignItems: 'center',
    color: CONSTANTS.COLOR.BLACK,
    fontSize: 20
  },
  colorPrimary: {
    color: CONSTANTS.COLOR.PRIMARY
  },
  photo: {
    width: null,
    resizeMode: 'stretch',
    height: width / 2,
    borderRadius: 4,
    marginBottom: 36
  },
  text: {
    flexDirection: 'row',
    color: CONSTANTS.COLOR.WHITE_ICE,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  user: {
    flexDirection: 'row',
    color: CONSTANTS.COLOR.WHITE_ICE,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, .6)',
  }
};

const mapStateToProps = ({ reservation, auth }) => {
  const { reservations, isModalCancelVisible } = reservation;
  const { isModalCloseSessions } = auth;

  return { reservations, isModalCancelVisible, isModalCloseSessions };
};

export default connect(mapStateToProps, {
  getReservations, cancelReservation, isModalVisible, modalCloseSession
})(Reservation);

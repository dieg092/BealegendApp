/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Dimensions, Picker, BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  reservationPressed, getToday, changeDate, typeSelected, personsSelected,
  enterHourSelect, outHourSelect, modalCloseSession
} from '../../actions';
import { CardSectionTransp, ButtonPrimary, ButtonError, ButtonSuccess } from '../common';
import { GetDateYYYYmmdd } from '../../config/helpers';

const { height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class ReservationDetail extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
    'Setting a timer'
    ];

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.getToday();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onPersonsSelected(itemValue) {
    this.props.personsSelected(itemValue);
  }

  onTypeSelected(itemValue) {
    this.props.typeSelected(itemValue);
  }

  onEnterHourSelected(itemValue) {
    this.props.enterHourSelect(itemValue);
  }

  onOutHourSelected(itemValue) {
    this.props.outHourSelect(itemValue);
  }

  onReservationPressed() {
    this.props.reservationPressed(this.props.type,
      this.props.persons, this.props.date, this.props.enterHourSelected,
      this.props.outHourSelected, this.props.user.email, this.props.toggle);
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  changingDate(date) {
    this.props.changeDate(date);
  }

  handleBackButtonClick() {
    this.props.toggle();
    return true;
  }

  renderSelectPickerEntryHour() {
    if (this.props.weekDay === 'Viernes') {
      return (
        <Picker
          selectedValue={this.props.enterHourSelected}
          onValueChange={(itemValue) => this.onEnterHourSelected(itemValue)}
        >
          <Picker.Item key={-1} label='Selecciona una opción' value='NaN' />
          <Picker.Item key={0} label='17:00' value={17} />
          <Picker.Item key={1} label='18:00' value={18} />
          <Picker.Item key={2} label='19:00' value={19} />
          <Picker.Item key={3} label='20:00' value={20} />
          <Picker.Item key={4} label='21:00' value={21} />
          <Picker.Item key={5} label='22:00' value={22} />
          <Picker.Item key={6} label='23:00' value={23} />
        </Picker>
      );
    }
    return (
      <Picker
        selectedValue={this.props.enterHourSelected}
        onValueChange={(itemValue) => this.onEnterHourSelected(itemValue)}
      >
        <Picker.Item key={-1} label='Selecciona una opción' value='NaN' />
        <Picker.Item key={0} label='17:00' value={17} />
        <Picker.Item key={1} label='18:00' value={18} />
        <Picker.Item key={2} label='19:00' value={19} />
        <Picker.Item key={3} label='20:00' value={20} />
        <Picker.Item key={4} label='21:00' value={21} />
      </Picker>
    );
  }

  renderSelectPickerOutHour() {
    const arrayHoras = [];
    if (this.props.weekDay === 'Viernes') {
      for (let h = this.props.enterHourSelected + 1; h <= 24; h++) {
        arrayHoras.push(h);
      }
  } else {
    for (let h = this.props.enterHourSelected + 1; h <= 22; h++) {
      arrayHoras.push(h);
    }
  }
  return (
    <Picker
      selectedValue={this.props.outHourSelected}
      onValueChange={(itemValue) => this.onOutHourSelected(itemValue)}
    >
      <Picker.Item key={-1} label='Selecciona una opción' value='NaN' />
      {arrayHoras.map((hora) => {
        return (
          <Picker.Item key={hora} label={hora === 24 ? '00:00' : hora + ':00'} value={hora} />
        );
      })
      }
    </Picker>
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
      <CardSectionTransp>
        <View style={styles.containerStyle}>
          <Text style={styles.select}>
            ¿Qué quieres reservar?:
          </Text>
        </View>
      </CardSectionTransp>
      <CardSectionTransp>
        <View style={styles.containerStyle}>
          <Picker
            selectedValue={this.props.type}
            onValueChange={(itemValue) => this.onTypeSelected(itemValue)}
          >
          <Picker.Item key={-1} label='Selecciona una opción' value='NaN' />
          <Picker.Item key={0} label='ORDENADORES' value='ORDENADORES' />
          <Picker.Item key={1} label='MESA de JUEGOS DE MESA' value='JUEGOS DE MESA' />
          </Picker>
        </View>
      </CardSectionTransp>
      {this.props.type === 'ORDENADORES' &&
        <View>
          <CardSectionTransp>
            <View style={styles.containerStyle}>
              <Text style={styles.select}>
                ¿Cuántos ordenadores?:
              </Text>
            </View>
          </CardSectionTransp>
          <CardSectionTransp>
            <View style={styles.containerStyle}>
              <Picker
                selectedValue={this.props.persons}
                onValueChange={(itemValue) => this.onPersonsSelected(itemValue)}
              >
              <Picker.Item key={-1} label='Selecciona una opción' value='NaN' />
              <Picker.Item key={0} label='1' value={1} />
              <Picker.Item key={1} label='2' value={2} />
              <Picker.Item key={1} label='3' value={3} />
              <Picker.Item key={2} label='4' value={4} />
              <Picker.Item key={2} label='5' value={5} />
              <Picker.Item key={2} label='6' value={6} />
              </Picker>
            </View>
          </CardSectionTransp>
        </View>
      }
      <View>
        <CardSectionTransp>
          <View style={styles.containerStyle}>
            <Text style={styles.select}>
              Fecha:
            </Text>
          </View>
        </CardSectionTransp>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15
          }}
        >
          <CardSectionTransp>
            <DatePicker
              style={{ width: 200 }}
              date={this.props.date}
              mode="date"
              placeholder="Fecha"
              format="YYYY-MM-DD"
              minDate={GetDateYYYYmmdd()}
              maxDate={GetDateYYYYmmdd(7)}
              confirmBtnText="OK"
              cancelBtnText="Cancelar"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.changingDate(date);
               }}
            />
            </CardSectionTransp>
          </View>
        </View>

        {this.props.weekDay !== '' &&
        <View>
          <CardSectionTransp>
            <View style={styles.containerStyle}>
              <Text style={styles.select}>
                Hora de entrada:
              </Text>
            </View>
          </CardSectionTransp>
          <CardSectionTransp>
            <View style={styles.containerStyle}>
              {this.renderSelectPickerEntryHour()}
            </View>
          </CardSectionTransp>
        </View>
        }

        {this.props.weekDay !== '' && this.props.enterHourSelected !== '' && this.props.enterHourSelected !== 'NaN' &&
        <View>
          <CardSectionTransp>
            <View style={styles.containerStyle}>
              <Text style={styles.select}>
                Hora de salida:
              </Text>
            </View>
          </CardSectionTransp>
          <CardSectionTransp>
            <View style={styles.containerStyle}>
              {this.renderSelectPickerOutHour()}
            </View>
          </CardSectionTransp>
        </View>
        }

        {this.props.error !== '' &&
          <CardSectionTransp>
            <Text style={styles.error}>{this.props.error}</Text>
          </CardSectionTransp>
        }

        {this.props.weekDay !== '' && this.props.outHourSelected !== '' && this.props.outHourSelected !== 'NaN' && this.props.enterHourSelected !== '' && this.props.enterHourSelected !== 'NaN' &&
          <ButtonPrimary onPress={() => { this.onReservationPressed(); }}>
            ¡RESERVAR!
          </ButtonPrimary>
        }
        <KeyboardSpacer />
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
    backgroundColor: CONSTANTS.COLOR.WHITE
  },
  error: {
    color: CONSTANTS.COLOR.ERROR,
    fontSize: 14
  },
  select: {
    color: CONSTANTS.COLOR.GREY_DARK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
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
  }
});

 const mapStateToProps = ({ reservation, auth }) => {
   const { error, date, type, persons, enterHourSelected, outHourSelected, weekDay } = reservation;
   const { isModalCloseSessions } = auth;

   return { error, date, type, persons, enterHourSelected, outHourSelected, weekDay, isModalCloseSessions };
 };

export default connect(mapStateToProps, {
  reservationPressed, getToday, changeDate, typeSelected, personsSelected, enterHourSelect,
  outHourSelect, modalCloseSession
})(ReservationDetail);

/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, Dimensions, Picker, BackHandler
} from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import {
  getImages, modalCloseSession, eventNameChanged, eventDescriptionChanged, changeDateEvent,
   changingHour, createEventPressed
} from '../../actions';
import {
  CardSectionTransp, InputBlack, ButtonSuccess, ButtonError, ButtonPrimary
} from '../common';
import { GetDateYYYYmmdd } from '../../config/helpers';

const { height, width } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class EventCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoSelected: null,
      isModalDeleteEventVisible: false,
      imageLoading: false
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    this.setState({ photoSelected: '0' });

    this.props.getImages();

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
  }

  onGoPerfil() {
    this.props.nickNameNecesary();
    this.props.itemSelected('Perfil');
  }

  onNameChange(text) {
    this.props.eventNameChanged(text);
  }

  onDescriptionChange(text) {
    this.props.eventDescriptionChanged(text);
  }

  onCreatePressed() {
    this.props.createEventPressed(this.state.photoSelected, this.props.name, this.props.description,
       this.props.date, this.props.hour, this.props.toggle);
  }

  changingDate(date) {
    this.props.changeDateEvent(date);
  }

  changeHour(hour) {
    this.props.changingHour(hour);
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

    return 'NaN';
  }

  handleBackButtonClick() {
    this.props.toggle();
    return true;
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

        {(this.state.photoSelected === 'NaN' || this.state.photoSelected === '0') ?
          <Image
            source={require('../../assets/img/torneo_background.png')}
            style={styles.photo}
          />
        :
          <Image
           source={{ uri: this.state.photoSelected }}
           style={styles.photo}
           onLoadEnd={() => this.setState({ imageLoading: true })}
          />
        }

        <CardSectionTransp>
           <InputBlack
             label="Nombre"
             onChangeText={this.onNameChange.bind(this)}
             value={this.props.name}
           />
        </CardSectionTransp>
        <CardSectionTransp>
          <InputBlack
            label="Descripción"
            onChangeText={this.onDescriptionChange.bind(this)}
            value={this.props.description}
          />
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
              <DatePicker
                style={{ width: 200 }}
                date={this.props.date}
                mode="date"
                placeholder="Fecha"
                format="YYYY-MM-DD"
                minDate={GetDateYYYYmmdd()}
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

          </View>
        </View>
        <View>
          <CardSectionTransp>
            <View style={styles.containerStyle}>
              <Text style={styles.select}>
                Hora de comienzo:
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
              <DatePicker
                style={{ width: 200 }}
                date={this.props.hour}
                mode="time"
                placeholder="Hora"
                confirmBtnText="OK"
                cancelBtnText="Cancelar"
                is24Hour
                format="H:mm"
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
                onDateChange={(hour) => {
                  this.changeHour(hour);
                 }}
              />

          </View>
        </View>
        {this.props.error ?
          <Text style={styles.error}>{this.props.error}</Text>
        :
          <View></View>
        }
        <ButtonPrimary onPress={() => { this.onCreatePressed(); }}>
          CREAR
        </ButtonPrimary>
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
    paddingBottom: 5,
    marginBottom: 20
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
  },
  error: {
    color: CONSTANTS.COLOR.ERROR,
    fontSize: 14,
    marginLeft: 20,
    marginTop: 20
  },
});

const mapStateToProps = ({ events, gallery, auth }) => {
  const { event_detail, signed, participants, evento, winners, loading, isModalNickName,
     name, description, date, hour, error } = events;
  const { photos, photoSelected } = gallery;
  const { isModalCloseSessions } = auth;

  return { event_detail, signed, participants, evento, winners, photos, photoSelected, loading, isModalNickName,
    isModalCloseSessions, name, description, date, hour, error };
};

export default connect(mapStateToProps, {
  getImages, modalCloseSession, eventNameChanged, eventDescriptionChanged, changeDateEvent, changingHour, createEventPressed
})(EventCreate);

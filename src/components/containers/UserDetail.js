/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, Dimensions, TextInput, Picker, BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  changeRol, isModalOpenUser, reportSaved, reportChange, getReports, banUser, desBanUser,
  isBanned, modalCloseSession
} from '../../actions';
import {
  CardSection, CardSectionRow, CardSectionTransp, Card, ButtonPrimary,
  ButtonWarning, ButtonError, ButtonSuccess
} from '../common';

const { height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolSelected: 'NaN'
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.isBanned(this.props.userDetail.email);
    this.props.getReports(this.props.userDetail.key);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onRolSelected(itemValue) {
     this.setState({ rolSelected: itemValue });
  }

  onSavePressed() {
    this.props.changeRol(this.state.rolSelected, this.props.userDetail.key);
  }

  onReportSave() {
    this.props.reportSaved(this.props.report, this.props.userDetail.key);
  }

  onBanPressed() {
    this.props.banUser(this.props.userDetail);
  }

  onDesBanPressed() {
    this.props.desBanUser(this.props.userDetail);
  }

  onReportChange(text) {
    this.props.reportChange(text);
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  toggleModalSave() {
    this.props.isModalOpenUser('SAVE');
  }

  toggleModalReport() {
    this.props.isModalOpenUser('REPORT');
  }

  toggleModalBan() {
    this.props.isModalOpenUser('BAN');
  }

  toggleModalDesBan() {
    this.props.isModalOpenUser('DESBAN');
  }

  selectedPicker() {
    if (this.state.rolSelected && this.state.rolSelected !== 'NaN') {
      return this.state.rolSelected;
    } else if (this.props.userDetail.rol) {
      this.state.photoSelected = this.props.userDetail.rol;
      return this.props.userDetail.rol;
    }
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
      <Modal
        backdropColor={CONSTANTS.COLOR.BLACK}
        backdropOpacity={0.5}
        isVisible={this.props.isModalOpenedSave}
        onRequestClose={() => { this.toggleModalSave(); }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.innerContainer}>¿Seguro que quieres modificar el rol?</Text>

            <ButtonError onPress={() => { this.toggleModalSave(); }}>NO</ButtonError>
            <ButtonSuccess
              onPress={() => this.onSavePressed()}
            >
            SI
            </ButtonSuccess>
        </View>
      </Modal>
      <Modal
        backdropColor={CONSTANTS.COLOR.BLACK}
        backdropOpacity={0.5}
        isVisible={this.props.isModalOpenReport}
        onRequestClose={() => { this.toggleModalReport(); }}
      >
        <View style={styles.modalContainerReport}>
          <Text style={styles.innerContainer}>REPORT:</Text>
            <CardSectionTransp>
              <TextInput
                autoFocus
                style={styles.inputStyle}
                onChangeText={this.onReportChange.bind(this)}
                value={this.props.report}
              />
            </CardSectionTransp>

              <Text style={styles.comprar}>
                {this.props.errorCode && this.props.errorCode}
              </Text>

            <ButtonError onPress={() => this.toggleModalReport()}>CANCELAR</ButtonError>
            <ButtonSuccess
              onPress={() => this.onReportSave()}
            >
            ACEPTAR
            </ButtonSuccess>
        </View>
      </Modal>
      <Modal
        backdropColor={CONSTANTS.COLOR.BLACK}
        backdropOpacity={0.5}
        isVisible={this.props.isModalOpenBan}
        onRequestClose={() => { this.toggleModalBan(); }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.innerContainer}>¿Seguro que quieres Banear a
            <Text style={styles.textMarked2}> {this.props.userDetail.email}</Text>?
          </Text>

            <ButtonError onPress={() => { this.toggleModalBan(); }}>NO</ButtonError>
            <ButtonSuccess
              onPress={() => this.onBanPressed()}
            >
            SI
            </ButtonSuccess>
        </View>
      </Modal>
      <Modal
        backdropColor={CONSTANTS.COLOR.BLACK}
        backdropOpacity={0.5}
        isVisible={this.props.isModalOpenDesBan}
        onRequestClose={() => { this.toggleModalDesBan(); }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.innerContainer}>¿Seguro que quieres Desbanear a
            <Text style={styles.textMarked2}> {this.props.userDetail.email}</Text>?
          </Text>

            <ButtonError onPress={() => { this.toggleModalDesBan(); }}>NO</ButtonError>
            <ButtonSuccess
              onPress={() => this.onDesBanPressed()}
            >
            SI
            </ButtonSuccess>
        </View>
      </Modal>
       <View style={styles.margin}>
          <CardSection>
            <View style={styles.thumbnailContainerStyle}>
              <Image
                style={styles.thumbnailStyle}
                source={require('../../assets/img/logo.png')}
              />
            </View>
            <View style={styles.headerContentStyle}>
              <Text style={styles.headerTextStyle}>
                {this.props.userDetail.nickName ? this.props.userDetail.nickName : 'Anónimus'}
              </Text>
              <Text>{this.props.userDetail.email}</Text>
              {this.props.userDetail.sex && this.props.userDetail.sex !== 'NaN' &&
                <Text>{this.props.userDetail.sex}</Text>
              }
              {this.props.userDetail.age && this.props.userDetail.age !== 'NaN' &&
                <Text>{this.props.userDetail.age} años</Text>
              }
              <Text>{this.props.userDetail.rol}</Text>
              {this.props.userDetail.tickets && this.props.userDetail.tickets !== 'NaN' && this.props.userDetail.tickets !== '' ?
                <Text>{this.props.userDetail.tickets}
                       <IonIcons
                         name={'ios-pricetags'}
                         size={15}
                         color={CONSTANTS.COLOR.PRIMARY}
                       />
                </Text>
                :
                <View></View>
              }
              {this.props.userDetail.mac && this.props.userDetail.mac !== 'NaN' &&
                <Text>{this.props.userDetail.mac}</Text>
              }
            </View>
          </CardSection>
          <CardSectionRow>
            <View style={{ marginLeft: 10, marginBottom: 4 }}>
              <Text style={styles.headerTextStyle}>REDES SOCIALES</Text>
            </View>
            <View style={{ marginLeft: 25 }}>
              <Text style={styles.socialTextStyle}>Facebook:
              {this.props.userDetail && this.props.userDetail.facebook &&
                <Text style={styles.response}> {this.props.userDetail.facebook}</Text>
              }
              </Text>
              <Text style={styles.socialTextStyle}>Instagram:
              {this.props.userDetail && this.props.userDetail.instagram &&
                <Text style={styles.response}> {this.props.userDetail.instagram}</Text>
              }
              </Text>
              <Text style={styles.socialTextStyle}>Twitter:
              {this.props.userDetail && this.props.userDetail.twitter &&
                <Text style={styles.response}> {this.props.userDetail.twitter}</Text>
              }
              </Text>
              <Text style={styles.socialTextStyle}>Twitch:
              {this.props.userDetail && this.props.userDetail.twitch &&
                <Text style={styles.response}> {this.props.userDetail.twitch}</Text>
              }
              </Text>
            </View>
          </CardSectionRow>
          <CardSectionRow>
            <View style={{ marginLeft: 10, marginBottom: 4 }}>
              <Text style={styles.headerTextStyle}>INTERESES</Text>
            </View>
            <View style={{ marginLeft: 25 }}>
              {this.props.userDetail.interests && this.props.userDetail.interests.csgo &&
                <Text>CSGO</Text>
              }
              {this.props.userDetail.interests && this.props.userDetail.interests.fortnite &&
                <Text>Fortnite</Text>
              }
              {this.props.userDetail.interests && this.props.userDetail.interests.hs &&
                <Text>HearthStone</Text>
              }
              {this.props.userDetail.interests && this.props.userDetail.interests.lol &&
                <Text>League of Legends</Text>
              }
              {this.props.userDetail.interests && this.props.userDetail.interests.ow &&
                <Text>Over Watch</Text>
              }
              {this.props.userDetail.interests && this.props.userDetail.interests.pubg &&
                <Text>PUBG</Text>
              }
              {this.props.userDetail.interests && this.props.userDetail.interests.smite &&
                <Text>Smite</Text>
              }
            </View>
          </CardSectionRow>
          <CardSectionRow>
            <View style={{ marginLeft: 10, marginBottom: 4 }}>
              <Text style={styles.headerTextStyle}>ROL</Text>
            </View>
            <View style={{ marginLeft: 25 }}>
              <Picker
                selectedValue={this.selectedPicker()}
                onValueChange={(itemValue) => this.onRolSelected(itemValue)}
              >
              <Picker.Item key={-1} label='Selecciona una rol' value='NaN' />
              <Picker.Item key={0} label={'CLIENTE'} value={'CLIENT'} />
              <Picker.Item key={0} label={'ENVIVO'} value={'ENVIVO'} />
              <Picker.Item key={0} label={'ADMINISTRADOR'} value={'ADMIN'} />
              <Picker.Item key={0} label={'BOSS'} value={'BOSS'} />
              </Picker>
            </View>
          </CardSectionRow>
          {this.props.reports && this.props.reports.length > 0 &&
            <CardSectionRow>
              <View style={{ marginLeft: 10, marginBottom: 10 }}>
                <Text style={styles.headerTextStyle}>REPORTS</Text>
              </View>
              <View style={{ marginLeft: 25 }}>
              {this.props.reports &&
                this.props.reports.map((report, key) => {
                  return (
                    <Card key={key}>
                      <Text style={{ color: CONSTANTS.COLOR.BLACK }}>{report.date}</Text>
                      <Text>{report.report}</Text>
                    </Card>
                  );
                })
              }
              </View>
            </CardSectionRow>
          }
          <CardSectionRow>
            {this.props.message !== '' &&
              <Text style={{ color: CONSTANTS.COLOR.SUCCESS, marginLeft: 10, marginTop: 5 }}>{this.props.message}</Text>
            }

            <ButtonPrimary onPress={() => { this.toggleModalSave(); }}>
              GUARDAR CAMBIOS
            </ButtonPrimary>
          </CardSectionRow>
          <CardSectionRow>
            <ButtonWarning onPress={() => { this.toggleModalReport(); }}>
              REPORTAR
            </ButtonWarning >
            {!this.props.banned ?
              <ButtonError onPress={() => { this.toggleModalBan(); }}>
                BANEAR
              </ButtonError>
            :
              <ButtonSuccess onPress={() => { this.toggleModalDesBan(); }}>
                DESBANEAR
              </ButtonSuccess>
            }

          </CardSectionRow>
        </View>
        <KeyboardSpacer />
      </ScrollView>

   );
 }
}

const styles = StyleSheet.create({
  margin: {
    marginBottom: 25,
    marginTop: 25
  },
  headerContentStyle: {
     flexDirection: 'column',
     justifyContent: 'space-around'
   },
   headerTextStyle: {
     fontSize: 16,
     color: CONSTANTS.COLOR.BLACK
   },
   socialTextStyle: {
     fontSize: 14,
     color: CONSTANTS.COLOR.BLACK
   },
   response: {
     fontSize: 12,
     color: CONSTANTS.COLOR.GREY_MEDIUM
   },
   thumbnailStyle: {
     height: 90,
     width: 90
   },
   inputStyle: {
     backgroundColor: CONSTANTS.COLOR.TRANSPARENT,
     paddingRight: 5,
     paddingLeft: 5,
     flex: 2,
     fontSize: 21,
     color: CONSTANTS.COLOR.BLACK
   },

    scroll: {
      flex: 1
    },
    textMarked2: {
        color: CONSTANTS.COLOR.PRIMARY,
        fontSize: 18
    },
    modalContainer: {
      backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
      height: height / 2,
      width: null,
      borderRadius: 8,
      padding: 30
    },
    modalContainerReport: {
      backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
      height: height / 1.6,
      width: null,
      borderRadius: 8,
      padding: 30
    },
    innerContainer: {
      alignItems: 'center',
      color: CONSTANTS.COLOR.BLACK,
      fontSize: 18
    }
});

const mapStateToProps = ({ user, auth }) => {
  const { userDetail, isModalOpenedSave, isModalOpenReport, isModalOpenBan, isModalOpenDesBan, report, reports, message, banned } = user;
  const { isModalCloseSessions } = auth

  return { userDetail, isModalOpenedSave, isModalOpenReport, isModalOpenBan, isModalOpenDesBan, report, reports, message, banned, isModalCloseSessions };
};

export default connect(mapStateToProps, {
  changeRol, isModalOpenUser, reportSaved, reportChange, getReports, banUser, desBanUser,
  isBanned, modalCloseSession
})(UserDetail);

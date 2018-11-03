/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, ScrollView, Text, Image, TouchableHighlight, AsyncStorage, Dimensions, BackHandler, NetInfo
} from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import PushController from '../../config/PushController';
import firebase from '../../config/firebase';
import { syncList, eventsFetch, eventPressed, modalCloseSession } from '../../actions';
import { CardTransp, ButtonError, ButtonSuccess } from '../common';
import { SnapshotToArray, FormatDate, EventIsOpen } from '../../config/helpers';
import ImageList from '../common/ImageList';

const { width, height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class Eventos extends Component {
  constructor(props) {
      super(props);
      console.ignoredYellowBox = [
      'Setting a timer'
      ];
      this.state = {
          firebaseEvents: null,
          facebookEvents: null,
          isOpen: false,
          photo: '',
          imageLoading: false,
          user: null
      };
  }

  componentWillMount() {
    AsyncStorage.getItem('email')
      .then((email) => {
      firebase.database().ref().child('users').orderByChild('email').equalTo(email)
      .on('value', snapshot => {

          this.setState({ user: SnapshotToArray(snapshot)[0] });

          AsyncStorage.getItem('accessToken')
          .then((result) => {

            // const infoRequest = new GraphRequest(
            //   '/belegendbar/events',
            //   {
            //     accessToken: result,
            //   },
            //   responseInfoCallback
            // );
            //
            //   new GraphRequestManager().addRequest(infoRequest).start();

           this.props.eventsFetch();


            if (this.state.user && !this.state.user.mac) {
              DeviceInfo.getMACAddress().then(mac => {
                const reference = firebase.database().ref('users/' + this.state.user.key);
                reference.update({
                  mac: mac
                });
              });
            }
          })
          .catch(() => {
            this.props.eventsFetch();
          });
      });
    });
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp);
  }

  componentWillUnmount() {
     BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp);
     NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  onEventPressed(event) {
    this.props.eventPressed(event);
    this.props.itemSelected('Evento');
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  handleConnectionChange(isConnected) {
    this.props.connectionChange(isConnected);
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
       {this.props.eventos_firebase ?
           this.props.eventos_firebase.map((event, key) => {
             return (
               <TouchableHighlight
                  key={key}
                  onPress={() => this.onEventPressed(event)}
                  activeOpacity={0.6}
                  underlayColor={CONSTANTS.COLOR.WHITE}
               >
                 <View>
                   <CardTransp>
                   {event.photo !== 'NaN' ?
                      <ImageList
                         photo={event.photo}
                      />
                   :
                     <Image
                        source={require('../../assets/img/torneo_background.png')}
                        style={styles.photo}
                     />
                   }
                     <View style={styles.containerStyle} >
                        <Text style={styles.text}>{event.name}</Text>
                        <Text style={styles.date}>{FormatDate(event.start_time, true)}</Text>
                        {EventIsOpen(event.start_time) && !event.winners ?
                          <Text style={styles.open}>¡ABIERTO!</Text>
                        :
                          <Text style={styles.close}>CERRADO</Text>
                        }
                      </View>
                   </CardTransp>
                 </View>
                </TouchableHighlight>
             );
           })
       :
         <Image
           source={require('../../assets/img/loadingRed.gif')}
           style={styles.photoGif2}
         />
       }
       <PushController />
       <View style={styles.marginBot}></View>
      </ScrollView>
   );
 }
}


const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  photo: {
      width: null,
      resizeMode: 'stretch',
      height: width / 2,
      borderRadius: 4,
      backgroundColor: CONSTANTS.COLOR.WHITE,
  },
  scroll: {
    backgroundColor: CONSTANTS.COLOR.WHITE,
  },
  photoGif: {
    width: width,
    resizeMode: 'contain',
    backgroundColor: CONSTANTS.COLOR.WHITE,
    height: height / 4
  },
  text: {
      color: CONSTANTS.COLOR.BLACK,
      fontSize: 20
  },
  date: {
      color: CONSTANTS.COLOR.GREY_DARK,
      fontSize: 16
  },
  marginBot: {
    marginBottom: 25
  },
  open: {
      color: CONSTANTS.COLOR.SUCCESS,
      fontSize: 17
  },
  close: {
      color: CONSTANTS.COLOR.ERROR,
      fontSize: 17
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
  photoGif2: {
    width: null,
    resizeMode: 'contain',
    height: 50,
    borderRadius: 10,
    marginTop: 20
  }
};

const mapStateToProps = ({ auth, events, user }) => {
  const { accessToken, isModalCloseSessions } = auth;
  const { eventos_facebook, eventos_firebase } = events;
  const { isConnected } = user;

  return { accessToken, eventos_facebook, eventos_firebase, isConnected, isModalCloseSessions };
};

export default connect(mapStateToProps, {
  syncList, eventsFetch, eventPressed, modalCloseSession
})(Eventos);

import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import firebase from '../config/firebase';
import { SnapshotToArray, GetToday, FormatDate, GetFutureDay } from '../config/helpers';
import {
  EVENT_LIST_CHANGED,
  EVENT_PRESSED,
  EVENT_SIGNIN,
  EVENT_SIGNOUT,
  RELOAD_PARTICIPANTS,
  NEW_WINNER,
  DELETE_WINNER,
  RELOAD_EVENT,
  RELOAD_WINNER,
  DELETE_EVENT,
  SIGNING,
  NICK_NAME_NECESARY,
  NAME_EVENT_CHANGED,
  DESCRIPTION_EVENT_CHANGED,
  CHANGE_DATE,
  ENTER_HOUR_SELECTED,
  ERROR_CREATE_EVENT,
  SUCCESS_CREATE_EVENT
} from './types';

export const createEventPressed = (photo, name, description, date, hour, toggle) => {
  return (dispatch) => {
    if (photo === '0' || name === '' || description === '' || date === '' || hour === '') {
      dispatch({
          type: ERROR_CREATE_EVENT,
          payload: 'Debes rellenar todos los campos'
      });
    } else {
      const startDate =  date + 'T' + hour + ':00+0100';
      const farAway = moment(FormatDate(GetFutureDay(500)), 'MM-DD-YYYY Z').valueOf();
      const eventDate = moment(FormatDate(startDate), 'MM-DD-YYYY Z').valueOf();
      const order = farAway - eventDate;
      const obj = {
        name: name,
        description: description,
        photo: photo,
        start_time: startDate,
        order: order,
        id: order,
        place: {
          id: 584480728419871,
          location: {
            city: 'Zaragoza',
            country: 'Spain',
            street: 'Calle San Juan de la Cruz 9',
            zip: '50006'
          },
          name: 'Be  A Legend BAR'
        },
        manual: true
      };

      firebase.database().ref().child('events').push(obj);

      dispatch({
          type: SUCCESS_CREATE_EVENT,
          payload: ''
      });
      toggle();
    }
  };
};

export const changingHour = (hour) => {
  return {
    type: ENTER_HOUR_SELECTED,
    payload: hour
  };
};

export const changeDateEvent = (date) => {
  return (dispatch) => {
    dispatch({
        type: CHANGE_DATE,
        payload: date
    });
  };
};

export const eventNameChanged = (text) => {
  return {
    type: NAME_EVENT_CHANGED,
    payload: text
  };
};

export const eventDescriptionChanged = (text) => {
  return {
    type: DESCRIPTION_EVENT_CHANGED,
    payload: text
  };
};

export const nickNameNecesary = () => {
  return {
    type: NICK_NAME_NECESARY
  };
};

export const deleteEvent = (eventKey, navigation) => {
  const reference = firebase.database().ref('events/' + eventKey);
  reference.remove();

  return (dispatch) => {
    dispatch({
      type: DELETE_EVENT
    });
  };
};

export const isNotWinner = (eventKey, winner) => {
  const reference = firebase.database().ref('events/' + eventKey + '/winners/' + winner.keyWinner);
  reference.remove();

  return (dispatch) => {
    dispatch({
      type: DELETE_WINNER
    });
  };
};

export const isWinner = (eventKey, participant) => {
  const obj = {
    email: participant
  };

  const reference = firebase.database().ref('events/' + eventKey + '/winners');
  reference.push(obj);

  return (dispatch) => {
    dispatch({
      type: NEW_WINNER
    });
  };
};

export const reloadWinners = (eventKey) => {
  return (dispatch) => {
    firebase.database().ref().child('events').child(eventKey).child('winners')
    .on('value', snapshot => {
      const snapArray = SnapshotToArray(snapshot);
      const arrayNicks = [];
      snapArray.map((participant) => {
        let array = [];
        firebase.database().ref().child('users').orderByChild('email')
        .equalTo(participant.email).once('value', snap => {
            array = SnapshotToArray(snap)[0];
            array.keyWinner = participant.key;
            arrayNicks.push(array);
        });
      });
      dispatch({
        type: RELOAD_WINNER,
        payload: arrayNicks
      });
    });
  };
};


export const reloadEvent = (eventKey) => {
  return (dispatch) => {
    firebase.database().ref().child('events').child(eventKey)
    .on('value', snapshot => {
      dispatch({
        type: RELOAD_EVENT,
        payload: snapshot.val()
      });
    });
  };
};

export const reloadParticipants = (eventKey) => {
  return (dispatch) => {
    firebase.database().ref().child('events').child(eventKey).child('participants')
    .on('value', snapshot => {
      const snapArray = SnapshotToArray(snapshot);
      const arrayNicks = [];
      snapArray.map((participant) => {
        firebase.database().ref().child('users').orderByChild('email').equalTo(participant.email)
        .on('value', snap => {
            arrayNicks.push(SnapshotToArray(snap)[0]);
        });
      });
      dispatch({
        type: RELOAD_PARTICIPANTS,
        payload: arrayNicks
      });
    });
  };
};

export const signIn = (event, email) => {
  return (dispatch) => {
    dispatch({
      type: SIGNING
    });

    const reference = firebase.database().ref('events/' + event.key + '/participants');
    const obj = {
      email: email
    };
    reference.push(obj);

    const eventDate = moment(FormatDate(event.start_time), 'MM-DD-YYYY Z').valueOf();
    const today = moment(FormatDate(GetToday(0)), 'MM-DD-YYYY Z').valueOf();

    if (eventDate - today > 0) {
      PushNotification.localNotificationSchedule({
        id: Number.parseInt(event.id, 100),
        message: '¡' + event.name + ' HOY en Be A Legend Bar!',
        vibrate: true,
        vibration: 300,
        date: new Date(event.start_time),
        largeIcon: "ic_launcher",
        smallIcon: "ic_launcher"
      });
    }

    dispatch({
      type: EVENT_SIGNIN,
      payload: true
    });
  };
};

export const signOut = (event, email) => {
  return (dispatch) => {
    dispatch({
      type: SIGNING,
    });

     firebase.database().ref().child('events').child(event.key).child('participants')
     .orderByChild('email').equalTo(email).once('value', snapshot => {
       firebase.database()
       .ref('events/'+event.key+'/participants/' + Object.keys(snapshot.val())[0]).remove();

       PushNotification.cancelLocalNotifications({ id: event.id });

       dispatch({
         type: EVENT_SIGNIN,
         payload: false
       });
     });
  };
};

export const eventSignin = (event, email) => {
  return (dispatch) => {
    firebase.database().ref().child('events').child(event.key).child('participants')
    .orderByChild('email').equalTo(email).once('value', snapshot => {
      if (snapshot.val()) {
        dispatch({
          type: EVENT_SIGNIN,
          payload: true
        });
      } else {
        dispatch({
          type: EVENT_SIGNOUT,
          payload: false
        });
      }
    });
  };
};

export const eventPressed = (event) => {
  return (dispatch) => {
    dispatch({
      type: EVENT_PRESSED,
      payload: event
    });
  };
};

export const eventsFetch = () => {
  return (dispatch) => {
    firebase.database().ref('events').orderByChild('order').on('value', snapshot => {
        dispatch({
          type: EVENT_LIST_CHANGED,
          payload: SnapshotToArray(snapshot)
        });
    });
  };
};

export const syncList = (facebookEvents, firebaseEvents) => {
    let update = true;
    const farAway = moment(FormatDate(GetFutureDay(500)), 'MM-DD-YYYY Z').valueOf();

    for (const eventFace of facebookEvents) {
      update = true;
      for (const eventFire of firebaseEvents) {
         if (eventFace.id === eventFire.id) {
           update = false;
         }
      }
      if (update) {
        const eventDate = moment(FormatDate(eventFace.start_time), 'MM-DD-YYYY Z').valueOf();
        eventFace.order = farAway - eventDate;
        eventFace.photo = 'NaN';
        firebase.database().ref().child('events').push(eventFace);
      }
    }

    return (dispatch) => {
      firebase.database().ref('events').orderByChild('order').on('value', snapshot => {
          dispatch({
            type: EVENT_LIST_CHANGED,
            payload: SnapshotToArray(snapshot)
          });
      });
  };
};

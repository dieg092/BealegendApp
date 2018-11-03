import firebase from 'firebase';
import {
  SnapshotToArray, GetDateYYYYmmdd, GetWeekDay, FormatDateddmmYYYY
} from '../config/helpers';

import {
  SAVE_RESERVATION,
  SAVE_RESERVATION_SUCCESS,
  SAVE_RESERVATION_FAIL,
  GET_TODAY,
  CHANGE_DATE,
  WEEK_DAY_SUCCESS,
  WEEK_DAY_FAIL,
  TYPE_SELECTED,
  PERSONS_SELECTED,
  ENTER_HOUR_SELECTED,
  OUT_HOUR_SELECTED,
  GET_RESERVATIONS,
  REMOVE_RESERVATION,
  IS_MODAL_CANCEL_VISIBLE
} from './types';

const CONSTANTS = require('../config/constants');

export const isModalVisible = () => {
  return {
    type: IS_MODAL_CANCEL_VISIBLE
  };
};

export const outHourSelect = (item) => {
  return {
    type: OUT_HOUR_SELECTED,
    payload: item
  };
};

export const enterHourSelect = (item) => {
  return {
    type: ENTER_HOUR_SELECTED,
    payload: item
  };
};

export const personsSelected = (item) => {
  return {
    type: PERSONS_SELECTED,
    payload: item
  };
};

export const typeSelected = (item) => {
  return {
    type: TYPE_SELECTED,
    payload: item
  };
};

export const changeDate = (date) => {
  return (dispatch) => {
    const weekDay = GetWeekDay(date);

    if (weekDay !== 'Lunes' && weekDay !== 'Sábado') {
      dispatch({
          type: CHANGE_DATE,
          payload: date
      });
      dispatch({
          type: WEEK_DAY_SUCCESS,
          payload: weekDay
      });
    } else {
      dispatch({
          type: WEEK_DAY_FAIL
      });
    }
  };
};

export const cancelReservation = (key) => {
  return (dispatch) => {
    const reference = firebase.database().ref().child('reservations').child(key);
    reference.remove();

    dispatch({
      type: IS_MODAL_CANCEL_VISIBLE
    });
    dispatch({
      type: REMOVE_RESERVATION,
    });
  };
};

export const getReservations = (user) => {
  return (dispatch) => {
    if (user) {
      if (user.rol === CONSTANTS.ROLES.BOSS || user.rol === CONSTANTS.ROLES.ADMIN) {
        firebase.database().ref().child('reservations').orderByChild('date')
        .on('value', snapshot => {
          dispatch({
            type: GET_RESERVATIONS,
            payload: SnapshotToArray(snapshot)
          });
        });
      } else {
        firebase.database().ref().child('reservations').orderByChild('user').equalTo(user.email)
        .on('value', snapshot => {
          dispatch({
            type: GET_RESERVATIONS,
            payload: SnapshotToArray(snapshot)
          });
        });
      }
    }
  };
};

export const getToday = () => {
  return {
    type: GET_TODAY,
    payload: GetDateYYYYmmdd()
  };
};

export const reservationPressed = (typeSelected, personsSelected, date,
  enterHourSelected, outHourSelected, correoUser, toggle) => {
  return (dispatch) => {
    dispatch({
        type: SAVE_RESERVATION
    });

    if (typeSelected !== '' && personsSelected !== '' && date !== '' &&
      enterHourSelected !== '' && outHourSelected !== '' && typeSelected !== 'NaN' &&
      (typeSelected === 'ORDENADORES' && personsSelected !== 'NaN' ||
       typeSelected !== 'ORDENADORES') && date !== 'NaN' &&
      enterHourSelected !== 'NaN' && outHourSelected !== 'NaN') {
      const obj = {
        typeSelected: typeSelected,
        personsSelected: personsSelected,
        date: date,
        enterHourSelected: enterHourSelected,
        outHourSelected: outHourSelected,
        user: correoUser
      };


      firebase.database().ref().child('reservations')
      .orderByChild('date').equalTo(date)
      .once('value', snapshot => {
        const snap = SnapshotToArray(snapshot);

        if (snap.length > 0) {
          let pcs = 0;
          let mesa = false;
          let sitesOcupied = '  Reservas del ' + FormatDateddmmYYYY(date) + ': \n';
          let tableOcupied = '  Reservas del ' + FormatDateddmmYYYY(date) + ': \n';

          for (let r = 0; r < snap.length; r++) {
            if ((snap[r].enterHourSelected <= enterHourSelected &&
                snap[r].outHourSelected > enterHourSelected) ||
                (snap[r].enterHourSelected >= enterHourSelected &&
                snap[r].outHourSelected <= outHourSelected) ||
                (snap[r].enterHourSelected < outHourSelected &&
                snap[r].outHourSelected >= outHourSelected)) {
              if (snap[r].typeSelected === 'ORDENADORES' && snap[r].personsSelected) {
                pcs = pcs + snap[r].personsSelected;
              } else {
                mesa = true;
              }
            }

            if (snap[r].typeSelected === 'ORDENADORES' && snap[r].personsSelected) {
              sitesOcupied = sitesOcupied + '    ' + snap[r].personsSelected + ' pc ' + ' de ' + snap[r].enterHourSelected + ':00 a ' + snap[r].outHourSelected + ':00.' + '\n';
            } else {
              tableOcupied = tableOcupied + '    ' + 'De ' + snap[r].enterHourSelected + ':00 a ' + snap[r].outHourSelected + ':00.' + '\n';
            }
          }

          const freePcs = 6 - pcs;

          if ((typeSelected !== 'ORDENADORES' && !mesa) || freePcs - personsSelected >= 0) {
            const reference = firebase.database().ref('reservations');
            reference.push(obj);

            dispatch({
                type: SAVE_RESERVATION_SUCCESS
            });

            toggle();
          } else {
            if (typeSelected !== 'ORDENADORES') {
              dispatch({
                  type: SAVE_RESERVATION_FAIL,
                  payload: '  Mesa ocupada en ese rango de horas. \n\n' + tableOcupied
              });
            } else {
              if (freePcs > 0) {
                dispatch({
                    type: SAVE_RESERVATION_FAIL,
                    payload: '  Quedan ' + freePcs + ' ordenadores libres en ese rango de horas. \n\n' + sitesOcupied
                });
              } else {
                dispatch({
                    type: SAVE_RESERVATION_FAIL,
                    payload: '  No quedan ordenadores libres en ese rango de horas. \n\n' + sitesOcupied
                });
              }
            }
          }
        } else {
          const reference = firebase.database().ref('reservations');
          reference.push(obj);

          dispatch({
              type: SAVE_RESERVATION_SUCCESS
          });

          toggle();
        }
      });
    } else {
      dispatch({
          type: SAVE_RESERVATION_FAIL,
          payload: '   Rellena todos los campos'
      });
    }
  };
};

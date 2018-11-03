import firebase from 'firebase';
import {
  SnapshotToArray,
  GetTodayFormatDateddmmYYYY
} from '../config/helpers';

import {
  GET_USERS,
  USER_PRESSED,
  CHANGE_ROL,
  SAVE_MODAL_PRESSED,
  REPORT_MODAL_PRESSED,
  BAN_MODAL_PRESSED,
  DESBAN_MODAL_PRESSED,
  CHANGE_REPORT,
  SAVE_REPORT,
  GET_REPORTS,
  BAN_USER,
  DESBAN_USER,
  SAVE_PROFILE,
  CHECK_BOX_LOL_TRUE,
  CHECK_BOX_LOL_FALSE,
  CHECK_BOX_CSGO_TRUE,
  CHECK_BOX_CSGO_FALSE,
  CHECK_BOX_FORTNITE_TRUE,
  CHECK_BOX_FORTNITE_FALSE,
  CHECK_BOX_HS_TRUE,
  CHECK_BOX_HS_FALSE,
  CHECK_BOX_OW_TRUE,
  CHECK_BOX_OW_FALSE,
  CHECK_BOX_PUBG_TRUE,
  CHECK_BOX_PUBG_FALSE,
  CHECK_BOX_SMITE_TRUE,
  CHECK_BOX_SMITE_FALSE,
  CODE_CHANGED,
  NICK_NAME_CHANGED,
  GET_CODE,
  INSTAGRAM_CHANGED,
  FACEBOOK_CHANGED,
  TWITTER_CHANGED,
  TWITCH_CHANGED,
  ERROR_NICKNAME,
  IS_BANNED,
  IS_BANNED_MAC
} from './types';

const CONSTANTS = require('../config/constants');

export const isBanned = (userMail) => {
  return (dispatch) => {
    firebase.database().ref().child('users').orderByChild('email').equalTo(userMail)
    .on('value', snapshot => {
      const snap = SnapshotToArray(snapshot)[0];
      dispatch({
        type: IS_BANNED,
        payload: snap.banned
      });
    });
  };
};

export const isBannedMac = () => {
  return {
    type: IS_BANNED_MAC,
    payload: true
  };
};

export const getCode = () => {
  return (dispatch) => {
    firebase.database().ref().child('code').once('value', snapshot => {
      dispatch({
        type: GET_CODE,
        payload: snapshot.val()
      });
    });
  };
};

export const instagramChanged = (text) => {
  return {
    type: INSTAGRAM_CHANGED,
    payload: text
  };
};

export const facebookChanged = (text) => {
  return {
    type: FACEBOOK_CHANGED,
    payload: text
  };
};

export const twitterChanged = (text) => {
  return {
    type: TWITTER_CHANGED,
    payload: text
  };
};

export const twitchChanged = (text) => {
  return {
    type: TWITCH_CHANGED,
    payload: text
  };
};

export const codeChanged = (text) => {
  return {
    type: CODE_CHANGED,
    payload: text
  };
};

export const nickNameChanged = (text) => {
  return {
    type: NICK_NAME_CHANGED,
    payload: text
  };
};

export const checkCSGOPressed = (state) => {
  if (state === true) {
    return {
      type: CHECK_BOX_CSGO_FALSE
    };
  }
  return {
    type: CHECK_BOX_CSGO_TRUE
  };
};

export const checkFortnitePressed = (state) => {
  if (state === true) {
    return {
      type: CHECK_BOX_FORTNITE_FALSE
    };
  }
  return {
    type: CHECK_BOX_FORTNITE_TRUE
  };
};

export const checkHearthSotnePressed = (state) => {
  if (state === true) {
    return {
      type: CHECK_BOX_HS_FALSE
    };
  }
  return {
    type: CHECK_BOX_HS_TRUE
  };
};

export const checkOverWatchPressed = (state) => {
  if (state === true) {
    return {
      type: CHECK_BOX_OW_FALSE
    };
  }
  return {
    type: CHECK_BOX_OW_TRUE
  };
};

export const checkPubgPressed = (state) => {
  if (state === true) {
    return {
      type: CHECK_BOX_PUBG_FALSE
    };
  }
  return {
    type: CHECK_BOX_PUBG_TRUE
  };
};

export const checkSmitePressed = (state) => {
  if (state === true) {
    return {
      type: CHECK_BOX_SMITE_FALSE
    };
  }
  return {
    type: CHECK_BOX_SMITE_TRUE
  };
};

export const checkLolPressed = (state) => {
  if (state === true) {
    return {
      type: CHECK_BOX_LOL_FALSE
    };
  }
  return {
    type: CHECK_BOX_LOL_TRUE
  };
};

export const saveProfile = (email, userKey, nickName, sex, age, lol, csgo, fortnite, hs,
   ow, pubg, smite, code, instagram, facebook, twitter, twitch) => {
  return (dispatch) => {
    const codeTickets = firebase.database().ref();
    codeTickets.update({
      code: code
    });

    if (nickName !== undefined) {
      firebase.database().ref().child('users').orderByChild('nickName').equalTo(nickName)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          const reference = firebase.database().ref('users/' + userKey);
          reference.update({
            nickName: nickName,
          });
          dispatch({
            type: ERROR_NICKNAME,
            payload: ''
          });
        } else {
          if (email !== SnapshotToArray(snapshot)[0].email) {
            dispatch({
              type: ERROR_NICKNAME,
              payload: 'NickName en uso.'
            });
          } else {
            dispatch({
              type: ERROR_NICKNAME,
              payload: ''
            });
          }
        }
      });
    }

    const reference = firebase.database().ref('users/' + userKey);
    reference.update({
      sex: sex,
      age: age,
      instagram: instagram,
      facebook: facebook,
      twitter: twitter,
      twitch: twitch
    });

    const interests = firebase.database().ref('users/' + userKey + '/interests');
    if (!lol) {
      interests.remove();
    }
    interests.update({
      lol: lol,
      csgo: csgo,
      fortnite: fortnite,
      hs: hs,
      ow: ow,
      pubg: pubg,
      smite: smite
    });

    dispatch({
      type: SAVE_PROFILE,
    });
  };
};

export const banUser = (user) => {
  return (dispatch) => {
    const reference = firebase.database().ref('users/' + user.key);
    reference.update({
      banned: true
    });

    firebase.database().ref().child('banneds').orderByChild('mac').equalTo(user.mac)
    .once('value', snapshot => {
      if (!snapshot.val()) {
        const banneds = firebase.database().ref('banneds');
        banneds.push({
          mac: user.mac
        });
      }
    });

    dispatch({
      type: BAN_USER,
      payload: 'Usuario Baneado'
    });
  };
};

export const desBanUser = (user) => {
  return (dispatch) => {
    const reference = firebase.database().ref('users/' + user.key);
    reference.update({
      banned: false
    });
    firebase.database().ref().child('banneds').orderByChild('mac').equalTo(user.mac)
    .once('value', snapshot => {
      if (snapshot.val()) {
        const banned = firebase.database().ref('banneds/' + SnapshotToArray(snapshot)[0].key);
        banned.remove();
      }
    });

    dispatch({
      type: DESBAN_USER,
      payload: 'Usuario Desbaneado'
    });
  };
};

export const getReports = (userKey) => {
  return (dispatch) => {
    firebase.database().ref().child('users').child(userKey).child('reports')
    .on('value', snapshot => {
      dispatch({
        type: GET_REPORTS,
        payload: SnapshotToArray(snapshot)
      });
    });
  };
};

export const reportSaved = (report, userKey) => {
  return (dispatch) => {
    const obj = {
      date: GetTodayFormatDateddmmYYYY(),
      report: report
    }

    const reference = firebase.database().ref('users/' + userKey + '/reports');
    reference.push(obj);

    dispatch({
      type: SAVE_REPORT
    });
  };
};

export const reportChange = (text) => {
  return {
    type: CHANGE_REPORT,
    payload: text
  };
};

export const isModalOpenUser = (type) => {
  if (type === 'SAVE') {
    return {
      type: SAVE_MODAL_PRESSED
    };
  } else if (type === 'REPORT') {
    return {
      type: REPORT_MODAL_PRESSED
    };
  } else if (type === 'DESBAN') {
    return {
      type: DESBAN_MODAL_PRESSED
    };
  }
  return {
    type: BAN_MODAL_PRESSED
  };
};

export const changeRol = (rol, userKey) => {
  return (dispatch) => {
    const reference = firebase.database().ref('users/' + userKey);
    reference.update({
      rol: rol
    });

    dispatch({
      type: CHANGE_ROL,
      payload: 'Rol editado'
    });
  };
};

export const userPressed = (user) => {
  return (dispatch) => {
    dispatch({
      type: USER_PRESSED,
      payload: user
    });
  };
};

export const getUsers = () => {
  return (dispatch) => {
    firebase.database().ref().child('users').orderByChild('email').on('value', snapshot => {
      dispatch({
        type: GET_USERS,
        payload: SnapshotToArray(snapshot)
      });
    });
  };
};

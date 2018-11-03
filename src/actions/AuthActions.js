import firebase from 'firebase';
import { AsyncStorage, Alert } from 'react-native';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';
import DeviceInfo from 'react-native-device-info';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCES,
  LOGOUT_USER_FAIL,
  REGISTRY_USER,
  REGISTRY_USER_SUCCESS,
  REGISTRY_USER_FAIL,
  RELOAD_USER,
  IS_MODAL_CLOSE_SESSION,
  CLEAN_ERROR,
} from './types';
import { SnapshotToArray } from '../config/helpers';

const CONSTANTS = require('../config/constants');

export const cleanError = () => {
  return {
    type: CLEAN_ERROR,
  };
};

export const modalCloseSession = () => {
  return {
    type: IS_MODAL_CLOSE_SESSION,
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const reloadUser = (email) => {
  return (dispatch) => {
    firebase.database().ref().child('users').orderByChild('email').equalTo(email)
    .on('value', snapshot => {
      dispatch({
        type: RELOAD_USER,
        payload: SnapshotToArray(snapshot)
      });
    });
  };
};


export const loginUser = ({ email, password, navigate }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, navigate))
      .catch(() => loginUserFail(dispatch));
   };
};

export const logoutUser = ({ navigate }) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

    LoginManager.logOut();
    firebase.auth().signOut()
    .then(() => logoutUserSuccess(dispatch, navigate))
    .catch(() => logoutUserFail(dispatch));
  };
};

export const registryUser = ({ email, password, navigate }) => {
  return (dispatch) => {
    dispatch({ type: REGISTRY_USER });
    const isEmulator = DeviceInfo.isEmulator();
    if (!isEmulator) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => registryUserSuccess(dispatch, user, navigate))
        .catch(() => registryUserFail(dispatch));
   } else {
     registryUserFail(dispatch);
   }
 };
};

const registryUserFail = (dispatch) => {
  dispatch({ type: REGISTRY_USER_FAIL });
};

const registryUserSuccess = (dispatch, user, navigate) => {
  dispatch({
    type: REGISTRY_USER_SUCCESS,
    payload: user
  });

  const rol = CONSTANTS.ROLES.CLIENT;

  const objUser = {
    email: user.email,
    rol: rol,
  };

  AsyncStorage.setItem('user', JSON.stringify(objUser));
  AsyncStorage.setItem('email', user.email);
  AsyncStorage.removeItem('accessToken');
  AsyncStorage.setItem('rol', rol);

  firebase.database().ref().child('users').push(objUser);

  navigate('App');
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, navigate) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  const objUser = {
    email: user.email
  };

  AsyncStorage.setItem('user', JSON.stringify(objUser));
  AsyncStorage.setItem('email', user.email);
  AsyncStorage.removeItem('accessToken');

  navigate('App');
};

const logoutUserFail = (dispatch) => {
  dispatch({ type: LOGOUT_USER_FAIL });
};

const logoutUserSuccess = (dispatch, navigate) => {
  dispatch({
    type: LOGOUT_USER_SUCCES
  });

  AsyncStorage.removeItem('user');
  AsyncStorage.removeItem('email');
  AsyncStorage.removeItem('accessToken');
  AsyncStorage.removeItem('rol');
};

export const loginFacebook = (navigate) => {
  return (dispatch) => {
    const isEmulator = DeviceInfo.isEmulator();


      LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
      .then((result) => {
        if (result.isCancelled) {
        } else if (!firebase.auth().currentUser) {
            AccessToken.getCurrentAccessToken()
            .then((data) => {
                const accessToken = data.accessToken;
                const responseInfoCallback = (fail) => {
                  if (fail) {
                    //
                  } else {
                    const credential = firebase.auth.FacebookAuthProvider
                      .credential(accessToken.toString());
                    firebase.auth().signInWithCredential(credential)
                      .then((user) => {
                        loginFacebookSuccess(dispatch, user, navigate, accessToken);
                      })
                      .catch((e) => {
                        console.log('Cuenta deshabilitada');
                        console.log(e);
                      });
                  }
                };
                const infoRequest = new GraphRequest(
                  '/me',
                  {
                    accessToken: accessToken,
                    parameters: {
                      fields: {
                        string: 'email,name'
                      }
                    }
                  },
                  responseInfoCallback
                );

                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start();
              }
            );
          } else {
            loginFacebookSuccess(dispatch, navigate);
            //firebase.auth().signOut();
          }
      })
      .catch(() => {
        LoginManager.logOut();
        AsyncStorage.removeItem('accessToken');
        Alert.alert('Error al logearse');
      });
  };
};


const loginFacebookSuccess = (dispatch, user, navigate, accessToken) => {
  const rol = CONSTANTS.ROLES.CLIENT;

  const objUser = {
    email: user.email,
    name: user.displayName,
    photoURL: user.photoURL,
    rol: rol,
  };

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: objUser
  });

  AsyncStorage.setItem('user', JSON.stringify(objUser));
  AsyncStorage.setItem('email', user.email);
  AsyncStorage.setItem('accessToken', accessToken);
  AsyncStorage.setItem('rol', rol);

   firebase.database().ref().child('users').orderByChild('email').equalTo(user.email)
   .once('value', snapshot => {
     if (!snapshot.val()) {
        firebase.database().ref().child('users').push(objUser);
     }
   });

  navigate('App');
};

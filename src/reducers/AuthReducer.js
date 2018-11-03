import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCES,
  LOGOUT_USER_FAIL,
  REGISTRY_USER_SUCCESS,
  REGISTRY_USER_FAIL,
  REGISTRY_USER,
  RELOAD_USER,
  IS_MODAL_CLOSE_SESSION,
  CLEAN_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: '',
  userLogged: false,
  userReload: null,
  isModalCloseSessions: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAN_ERROR:
      return { ...state, error: '' };
    case IS_MODAL_CLOSE_SESSION:
       return { ...state, isModalCloseSessions: !state.isModalCloseSessions };
    case EMAIL_CHANGED:
       return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
       return { ...state, password: action.payload };
    case LOGIN_USER:
       return { ...state, error: '', loading: true };
    case LOGIN_USER_SUCCESS:
       return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
       return { ...state, error: 'Credenciales erróneas', loading: false };
    case LOGOUT_USER:
       return { ...state, ...INITIAL_STATE };
    case LOGOUT_USER_SUCCES:
       return { ...state, ...INITIAL_STATE };
    case LOGOUT_USER_FAIL:
       return { ...state, ...INITIAL_STATE };
    case REGISTRY_USER:
       return { ...state, error: '', loading: true };
    case REGISTRY_USER_SUCCESS:
       return { ...state, ...INITIAL_STATE, user: action.payload };
    case REGISTRY_USER_FAIL:
       return { ...state, error: 'Error en el registro', loading: false };
    case RELOAD_USER:
       return { ...state, userReload: action.payload };
    default:
       return state;
  }
};

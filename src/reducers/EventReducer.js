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
} from '../actions/types';

const INITIAL_STATE = {
  eventos_facebook: null,
  eventos_firebase: null,
  event_detail: null,
  signed: false,
  participants: null,
  evento: null,
  winners: null,
  loading: false,
  isModalNickName: false,
  name: '',
  description: '',
  date: '',
  hour: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_CREATE_EVENT:
       return { ...state, error: action.payload };
    case SUCCESS_CREATE_EVENT:
       return { ...state, error: action.payload };
    case ENTER_HOUR_SELECTED:
       return { ...state, hour: action.payload };
    case CHANGE_DATE:
       return { ...state, date: action.payload };
    case NAME_EVENT_CHANGED:
       return { ...state, name: action.payload };
    case DESCRIPTION_EVENT_CHANGED:
       return { ...state, description: action.payload };
    case NICK_NAME_NECESARY:
       return { ...state, isModalNickName: !state.isModalNickName };
    case SIGNING:
       return { ...state, loading: true };
    case DELETE_EVENT:
       return { ...state };
    case RELOAD_EVENT:
       return { ...state, evento: action.payload };
    case RELOAD_WINNER:
       return { ...state, winners: action.payload };
    case DELETE_WINNER:
       return { ...state };
    case NEW_WINNER:
       return { ...state };
    case RELOAD_PARTICIPANTS:
       return { ...state, participants: action.payload };
    case EVENT_SIGNIN:
       return { ...state, signed: action.payload, loading: false };
    case EVENT_SIGNOUT:
       return { ...state, signed: action.payload, loading: false };
    case EVENT_LIST_CHANGED:
       return { ...state, eventos_firebase: action.payload };
    case EVENT_PRESSED:
       return { ...state, event_detail: action.payload };
    default:
       return state;
  }
};

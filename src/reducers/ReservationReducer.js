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
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  type: 'NaN',
  persons: 'NaN',
  date: '',
  enterHourSelected: '',
  outHourSelected: '',
  weekDay: '',
  reservations: null,
  isModalCancelVisible: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_MODAL_CANCEL_VISIBLE:
      return { ...state, isModalCancelVisible: !state.isModalCancelVisible };
    case REMOVE_RESERVATION:
      return { ...state };
    case GET_RESERVATIONS:
      return { ...state, reservations: action.payload };
    case OUT_HOUR_SELECTED:
      return { ...state, outHourSelected: action.payload };
    case ENTER_HOUR_SELECTED:
      return { ...state, enterHourSelected: action.payload };
    case PERSONS_SELECTED:
      return { ...state, persons: action.payload };
    case TYPE_SELECTED:
      return { ...state, type: action.payload };
    case WEEK_DAY_FAIL:
      return { ...state, weekDay: '', error: 'No se puede reservar ni Lunes ni Sábados.' };
    case WEEK_DAY_SUCCESS:
      return { ...state, weekDay: action.payload };
    case CHANGE_DATE:
      return {
         ...state,
         error: '',
         date: action.payload,
         enterHourSelected: '',
         outHourSelected: ''
      };
    case GET_TODAY:
       return { ...state, date: action.payload };
    case SAVE_RESERVATION:
       return { ...state, error: '' };
    case SAVE_RESERVATION_SUCCESS:
       return { ...state, ...INITIAL_STATE };
    case SAVE_RESERVATION_FAIL:
       return { ...state, error: action.payload };
    default:
       return state;
  }
};

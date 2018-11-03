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
} from '../actions/types';

const INITIAL_STATE = {
  users: null,
  userDetail: null,
  message: '',
  instagram: null,
  facebook: null,
  twitter: null,
  twitch: null,
  isModalOpenedSave: false,
  isModalOpenReport: false,
  isModalOpenBan: false,
  isModalOpenDesBan: false,
  reports: null,
  report: '',
  lol: null,
  csgo: null,
  fortnite: null,
  hs: null,
  ow: null,
  pubg: null,
  smite: null,
  code: null,
  nickName: null,
  codeFromDB: null,
  error: '',
  banned: false,
  bannedMac: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_BANNED_MAC:
      return { ...state, bannedMac: action.payload };
    case IS_BANNED:
      return { ...state, banned: action.payload };
    case DESBAN_MODAL_PRESSED:
      return { ...state, isModalOpenDesBan: !state.isModalOpenDesBan };
    case DESBAN_USER:
      return { ...state, isModalOpenDesBan: !state.isModalOpenDesBan, message: action.payload };
    case ERROR_NICKNAME:
      return { ...state, error: action.payload };
    case INSTAGRAM_CHANGED:
      return { ...state, instagram: action.payload };
    case FACEBOOK_CHANGED:
      return { ...state, facebook: action.payload };
    case TWITTER_CHANGED:
      return { ...state, twitter: action.payload };
    case TWITCH_CHANGED:
      return { ...state, twitch: action.payload };
    case GET_CODE:
      return { ...state, codeFromDB: action.payload, message: '' };
    case NICK_NAME_CHANGED:
      return { ...state, nickName: action.payload };
    case CODE_CHANGED:
      return { ...state, code: action.payload };
    case CHECK_BOX_LOL_TRUE:
      return { ...state, lol: true };
    case CHECK_BOX_LOL_FALSE:
      return { ...state, lol: false };
    case CHECK_BOX_CSGO_TRUE:
      return { ...state, csgo: true };
    case CHECK_BOX_CSGO_FALSE:
      return { ...state, csgo: false };
    case CHECK_BOX_FORTNITE_TRUE:
      return { ...state, fortnite: true };
    case CHECK_BOX_FORTNITE_FALSE:
      return { ...state, fortnite: false };
    case CHECK_BOX_HS_TRUE:
      return { ...state, hs: true };
    case CHECK_BOX_HS_FALSE:
      return { ...state, hs: false };
    case CHECK_BOX_OW_TRUE:
      return { ...state, ow: true };
    case CHECK_BOX_OW_FALSE:
      return { ...state, ow: false };
    case CHECK_BOX_PUBG_TRUE:
      return { ...state, pubg: true };
    case CHECK_BOX_PUBG_FALSE:
      return { ...state, pubg: false };
    case CHECK_BOX_SMITE_TRUE:
      return { ...state, smite: true };
    case CHECK_BOX_SMITE_FALSE:
      return { ...state, smite: false };
    case SAVE_PROFILE:
      return { ...state, isModalOpenedSave: !state.isModalOpenedSave, message: 'Información Guardada' };
    case BAN_USER:
      return { ...state, isModalOpenBan: !state.isModalOpenBan, message: action.payload };
    case BAN_MODAL_PRESSED:
      return { ...state, isModalOpenBan: !state.isModalOpenBan };
    case GET_REPORTS:
      return { ...state, reports: action.payload };
    case SAVE_REPORT:
      return { ...state, isModalOpenReport: !state.isModalOpenReport };
    case CHANGE_REPORT:
      return { ...state, report: action.payload };
    case REPORT_MODAL_PRESSED:
      return { ...state, isModalOpenReport: !state.isModalOpenReport };
    case SAVE_MODAL_PRESSED:
      return { ...state, isModalOpenedSave: !state.isModalOpenedSave };
    case CHANGE_ROL:
      return { ...state, message: action.payload, isModalOpenedSave: !state.isModalOpenedSave };
    case GET_USERS:
      return { ...state, users: action.payload };
    case USER_PRESSED:
      return { ...state, userDetail: action.payload, message: '' };
    default:
       return state;
  }
};

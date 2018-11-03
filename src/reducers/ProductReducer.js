import {
  NAME_PRODUCT_CHANGED,
  DESCRIPTION_CHANGED,
  PRICE_EUROS_CHANGED,
  PRICE_TICKETS_CHANGED,
  TICKETS_CONSUME_CHANGED,
  SAVE_PRODUCT,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_FAIL,
  GET_PRODUCTOS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_COMIDAS,
  GET_BEBIDAS,
  GET_ORDENADORES,
  GET_OTROS,
  TAB_PRESSED,
  CHANGE_CODE,
  CLEAN_CODE,
  SUCCESS_CONSUME_FOOD,
  SUCCESS_CONSUME_DRINK,
  SUCCESS_CONSUME_COMPUTER,
  SUCCESS_CONSUME_OTHER,
  FAIL_CONSUME,
  SUCCESS_BUY,
  FAIL_BUY,
  OTHER_MODAL_PRESSED,
  DRINK_MODAL_PRESSED,
  FOOD_MODAL_PRESSED,
  COMPUTER_MODAL_PRESSED,
  CLEAN_REDUCERS
} from '../actions/types';

const INITIAL_STATE = {
  name: null,
  description: null,
  priceEuros: null,
  priceTickets: null,
  type: null,
  ticketsConsume: null,
  loadingSave: false,
  error: null,
  products: null,
  producto: null,
  comidas: [],
  bebidas: [],
  ordenadores: [],
  otros: [],
  selectedTab: 'COMIDA',
  code: '',
  errorCode: '',
  isModalOpenedOther: false,
  isModalOpenedDrink: false,
  isModalOpenedFood: false,
  isModalOpenComputer: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_PRODUCT_CHANGED:
       return { ...state, name: action.payload };
    case DESCRIPTION_CHANGED:
       return { ...state, description: action.payload };
    case PRICE_EUROS_CHANGED:
       return { ...state, priceEuros: action.payload };
    case PRICE_TICKETS_CHANGED:
       return { ...state, priceTickets: action.payload };
    case TICKETS_CONSUME_CHANGED:
       return { ...state, ticketsConsume: action.payload };
    case SAVE_PRODUCT:
       return { ...state, loadingSave: true };
    case SAVE_PRODUCT_SUCCESS:
       return {
         ...state,
         name: null,
         description: null,
         priceEuros: null,
         priceTickets: null,
         type: null,
         ticketsConsume: null,
         loadingSave: false,
         error: null,
         products: null,
         producto: null,
       };
    case SAVE_PRODUCT_FAIL:
       return { ...state, error: action.payload };
    case GET_PRODUCTOS:
       return { ...state, products: action.payload };
    case GET_PRODUCT:
       return {
         ...state,
         producto: action.payload,
         name: action.payload.name,
         photo: action.payload.photo,
         type: action.payload.type,
         description: action.payload.description,
         priceEuros: action.payload.priceEuros,
         priceTickets: action.payload.priceTickets,
         ticketsConsume: action.payload.ticketsConsume
       };
    case CREATE_PRODUCT:
       return {
         ...state,
         name: null,
         description: null,
         priceEuros: null,
         priceTickets: null,
         type: null,
         ticketsConsume: null,
         loadingSave: false,
         error: null,
         products: null,
         producto: null,
        };
    case DELETE_PRODUCT:
       return {
         ...state,
         name: null,
         description: null,
         priceEuros: null,
         priceTickets: null,
         type: null,
         ticketsConsume: null,
         loadingSave: false,
         error: null,
         products: null,
         producto: null,
       };
    case GET_COMIDAS:
       return { ...state, comidas: action.payload };
    case GET_BEBIDAS:
       return { ...state, bebidas: action.payload };
    case GET_ORDENADORES:
      return { ...state, ordenadores: action.payload };
    case GET_OTROS:
       return { ...state, otros: action.payload };
    case TAB_PRESSED:
       return { ...state, selectedTab: action.payload };
    case CHANGE_CODE:
       return { ...state, code: action.payload };
    case CLEAN_CODE:
       return { ...state, code: '', errorCode: '' };
    case SUCCESS_CONSUME_FOOD:
       return {
         ...state,
         errorCode: '',
         code: '',
         isModalOpenedFood: !state.isModalOpenedFood
    };
    case SUCCESS_CONSUME_DRINK:
     return {
       ...state,
       errorCode: '',
       code: '',
       isModalOpenedDrink: !state.isModalOpenedDrink
    };
    case SUCCESS_CONSUME_COMPUTER:
     return {
       ...state,
       errorCode: '',
       code: '',
       isModalOpenComputer: !state.isModalOpenComputer
    };
    case SUCCESS_CONSUME_OTHER:
     return {
       ...state,
       errorCode: '',
       code: '',
       isModalOpenedOther: !state.isModalOpenedOther
    };
    case FAIL_CONSUME:
       return { ...state, errorCode: 'CÓDIGO INCORRECTO', code: '' };
    case SUCCESS_BUY:
       return { ...state, errorCode: '', code: '' };
    case FAIL_BUY:
       return { ...state, errorCode: 'CÓDIGO INCORRECTO', code: '' };
    case OTHER_MODAL_PRESSED:
       return { ...state, isModalOpenedOther: !state.isModalOpenedOther };
    case DRINK_MODAL_PRESSED:
       return { ...state, isModalOpenedDrink: !state.isModalOpenedDrink };
    case FOOD_MODAL_PRESSED:
       return { ...state, isModalOpenedFood: !state.isModalOpenedFood };
    case COMPUTER_MODAL_PRESSED:
       return { ...state, isModalOpenComputer: !state.isModalOpenComputer };
    case CLEAN_REDUCERS:
       return { ...state, ...INITIAL_STATE };
    default:
       return state;
  }
};

import firebase from 'firebase';
import { SnapshotToArray } from '../config/helpers';

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
  CLOSE_PRODUCT,
  DELETE_PRODUCT,
  GET_COMIDAS,
  GET_BEBIDAS,
  GET_ORDENADORES,
  GET_OTROS,
  TAB_PRESSED,
  CHANGE_CODE,
  SUCCESS_CONSUME_FOOD,
  SUCCESS_CONSUME_DRINK,
  SUCCESS_CONSUME_COMPUTER,
  SUCCESS_CONSUME_OTHER,
  FAIL_CONSUME,
  CLEAN_CODE,
  SUCCESS_BUY,
  FAIL_BUY,
  OTHER_MODAL_PRESSED,
  DRINK_MODAL_PRESSED,
  FOOD_MODAL_PRESSED,
  COMPUTER_MODAL_PRESSED,
  CLEAN_REDUCERS
} from './types';

export const productNameChanged = (text) => {
  return {
    type: NAME_PRODUCT_CHANGED,
    payload: text
  };
};

export const descriptionChanged = (text) => {
  return {
    type: DESCRIPTION_CHANGED,
    payload: text
  };
};

export const priceEurosChanged = (text) => {
  return {
    type: PRICE_EUROS_CHANGED,
    payload: text
  };
};

export const priceTicketsChanged = (text) => {
  return {
    type: PRICE_TICKETS_CHANGED,
    payload: text
  };
};

export const ticketsConsumeChanged = (text) => {
  return {
    type: TICKETS_CONSUME_CHANGED,
    payload: text
  };
};

export const changeCode = (text) => {
  return {
    type: CHANGE_CODE,
    payload: text
  };
};

export const createProduct = () => {
  return {
    type: CREATE_PRODUCT
  };
};

export const closeProduct = () => {
  return {
    type: CLOSE_PRODUCT
  };
};

export const logoutCleanReducers = () => {
  return {
    type: CLEAN_REDUCERS
  };
};

export const buyPressed = (code, user, tickets, toggle) => {
  return (dispatch) => {
    firebase.database().ref().child('code').once('value', snapshot => {
      if (snapshot.val().toString() === code) {
        const reference = firebase.database().ref().child('users/' + user.key);
        reference.update({
          tickets: user.tickets - Number.parseInt(tickets)
        });

        dispatch({
          type: SUCCESS_BUY
        });

        toggle();
      } else {
        dispatch({
          type: FAIL_BUY
        });
      }
    });
  };
};

export const cleanCode = () => {
  return {
    type: CLEAN_CODE
  };
};

export const isModalOpen = (type) => {
  if (type === 'COMIDA') {
    return {
      type: FOOD_MODAL_PRESSED
    };
  } else if (type === 'BEBIDA') {
    return {
      type: DRINK_MODAL_PRESSED
    };
  } else if (type === 'ORDENADOR') {
    return {
      type: COMPUTER_MODAL_PRESSED
    };
  }
  return {
    type: OTHER_MODAL_PRESSED
  };
};

export const consumeAcepted = (code, user, tickets, type) => {
  return (dispatch) => {
    firebase.database().ref().child('code').once('value', snapshot => {
      if (snapshot.val().toString() === code) {

        let userTickets = user.tickets;
        let ticketsTotal = user.ticketsTotal;

        if (userTickets === undefined) {
          userTickets = 0;
        }
        if (ticketsTotal === undefined) {
          ticketsTotal = 0;
        }

        const reference = firebase.database().ref().child('users/' + user.key);
        reference.update({
          tickets: Number.parseInt(userTickets) + Number.parseInt(tickets),
          ticketsTotal: Number.parseInt(ticketsTotal) + Number.parseInt(tickets)
        });

        if (type === 'COMIDA') {
          dispatch({
            type: SUCCESS_CONSUME_FOOD
          });
        } else if (type === 'BEBIDA') {
          dispatch({
            type: SUCCESS_CONSUME_DRINK
          });
        } else if (type === 'ORDENADOR') {
          dispatch({
            type: SUCCESS_CONSUME_COMPUTER
          });
        } else {
          dispatch({
            type: SUCCESS_CONSUME_OTHER
          });
        }
      } else {
        dispatch({
          type: FAIL_CONSUME
        });
      }
    });
  };
};

export const productPressed = (product) => {
  return (dispatch) => {
    firebase.database().ref().child('products').child(product.key)
    .once('value', snapshot => {
      try {
        const snapVal = snapshot.val();
        snapVal.key = product.key;
        dispatch({
          type: GET_PRODUCT,
          payload: snapVal
        });
      } catch (e) {
        dispatch({
          type: GET_PRODUCT,
          payload: snapshot.val()
        });
      }
    });
  };
};

export const tabPressed = (type) => {
  return {
    type: TAB_PRESSED,
    payload: type
  };
};

export const getProducts = (type) => {
  return (dispatch) => {
    firebase.database().ref().child('products').orderByChild('type').equalTo(type).once('value', snapshot => {
      dispatch({
          type: GET_PRODUCTOS,
          payload: SnapshotToArray(snapshot)
      });

      if (type === 'COMIDA') {
        dispatch({
            type: GET_COMIDAS,
            payload: SnapshotToArray(snapshot)
        });
      } else if (type === 'BEBIDA') {
        dispatch({
            type: GET_BEBIDAS,
            payload: SnapshotToArray(snapshot)
        });
      } else if (type === 'ORDENADOR') {
        dispatch({
            type: GET_ORDENADORES,
            payload: SnapshotToArray(snapshot)
        });
      } else {
        dispatch({
            type: GET_OTROS,
            payload: SnapshotToArray(snapshot)
        });
      }
    });
  };
};

export const deleteProduct = (product, toggle) => {
  return (dispatch) => {
    const reference = firebase.database().ref('products/' + product.key);
    reference.remove();
    toggle();

    dispatch({
        type: DELETE_PRODUCT
    });
  };
};

export const saveProduct = (photoSelected, typeSelected, name, description, priceEuros,
   priceTickets, ticketsConsume, toggle, product) => {
  return (dispatch) => {
    dispatch({
        type: SAVE_PRODUCT
    });

    let error = '';
    let priceTicketsLet = priceTickets;
    let ticketsConsumeLet = ticketsConsume;

    if (photoSelected === 'NaN') {
      error = error + '- Elige una imagen. \n';
    }
    if (typeSelected === 'NaN') {
      error = error + '- Elige el tipo. \n';
    }
    if (name === '' || !name) {
      error = error + '- "Nombre" vacío. \n';
    }
    if (!Number.isInteger(Number.parseInt(priceEuros))) {
      error = error + '- "Precio en Euros" tiene que ser un número. \n';
    }
    if (!Number.isInteger(Number.parseInt(priceTickets)) && priceTicketsLet) {
      error = error + '- "Precio en Tickets" tiene que ser un número. \n';
    } else {
      if (!priceTicketsLet) {
        priceTicketsLet = '';
      }
    }
    if (!Number.isInteger(Number.parseInt(ticketsConsume)) && ticketsConsumeLet) {
      error = error + '- "Tickets por Consumición" tiene que ser un número. \n';
    } else {
      if (!ticketsConsumeLet) {
        ticketsConsumeLet = '';
      }
    }

    if (error === '') {
      const obj = {
        name: name,
        description: description,
        photo: photoSelected,
        type: typeSelected,
        priceEuros: priceEuros,
        priceTickets: priceTicketsLet,
        ticketsConsume: ticketsConsumeLet
      };

      if (product) {
        const reference = firebase.database().ref('products/' + product.key);
        reference.update(obj);
      } else {
        const reference = firebase.database().ref('products/');
        reference.push(obj);
      }

      dispatch({
          type: SAVE_PRODUCT_SUCCESS
      });
      toggle();
    } else {
      dispatch({
          type: SAVE_PRODUCT_FAIL,
          payload: error
      });
    }
  };
};

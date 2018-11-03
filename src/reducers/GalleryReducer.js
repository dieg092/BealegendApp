import {
  ADD_PHOTO_PRESSED,
  NAME_PHOTO_CHANGED,
  GET_IMAGES,
  ADD_IMAGE,
  LONG_PRESSED,
  DESSELECT_IMAGE,
  DELETE_IMAGES,
  CLEAN_IMAGES_SELECTED,
  IS_MODAL_NAME_IMAGE_EXIST
} from '../actions/types';

const INITIAL_STATE = {
  photos: [],
  name: '',
  photoSelected: '',
  imagesSelected: [],
  isModalNameImageExist: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_MODAL_NAME_IMAGE_EXIST:
      return { ...state, isModalNameImageExist: !state.isModalNameImageExist };
    case CLEAN_IMAGES_SELECTED:
      return { ...state, imagesSelected: [] };
    case DELETE_IMAGES:
       return { ...state };
    case DESSELECT_IMAGE:
       return {
         ...state,
         imagesSelected: state.imagesSelected.filter(item => item !== action.payload)
       };
    case LONG_PRESSED:
       return { ...state, imagesSelected: [...state.imagesSelected, action.payload] };
    case ADD_IMAGE:
       return { ...state, photoSelected: action.payload };
    case GET_IMAGES:
       return { ...state, name: '', photos: action.payload };
    case ADD_PHOTO_PRESSED:
       return { ...state, name: '', photos: [...state.photos, action.payload] };
    case NAME_PHOTO_CHANGED:
       return { ...state, name: action.payload };
    default:
       return state;
  }
};

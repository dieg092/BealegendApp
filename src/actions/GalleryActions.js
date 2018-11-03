import ImagePicker from 'react-native-image-picker';
import PhotoUpload from '../components/PhotoUpload';
import firebase from '../config/firebase';
import { SnapshotToArray } from '../config/helpers';

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
} from './types';

export const deleteImgs = (images) => {
  return (dispatch) => {
    dispatch({
        type: DELETE_IMAGES
    });

    images.map((image) => {
      firebase.database().ref().child('images').orderByChild('name').equalTo(image).once('value', snapshot => {
        const img = SnapshotToArray(snapshot)[0];

        const imageRef = firebase.database().ref('images/' + img.key);
        imageRef.remove();

        const storageRef = firebase.storage().ref('images').child(img.path);
        storageRef.delete().then(() => {

        }).catch((error) => {
          console.log(error);
        });

        dispatch({
          type: CLEAN_IMAGES_SELECTED
        });
      });
    });
  };
};

export const longPress = (name) => {
  return {
    type: LONG_PRESSED,
    payload: name
  };
};

export const desSelectImage = (name) => {
  return {
    type: DESSELECT_IMAGE,
    payload: name
  };
};

export const imageSelected = (eventKey, image) => {
  return (dispatch) => {
    const reference = firebase.database().ref('events/' + eventKey);
    reference.update({
      photo: image
    });

    dispatch({
      type: ADD_IMAGE,
      payload: image
    });
  };
};

export const getImages = () => {
  return (dispatch) => {
    firebase.database().ref().child('images').once('value', snapshot => {
      dispatch({
        type: GET_IMAGES,
        payload: SnapshotToArray(snapshot)
      });
    });
  };
};

export const nameChanged = (text) => {
  return {
    type: NAME_PHOTO_CHANGED,
    payload: text
  };
};

export const isModalOpenGallery = () => {
  return {
    type: IS_MODAL_NAME_IMAGE_EXIST
  };
};

export const addPhotoPressed = (name) => {
  return (dispatch) => {
    firebase.database().ref().child('images').orderByChild('name').equalTo(name)
    .once('value', snapshot => {
      if (!snapshot.val()) {
        ImagePicker.launchImageLibrary({}, response => {
          PhotoUpload(response.uri, name)
            .then(url => {
              dispatch({
                type: ADD_PHOTO_PRESSED,
                payload: url
              });
            })
            .catch(error => console.log(error));
        });
      } else {
        dispatch({
          type: IS_MODAL_NAME_IMAGE_EXIST,
        });
      }
    });
  };
};

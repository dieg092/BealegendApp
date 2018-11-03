import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import slugify from 'slugify';
import firebase from './../config/firebase';
import { SnapshotToArray } from '../config/helpers';

const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;

const PhotoUpload = (uri, name, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    if (uri) {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;
      const nameSlug = slugify(name, {
        replacement: '-',
        lower: true
      }) + '.jpg';
      const imageRef = storage.ref('images').child(`${nameSlug}`);

      const imageObject = {
        path: nameSlug,
        name: name,
        uri: 'NaN'
      };

      firebase.database().ref().child('images').push(imageObject);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          addImageUri(nameSlug);
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
      });
    }
  });
};

export const addImageUri = (nameSlug) => {
  const starsRef = firebase.storage().refFromURL('gs://bealegendapp.appspot.com/images/' + nameSlug);
  // Get the download URL
  starsRef.getDownloadURL().then((url) => {
    firebase.database().ref().child('images').orderByChild('path').equalTo(nameSlug).once('value', snapshot => {
      const reference = firebase.database().ref('images/' + SnapshotToArray(snapshot)[0].key)
      reference.update({
        uri: url
      });
    });
  }).catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object_not_found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
      default:
        break;
    }
  });
};


export default PhotoUpload;

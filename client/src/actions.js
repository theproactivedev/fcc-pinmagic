export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const ADD_PHOTO = "ADD_PHOTO";
export const ADD_ALL_PHOTOS = "ADD_ALL_PHOTOS";
export const FETCH_PHOTOS_PENDING = "FETCH_PHOTOS_PENDING";
export const FETCH_PHOTOS_RECEIVED = "FETCH_PHOTOS_RECEIVED";

// store - to state
// save - to database
function requestPhotos() {
  return {
    type: FETCH_PHOTOS_PENDING
  };
}

function receivePhotos() {
  return {
    type: FETCH_PHOTOS_RECEIVED
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER
  };
}

function storeUserPhotos(items) {
  return {
    type: ADD_PHOTO,
    items
  };
}

function storeAllPhotos(items) {
  return {
    type: ADD_ALL_PHOTOS,
    items
  };
}

export function addPhoto(item, token) {
  return (dispatch) => {
    // storePhoto(item);
    return fetch("/addingPhoto", {
      method: "POST",
      headers: new Headers({
        'Content-type' : 'application/json',
        'x-auth-token' : token
      }),
      body: JSON.stringify(item)
    })
    .then(response => response.json(),
    error => console.log(error));
  }
}

export function deletePhoto(title, token) {
  return (dispatch) => {
    // storePhoto(item);
    return fetch("/deletingPhoto", {
      method: "DELETE",
      headers: new Headers({
        'Content-type' : 'application/json',
        'x-auth-token' : token
      }),
      body: JSON.stringify({imgTitle: title})
    })
    .then(response => response.json(),
    error => console.log(error));
  }
}

export function getUserPhotos(token) {
  return (dispatch) => {
    dispatch(requestPhotos());
    return fetch("/gettingUserPhotos", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        })
      })
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(storeUserPhotos(json)))
    .then(json => dispatch(receivePhotos()));
  }
}

export function getAllPhotos() {
  return (dispatch) => {
    dispatch(requestPhotos());
    return fetch("/gettingAllPhotos", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json'
        })
      })
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(storeAllPhotos(json)))
    .then(json => dispatch(receivePhotos()));
  }
}

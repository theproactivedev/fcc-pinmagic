export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const ADD_PHOTO = "ADD_PHOTO";
export const ADD_ALL_PHOTOS = "ADD_ALL_PHOTOS";

// store - to state
// save - to database

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
    return fetch("/gettingUserPhotos", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        })
      })
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(storeUserPhotos(json)));
  }
}

export function getAllPhotos() {
  return (dispatch) => {
    return fetch("/gettingAllPhotos", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json'
        })
      })
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(storeAllPhotos(json)));
  }
}

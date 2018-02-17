import {
  ADD_USER, REMOVE_USER
} from './actions.js';

const initialState = {
  isFetching: false,
  isUserAuthenticated: false,
  user: {
    userName: "",
    userId: "",
    userToken: ""
  }
};

const rootReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_USER:
      return {
        ...state,
        isUserAuthenticated: true,
        user: {
          ...state.user,
          userName: action.user.userName,
          userId: action.user.userId,
          userToken: action.user.userToken
        }
      };
    case REMOVE_USER:
      return {
        ...state,
        isUserAuthenticated: false,
        user: {
          ...state.user,
          userName: "",
          userId: "",
          userToken: ""
        }
      };
    default:
      return state;
  }
};

export default rootReducer;

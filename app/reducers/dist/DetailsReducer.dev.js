"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var initialState = {
  currentUserData: {},
  profileURL: ''
};

function DetailsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log("Executing: ", action.type);

  switch (action.type) {
    case 'SAVE_USER_DATA':
      console.log("Saving User's Data", action.data);
      return Object.assign({}, state, {
        currentUserData: action.data
      });

    case 'SAVE_DP':
      console.log("SAVING PROFILE PICTURE", action.data);
      return Object.assign({}, state, {
        profileURL: action.data
      });

    default:
      return state;
  }
}

var _default = DetailsReducer;
exports["default"] = _default;
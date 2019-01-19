import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import signUpReducer from "./signUpReducer";
import { SET_CURRENT_USER } from '../actions/types';
import applicantJobSearch from "./applicantJobSearch";
// import authReducer from "./authReducer";
// import errorReducer from "./errorReducer";
// import profileReducer from "./profileReducer";
// import propertyReducer from "./propertyReducer";

const rootReducer = combineReducers({
  //auth: authReducer,
  signUp: signUpReducer,
  search: applicantJobSearch
  // profile: profileReducer,
  // property: propertyReducer,
  // error: errorReducer
});

export default rootReducer;

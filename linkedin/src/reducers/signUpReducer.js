import { SIGN_UP_ONE, SIGN_UP, LOGIN, SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';


const initialState = {
    signupone: null,
    isAuthenticated: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGN_UP_ONE:
            console.log("in signup one reducer")
            return {
                ...state,
                signupone: action.payload
            }
        case SIGN_UP:
            console.log("in signup  reducer")
            return {
                ...state,
                signup: action.payload
            }
        case LOGIN:
            console.log("in login reducer")
            return {
                ...state,
                login: action.payload
            }
        case SET_CURRENT_USER:
        console.log("in set_current-user reducer")
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;

    }

}
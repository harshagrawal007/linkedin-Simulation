import axios from 'axios';
import { SIGN_UP,SET_CURRENT_USER } from './types';

export function signUp(signUpFullDataSet){
    console.log("in sign up one action");
    return async function(dispatch){
        axios.defaults.withCredentials = true;
        const response = await axios.post('http://localhost:3001/user/signUp', signUpFullDataSet)
        console.log(response)
        dispatch({
            type : SIGN_UP,
            payload : response
        })
    }
}
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
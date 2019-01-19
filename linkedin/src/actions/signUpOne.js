import axios from 'axios';
import { SIGN_UP_ONE } from './types';

export function signUpOne(signUpLoginDataSet){
    console.log("in sign up one action");
    return  function(dispatch){
        axios.defaults.withCredentials = true;
        dispatch({
            type : SIGN_UP_ONE,
            payload : signUpLoginDataSet
        })
    }
}
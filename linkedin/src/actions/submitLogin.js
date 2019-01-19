import axios from 'axios';
import { LOGIN } from './types';

export function submitLogin(signUpFullDataSet){
    console.log("in sign up one action");
    return async function(dispatch){
        axios.defaults.withCredentials = true;
        const response = await axios.post('http://localhost:3001/user/login', signUpFullDataSet)
        console.log(response)
        dispatch({
            type : LOGIN,
            payload : response
        })
    }
}
import axios from 'axios';
import { USERSEARCH } from './types';
import { USERSEARCHCONNECTION } from './types';
import { USERSEARCHCONREQUEST } from './types';
import { USERSEARCHCONREQUESTREC } from './types';





export function submitUserSearch(searchData){
    console.log("in user search action");
    return async function(dispatch){
        axios.defaults.withCredentials = true;
        console.log(searchData)
        const response = await axios.get('http://localhost:3001/user/search', {params: {userName: searchData.userName, id: searchData.id}})
        dispatch({
            type : USERSEARCH,
            payload : response.data
        })
    }
}

export function submitUserSearchConnection(searchData){
    console.log("in user search action");
    return async function(dispatch){
        axios.defaults.withCredentials = true;
        console.log(searchData)
        const response = await axios.get('http://localhost:3001/user/searchConnection', {params: {userName: searchData.userName, id: searchData.id}})
        dispatch({
            type : USERSEARCHCONNECTION,
            payload : response.data
        })
    }
}
export function submitUserSearchConnectionRequest(searchData){
    console.log("in user search action");
    return async function(dispatch){
        axios.defaults.withCredentials = true;
        console.log(searchData)
        const response = await axios.get('http://localhost:3001/user/searchConnectionRequest', {params: {userName: searchData.userName, id: searchData.id}})
        dispatch({
            type : USERSEARCHCONREQUEST,
            payload : response.data
        })
    }
}
export function submitUserSearchConnectionRequestRec(searchData){
    console.log("in user search action");
    return async function(dispatch){
        axios.defaults.withCredentials = true;
        console.log(searchData)
        const response = await axios.get('http://localhost:3001/user/searchConnectionRequestRec', {params: {userName: searchData.userName, id: searchData.id}})
        dispatch({
            type : USERSEARCHCONREQUESTREC,
            payload : response.data
        })
    }
}
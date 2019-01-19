import axios from 'axios';
import { JOBSEARCH } from './types';

export function submitSearch(searchData){
    console.log("in applicant search action");
    return async function(dispatch){
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:3001/applicant/searchjob', {params: {job: searchData.job,location: searchData.location, id: searchData.applicantId}})
        console.log(response)
        dispatch({
            type : JOBSEARCH,
            payload : response
        })
    }
}


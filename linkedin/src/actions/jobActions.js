import axios from 'axios';
import { POSTJOB, GET_ERRORS } from './types';
import rootURL from '../config/urlRoot';
//Update Profile
const ROOT_URL = rootURL.ROOT_URL;
export const postJob = (values, history) => dispatch => {
    axios
      .post(`${ROOT_URL}/recruiter/postJob`, values)
      .then(res => history.push('/landingPage')
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
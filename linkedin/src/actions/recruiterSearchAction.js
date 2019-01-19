import axios from "axios";
import { JOBSEARCH } from "./types";

export function recruiterSearch(searchData) {
  console.log("in applicant search action");
  return async function(dispatch) {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      "http://localhost:3001/recruiter/searchJobPosting",
      {
        params: {
          id: searchData.recruiterId,
          job: searchData.job,
          location: searchData.location
        }
      }
    );
    console.log(response);
    dispatch({
      type: JOBSEARCH,
      payload: response
    });
  };
}
